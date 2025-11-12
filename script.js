/* script.js */

// Espera a que todo el HTML esté cargado antes de ejecutar nada
document.addEventListener('DOMContentLoaded', () => {

    // 1. Encontrar los elementos del HTML
    const form = document.getElementById('qr-form');
    const input = document.getElementById('url-input');
    const qrContainer = document.getElementById('qr-container');

    // 2. Escuchar el evento 'submit' del formulario
    form.addEventListener('submit', (event) => {
        
        // ¡Importante! Evita que la página se recargue
        event.preventDefault();

        const url = input.value;
        
        // Si no hay URL, no hagas nada
        if (!url) {
            return;
        }

        // 3. Limpiar el QR anterior (si hay uno)
        // Esto es clave para que no se acumulen
        qrContainer.innerHTML = '';

        // 4. ¡Magia! Usar la librería para crear el QR
        // 'QRCode' es una función que nos da el script
        // que importamos en el HTML (qrcode.min.js)
        new QRCode(qrContainer, {
            text: url,
            width: 250,
            height: 250,
            colorDark : "#4A4A4A", // El color del texto
            colorLight : "#FFFFFF", // El fondo (blanco)
            correctLevel : QRCode.CorrectLevel.M // Nivel de corrección (como en Rust)
        });

        // 5. Pequeño efecto "cozy" para mostrarlo
        qrContainer.style.opacity = '1';
        qrContainer.style.transform = 'scale(1)';
    });
});