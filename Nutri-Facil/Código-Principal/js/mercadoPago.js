// Configuração do Mercado Pago
document.addEventListener('DOMContentLoaded', function() {
  // Verifica se o MercadoPago está disponível no window
  if (!window.MercadoPago) {
    console.error('MercadoPago SDK não carregado!');
    return;
  }

  // Substitua com sua public key do Mercado Pago (use uma variável de ambiente em produção)
  const mp = new window.MercadoPago('TEST-d31d8c0f-7fa6-4fd3-8f60-f332c473246d', {
    locale: 'pt-BR'
  });

  // Planos e preços
  const plans = {
    basic: {
      id: 'basic',
      name: "Básico",
      price: 15,
      features: [
        "Receitas personalizadas ilimitadas",
        "Plano de treino básico",
        "Acompanhamento de progresso",
        "Suporte por email"
      ]
    },
    advanced: {
      id: 'advanced',
      name: "Avançado",
      price: 25,
      features: [
        "Todos os benefícios do Básico",
        "Plano de treino personalizado",
        "Acesso a nutricionistas",
        "Suporte prioritário"
      ]
    },
    family: {
      id: 'family',
      name: "Família",
      price: 30,
      features: [
        "Todos os benefícios do Avançado",
        "Até 5 perfis familiares",
        "Planos de refeições familiares",
        "Descontos em parceiros"
      ]
    }
  };

  // Inicializar botões de assinatura
  document.querySelectorAll('.subscribe-btn').forEach(button => {
    button.addEventListener('click', function() {
      const planId = this.getAttribute('data-plan');
      const plan = plans[planId];
      
      if (!plan) {
        console.error('Plano não encontrado:', planId);
        return;
      }
      
      // Atualizar resumo do plano no modal
      updatePlanSummary(planId, plan);
      
      // Inicializar formulário de pagamento
      initPaymentForm(mp, plan);
      
      // Mostrar modal
      showCheckoutModal();
    });
  });

  // Função para atualizar o resumo do plano
  function updatePlanSummary(planId, plan) {
    const planSummaryElement = document.getElementById('plan-summary');
    if (!planSummaryElement) {
      console.error('Elemento plan-summary não encontrado');
      return;
    }

    planSummaryElement.innerHTML = `
      <div class="card">
        <div class="card-header bg-${getPlanColor(planId)} text-white">
          <h5>Plano ${plan.name}</h5>
        </div>
        <div class="card-body">
          <h4 class="card-title">R$ ${plan.price.toFixed(2)}<small class="text-muted">/mês</small></h4>
          <ul class="list-unstyled">
            ${plan.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  // Função para mostrar o modal
  function showCheckoutModal() {
    const modalElement = document.getElementById('checkoutModal');
    if (!modalElement) {
      console.error('Modal checkoutModal não encontrado');
      return;
    }
    
    // Verifica se Bootstrap está disponível
    if (typeof bootstrap === 'undefined' || !bootstrap.Modal) {
      console.error('Bootstrap Modal não carregado!');
      return;
    }
    
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
});

// Função auxiliar para obter a cor do plano
function getPlanColor(planId) {
  const colors = {
    'basic': 'primary',
    'advanced': 'success',
    'family': 'dark'
  };
  return colors[planId] || 'primary';
}

// Função para inicializar o formulário de pagamento
function initPaymentForm(mp, plan) {
  const paymentFormElement = document.getElementById('payment-form');
  const paymentStatusElement = document.getElementById('payment-status');
  
  if (!paymentFormElement || !paymentStatusElement) {
    console.error('Elementos do formulário de pagamento não encontrados');
    return;
  }

  // Limpar formulário anterior
  paymentFormElement.innerHTML = '';
  paymentStatusElement.innerHTML = '';
  
  try {
    // Criar brick do Mercado Pago
    mp.bricks().create("card", "payment-form", {
      initialization: {
        amount: plan.price,
        payer: {
          email: "", // Pode pré-preencher se tiver o email do usuário
        }
      },
      customization: {
        paymentMethods: {
          creditCard: 'all',
          debitCard: 'all',
          ticket: false,
          bankTransfer: false,
          atm: false
        },
        visual: {
          style: {
            theme: 'bootstrap' // ou 'flat', 'dark', 'bootstrap', 'default'
          }
        }
      },
      callbacks: {
        onReady: () => {
          // Callback chamado quando o Brick está pronto
          console.log('Payment form ready');
        },
        onSubmit: ({ selectedPaymentMethod, formData }) => {
          console.log('Selected payment method:', selectedPaymentMethod);
          
          // Mostrar loading
          paymentStatusElement.innerHTML = `
            <div class="alert alert-info">
              <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
              Processando pagamento...
            </div>
          `;
          
          // Simulação de envio para o backend (substitua pelo seu endpoint real)
          return processPaymentSimulation(formData, plan)
            .then(response => {
              console.log('Payment response:', response);
              // Pagamento bem-sucedido
              paymentStatusElement.innerHTML = `
                <div class="alert alert-success">
                  <i class="fas fa-check-circle me-2"></i>
                  Pagamento realizado com sucesso! Redirecionando...
                </div>
              `;
              
              // Redirecionar após 3 segundos
              setTimeout(() => {
                window.location.href = '/pagamento-sucesso';
              }, 3000);
            })
            .catch(error => {
              // Erro no pagamento
              console.error('Error processing payment:', error);
              paymentStatusElement.innerHTML = `
                <div class="alert alert-danger">
                  <i class="fas fa-exclamation-circle me-2"></i>
                  Erro no processamento do pagamento: ${error.message || 'Tente novamente mais tarde'}
                </div>
              `;
              throw error; // Rejeita a promise para o Brick saber que houve erro
            });
        },
        onError: (error) => {
          console.error('Brick error:', error);
          paymentStatusElement.innerHTML = `
            <div class="alert alert-danger">
              <i class="fas fa-exclamation-circle me-2"></i>
              Erro no formulário de pagamento: ${error.message || 'Verifique os dados e tente novamente'}
            </div>
          `;
        },
      }
    });
  } catch (error) {
    console.error('Error initializing payment form:', error);
    paymentStatusElement.innerHTML = `
      <div class="alert alert-danger">
        <i class="fas fa-exclamation-circle me-2"></i>
        Erro ao carregar o formulário de pagamento. Recarregue a página e tente novamente.
      </div>
    `;
  }
}

// Função de simulação de processamento de pagamento (substitua pela sua implementação real)
function processPaymentSimulation(formData, plan) {
  return new Promise((resolve, reject) => {
    // Simula um delay de rede
    setTimeout(() => {
      // Simulação - 80% de chance de sucesso
      if (Math.random() > 0.2) {
        const paymentData = {
          ...formData,
          plan_id: plan.id,
          amount: plan.price
        };
        resolve(paymentData);
        resolve({
          status: 'approved',
          payment_id: 'sim_' + Math.random().toString(36).substring(2, 15),
          plan: plan.id
        });
      } else {
        reject(new Error('Simulação: Falha no processamento do pagamento'));
      }
    }, 1500);
  });
}