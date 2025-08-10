// Inicializar EmailJS con tu Public Key
(function () {
  emailjs.init("3NXeGZwmm81j1vc0t");
})();

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
  mensaje.style.display = "block";
  
  // Ocultar el mensaje después de 5 segundos
  setTimeout(() => {
    mensaje.style.display = "none";
  }, 5000);
}

// Función para validar formato básico de email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Manejar el evento de envío del formulario
document
  .getElementById("form-suscripcion")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const emailUsuario = document.getElementById("correo").value.trim();
    const btnSuscribir = document.getElementById("btn-suscribir");

    // Validación básica del email
    if (!emailUsuario) {
      mostrarMensaje("Por favor ingresa un correo válido.", "error");
      return;
    }
    
    if (!validateEmail(emailUsuario)) {
      mostrarMensaje("Formato de correo inválido. Ejemplo válido: usuario@dominio.com", "error");
      return;
    }

    // Deshabilitar botón mientras se envía
    btnSuscribir.disabled = true;
    btnSuscribir.textContent = "Enviando...";

    // Enviar correo usando EmailJS
    emailjs
      .send("service_4khtq3u", "template_34gxftq", {
        to_email: emailUsuario,
        user_email: emailUsuario // Agregamos también este parámetro por si lo necesitas en tu template
      })
      .then(
        function (response) {
          console.log("Correo enviado exitosamente:", response);
          mostrarMensaje("¡Correo de bienvenida enviado con éxito! Revisa tu bandeja de entrada.", "exito");
          document.getElementById("form-suscripcion").reset();
        },
        function (error) {
          console.error("Error al enviar el correo:", error);

          let mensajeError = "Error al enviar el correo. ";
          
          if (error.status === 0) {
            mensajeError += "Revisa tu conexión a internet.";
          } else if (error.status === 400) {
            mensajeError += "Verifica la configuración del servicio.";
          } else if (error.status === 403) {
            mensajeError += "Error de autorización. Revisa la configuración de EmailJS.";
          } else {
            mensajeError += "Inténtalo de nuevo más tarde.";
          }
          
          mostrarMensaje(mensajeError, "error");
        }
      )
      .finally(function() {
        // Rehabilitar botón
        btnSuscribir.disabled = false;
        btnSuscribir.textContent = "Suscribirme";
      });
  });
