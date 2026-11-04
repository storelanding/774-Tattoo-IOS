(function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact form -> opens the user's mail client (static site, no backend)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var status = document.getElementById("form-status");
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var topic = form.topic.value;
      var message = form.message.value.trim();
      if (!name || !email || !message) {
        status.textContent = "Please fill in your name, email and message.";
        return;
      }
      var to = form.getAttribute("data-to");
      var subject = "[Tattoo AI iOS] " + topic + " - " + name;
      var body = "Name: " + name + "\nEmail: " + email + "\nTopic: " + topic + "\n\n" + message;
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.textContent = "Opening your email app… If nothing happens, email us directly at " + to + ".";
      form.reset();
    });
  }
})();
