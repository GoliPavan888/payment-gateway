const { findMerchantByCredentials } = require("../models/merchant");

async function authenticateMerchant(req, res, next) {
  const apiKey = req.header("X-Api-Key");
  const apiSecret = req.header("X-Api-Secret");

  if (!apiKey || !apiSecret) {
    return res.status(401).json({
      error: {
        code: "AUTHENTICATION_ERROR",
        description: "Invalid API credentials"
      }
    });
  }

  const merchant = await findMerchantByCredentials(apiKey, apiSecret);

  if (!merchant) {
    return res.status(401).json({
      error: {
        code: "AUTHENTICATION_ERROR",
        description: "Invalid API credentials"
      }
    });
  }

  // Attach merchant context for downstream handlers
  req.merchant = merchant;
  next();
}

module.exports = authenticateMerchant;
