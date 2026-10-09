export const products = [
  { id: 'coffee', name: 'Coffee', unitPriceCentavos: 4500 },
  { id: 'sandwich', name: 'Sandwich', unitPriceCentavos: 5000 },
  { id: 'soft-drink', name: 'Soft Drink', unitPriceCentavos: 3500 },
  { id: 'cookies', name: 'Cookies', unitPriceCentavos: 2500 },
  { id: 'bottled-water', name: 'Bottled Water', unitPriceCentavos: 2000 },
  { id: 'chocolate', name: 'Chocolate', unitPriceCentavos: 2500 },
];

export function itemSubtotal(item) {
  return item.unitPriceCentavos * item.quantity;
}

export function orderTotal(cart) {
  return cart.reduce((total, item) => total + itemSubtotal(item), 0);
}

export function removeItem(cart, productId) {
  return cart.filter(item => item.id !== productId);
}

export function changeQuantity(cart, productId, change) {
  const product = products.find(item => item.id === productId);
  if (!product) throw new Error('Unknown product.');
  if (change !== 1 && change !== -1) {
    throw new Error('Quantity change must be +1 or -1.');
  }
  const existing = cart.find(item => item.id === productId);
  const quantity = (existing?.quantity ?? 0) + change;
  // Removing at zero also prevents decrementing an absent item below zero.
  if (quantity <= 0) return removeItem(cart, productId);
  if (!existing) return [...cart, { ...product, quantity }];
  return cart.map(item => item.id === productId ? { ...item, quantity } : item);
}

export function calculatePayment(totalCentavos, method, cashInput = '') {
  if (!Number.isSafeInteger(totalCentavos) || totalCentavos <= 0) {
    throw new Error('Add items to create a valid order before payment.');
  }
  if (!['Cash', 'QR Payment', 'Credit/Debit Card'].includes(method)) {
    throw new Error('Choose a supported payment method.');
  }
  let paidCentavos = totalCentavos;
  if (method === 'Cash') {
    const amount = String(cashInput).trim();
    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
      throw new Error('Enter a valid cash amount with up to two decimal places.');
    }
    const [pesos, fraction = ''] = amount.split('.');
    // Parse the decimal digits separately so all arithmetic uses integer centavos.
    paidCentavos = Number(pesos) * 100 + Number(fraction.padEnd(2, '0'));
    if (!Number.isSafeInteger(paidCentavos)) {
      throw new Error('Enter a valid cash amount within the supported range.');
    }
    if (paidCentavos < totalCentavos) {
      throw new Error(`Insufficient payment. Please enter at least ₱${(totalCentavos / 100).toFixed(2)}.`);
    }
  }
  return { method, totalCentavos, paidCentavos, changeCentavos: paidCentavos - totalCentavos };
}

export function createTransaction(cart, payment, reference, date) {
  const items = cart.map(item => Object.freeze({
    ...item, subtotalCentavos: itemSubtotal(item),
  }));
  // Copy primitive values and freeze every level, never retaining mutable cart items.
  return Object.freeze({
    ...payment, reference, date, status: 'Payment Successful',
    items: Object.freeze(items),
  });
}
