const projectNotes = {
  portfolio: {
    title: "Interactive Portfolio Experience",
    copy:
      "I wanted a portfolio that feels less like a resume and more like a guided scene. The interaction stays restrained, but every detail pushes the visitor deeper into the story."
  },
  dashboard: {
    title: "Focus Flow Dashboard",
    copy:
      "This project came from the idea that productivity tools should lower stress, not increase it. The layout reduces clutter and uses motion only where it improves focus."
  },
  microsite: {
    title: "Motion Story Microsite",
    copy:
      "I built this concept to explore how motion can support storytelling. Instead of using animation as decoration, I used it to control pacing, tension, and mood."
  }
};

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.animate(
      {
        left: `${event.clientX}px`,
        top: `${event.clientY}px`
      },
      { duration: 180, fill: "forwards" }
    );
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateX = ((y / bounds.height) - 0.5) * -10;
    const rotateY = ((x / bounds.width) - 0.5) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;

    element.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "";
  });
});

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectNotes[button.dataset.project];
    const detailTitle = document.getElementById("detail-title");
    const detailCopy = document.getElementById("detail-copy");
    const detailPanel = document.getElementById("project-detail");

    if (!project || !detailTitle || !detailCopy || !detailPanel) {
      return;
    }

    detailTitle.textContent = project.title;
    detailCopy.textContent = project.copy;
    detailPanel.animate(
      [
        { transform: "scale(0.98)", opacity: 0.7 },
        { transform: "scale(1)", opacity: 1 }
      ],
      { duration: 260, easing: "ease-out" }
    );
  });
});

const messageButton = document.getElementById("message-button");
const formNote = document.getElementById("form-note");

if (messageButton && formNote) {
  messageButton.addEventListener("click", () => {
    formNote.textContent =
      "Nice. The interaction fired successfully. When you're ready, this can be connected to EmailJS, Formspree, or your own backend.";
    formNote.animate(
      [
        { opacity: 0.2, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 320, easing: "ease-out" }
    );
  });
}
