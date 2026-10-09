import test from 'node:test';
import assert from 'node:assert/strict';
import * as logic from '../js/logic.js';

test('new cart is empty and totals zero', () => {
  assert.equal(logic.orderTotal([]), 0);
});

test('repeated add and decrease cycles never retain zero or negative quantities', () => {
  let cart = [];
  for (let cycle = 0; cycle < 10; cycle++) {
    cart = logic.changeQuantity(cart, 'coffee', 1);
    cart = logic.changeQuantity(cart, 'coffee', -1);
    cart = logic.changeQuantity(cart, 'coffee', -1);
    assert.deepEqual(cart, []);
    assert.equal(logic.orderTotal(cart), 0);
  }
});

test('instructor sequence calculates exact centavo amounts after each change', () => {
  let cart = [];
  cart = logic.changeQuantity(cart, 'coffee', 1);
  cart = logic.changeQuantity(cart, 'coffee', 1);
  cart = logic.changeQuantity(cart, 'sandwich', 1);
  cart = logic.changeQuantity(cart, 'soft-drink', 1);
  assert.equal(cart.length, 3);
  assert.equal(cart[0].quantity, 2);
  assert.deepEqual(cart.map(logic.itemSubtotal), [9000, 5000, 3500]);
  assert.equal(logic.orderTotal(cart), 17500);
  cart = logic.changeQuantity(cart, 'coffee', 1);
  assert.equal(logic.itemSubtotal(cart[0]), 13500);
  assert.equal(logic.orderTotal(cart), 22000);
  cart = logic.changeQuantity(cart, 'coffee', -1);
  assert.equal(logic.orderTotal(cart), 17500);
  cart = logic.removeItem(cart, 'soft-drink');
  assert.deepEqual(cart.map(item => item.id), ['coffee', 'sandwich']);
  assert.equal(logic.orderTotal(cart), 14000);
});

test('decreasing the last unit removes the item and cannot create a negative quantity', () => {
  let cart = logic.changeQuantity([], 'coffee', 1);
  cart = logic.changeQuantity(cart, 'coffee', -1);
  assert.deepEqual(cart, []);
  assert.deepEqual(logic.changeQuantity(cart, 'coffee', -1), []);
  assert.equal(logic.orderTotal(cart), 0);
});

test('removing the only item clears the total', () => {
  const cart = logic.changeQuantity([], 'chocolate', 1);
  assert.deepEqual(logic.removeItem(cart, 'chocolate'), []);
  assert.equal(logic.orderTotal(logic.removeItem(cart, 'chocolate')), 0);
});

test('unknown products and invalid quantity changes are rejected without changing the cart', () => {
  const cart = logic.changeQuantity([], 'coffee', 1);
  assert.throws(() => logic.changeQuantity(cart, 'unknown', 1), /Unknown product/);
  for (const amount of [0, 2, -2, 0.5, NaN, '1']) {
    assert.throws(() => logic.changeQuantity(cart, 'coffee', amount), /Quantity change/);
  }
  assert.equal(cart[0].quantity, 1);
});

test('cart updates do not mutate the previous state or product prices', () => {
  const cart = logic.changeQuantity([], 'coffee', 1);
  const updated = logic.changeQuantity(cart, 'coffee', 1);
  assert.equal(cart[0].quantity, 1);
  assert.equal(updated[0].quantity, 2);
  assert.equal(updated[0].unitPriceCentavos, 4500);
});
