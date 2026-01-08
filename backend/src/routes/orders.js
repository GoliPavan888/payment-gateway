const express = require("express");
const router = express.Router();

const { sequelize } = require("../db");
const authenticateMerchant = require("../middleware/auth");
const { generateOrderId } = require("../utils/idGenerator");

/* =========================
   CREATE ORDER
========================= */
router.post("/", authenticateMerchant, async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = null, notes = null } = req.body;

    if (!amount || amount < 100) {
      return res.status(400).json({
        error: {
          code: "BAD_REQUEST_ERROR",
          description: "amount must be at least 100",
        },
      });
    }

    const orderId = generateOrderId();

    await sequelize.query(
      `
      INSERT INTO orders (
        id, merchant_id, amount, currency, receipt, notes, status
      ) VALUES (
        :id, :merchant_id, :amount, :currency, :receipt, :notes, 'created'
      )
      `,
      {
        replacements: {
          id: orderId,
          merchant_id: req.merchant.id,
          amount,
          currency,
          receipt,
          notes: notes ? JSON.stringify(notes) : null,
        },
      }
    );

    const [rows] = await sequelize.query(
      `SELECT * FROM orders WHERE id = :id`,
      { replacements: { id: orderId } }
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

/* =========================
   GET ORDER (AUTH)
========================= */
router.get("/:id", authenticateMerchant, async (req, res) => {
  try {
    const [rows] = await sequelize.query(
      `
      SELECT * FROM orders
      WHERE id = :id AND merchant_id = :merchant_id
      `,
      {
        replacements: {
          id: req.params.id,
          merchant_id: req.merchant.id,
        },
      }
    );

    if (!rows.length) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND_ERROR",
          description: "Order not found",
        },
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

/* =========================
   GET ORDER (PUBLIC - CHECKOUT)
========================= */
router.get("/:id/public", async (req, res) => {
  try {
    const [rows] = await sequelize.query(
      `
      SELECT id, amount, currency, status
      FROM orders
      WHERE id = :id
      `,
      { replacements: { id: req.params.id } }
    );

    if (!rows.length) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND_ERROR",
          description: "Order not found",
        },
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Public order error:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
