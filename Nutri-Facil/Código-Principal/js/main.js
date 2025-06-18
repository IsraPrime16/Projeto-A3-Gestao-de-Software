document.addEventListener('DOMContentLoaded', function() {
  // Rotação de imagens de fundo
  const images = document.querySelectorAll('.background-image');
  let current = 0;
  // Mostrar a primeira imagem com mais opacidade
  images[current].style.opacity = '0.3';
  function cycleImages() {
    images[current].style.transition = 'opacity 1.5s ease-in-out';
    images[current].style.opacity = '0';

    current = (current + 1) % images.length;

    images[current].style.transition = 'opacity 1.5s ease-in-out';
    images[current].style.opacity = '0.3';
  }
  
  setInterval(cycleImages, 5000);
});
// Lógica para os planos premium
  document.querySelectorAll('.subscribe-btn').forEach(button => {
    button.addEventListener('click', function() {
      const plan = this.getAttribute('data-plan');
      let planName, planPrice, planFeatures;
      
      switch(plan) {
        case 'basic':
          planName = "Básico";
          planPrice = "R$ 15/mês";
          planFeatures = [
            "Receitas personalizadas ilimitadas",
            "Plano de treino básico",
            "Acompanhamento de progresso",
            "Suporte por email"
          ];
          break;
        case 'advanced':
          planName = "Avançado";
          planPrice = "R$ 25/mês";
          planFeatures = [
            "Todos os benefícios do Básico",
            "Plano de treino personalizado",
            "Acesso a nutricionistas",
            "Suporte prioritário"
          ];
          break;
        case 'family':
          planName = "Família";
          planPrice = "R$ 30/mês";
          planFeatures = [
            "Todos os benefícios do Avançado",
            "Até 5 perfis familiares",
            "Planos de refeições familiares",
            "Descontos em parceiros"
          ];
          break;
      }
      
      document.getElementById('plan-summary').innerHTML = `
        <h4>${planName}</h4>
        <h2 class="text-primary">${planPrice}</h2>
        <ul class="list-unstyled">
          ${planFeatures.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
        </ul>
      `;
      
      const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
      modal.show();
    });
  });

// Frases motivacionais para o rodapé
const motivationalQuotes = [
  {
    text: "Sua saúde é um investimento, não uma despesa.",
    author: ""
  },
  {
    text: "O progresso acontece fora da zona de conforto.",
    author: "Michael John Bobak"
  },
  {
    text: "Você é mais forte do que pensa.",
    author: ""
  },
  {
    text: "A persistência é o caminho do êxito.",
    author: "Charles Chaplin"
  },
  {
    text: "Hoje é o dia para começar uma vida melhor.",
    author: ""
  },
  {
    text: "O corpo alcança o que a mente acredita.",
    author: ""
  },
  {
    text: "Pequenos progressos ainda são progressos.",
    author: ""
  },
  {
    text: "A disciplina é a ponte entre metas e realizações.",
    author: "Jim Rohn"
  }
];

// Variável para controlar o índice atual
let currentQuoteIndex = 0;

// Função para alternar as frases
function rotateMotivationalQuotes() {
  const quoteElement = document.getElementById('motivational-quote');
  
  // Adiciona classe de fade out
  quoteElement.classList.add('quote-fade');
  
  setTimeout(() => {
    // Muda para a próxima frase (e volta ao início após a última)
    currentQuoteIndex = (currentQuoteIndex + 1) % motivationalQuotes.length;
    const nextQuote = motivationalQuotes[currentQuoteIndex];
    
    // Atualiza o conteúdo
    quoteElement.innerHTML = `"${nextQuote.text}"` + 
      (nextQuote.author ? `<span class="quote-author">- ${nextQuote.author}</span>` : '');
    
    // Remove classe de fade out para animar a entrada
    quoteElement.classList.remove('quote-fade');
  }, 500); // Tempo igual à duração da transição
}

// Inicia a rotação
rotateMotivationalQuotes(); // Mostra a primeira frase imediatamente

// Rotaciona as frases a cada 8 segundos
const quoteInterval = setInterval(rotateMotivationalQuotes, 8000);

// Opcional: Pausa a animação quando o mouse está sobre o rodapé
document.querySelector('.motivational-footer').addEventListener('mouseenter', () => {
  clearInterval(quoteInterval);
});

document.querySelector('.motivational-footer').addEventListener('mouseleave', () => {
  quoteInterval = setInterval(rotateMotivationalQuotes, 8000);
});