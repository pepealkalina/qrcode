/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Encontrar los elementos del HTML
    const form = document.getElementById('qr-form');
    const urlInput = document.getElementById('url-input');
    const qrContainer = document.getElementById('qr-container');
    const downloadButton = document.getElementById('download-button');

    let qrcodeInstance = null; // Para guardar la instancia del QR

    // 2. Escuchar el evento 'submit' del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que la página se recargue

        const url = urlInput.value.trim(); // .trim() quita espacios al inicio/final
        
        if (!url) {
            alert('Por favor, introduce una URL para generar el QR.');
            return;
        }

        // 3. Limpiar el QR anterior y ocultar el botón de descarga
        qrContainer.innerHTML = '';
        qrContainer.classList.remove('show'); // Esconde el contenedor con la animación
        downloadButton.style.display = 'none';

        // Destruye la instancia anterior si existe
        if (qrcodeInstance) {
            qrcodeInstance.clear(); // Limpia el QR
        }

        // 4. Crear una nueva instancia de QR
        // 'QRCode' genera un <canvas> o <img> dentro de 'qrContainer'
        qrcodeInstance = new QRCode(qrContainer, {
            text: url,
            width: 250,
            height: 250,
            colorDark : "#4A4A4A", 
            colorLight : "#FFFFFF", 
            correctLevel : QRCode.CorrectLevel.M 
        });

        // Dar un pequeño delay para que la animación de "mostrar" se vea bien
        setTimeout(() => {
            qrContainer.classList.add('show'); // Muestra el contenedor
            downloadButton.style.display = 'inline-flex'; // Muestra el botón de descarga
        }, 100); 
    });

    // 5. Función para descargar el QR
    downloadButton.addEventListener('click', () => {
        if (!qrcodeInstance) {
            return; // No hay QR para descargar
        }

        // La librería QRCode genera el QR en un elemento canvas
        const canvas = qrContainer.querySelector('canvas');
        if (canvas) {
            // Convierte el contenido del canvas a una imagen PNG (data URL)
            const imageData = canvas.toDataURL("image/png");
            
            // Crea un enlace temporal
            const link = document.createElement('a');
            link.href = imageData;
            link.download = 'qrcode.png'; // Nombre del archivo al descargar
            
            // Simula un clic en el enlace para iniciar la descarga
            document.body.appendChild(link); // Añadir al DOM es necesario para Firefox
            link.click();
            document.body.removeChild(link); // Quitar el enlace temporal
        } else {
            alert('No se pudo encontrar el QR para descargar.');
        }
    });
});