// Rotação das imagens de fundo
const backgroundImages = document.querySelectorAll('.background-image');
let currentImage = 0;

function changeBackground() {
  // Esconder imagem atual
  backgroundImages[currentImage].style.opacity = 0;
  
  // Avançar para próxima imagem
  currentImage = (currentImage + 1) % backgroundImages.length;
  
  // Mostrar nova imagem
  backgroundImages[currentImage].style.opacity = 1;
  
  // Configurar próximo cambio
  setTimeout(changeBackground, 8000);
}

// Iniciar rotacão de fundos
setTimeout(changeBackground, 8000);

// Mostrar primera imagem
backgroundImages[0].style.opacity = 1;

// Frases motivacionales para el footer
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
  
  // Cambiar cada 10 segundos
  setTimeout(changeMotivationalQuote, 10000);
}

// Iniciar
changeMotivationalQuote();

// Função principal do formulário
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    // Obter valores do formulário
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const idade = parseInt(document.getElementById("idade").value);
    const sexo = document.getElementById("sexo").value;
    const dieta = document.getElementById("dieta").value;
    const preferencias = document.getElementById("preferencias").value.toLowerCase().split(',').map(item => item.trim());
    const alergia = document.getElementById("alergias").value;
  
    // Calcular TMB (Taxa Metabólica Basal)
    let tmb = 0;
    if (sexo === "Masculino") {
      tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;
    } else {
      tmb = 10 * peso + 6.25 * altura - 5 * idade - 161;
    }
  
    // Calcular IMC
    const imc = peso / ((altura / 100) ** 2);
    let classificacao = "";
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 25) classificacao = "Peso normal";
    else if (imc < 30) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";
  
    // Calcular consumo de água recomendado
    const agua = peso * 35;
  
    // Gerar receita baseada nas preferências e dieta
    function gerarReceita(dieta, preferencias, alergia) {
      // Lista de ingredientes a evitar baseado na alergia
      const ingredientesEvitar = {
        "Lactose": ["leite", "queijo", "manteiga", "creme de leite", "iogurte"],
        "Glúten": ["trigo", "cevada", "centeio", "pão", "massas", "farinha de trigo"],
        "Proteína do leite": ["leite", "queijo", "manteiga", "creme de leite", "iogurte"],
        "Ovo": ["ovo", "ovos", "clara", "gema"],
        "Frutos do mar": ["camarão", "peixe", "salmão", "atum", "ostra", "marisco"]
      };
  
      // Filtrar preferências removendo ingredientes problemáticos
      let ingredientesPermitidos = [...preferencias];
      if (alergia !== "Nenhuma" && ingredientesEvitar[alergia]) {
        ingredientesPermitidos = ingredientesPermitidos.filter(
          ingrediente => !ingredientesEvitar[alergia].includes(ingrediente)
        );
      }
  
      // Base de receitas por tipo de dieta
      const basesReceitas = {
        "Mediterrânea": "Salada com azeite de oliva, %INGREDIENTES% e quinoa.",
        "Low Carb": "Omelete com %INGREDIENTES% e abacate.",
        "Cetogênica": "Carne com %INGREDIENTES% na manteiga.",
        "Vegetariana": "Grão-de-bico com %INGREDIENTES%."
      };
  
      // Se não tiver ingredientes permitidos, usar uma lista padrão
      if (ingredientesPermitidos.length === 0) {
        ingredientesPermitidos = ["vegetais variados", "proteína magra"];
      }
  
      // Selecionar 2-3 ingredientes aleatórios para a receita
      const ingredientesSelecionados = [];
      const maxIngredientes = Math.min(3, ingredientesPermitidos.length);
      const numIngredientes = Math.max(2, maxIngredientes);
      
      // Garantir que não vamos repetir ingredientes
      const copiaIngredientes = [...ingredientesPermitidos];
      for (let i = 0; i < numIngredientes && copiaIngredientes.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * copiaIngredientes.length);
        ingredientesSelecionados.push(copiaIngredientes[randomIndex]);
        copiaIngredientes.splice(randomIndex, 1);
      }
  
      // Montar a receita
      let receita = basesReceitas[dieta];
      receita = receita.replace('%INGREDIENTES%', ingredientesSelecionados.join(', '));
      
      // Adicionar observação sobre alergia se necessário
      if (alergia !== "Nenhuma") {
        receita += ` (Receita sem ${alergia.toLowerCase()})`;
      }
  
      return receita;
    }
  
    const receita = gerarReceita(dieta, preferencias, alergia);
  
    // Exibir resultados
    document.getElementById("resultado").innerHTML = `
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Resultados:</h3>
          <ul class="list-group list-group-flush mb-3">
            <li class="list-group-item"><strong>TMB:</strong> ${tmb.toFixed(2)} kcal/dia</li>
            <li class="list-group-item"><strong>IMC:</strong> ${imc.toFixed(2)} (${classificacao})</li>
            <li class="list-group-item"><strong>Consumo de água recomendado:</strong> ${agua} ml/dia</li>
          </ul>
          <div class="card">
            <div class="card-header">
              <strong>Receita sugerida (${dieta}):</strong>
            </div>
            <div class="card-body">
              <p>${receita}</p>
              <p class="text-muted">Baseada em suas preferências: ${preferencias.join(', ')}</p>
              ${alergia !== "Nenhuma" ? `<p class="text-muted">Respeitando sua restrição: ${alergia}</p>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  });
