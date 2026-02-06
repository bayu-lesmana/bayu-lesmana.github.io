document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("search");
    const cards = document.querySelectorAll(".card");
    const darkBtn = document.getElementById("darkBtn");
    const navbar = document.querySelector(".navbar");
    const burger = document.getElementById("burger");
    const navMenu = document.querySelector(".navbar nav");
    const heroImg = document.querySelector(".hero-section img");
    const cursor = document.getElementById("cursor");

    /* SEARCH FILTER */
    if (search) {
        search.addEventListener("keyup", function () {
            const keyword = search.value.toLowerCase();

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.visibility = text.includes(keyword) ? "visible" : "hidden";
                card.style.height = text.includes(keyword) ? "auto" : "0";
                card.style.margin = text.includes(keyword) ? "" : "0";
            });
        });
    }

    /* CARD CLICK → DETAIL */
    cards.forEach(card => {
        card.addEventListener("click", () => {
            window.location.href = "detail.html";
        });
    });

    /* DARK MODE */
    if (darkBtn) {
        darkBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
        });
    }

    /* BLUR + STAGGER REVEAL */
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    reveals.forEach(el => observer.observe(el));

    /* PARALLAX HEADER */
    window.addEventListener("scroll", () => {
        if (heroImg) {
            heroImg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
        }
    });

    /* FLOATING NAVBAR */
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            navbar.classList.add("floating");
        } else {
            navbar.classList.remove("floating");
        }
    });

    /* HAMBURGER MENU */
    if (burger) {
        burger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    /* CURSOR FOLLOW GLOW */
    if (cursor) {
        document.addEventListener("mousemove", e => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
    }

    /* PAGE TRANSITION */
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        if (link.getAttribute("href") && link.getAttribute("href").includes(".html")) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const url = this.href;

                document.body.classList.add("fade-out");

                setTimeout(() => {
                    window.location.href = url;
                }, 400);
            });
        }
    });

});

/* LOADER */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
});

