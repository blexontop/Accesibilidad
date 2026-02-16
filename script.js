// Menú accesible (ARIA-expanded + hidden)
const btnMenu = document.getElementById("btnMenu");
const nav = document.getElementById("mainNav");

btnMenu.addEventListener("click", () => {
  const isOpen = btnMenu.getAttribute("aria-expanded") === "true";
  btnMenu.setAttribute("aria-expanded", String(!isOpen));
  nav.hidden = isOpen;
});

// Formulario accesible con errores asociados (WCAG 3.3.1/3.3.2 + 4.1.2)
const form = document.getElementById("contactForm");
const errorSummary = document.getElementById("errorSummary");
const successMsg = document.getElementById("successMsg");

function setError(inputId, message) {
  const input = document.getElementById(inputId);
  const p = document.getElementById(`${inputId}-error`);
  p.textContent = message;
  p.hidden = false;

  // aria-invalid + aria-describedby para asociar el error
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", `${inputId}-error`);
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  const p = document.getElementById(`${inputId}-error`);
  p.textContent = "";
  p.hidden = true;
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Limpieza previa
  ["name", "email", "msg"].forEach(clearError);
  errorSummary.hidden = true;
  errorSummary.innerHTML = "";
  successMsg.hidden = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg").value.trim();

  const errors = [];

  if (!name) {
    errors.push("El nombre es obligatorio.");
    setError("name", "Introduce tu nombre.");
  }

  if (!email) {
    errors.push("El email es obligatorio.");
    setError("email", "Introduce tu email.");
  } else if (!isValidEmail(email)) {
    errors.push("El email no tiene un formato válido.");
    setError("email", "Ejemplo válido: nombre@correo.com");
  }

  if (!msg) {
    errors.push("El mensaje es obligatorio.");
    setError("msg", "Escribe un mensaje.");
  }

  if (errors.length) {
    // Resumen de errores (role=alert ya está en HTML)
    errorSummary.hidden = false;
    errorSummary.innerHTML =
      `<strong>No se pudo enviar.</strong><ul>${errors.map(e => `<li>${e}</li>`).join("")}</ul>`;

    // Llevar foco al resumen
    errorSummary.setAttribute("tabindex", "-1");
    errorSummary.focus();
    return;
  }

  // Simula envío OK
  successMsg.hidden = false;
  form.reset();
});
