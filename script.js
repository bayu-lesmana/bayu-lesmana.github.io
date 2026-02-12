document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".card");
    const darkBtn = document.getElementById("darkBtn");
    const heroImg = document.querySelector(".hero-section img");
    const cursor = document.getElementById("cursor");


    /* SCROLL PROGRESS BAR */
const progress = document.getElementById("progress");

window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = (scrollTop / height) * 100;
    if (progress) progress.style.width = percent + "%";
});

    /* CARD CLICK → DETAIL */
    cards.forEach(card => {
        card.addEventListener("click", () => {
            window.location.href = "detail.html";
        });
    });


    /* BLUR + STAGGER REVEAL */
 const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 120);
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

/* CONTACT FORM */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerText = "✅ Message sent successfully!";
                form.reset();
            } else {
                status.innerText = "❌ Failed to send message.";
            }
        } catch (err) {
            status.innerText = "❌ Network error.";
        }
    });
}


/* LOADER */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
});

/* ================= APPLE NAVBAR + SEARCH + DARK MODE ================= */

document.addEventListener("DOMContentLoaded", () => {

  const searchIcon = document.getElementById("searchIcon");
  const overlay = document.getElementById("searchOverlay");
  const appleNav = document.querySelector(".apple-navbar");
  const darkBtn = document.getElementById("darkBtn");

  /* SEARCH */
  if (searchIcon && overlay) {
    searchIcon.addEventListener("click", () => {
      overlay.classList.toggle("active");
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") overlay.classList.remove("active");
    });

    overlay.addEventListener("click", e => {
      if (e.target === overlay) overlay.classList.remove("active");
    });
  }

  /* NAVBAR FLOAT */
  if (appleNav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        appleNav.classList.add("scrolled");
      } else {
        appleNav.classList.remove("scrolled");
      }
    });
  }

  /* DARK MODE */
  if (darkBtn) {

    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      darkBtn.textContent = "☀️";
    }

    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        darkBtn.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        darkBtn.textContent = "🌙";
      }
    });
  }

});

/* ================= GLOBAL SEARCH (INDEX + ABOUT) ================= */

const appleSearchInput = document.getElementById("appleSearchInput");

/* semua elemen yang bisa dicari */
const searchable = document.querySelectorAll(
  ".card, p, h1, h2, h3, section"
);

if (appleSearchInput && searchable.length) {
  appleSearchInput.addEventListener("input", () => {
    const keyword = appleSearchInput.value.toLowerCase();

    searchable.forEach(el => {
      const text = el.innerText.toLowerCase();

      if (text.includes(keyword)) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });
  });
}

/* ================= AVATAR TYPING TOOLTIP ================= */

const avatar = document.querySelector(".avatar-img");
const tooltip = document.querySelector(".avatar-tooltip");

if (avatar && tooltip) {
  const text = "Hi, I'm Online Now!";
  let typing;

  avatar.addEventListener("mouseenter", () => {
    tooltip.style.opacity = 1;
    tooltip.textContent = "";
    let i = 0;

    typing = setInterval(() => {
      if (i < text.length) {
        tooltip.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 60);
  });

  avatar.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;
    clearInterval(typing);
  });
}

/* ================= GLOBAL FLOATING AVATAR ================= */

document.addEventListener("DOMContentLoaded", () => {

  if (!document.querySelector(".avatar-wrap")) {

    const avatarWrap = document.createElement("div");
    avatarWrap.className = "avatar-wrap";

    avatarWrap.innerHTML = `
      <img src="Photos/avatar.png" class="avatar-img" alt="avatar">
      <div class="avatar-tooltip"></div>
    `;

    document.body.appendChild(avatarWrap);

    const avatar = avatarWrap.querySelector(".avatar-img");
    const tooltip = avatarWrap.querySelector(".avatar-tooltip");

    if (avatar && tooltip) {
      const text = "Hi, I'm Online Now!";
      let typing;

      avatar.addEventListener("mouseenter", () => {
        tooltip.style.opacity = 1;
        tooltip.textContent = "";
        let i = 0;

        typing = setInterval(() => {
          if (i < text.length) {
            tooltip.textContent += text.charAt(i);
            i++;
          } else {
            clearInterval(typing);
          }
        }, 60);
      });

      avatar.addEventListener("mouseleave", () => {
        tooltip.style.opacity = 0;
        clearInterval(typing);
      });
    }
  }

});
