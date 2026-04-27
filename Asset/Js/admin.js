function toggleMenu(e, element){
    e.preventDefault();

    const parent = element.parentElement;

    // đóng menu khác
    document.querySelectorAll(".has-sub").forEach(item => {
        if(item !== parent){
            item.classList.remove("active");
        }
    });

    // mở / đóng menu hiện tại
    parent.classList.toggle("active");
}
