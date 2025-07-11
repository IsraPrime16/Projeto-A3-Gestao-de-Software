document.getElementById("diet-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Obter dados do formulário
  const formData = {
    peso: parseFloat(document.getElementById("peso").value),
    altura: parseFloat(document.getElementById("altura").value),
    idade: parseInt(document.getElementById("idade").value),
    sexo: document.getElementById("sexo").value,
    dieta: document.getElementById("dieta").value,
    objetivo: document.getElementById("objetivo").value,
    nivel: document.getElementById("nivel").value,
    proteinas: document.getElementById("proteinas").value.split(',').map(item => item.trim()),
    legumes: document.getElementById("legumes").value.split(',').map(item => item.trim()),
    verduras: document.getElementById("verduras").value.split(',').map(item => item.trim()),
    carboidratos: document.getElementById("carboidratos").value.split(',').map(item => item.trim()),
    alergia: document.getElementById("alergias").value
  };

  // Validar dados
  if (!validateFormData(formData)) {
    return;
  }

  // Calcular resultados
  const results = calculateResults(formData);
  
  // Gerar receita
  const receita = gerarReceita(formData.dieta, {
    proteinas: formData.proteinas,
    legumes: formData.legumes,
    verduras: formData.verduras,
    carboidratos: formData.carboidratos
  }, formData.alergia);
  
  // Obter ficha de exercícios
  const exerciseSheet = getExerciseSheet(formData.objetivo, formData.nivel);
  
  // Exibir resultados
  displayResults(formData, results, receita, exerciseSheet);
});

function validateFormData(data) {
  if (isNaN(data.peso) || data.peso < 30 || data.peso > 300) {
    alert("Por favor, insira um peso válido (entre 30kg e 300kg)");
    return false;
  }
  
  if (isNaN(data.altura) || data.altura < 100 || data.altura > 250) {
    alert("Por favor, insira uma altura válida (entre 100cm e 250cm)");
    return false;
  }
  
  if (isNaN(data.idade) || data.idade < 12 || data.idade > 120) {
    alert("Por favor, insira uma idade válida (entre 12 e 120 anos)");
    return false;
  }
  
  return true;
}

function calculateResults(data) {
  // Calcular TMB (Taxa Metabólica Basal)
  let tmb = 0;
  if (data.sexo === "Masculino") {
    tmb = 10 * data.peso + 6.25 * data.altura - 5 * data.idade + 5;
  } else {
    tmb = 10 * data.peso + 6.25 * data.altura - 5 * data.idade - 161;
  }

  // Calcular IMC
  const imc = data.peso / ((data.altura / 100) ** 2);
  let classificacao = "";
  if (imc < 18.5) classificacao = "Abaixo do peso";
  else if (imc < 25) classificacao = "Peso normal";
  else if (imc < 30) classificacao = "Sobrepeso";
  else classificacao = "Obesidade";

  // Calcular ingestão de água recomendada
  const agua = data.peso * 35;

  return {
    tmb: tmb.toFixed(2),
    imc: imc.toFixed(2),
    classificacao,
    agua
  };
}

function displayResults(formData, results, receita, exerciseSheet) {
  document.getElementById("resultado").innerHTML = `
    <div class="card fade-in">
      <div class="card-body">
        <h3 class="card-title">Resultados Personalizados</h3>
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-header bg-info text-white">
                <strong><i class="fas fa-chart-line me-2"></i>Dados Metabólicos</strong>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <strong>TMB (Taxa Metabólica Basal):</strong> 
                    <span class="badge bg-primary float-end">${results.tmb} kcal/dia</span>
                  </li>
                  <li class="list-group-item">
                    <strong>IMC:</strong> 
                    <span class="badge bg-${getImcBadgeClass(results.imc)} float-end">${results.imc} (${results.classificacao})</span>
                  </li>
                  <li class="list-group-item">
                    <strong>Água recomendada:</strong> 
                    <span class="badge bg-primary float-end">${results.agua} ml/dia</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-header bg-info text-white">
                <strong><i class="fas fa-utensils me-2"></i>Plano Alimentar</strong>
              </div>
              <div class="card-body">
                <h5>Receita (${formData.dieta}):</h5>
                <div class="alert alert-success">
                  <i class="fas fa-lightbulb me-2"></i>${receita}
                </div>
              <div class="mt-3">
                <h6><i class="fas fa-heart me-2"></i>Preferências Alimentares:</h6>
                <div class="row small">
                  <div class="col-md-3">
                    <strong>Proteínas:</strong><br>
                    ${formData.proteinas.join(', ') || 'Nenhuma especificada'}
                  </div>
                  <div class="col-md-3">
                    <strong>Legumes:</strong><br>
                    ${formData.legumes.join(', ') || 'Nenhuma especificada'}
                  </div>
                  <div class="col-md-3">
                    <strong>Verduras:</strong><br>
                    ${formData.verduras.join(', ') || 'Nenhuma especificada'}
                  </div>
                  <div class="col-md-3">
                    <strong>Carboidratos:</strong><br>
                    ${formData.carboidratos.join(', ') || 'Nenhuma especificada'}
                  </div>
                </div>
              </div>
                ${formData.alergia !== "Nenhuma" ? `
                  <p class="text-muted small">
                    <i class="fas fa-exclamation-triangle me-2"></i>Restrição: ${formData.alergia}
                  </p>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header bg-primary text-white">
            <strong><i class="fas fa-dumbbell me-2"></i>Plano de Treino (${formData.objetivo} - ${formData.nivel})</strong>
          </div>
          <div class="card-body">
            <h4>${exerciseSheet.title}</h4>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Exercício</th>
                    <th>Séries x Reps</th>
                  </tr>
                </thead>
                <tbody>
                  ${exerciseSheet.exercises.map(ex => `
                    <tr>
                      <td>${ex.name}</td>
                      <td>${ex.sets}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="mt-3">
              <p><strong><i class="fas fa-clock me-2"></i>Descanso:</strong> ${exerciseSheet.rest}</p>
              ${exerciseSheet.notes ? `<p><strong><i class="fas fa-info-circle me-2"></i>Observações:</strong> ${exerciseSheet.notes}</p>` : ''}
            </div>
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <button class="btn btn-success me-2" onclick="window.print()">
            <i class="fas fa-print me-2"></i>Imprimir Plano
          </button>
        </div>
      </div>
    </div>
  `;
}

function getImcBadgeClass(imc) {
  const value = parseFloat(imc);
  if (value < 18.5) return 'warning';
  if (value < 25) return 'success';
  if (value < 30) return 'warning';
  return 'danger';
}