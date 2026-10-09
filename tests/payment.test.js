import test from 'node:test';
import assert from 'node:assert/strict';
import * as logic from '../js/logic.js';

for (const [label, input, message] of [
  ['blank', '', /valid cash amount/],
  ['whitespace-only', '   ', /valid cash amount/],
  ['nonnumeric', 'hello', /valid cash amount/],
  ['negative', '-200', /valid cash amount/],
  ['zero', '0', /Insufficient payment/],
  ['instructor insufficient amount', '100', /Insufficient payment/],
  ['one cent below total', '139.99', /Insufficient payment/],
]) {
  test(`₱140 order rejects ${label} cash without returning a payment`, () => {
    let payment = null;
    assert.throws(() => { payment = logic.calculatePayment(14000, 'Cash', input); }, message);
    assert.equal(payment, null);
  });
}

test('one cent above total is accepted with one cent change', () => {
  assert.equal(logic.calculatePayment(14000, 'Cash', '140.01').changeCentavos, 1);
});

test('cash above total returns correct change for both instructor examples', () => {
  assert.deepEqual(logic.calculatePayment(14000, 'Cash', '200'), {
    method: 'Cash', totalCentavos: 14000, paidCentavos: 20000, changeCentavos: 6000,
  });
  assert.equal(logic.calculatePayment(17500, 'Cash', '200.00').changeCentavos, 2500);
});

test('exact cash payment succeeds with zero change', () => {
  assert.equal(logic.calculatePayment(14000, 'Cash', '140.00').changeCentavos, 0);
});

test('insufficient cash is rejected', () => {
  assert.throws(() => logic.calculatePayment(14000, 'Cash', '100'), /Insufficient payment/);
});

test('blank, negative, nonnumeric, and malformed cash values are rejected', () => {
  for (const input of ['', ' ', '-1', 'abc', 'NaN', 'Infinity', '1e3', '200.001', '200abc']) {
    assert.throws(() => logic.calculatePayment(14000, 'Cash', input), /Enter a valid cash amount/);
  }
});

test('decimal cash is calculated in integer centavos', () => {
  assert.equal(logic.calculatePayment(14000, 'Cash', ' 140.10 ').changeCentavos, 10);
});

test('QR and card simulations pay the total with zero change', () => {
  for (const method of ['QR Payment', 'Credit/Debit Card']) {
    assert.deepEqual(logic.calculatePayment(17500, method), {
      method, totalCentavos: 17500, paidCentavos: 17500, changeCentavos: 0,
    });
  }
});

test('invalid totals, unsupported methods, and unsafe cash values are rejected', () => {
  for (const total of [0, -100, 1.5, NaN]) {
    assert.throws(() => logic.calculatePayment(total, 'Cash', '200'), /valid order/);
  }
  assert.throws(() => logic.calculatePayment(14000, 'Other'), /payment method/);
  assert.throws(() => logic.calculatePayment(14000, 'Cash', '999999999999999999999'), /valid cash amount/);
});
