const navigationLinks = Array.from(
  document.querySelectorAll(".bottom-nav__link"),
);
const pageSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setCurrentSection(sectionId) {
  for (const link of navigationLinks) {
    const isCurrent = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-active", isCurrent);

    if (isCurrent) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

for (const link of navigationLinks) {
  link.addEventListener("click", () => {
    setCurrentSection(link.getAttribute("href").slice(1));
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

      if (visibleSections.length > 0) {
        setCurrentSection(visibleSections[0].target.id);
      }
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75],
    },
  );

  for (const section of pageSections) {
    sectionObserver.observe(section);
  }
}
