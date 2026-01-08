const { sequelize } = require("../db");

async function createOrder(order) {
  await sequelize.query(
    `
    INSERT INTO orders (
      id, merchant_id, amount, currency, receipt, notes, status
    ) VALUES (
      :id, :merchant_id, :amount, :currency, :receipt, :notes, :status
    )
    `,
    {
      replacements: {
        id: order.id,
        merchant_id: order.merchant_id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        notes: order.notes,
        status: order.status
      }
    }
  );
}

async function getOrderById(orderId, merchantId) {
  const [rows] = await sequelize.query(
    `
    SELECT * FROM orders
    WHERE id = :orderId AND merchant_id = :merchantId
    `,
    { replacements: { orderId, merchantId } }
  );

  return rows.length ? rows[0] : null;
}

module.exports = { createOrder, getOrderById };

