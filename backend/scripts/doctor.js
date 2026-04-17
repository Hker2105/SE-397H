const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const serverFile = path.join(__dirname, '..', 'server.js');
const content = fs.readFileSync(serverFile, 'utf8');

const hasConflictMarker = /^(<<<<<<<|=======|>>>>>>>)\s?/m.test(content);
const hasInjectedBranchLine = /^codex\/fix-bugs-[\w-]+$/m.test(content);
const relativeServerPath = path.relative(process.cwd(), serverFile) || 'server.js';

if (hasConflictMarker || hasInjectedBranchLine) {
  console.error('\n❌ server.js đang có nội dung lỗi (merge/conflict hoặc text bị chèn nhầm).');
  console.error('👉 Cách sửa nhanh:');
  console.error(`   git checkout -- ${relativeServerPath}`);
  console.error('   npm start');
  process.exit(1);
}

const check = spawnSync(process.execPath, ['--check', serverFile], { stdio: 'inherit' });
if (check.status !== 0) {
  console.error(`\n❌ server.js có lỗi cú pháp. Hãy chạy: git checkout -- ${relativeServerPath}`);
  process.exit(check.status || 1);
}

console.log('✅ doctor check passed');
