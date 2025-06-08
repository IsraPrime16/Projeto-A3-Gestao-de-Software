import express from 'express';
import mercadopago from 'mercadopago';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Mercado Pago
mercadopago.configure({
  access_token: 'TEST-684422319989942-060715-cae73fd004b31f91b71b2b670ab31783-2481140167'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rota para processar pagamentos
app.post('/process_payment', async (req, res) => {
  const { token, issuer_id, payment_method_id, transaction_amount, installments, description } = req.body;

  try {
    const paymentData = {
      transaction_amount: transaction_amount,
      token: token,
      description: description,
      installments: installments,
      payment_method_id: payment_method_id,
      issuer_id: issuer_id,
      payer: {
        email: 'test@test.com' // Substitua por email do cliente
      }
    };

    const response = await mercadopago.payment.save(paymentData);
    res.status(response.status).json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});