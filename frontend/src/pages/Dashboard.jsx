import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    amount: 0,
    rate: 0
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/payments", {
      headers: {
        "X-Api-Key": "key_test_abc123",
        "X-Api-Secret": "secret_test_xyz789"
      }
    })
      .then(res => res.json())
      .then(data => {
        // ✅ FIX: payments are inside data.items
        const payments = Array.isArray(data.items) ? data.items : [];

        const total = payments.length;
        const success = payments.filter(p => p.status === "success");
        const amount = success.reduce((s, p) => s + p.amount, 0);
        const rate = total ? Math.round((success.length / total) * 100) : 0;

        setStats({ total, amount, rate });
      })
      .catch(err => {
        console.error("Dashboard fetch error:", err);
      });
  }, []);

  return (
    <div data-test-id="dashboard">
      <div data-test-id="api-credentials">
        <div>
          <label>API Key</label>
          <span data-test-id="api-key">key_test_abc123</span>
        </div>
        <div>
          <label>API Secret</label>
          <span data-test-id="api-secret">secret_test_xyz789</span>
        </div>
      </div>

      <div data-test-id="stats-container">
        <div data-test-id="total-transactions">{stats.total}</div>
        <div data-test-id="total-amount">₹{stats.amount / 100}</div>
        <div data-test-id="success-rate">{stats.rate}%</div>
      </div>
    </div>
  );
}
