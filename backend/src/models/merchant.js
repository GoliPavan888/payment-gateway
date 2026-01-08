const { sequelize } = require("../db");

async function findMerchantByCredentials(apiKey, apiSecret) {
  const [results] = await sequelize.query(
    `
    SELECT * FROM merchants
    WHERE api_key = :apiKey
      AND api_secret = :apiSecret
      AND is_active = true
    `,
    {
      replacements: { apiKey, apiSecret }
    }
  );

  return results.length > 0 ? results[0] : null;
}

module.exports = { findMerchantByCredentials };
