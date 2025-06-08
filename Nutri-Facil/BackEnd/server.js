import express from 'express';
import mercadopago from 'mercadopago';
import cors from 'cors';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

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

// Rota de saúde do servidor
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Rota para processar pagamentos
app.post('/process_payment', async (req, res) => {
  const { token, issuer_id, payment_method_id, transaction_amount, installments, description, email } = req.body;

  if (!token || !transaction_amount || !payment_method_id || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const paymentData = {
      transaction_amount: transaction_amount,
      token: token,
      description: description || 'Compra no site',
      installments: Number(installments) || 1,
      payment_method_id: payment_method_id,
      issuer_id: issuer_id,
      payer: {
        email: 'test@test.com' // Substitua por email do cliente
      }
    };

    const response = await mercadopago.payment.save(paymentData);
    res.status(response.status || 200).json(response.body);
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ 
      error: error.message,
      details: error?.response?.body?.errors || 'Unknown error'
    });
  }
});

// Rota para criar preferência (para checkout pro)
app.post('/create_preference', async (req, res) => {
  const { items, payer } = req.body;

  try {
    const preference = {
      items: items.map(item => ({
        title: item.title,
        unit_price: Number(item.unit_price),
        quantity: Number(item.quantity) || 1,
      })),
      payer: {
        email: payer.email,
      },
      back_urls: {
        success: process.env.SUCCESS_URL || 'https://yourwebsite.com/success',
        failure: process.env.FAILURE_URL || 'https://yourwebsite.com/failure',
        pending: process.env.PENDING_URL || 'https://yourwebsite.com/pending'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});