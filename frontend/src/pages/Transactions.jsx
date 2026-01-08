import React, { useEffect, useState } from "react";

export default function Transactions() {
  const [payments, setPayments] = useState([]);

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
        if (Array.isArray(data.items)) {
          setPayments(data.items);
        } else {
          setPayments([]);
        }
      })
      .catch(err => {
        console.error("Transactions fetch error:", err);
        setPayments([]);
      });
  }, []);

  return (
    <table data-test-id="transactions-table">
      <thead>
        <tr>
          <th>Payment ID</th>
          <th>Order ID</th>
          <th>Amount</th>
          <th>Method</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr
            key={payment.id}
            data-test-id="transaction-row"
            data-payment-id={payment.id}
          >
            <td data-test-id="payment-id">{payment.id}</td>
            <td data-test-id="order-id">{payment.order_id}</td>
            <td data-test-id="amount">{payment.amount}</td>
            <td data-test-id="method">{payment.method}</td>
            <td data-test-id="status">{payment.status}</td>
            <td data-test-id="created-at">
              {new Date(payment.created_at).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
