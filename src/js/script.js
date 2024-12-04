"use strict";

const modalOverlay = document.querySelector(".modal-overlay");
const modalContent = document.querySelector(".modal__content");
const modalClose = document.querySelector(".modal__close");

document.querySelectorAll(".modal-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const type = button.dataset.modal;

        switch (type) {
            case "success":
                modalContent.textContent = "Operation Successful!";
                modalContent.style.color = "green";
                break;
            case "error":
                modalContent.textContent = "An Error Occurred!";
                modalContent.style.color = "red";
                break;
            default:
                modalContent.textContent = "Information!";
                modalContent.style.color = "blue";
        }

        modalOverlay.classList.remove("hidden");
    });
});

modalClose.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
});

document.querySelectorAll(".tab-menu__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document
            .querySelector(".tab-menu__tab.active")
            .classList.remove("active");
        document
            .querySelector(".tab-menu__panel.active")
            .classList.remove("active");

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

document.querySelector(".burger-menu__toggle").addEventListener("click", () => {
    document.querySelector(".burger-menu__list").classList.toggle("active");
});

document.querySelectorAll(".burger-menu__list > li").forEach((item) => {
    item.addEventListener("click", (e) => {
        const submenu = item.querySelector(".burger-menu__submenu");
        if (submenu) {
            e.preventDefault();
            submenu.classList.toggle("active");
        }
    });
});
