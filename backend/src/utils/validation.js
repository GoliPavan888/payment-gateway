// src/utils/validation.js

function validateVPA(vpa) {
  if (!vpa) return false;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
  return regex.test(vpa);
}

function validateCardNumber(cardNumber) {
  const digits = cardNumber.replace(/[\s-]/g, "");
  if (!/^\d{13,19}$/.test(digits)) return false;

  let sum = 0;
  let double = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }

  return sum % 10 === 0;
}

function detectCardNetwork(cardNumber) {
  const num = cardNumber.replace(/[\s-]/g, "");

  if (num.startsWith("4")) return "visa";
  if (/^5[1-5]/.test(num)) return "mastercard";
  if (/^3[47]/.test(num)) return "amex";
  if (/^(60|65|8[1-9])/.test(num)) return "rupay";

  return "unknown";
}

function validateExpiry(month, year) {
  const m = parseInt(month, 10);
  let y = parseInt(year, 10);

  if (m < 1 || m > 12) return false;
  if (year.length === 2) y += 2000;

  const now = new Date();
  const expiry = new Date(y, m);

  return expiry >= new Date(now.getFullYear(), now.getMonth());
}

module.exports = {
  validateVPA,
  validateCardNumber,
  detectCardNetwork,
  validateExpiry,
};
