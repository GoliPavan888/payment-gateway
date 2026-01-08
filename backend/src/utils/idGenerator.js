/**
 * Utility functions to generate IDs
 * Order ID  : order_ + 16 alphanumeric characters
 * Payment ID: pay_   + 16 alphanumeric characters
 */

function generateRandomString(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

function generateOrderId() {
  return `order_${generateRandomString(16)}`;
}

function generatePaymentId() {
  return `pay_${generateRandomString(16)}`;
}

module.exports = {
  generateOrderId,
  generatePaymentId
};
