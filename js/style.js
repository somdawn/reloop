document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".main_5R article");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        target.classList.add("visible");

        const bounceHeight = Math.floor(Math.random() * 20) + 15;
        const duration = Math.floor(Math.random() * 500) + 900;

        target.animate([
          { transform: "translateY(0)" },
          { transform: `translateY(-${bounceHeight}px)` },
          { transform: `translateY(${bounceHeight * 0.6}px)` },
          { transform: `translateY(-${bounceHeight * 0.3}px)` },
          { transform: `translateY(${bounceHeight * 0.15}px)` },
          { transform: "translateY(0)" }
        ], {
          duration: duration,
          easing: "cubic-bezier(0.25, 1.5, 0.5, 1)",
          fill: "forwards"
        });
      }
    });
  }, { threshold: 0.2 });

  targets.forEach(target => observer.observe(target));
});
