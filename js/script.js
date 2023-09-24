// Set current year
const yearEl = document.querySelector(".year"),
  currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// MAke mobile navigation
const btnNavEl = document.querySelector(".btn-mobile-nav"),
  headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

//Smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const href = link.getAttribute("href");

    //Scroll back to top
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

//Sticky navigation
const sectionHero = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHero);

//Modal
const form = document.querySelector("form");
const modal = document.querySelector(".modal");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showThanksModal();
  e.target.reset();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.getAttribute("data-close") == "") {
    closeModal();
  }
});

function showThanksModal() {
  modal.classList.add("show");
  document.documentElement.style.overflow = "hidden";
  const thanksModal = document.createElement("div");
  thanksModal.classList.add("modal-dialog");
  thanksModal.classList.add("modal-dialog");
  thanksModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-close" data-close>×</div>
      <div class="modal-title">Thank you!<br> We will contact you soon!</div>
    </div>
  `;

  document.querySelector(".modal").append(thanksModal);

  setTimeout(() => {
    thanksModal.remove();
    closeModal();
  }, 3000);
}

function closeModal() {
  modal.classList.remove("show");
  document.documentElement.style.overflow = "";
}

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

function checkFlexGap() {
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
