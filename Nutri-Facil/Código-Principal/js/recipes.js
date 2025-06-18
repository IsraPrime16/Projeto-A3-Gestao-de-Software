function gerarReceita(dieta, preferencias, alergia) {
  // Combinar todos os ingredientes permitidos
  let todosIngredientes = [
    ...preferencias.proteinas,
    ...preferencias.legumes,
    ...preferencias.verduras,
    ...preferencias.carboidratos
  ].filter(item => item.trim() !== '');

  // Se não houver ingredientes, usar padrão
  if (todosIngredientes.length === 0) {
    todosIngredientes = ["vegetais variados", "proteína magra"];
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

  // Selecionar 2-3 ingredientes aleatórios
  const ingredientesSelecionados = [];
  const maxIngredientes = Math.min(3, todosIngredientes.length);
  const numIngredientes = Math.max(2, maxIngredientes);
  
  const copiaIngredientes = [...todosIngredientes];
  for (let i = 0; i < numIngredientes && copiaIngredientes.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * copiaIngredientes.length);
    ingredientesSelecionados.push(copiaIngredientes[randomIndex]);
    copiaIngredientes.splice(randomIndex, 1);
  }

  // Selecionar base de receita aleatória
  const basesDieta = basesReceitas[dieta];
  const baseIndex = Math.floor(Math.random() * basesDieta.length);
  let receita = basesDieta[baseIndex];
  
  // Substituir placeholders
  receita = receita.replace('%INGREDIENTES%', ingredientesSelecionados.join(', '));
  
  // Adicionar nota de alergia se necessário
  if (alergia !== "Nenhuma") {
    receita += ` (Receita sem ${alergia.toLowerCase()})`;
  }

  return receita;
}