function getExerciseSheet(objetivo, nivel) {
  const exercicios = {
    "Emagrecimento": {
      "Iniciante": {
        title: "Treino para Iniciantes - Emagrecimento",
        exercises: [
          { name: "Caminhada rápida", sets: "30-45 minutos" },
          { name: "Agachamento livre", sets: "3x12-15" },
          { name: "Flexão de braço (na parede ou joelhos)", sets: "3x8-10" },
          { name: "Prancha abdominal", sets: "3x20-30 segundos" },
          { name: "Elevação de pernas", sets: "3x12-15" }
        ],
        rest: "30-45 segundos entre séries",
        notes: "Focar em manter a forma correta dos exercícios. Aumentar gradualmente a intensidade."
      },
      "Intermediario": {
        title: "Treino Intermediário - Emagrecimento",
        exercises: [
          { name: "Corrida intervalada", sets: "20-30 minutos" },
          { name: "Agachamento com salto", sets: "4x12" },
          { name: "Flexão de braço tradicional", sets: "4x10-12" },
          { name: "Burpee", sets: "3x10" },
          { name: "Prancha com elevação de perna", sets: "3x30 segundos" }
        ],
        rest: "20-30 segundos entre séries",
        notes: "Manter alta intensidade. Combinar com dieta balanceada para melhores resultados."
      },
      "Avancado": {
        title: "Treino Avançado - Emagrecimento",
        exercises: [
          { name: "HIIT (20s trabalho/10s descanso)", sets: "8-10 rounds" },
          { name: "Agachamento com peso", sets: "4x12" },
          { name: "Flexão de braço com elevação", sets: "4x10" },
          { name: "Burpee com salto", sets: "4x12" },
          { name: "Prancha dinâmica", sets: "3x45 segundos" }
        ],
        rest: "15-20 segundos entre séries",
        notes: "Treino de alta intensidade. Manter hidratação adequada."
      }
    },
    "Hipertrofia": {
      "Iniciante": {
        title: "Treino para Iniciantes - Hipertrofia",
        exercises: [
          { name: "Agachamento livre", sets: "4x10-12" },
          { name: "Supino com halteres", sets: "3x8-10" },
          { name: "Remada curvada", sets: "3x10" },
          { name: "Elevação de panturrilha", sets: "3x12-15" },
          { name: "Abdominal supra", sets: "3x12-15" }
        ],
        rest: "60-90 segundos entre séries",
        notes: "Focar em técnica perfeita antes de aumentar pesos."
      },
      "Intermediario": {
        title: "Treino Intermediário - Hipertrofia",
        exercises: [
          { name: "Agachamento com barra", sets: "4x8-10" },
          { name: "Supino com barra", sets: "4x8" },
          { name: "Barra fixa", sets: "3x6-8" },
          { name: "Desenvolvimento militar", sets: "3x8" },
          { name: "Rosca direta", sets: "3x10" }
        ],
        rest: "60 segundos entre séries",
        notes: "Progressão de carga é essencial para ganhos."
      },
      "Avancado": {
        title: "Treino Avançado - Hipertrofia",
        exercises: [
          { name: "Agachamento pesado", sets: "5x5" },
          { name: "Supino pesado", sets: "5x5" },
          { name: "Terra", sets: "3x5" },
          { name: "Barra fixa com peso", sets: "4x6" },
          { name: "Rosca martelo", sets: "4x8" }
        ],
        rest: "2-3 minutos entre séries pesadas",
        notes: "Periodização é crucial para evitar platôs."
      }
    }
  };

  return exercicios[objetivo][nivel];
}