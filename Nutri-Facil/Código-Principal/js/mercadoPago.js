// Configuração do Mercado Pago
document.addEventListener('DOMContentLoaded', function() {
  // Substitua com sua public key do Mercado Pago
  const mp = new MercadoPago('SUA_PUBLIC_KEY_AQUI', {
    locale: 'pt-BR'
  });

  // Planos e preços
  const plans = {
    basic: {
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
      
      // Atualizar resumo do plano no modal
      document.getElementById('plan-summary').innerHTML = `
        <div class="card">
          <div class="card-header bg-${getPlanColor(planId)} text-white">
            <h5>Plano ${plan.name}</h5>
          </div>
          <div class="card-body">
            <h4 class="card-title">R$ ${plan.price}<small class="text-muted">/mês</small></h4>
            <ul class="list-unstyled">
              ${plan.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
      
      // Inicializar formulário de pagamento
      initPaymentForm(mp, plan);
      
      // Mostrar modal
      const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
      modal.show();
    });
  });
});

function getPlanColor(planId) {
  switch(planId) {
    case 'basic': return 'primary';
    case 'advanced': return 'success';
    case 'family': return 'dark';
    default: return 'primary';
  }
}

function initPaymentForm(mp, plan) {
  // Limpar formulário anterior
  document.getElementById('payment-form').innerHTML = '';
  document.getElementById('payment-status').innerHTML = '';
  
  // Criar brick do Mercado Pago
  mp.bricks().create("card", "payment-form", {
    initialization: {
      amount: plan.price,
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
      },
      onSubmit: ({ selectedPaymentMethod, formData }) => {
        // Callback chamado ao clicar no botão de submissão dos dados
        return new Promise((resolve, reject) => {
          fetch("/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          })
          .then((response) => {
            // Receber o resultado do pagamento
            resolve();
          })
          .catch((error) => {
            // Lidar com a resposta de erro ao tentar criar o pagamento
            reject();
          });
        });
      },
      onError: (error) => {
        // Callback chamado para todos os casos de erro do Brick
        document.getElementById('payment-status').innerHTML = `
          <div class="alert alert-danger">
            <i class="fas fa-exclamation-circle me-2"></i>
            Erro no processamento do pagamento: ${error.message}
          </div>
        `;
      },
    }
  });
}