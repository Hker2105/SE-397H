/**
npx sequelize-cli model:generate --name GIOHANG --attributes "" --force

run migrations: 
npx sequelize-cli db:migrate

npx sequelize-cli db:migrate:undo

SELECT * FROM information_schema.table_constraints
    -> WHERE table_schema = 'shop_laptop' AND table_name ='giohangs';
 */
console.log('Hello!')
