const { sequelize } = require("../db");

async function createPayment(payment) {
  await sequelize.query(
    `
    INSERT INTO payments (
      id, order_id, merchant_id, amount, currency,
      method, status, vpa, card_network, card_last4
    ) VALUES (
      :id, :order_id, :merchant_id, :amount, :currency,
      :method, :status, :vpa, :card_network, :card_last4
    )
    `,
    { replacements: payment }
  );
}

async function updatePaymentStatus(id, status, error = {}) {
  await sequelize.query(
    `
    UPDATE payments
    SET status = :status,
        error_code = :error_code,
        error_description = :error_description,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = :id
    `,
    {
      replacements: {
        id,
        status,
        error_code: error.code || null,
        error_description: error.description || null
      }
    }
  );
}

async function getPaymentById(paymentId, merchantId) {
  const [rows] = await sequelize.query(
    `
    SELECT * FROM payments
    WHERE id = :paymentId AND merchant_id = :merchantId
    `,
    { replacements: { paymentId, merchantId } }
  );

  return rows.length ? rows[0] : null;
}

module.exports = {
  createPayment,
  updatePaymentStatus,
  getPaymentById
};
