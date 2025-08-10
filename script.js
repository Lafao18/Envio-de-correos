// Inicializar EmailJS con tu Public Key (nueva sintaxis)
(function () {
  emailjs.init({
    publicKey: "3NXeGZwmm81j1vc0t"
  });
  console.log("✅ EmailJS inicializado correctamente con nueva versión");
})();

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
  mensaje.style.display = "block";
  
  // Ocultar el mensaje después de 6 segundos
  setTimeout(() => {
    mensaje.style.display = "none";
  }, 6000);
}

// Función para validar formato de email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Función principal para enviar email
function enviarEmail(emailUsuario) {
  // Parámetros más simples para evitar problemas
  const templateParams = {
    to_email: emailUsuario
  };
  
  console.log("🚀 Enviando email...");
  console.log("📧 Email destinatario:", emailUsuario);
  console.log("🔧 Service ID: service_4khtq3u");
  console.log("📄 Template ID: template_34gxftq");
  console.log("📋 Parámetros:", templateParams);
  console.log("🔑 Public Key configurada: 3NXeGZwmm81j1vc0t");

      // Enviar email con método alternativo más confiable
    emailjs.sendForm("service_4khtq3u", "template_34gxftq", {
      to_email: emailUsuario,
      from_name: "Mi Página de Noticias"
    })
}

// Manejar el evento de envío del formulario
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-suscripcion");
  const inputCorreo = document.getElementById("correo");
  const btnSuscribir = document.getElementById("btn-suscribir");

  if (!form || !inputCorreo || !btnSuscribir) {
    console.error("❌ Error: No se encontraron todos los elementos del formulario");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailUsuario = inputCorreo.value.trim().toLowerCase();

    // Validaciones
    if (!emailUsuario) {
      mostrarMensaje("⚠️ Por favor ingresa tu correo electrónico", "error");
      inputCorreo.focus();
      return;
    }
    
    if (!validateEmail(emailUsuario)) {
      mostrarMensaje("❌ Por favor ingresa un correo válido (ejemplo: usuario@gmail.com)", "error");
      inputCorreo.focus();
      return;
    }

    // Cambiar estado del botón
    btnSuscribir.disabled = true;
    btnSuscribir.textContent = "Enviando...";

    // Enviar email
    console.log("🔄 Intentando envío con método directo...");
    
    emailjs.send("service_4khtq3u", "template_34gxftq", {
      to_email: emailUsuario,
      from_name: "Mi Página de Noticias"
    })
      .then(function (response) {
        console.log("✅ Email enviado exitosamente:", response);
        console.log("📊 Status:", response.status);
        console.log("📝 Text:", response.text);
        
        mostrarMensaje("🎉 ¡Perfecto! Te hemos enviado un correo de bienvenida. Revisa tu bandeja de entrada.", "exito");
        form.reset();
        
        // Opcional: Guardar en localStorage que el usuario se suscribió
        localStorage.setItem('suscrito', 'true');
        localStorage.setItem('emailSuscrito', emailUsuario);
      })
      .catch(function (error) {
        console.error("❌ ERROR COMPLETO:", error);
        console.error("📊 Status del error:", error.status);
        console.error("📝 Mensaje del error:", error.text);
        console.error("🔍 Tipo de error:", typeof error);
        console.error("🗂️ Todas las propiedades del error:", Object.keys(error));
        
        // Mostrar TODOS los detalles del error
        console.log("=== DEBUGGING COMPLETO ===");
        console.log("Error object:", JSON.stringify(error, null, 2));
        
        let mensajeError = "❌ Error al enviar el correo. ";
        let detalleError = "";
        
        if (error.status) {
          switch(error.status) {
            case 0:
              mensajeError += "Problema de conexión a internet.";
              detalleError = "No se pudo conectar con los servidores de EmailJS";
              break;
            case 400:
              mensajeError += "Error en la configuración del service o template.";
              detalleError = "Verifica que el Service ID y Template ID sean correctos";
              break;
            case 403:
              mensajeError += "Error de autorización.";
              detalleError = "Verifica tu Public Key o que el service esté conectado";
              break;
            case 422:
              mensajeError += "Datos enviados inválidos.";
              detalleError = "Verifica el formato del email o los parámetros del template";
              break;
            default:
              mensajeError += `Error ${error.status}: ${error.text || 'Error desconocido'}`;
              detalleError = "Error no identificado";
          }
        } else {
          mensajeError += "Error de red o configuración.";
          detalleError = "Posible problema de CORS o conectividad";
        }
        
        console.error("💡 Detalle del error:", detalleError);
        mostrarMensaje(mensajeError, "error");
        
        // Mostrar alert con más detalles para debugging
        alert(`DEBUG INFO:\nStatus: ${error.status || 'undefined'}\nMessage: ${error.text || error.message || 'No message'}\nType: ${typeof error}\n\nRevisa la consola (F12) para más detalles.`);
      })
      .finally(function() {
        // Restaurar estado del botón
        btnSuscribir.disabled = false;
        btnSuscribir.textContent = "Suscribirme";
      });
  });

  // Validación en tiempo real
  inputCorreo.addEventListener("input", function() {
    const email = this.value.trim();
    
    if (email && validateEmail(email)) {
      this.style.borderColor = "#28a745";
    } else if (email) {
      this.style.borderColor = "#dc3545";
    } else {
      this.style.borderColor = "#e1e5e9";
    }
  });

  console.log("📱 Formulario de suscripción cargado correctamente");
});
