// Inicializar EmailJS con tu Public Key
(function () {
  emailjs.init("3NXeGZwmm81j1vc0t"); // Usa tu Public Key aquí
})();

// Manejar el evento de envío del formulario
document
  .getElementById("form-suscripcion")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const emailUsuario = document.getElementById("correo").value.trim();

    // Validación básica del email
    if (!emailUsuario) {
      alert("❌ Por favor ingresa un correo válido.");
      return;
    }
    if (!validateEmail(emailUsuario)) {
      alert("❌ Formato de correo inválido. Ejemplo válido: usuario@dominio.com");
      return;
    }

    // Enviar correo usando EmailJS
    emailjs
      .send("service_4khtq3u", "template_34gxftq", {
        to_email: emailUsuario,
      })
      .then(
        function (response) {
          alert("✅ ¡Correo de bienvenida enviado con éxito!");
          document.getElementById("form-suscripcion").reset();
        },
        function (error) {
          console.error("Error al enviar el correo:", error);

          if (error.status === 0) {
            alert(
              "❌ No se pudo conectar con EmailJS. Revisa tu conexión a internet."
            );
          } else if (error.status === 400) {
            alert(
              "❌ Solicitud inválida. Verifica que el Service ID y Template ID sean correctos."
            );
          } else if (error.status === 403) {
            alert(
              "❌ Error de autorización. Revisa tu Public Key (User ID) en EmailJS."
            );
          } else {
            alert(
              "❌ Error desconocido al enviar el correo. Consulta la consola para más detalles."
            );
          }
        }
      );
  });

// Función para validar formato básico de email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
