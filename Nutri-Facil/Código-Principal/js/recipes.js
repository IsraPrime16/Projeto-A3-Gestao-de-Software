// Gerar receitas baseadas em dieta, preferências e alergias
function gerarReceita(dieta, preferencias, alergia) {
  // Ingredientes a evitar baseados em alergias
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

  // Bases de receitas por tipo de dieta
  const basesReceitas = {
    "Mediterrânea": [
      "Salada com azeite de oliva, %INGREDIENTES% e quinoa.",
      "Peixe grelhado com %INGREDIENTES% e legumes assados.",
      "Frango com %INGREDIENTES% e arroz integral."
    ],
    "Low Carb": [
      "Omelete com %INGREDIENTES% e abacate.",
      "Salada de %INGREDIENTES% com molho de azeite.",
      "Carne moída com %INGREDIENTES% e purê de couve-flor."
    ],
    "Cetogênica": [
      "Carne com %INGREDIENTES% na manteiga.",
      "Ovos mexidos com %INGREDIENTES% e abacate.",
      "Salmão com %INGREDIENTES% e vegetais salteados na manteiga."
    ],
    "Vegetariana": [
      "Grão-de-bico com %INGREDIENTES%.",
      "Salada de quinoa com %INGREDIENTES%.",
      "Lentilha com %INGREDIENTES% e arroz integral."
    ]
  };

  // Se não houver ingredientes permitidos, usar uma lista padrão
  if (ingredientesPermitidos.length === 0) {
    ingredientesPermitidos = ["vegetais variados", "proteína magra"];
  }

  // Selecionar 2-3 ingredientes aleatórios para a receita
  const ingredientesSelecionados = [];
  const maxIngredientes = Math.min(3, ingredientesPermitidos.length);
  const numIngredientes = Math.max(2, maxIngredientes);
  
  // Garantir que não repitamos ingredientes
  const copiaIngredientes = [...ingredientesPermitidos];
  for (let i = 0; i < numIngredientes && copiaIngredientes.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * copiaIngredientes.length);
    ingredientesSelecionados.push(copiaIngredientes[randomIndex]);
    copiaIngredientes.splice(randomIndex, 1);
  }

  // Selecionar uma base de receita aleatória para a dieta
  const basesDieta = basesReceitas[dieta];
  const baseIndex = Math.floor(Math.random() * basesDieta.length);
  let receita = basesDieta[baseIndex];
  
  // Substituir placeholders pelos ingredientes
  receita = receita.replace('%INGREDIENTES%', ingredientesSelecionados.join(', '));
  
  // Adicionar nota de alergia se necessário
  if (alergia !== "Nenhuma") {
    receita += ` (Receita sem ${alergia.toLowerCase()})`;
  }

  return receita;
}