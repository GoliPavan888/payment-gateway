const express = require("express");
const router = express.Router();
const { sequelize } = require("../db");

/**
 * GET /api/v1/test/merchant
 * Required for evaluator
 */
router.get("/merchant", async (req, res) => {
  try {
    const [rows] = await sequelize.query(
      `
      SELECT id, email, api_key
      FROM merchants
      WHERE email = 'test@example.com'
      LIMIT 1
      `
    );

    if (!rows.length) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND_ERROR",
          description: "Test merchant not found",
        },
      });
    }

    res.status(200).json({
      id: rows[0].id,
      email: rows[0].email,
      api_key: rows[0].api_key,
      seeded: true,
    });
  } catch (err) {
    console.error("Test merchant endpoint error:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
