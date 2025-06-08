// Fichas de exercícios organizadas por objetivo e nível
const exerciseSheets = {
  emagrecimento: [
    {
      title: "Ficha 1 – Full Body HIIT (Iniciante)",
      exercises: [
        "Agachamento com peso corporal – 3x15",
        "Flexão de joelhos – 3x10",
        "Mountain climber – 3x30 seg",
        "Prancha – 3x20 seg"
      ],
      rest: "30-45 seg entre exercícios",
      notes: "Foco em aprender a técnica."
    },
    // ... (outras fichas de emagrecimento)
  ],
  hipertrofia: [
    {
      title: "Ficha 1 – Peito e tríceps (iniciante)",
      exercises: [
        "Supino reto – 4x10",
        "Supino inclinado – 4x10",
        "Crucifixo reto – 3x12",
        "Trícecs pulley – 3x12",
        "Tríceps francês – 3x10"
      ],
      rest: "1-1:30 min"
    },
    // ... (outras fichas de hipertrofia)
  ]
};

// Obter ficha de exercícios apropriada
function getExerciseSheet(goal, level) {
  const sheets = exerciseSheets[goal.toLowerCase()];
  
  // Filtrar fichas por nível
  let filteredSheets = sheets;
  
  if (level === "Iniciante") {
    filteredSheets = sheets.filter(sheet => 
      sheet.title.includes("Iniciante") || 
      (!sheet.title.includes("Intermediário") && !sheet.title.includes("Avançado"))
    );
  } 
  else if (level === "Intermediario") {
    filteredSheets = sheets.filter(sheet => 
      sheet.title.includes("Intermediário") || 
      sheet.title.includes("Intermediario") ||
      (!sheet.title.includes("Iniciante") && !sheet.title.includes("Avançado"))
    );
  } 
  else if (level === "Avancado") {
    filteredSheets = sheets.filter(sheet => 
      sheet.title.includes("Avançado") || 
      sheet.title.includes("Avancado") ||
      sheet.title.includes("Força") ||
      sheet.title.includes("HIIT avançado")
    );
  }
  
  // Se nenhuma ficha corresponder ao nível, retornar uma aleatória
  if (filteredSheets.length === 0) {
    const randomIndex = Math.floor(Math.random() * sheets.length);
    return sheets[randomIndex];
  }
  
  // Selecionar uma ficha aleatória das filtradas
  const randomIndex = Math.floor(Math.random() * filteredSheets.length);
  return filteredSheets[randomIndex];
}