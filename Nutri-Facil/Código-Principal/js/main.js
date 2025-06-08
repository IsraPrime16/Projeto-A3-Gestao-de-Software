// Inicialização e efeitos visuais
document.addEventListener('DOMContentLoaded', function() {
  // Rotação de imagens de fundo
  const backgroundImages = document.querySelectorAll('.background-image');
  let currentImage = 0;

  function changeBackground() {
    backgroundImages[currentImage].style.opacity = 0;
    currentImage = (currentImage + 1) % backgroundImages.length;
    backgroundImages[currentImage].style.opacity = 1;
    setTimeout(changeBackground, 8000);
  }

  // Mostrar primeira imagem e iniciar rotação
  backgroundImages[0].style.opacity = 1;
  setTimeout(changeBackground, 8000);

  // Citações motivacionais
  const motivationalQuotes = [
    "Sua saúde é um investimento, não uma despesa.",
    "O progresso começa com uma única decisão.",
    "Alimente seu corpo como faria com algo precioso.",
    "Pequenas mudanças hoje, grandes resultados amanhã.",
    "Seu corpo reflete seus hábitos.",
    "Disciplina é a ponte entre metas e realizações.",
    "A consistência é o segredo do sucesso.",
    "Cuide do seu corpo. É o único lugar que você tem para viver."
  ];

  const quoteElement = document.querySelector('.motivational-quote');

  function changeMotivationalQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    quoteElement.textContent = motivationalQuotes[randomIndex];
    setTimeout(changeMotivationalQuote, 10000);
  }

  changeMotivationalQuote();

  // Inicializar tooltips do Bootstrap
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});