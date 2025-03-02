
// Seleciona o botão do menu e o menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Adiciona um evento de clique ao botão
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active'); // Alterna a classe 'active' no menu
});

// Animação X no icone do menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('ativo'); // Adiciona ou remove a classe "ativo"
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


// Função debounce para melhorar a performance
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Detecta a cor do fundo e muda a cor da barra lateral
function detectBackgroundColor() {
    const socialBar = document.getElementById("socialBar");
    const rect = socialBar.getBoundingClientRect();

    // Verifica apenas o ponto central da barra lateral
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const elementAtCenter = document.elementFromPoint(centerX, centerY);
    if (!elementAtCenter) return;

    const backgroundColor = window.getComputedStyle(elementAtCenter).backgroundColor;

    // Verifica se o fundo é preto (ou próximo de preto)
    if (backgroundColor === "rgb(0, 0, 0)" || backgroundColor === "#000000") {
        socialBar.style.background = "white"; // Troca a cor de fundo da barra lateral
        socialBar.style.color = "black"; // Troca a cor do texto
    } else {
        socialBar.style.background = "rgba(255, 255, 255, 0.8)"; // Restaura a cor original
        socialBar.style.color = ""; // Restaura a cor original do texto
    }
}

// Adiciona o evento de scroll
document.addEventListener(
    "scroll",
    debounce(() => {
        const socialBar = document.getElementById("socialBar");

        if (window.scrollY > 100) {
            socialBar.classList.add("visible");
            detectBackgroundColor();
        } else {
            socialBar.classList.remove("visible");
        }
    }, 100)
);

// Adiciona o evento de resize
window.addEventListener("resize", debounce(detectBackgroundColor, 100));


// Filtro de Categorias
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                item.classList.add('fade-in'); // Adiciona animação de fade-in
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    });
});

// Animação de fade-in
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('transitionend', () => {
        if (item.classList.contains('fade-in')) {
            item.style.opacity = '1';
        }
    });
});


// Virada dos cards
const cards = document.querySelectorAll('.servico-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});



// Adicionando um efeito de carregamento suave ao mapa
window.addEventListener('load', () => {
    const mapContainer = document.querySelector('.map-container iframe');
    mapContainer.style.opacity = '1';
    mapContainer.style.transition = 'opacity 1s ease';
});


// Efeito de digitação no título
const text = "Transforme seu Olhar";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typing-effect").textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100); // Velocidade da digitação
    }
}

typeEffect();


// Barra Vertical RedesSociais
const socialMenu = document.querySelector(".social-menu");
const socialToggle = document.querySelector(".social-toggle");

socialToggle.addEventListener("click", () => {
    socialMenu.classList.toggle("active");
});



// FORMULÁRIO DE AGENDAMEWNTOS ONLINE

document.getElementById('form-agendamento').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o reload da página

    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const duracao = parseInt(document.getElementById('duracao').value); // em minutos
    const titulo = document.getElementById('titulo').value;

    if (!data || !hora || !titulo || duracao <= 0) {
        document.getElementById('mensagem').innerText = "Preencha todos os campos corretamente!";
        return;
    }

    // Formata a data/hora para o Google Calendar (ISO 8601)
    const dataHoraInicio = new Date(`${data}T${hora}:00`);
    const dataHoraFim = new Date(dataHoraInicio.getTime() + duracao * 60000);

    // Enviando dados para o servidor Node.js
    const response = await fetch('http://3.86.192.199:3000/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            summary: titulo,
            start: { dateTime: dataHoraInicio.toISOString(), timeZone: 'America/Sao_Paulo' },
            end: { dateTime: dataHoraFim.toISOString(), timeZone: 'America/Sao_Paulo' }
        })
    });

    const resultado = await response.json();

    if (response.ok) {
        document.getElementById('mensagem').innerText = "✅ Evento agendado com sucesso!";
    } else {
        document.getElementById('mensagem').innerText = "❌ Erro ao agendar evento.";
    }
});
