// Seleciona o botão do menu e o menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Adiciona um evento de clique ao botão
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active'); // Alterna a classe 'active' no menu
});


// Inicialização do Swiper
const swiper = new Swiper('.mySwiper', {
    loop: true, // Loop infinito
    centeredSlides: true, // Centraliza o slide ativo
    slidesPerView: 'auto', // Ajusta o número de slides visíveis automaticamente
    spaceBetween: 20, // Espaço entre os slides
    autoplay: {
        delay: 3000, // Troca de slide a cada 3 segundos
        disableOnInteraction: false, // Continua o autoplay após interação
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Permite clicar nos pontos para navegar
    },
});