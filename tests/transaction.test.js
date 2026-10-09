import test from 'node:test';
import assert from 'node:assert/strict';
import * as logic from '../js/logic.js';

function order() {
  let cart = logic.changeQuantity([], 'coffee', 1);
  cart = logic.changeQuantity(cart, 'coffee', 1);
  return logic.changeQuantity(cart, 'sandwich', 1);
}

test('completed snapshot contains accurate receipt and payment fields', () => {
  const cart = order();
  const paid = logic.calculatePayment(14000, 'Cash', '200');
  const receipt = logic.createTransaction(cart, paid, 'TXN-test-1', '2026-10-09T10:00:00.000Z');
  assert.equal(receipt.reference, 'TXN-test-1');
  assert.equal(receipt.date, '2026-10-09T10:00:00.000Z');
  assert.equal(receipt.status, 'Payment Successful');
  assert.equal(receipt.totalCentavos, 14000);
  assert.equal(receipt.paidCentavos, 20000);
  assert.equal(receipt.changeCentavos, 6000);
  assert.equal(receipt.method, 'Cash');
  assert.deepEqual(receipt.items.map(item => [item.name, item.quantity, item.unitPriceCentavos, item.subtotalCentavos]),
    [['Coffee', 2, 4500, 9000], ['Sandwich', 1, 5000, 5000]]);
});

test('snapshot is independent of later cart and payment changes and is immutable', () => {
  const cart = order();
  const paid = logic.calculatePayment(14000, 'Cash', '200');
  const receipt = logic.createTransaction(cart, paid, 'TXN-test-1', '2026-10-09T10:00:00.000Z');
  cart[0].quantity = 99;
  cart.length = 0;
  paid.paidCentavos = 0;
  assert.equal(receipt.items[0].quantity, 2);
  assert.equal(receipt.items.length, 2);
  assert.equal(receipt.paidCentavos, 20000);
  assert.throws(() => { receipt.items[0].quantity = 3; }, TypeError);
  assert.throws(() => { receipt.totalCentavos = 0; }, TypeError);
});

test('QR and card snapshots retain their paid total and zero change', () => {
  for (const method of ['QR Payment', 'Credit/Debit Card']) {
    const receipt = logic.createTransaction(order(), logic.calculatePayment(14000, method), 'TXN-test', '2026-10-09T10:00:00.000Z');
    assert.equal(receipt.method, method);
    assert.equal(receipt.paidCentavos, 14000);
    assert.equal(receipt.changeCentavos, 0);
  }
});
