const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false
});

async function initDB() {
  await sequelize.authenticate();

  // CREATE TABLES IF NOT EXISTS
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS merchants (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      api_key VARCHAR(64) UNIQUE NOT NULL,
      api_secret VARCHAR(64) NOT NULL,
      webhook_url TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(64) PRIMARY KEY,
      merchant_id UUID REFERENCES merchants(id),
      amount INTEGER NOT NULL,
      currency VARCHAR(3) DEFAULT 'INR',
      receipt VARCHAR(255),
      notes JSONB,
      status VARCHAR(20) DEFAULT 'created',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id VARCHAR(64) PRIMARY KEY,
      order_id VARCHAR(64) REFERENCES orders(id),
      merchant_id UUID REFERENCES merchants(id),
      amount INTEGER NOT NULL,
      currency VARCHAR(3) DEFAULT 'INR',
      method VARCHAR(20) NOT NULL,
      status VARCHAR(20) NOT NULL,
      vpa VARCHAR(255),
      card_network VARCHAR(20),
      card_last4 VARCHAR(4),
      error_code VARCHAR(50),
      error_description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

module.exports = { sequelize, initDB };
