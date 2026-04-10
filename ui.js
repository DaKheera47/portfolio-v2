const SHARED_FOOTER_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/DaKheera47",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ssarfaraz30",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@DaKheera47",
  },
  {
    label: "Email",
    href: "mailto:shaheer30sarfaraz@gmail.com",
  },
];

function createSharedFooter(slot) {
  const footer = document.createElement("footer");
  const footerClass = slot.getAttribute("data-footer-class");
  if (footerClass) {
    footer.className = `${footerClass} font-serif`;
  }

  const linksContainer = document.createElement("div");
  linksContainer.className = "flex flex-wrap gap-x-6 gap-y-2 font-serif";

  SHARED_FOOTER_LINKS.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.textContent = `${link.label}`;
    anchor.href = link.href;
    anchor.className = "block text-warmer hover:text-ember transition-colors";

    if (!link.href.startsWith("mailto:")) {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }

    linksContainer.appendChild(anchor);
  });

  footer.appendChild(linksContainer);
  return footer;
}

function mountSharedFooters() {
  const slots = document.querySelectorAll("[data-footer-slot]");
  slots.forEach((slot) => {
    const footer = createSharedFooter(slot);
    slot.replaceWith(footer);
  });
}

function applyView(viewName, shouldScrollToTop) {
  const views = document.querySelectorAll("[data-view]");

  const transition = () => {
    views.forEach((view) => {
      if (view.dataset.view === viewName) {
        view.classList.remove("view-hidden");
      } else {
        view.classList.add("view-hidden");
      }
    });

    if (shouldScrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  };

  if (document.startViewTransition) {
    document.startViewTransition(transition);
  } else {
    transition();
  }
}

window.navigateTo = function navigateTo(viewName) {
  applyView(viewName, true);

  const newUrl = viewName === "home" ? "/" : `/#${viewName}`;
  history.pushState({ view: viewName }, "", newUrl);
};

window.addEventListener("popstate", (event) => {
  const viewName = event.state?.view || "home";
  applyView(viewName, false);
});

window.addEventListener("DOMContentLoaded", () => {
  mountSharedFooters();

  const hash = window.location.hash.replace("#", "");
  if (hash && hash !== "home") {
    applyView(hash, false);
  }
});
