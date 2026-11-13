(function () {
  "use strict";
  var menuButton = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }
  document.getElementById("year").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      var select = document.getElementById("service-select");
      if (select) {
        var requested = link.getAttribute("data-service");
        Array.prototype.forEach.call(select.options, function (option) {
          if (option.text.toLowerCase() === requested.toLowerCase())
            select.value = option.value || option.text;
        });
      }
    });
  });
  var form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form),
        lines = [
          "Hello Massimo Salon & Academy, I would like to enquire about an appointment.",
          "Name: " + data.get("name"),
          "Phone: " + data.get("phone"),
          "Service: " + data.get("service"),
        ];
      if (data.get("date")) lines.push("Preferred date: " + data.get("date"));
      if (data.get("message")) lines.push("Message: " + data.get("message"));
      var url =
        "https://wa.me/917566412096?text=" +
        encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener,noreferrer");
      document.querySelector(".form-feedback").textContent =
        "Your WhatsApp enquiry is ready. Please send it in WhatsApp to contact the salon.";
    });
  }
})();
