const API = "http://127.0.0.1:3000/api";

document.addEventListener("DOMContentLoaded", () => {
    loadThongTinTaiKhoan();

    document.querySelector(".btn-update")
        ?.addEventListener("click", updateThongTinTaiKhoan);
});

async function loadThongTinTaiKhoan() {
    const maKH = localStorage.getItem("MaKhachHang");

    if (!maKH) {
        alert("Bạn chưa đăng nhập");
        window.location.href = "Login.html";
        return;
    }

    try {
        const res = await fetch(`${API}/khachhangs/${maKH}`);
        const json = await res.json();

        const kh = json.data;
        if (!kh) return;

        const inputs = document.querySelectorAll(".info-group input");

        inputs[0].value = kh.HoTen || "";

        document.querySelectorAll('input[name="gender"]').forEach(radio => {
            const text = radio.parentElement.textContent.trim();
            if (text === kh.GioiTinh) radio.checked = true;
        });

        inputs[3].value = kh.SoDienThoai || "";

        inputs[4].value = kh.Email || "";

        const diaChi = (kh.DiaChi || "").split(",");

        inputs[5].value = diaChi[0]?.trim() || ""; 
        inputs[6].value = diaChi[1]?.trim() || "";
        inputs[7].value = diaChi[2]?.trim() || ""; 

    } catch (error) {
        console.error(error);
        alert("Không tải được thông tin");
    }
}

async function updateThongTinTaiKhoan() {
    const maKH = localStorage.getItem("MaKhachHang");

    const inputs = document.querySelectorAll(".info-group input");

    const hoTen = inputs[0].value.trim();

    const gioiTinh =
        document.querySelector('input[name="gender"]:checked')
            ?.parentElement.textContent.trim() || "";

    const soDienThoai = inputs[3].value.trim();
    const email = inputs[4].value.trim();

    const duong = inputs[5].value.trim();
    const phuong = inputs[6].value.trim();
    const tinh = inputs[7].value.trim();

    const diaChi = `${duong}, ${phuong}, ${tinh}`;

    try {
        const res = await fetch(`${API}/khachhangs/${maKH}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                HoTen: hoTen,
                GioiTinh: gioiTinh,
                SoDienThoai: soDienThoai,
                Email: email,
                DiaChi: diaChi
            })
        });

        const json = await res.json();

        alert(json.message || "Cập nhật thành công");
        loadThongTinTaiKhoan();

    } catch (error) {
        console.error(error);
        alert("Cập nhật thất bại");
    }
}