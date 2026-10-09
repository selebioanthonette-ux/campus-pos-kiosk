import { products, changeQuantity, removeItem, itemSubtotal, orderTotal, calculatePayment, createTransaction } from './logic.js';

const screens = document.querySelectorAll('[data-screen]');
const status = document.querySelector('#setup-status');

function showScreen(name) {
  if (processing) return;
  if (payment && !['success', 'receipt'].includes(name)) return;
  if (['success', 'receipt'].includes(name) && !completedTransaction) return;
  if (name !== 'selection' && cart.length === 0) return;
  renderSummary();
  for (const screen of screens) {
    screen.hidden = screen.dataset.screen !== name;
  }
  const heading = document.querySelector(`[data-screen="${name}"] h2`);
  status.textContent = heading.textContent;
  heading.tabIndex = -1;
  heading.focus();
  window.scrollTo(0, 0);
}

for (const button of document.querySelectorAll('[data-go-screen]')) {
  button.addEventListener('click', () => showScreen(button.dataset.goScreen));
}

let cart = [];
let processing = false;
let payment = null;
let completedTransaction = null;
let cardTimer = null;
const productGrid = document.querySelector('[aria-label="Products"]');
const cartItems = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const feedback = document.querySelector('#cart-feedback');
const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

function money(centavos) {
  return peso.format(centavos / 100);
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}

function cartButton(label, accessibleLabel, className, onClick) {
  const button = element('button', className, label);
  button.type = 'button';
  button.setAttribute('aria-label', accessibleLabel);
  button.addEventListener('click', onClick);
  return button;
}

function updateQuantity(productId, change) {
  cart = changeQuantity(cart, productId, change);
  renderCart();
  const product = products.find(item => item.id === productId);
  const quantity = cart.find(item => item.id === productId)?.quantity ?? 0;
  feedback.textContent = quantity > 0
    ? `${product.name} quantity: ${quantity}. Order total: ${money(orderTotal(cart))}.`
    : `${product.name} removed. Order total: ${money(orderTotal(cart))}.`;
}

function renderProducts() {
  productGrid.replaceChildren();
  for (const product of products) {
    const button = cartButton('', `Add ${product.name}`, 'product', () => updateQuantity(product.id, 1));
    button.append(element('span', '', product.name), element('span', 'price', money(product.unitPriceCentavos)));
    productGrid.append(button);
  }
}

function renderCart() {
  cartItems.replaceChildren();
  if (cart.length === 0) {
    cartItems.append(element('p', 'py-6 text-slate-600', 'Your order is empty. Tap a product to get started.'));
  }
  for (const item of cart) {
    const row = element('div', 'order-item', '');
    const heading = element('div', 'flex justify-between gap-3', '');
    heading.append(element('strong', '', item.name), element('strong', '', money(itemSubtotal(item))));
    const controls = element('div', 'quantity-row', '');
    const quantity = element('span', '', String(item.quantity));
    quantity.setAttribute('aria-label', `${item.name} quantity`);
    controls.append(
      cartButton('−', `Decrease ${item.name} quantity`, 'quantity', () => updateQuantity(item.id, -1)),
      quantity,
      cartButton('+', `Increase ${item.name} quantity`, 'quantity', () => updateQuantity(item.id, 1)),
      cartButton('Remove', `Remove ${item.name}`, 'remove', () => {
        cart = removeItem(cart, item.id);
        renderCart();
        feedback.textContent = `${item.name} removed. Order total: ${money(orderTotal(cart))}.`;
      }),
    );
    row.append(heading, element('p', 'mt-1 text-sm text-slate-600', `${money(item.unitPriceCentavos)} each`), controls);
    cartItems.append(row);
  }
  cartTotal.textContent = money(orderTotal(cart));
  document.querySelector('#review-order').disabled = cart.length === 0;
}

function renderSummary() {
  // Both views use the same cart and calculation functions; navigation never clears it.
  const rows = document.querySelector('#summary-items');
  rows.replaceChildren();
  for (const item of cart) {
    const row = document.createElement('tr');
    const name = element('th', '', item.name);
    name.scope = 'row';
    row.append(name, element('td', '', String(item.quantity)),
      element('td', '', money(item.unitPriceCentavos)),
      element('td', '', money(itemSubtotal(item))));
    rows.append(row);
  }
  for (const total of document.querySelectorAll('[data-order-total]')) {
    total.textContent = money(orderTotal(cart));
  }
}

renderProducts();
renderCart();
status.textContent = 'Select your items';

const cashInput = document.querySelector('#cash-amount');

const initialPaymentMessages = {
  cash: 'Enter the amount paid, then select Pay Now.',
  qr: 'Waiting for simulated payment confirmation.',
  card: 'Select Process Payment to simulate a card payment.',
};

function setPaymentFeedback(screen, text, kind = 'info') {
  const message = document.querySelector(`#${screen}-feedback`);
  const styles = { info: 'feedback', success: 'success-feedback', error: 'error-feedback' };
  message.className = `${styles[kind]} mb-5`;
  message.textContent = text;
}

function setPaymentButtonsDisabled(screen, disabled) {
  for (const button of document.querySelectorAll(`[data-screen="${screen}"] button`)) {
    button.disabled = disabled;
  }
}

cashInput.addEventListener('input', () => {
  cashInput.removeAttribute('aria-invalid');
  setPaymentFeedback('cash', 'Select Pay Now to validate the amount and complete payment.');
});

function finishPayment(method, screen) {
  if (payment) return;
  try {
    const result = calculatePayment(orderTotal(cart), method, cashInput.value);
    cashInput.removeAttribute('aria-invalid');
    const snapshot = createTransaction(cart, result, `TXN-${crypto.randomUUID()}`, new Date().toISOString());
    payment = result;
    completedTransaction = snapshot;
    setPaymentFeedback(screen,
      `Payment successful. Amount paid: ${money(payment.paidCentavos)}. Change: ${money(payment.changeCentavos)}.`, 'success');
    if (screen === 'cash') document.querySelector('#cash-change').textContent = money(payment.changeCentavos);
    // A completed payment cannot be submitted twice or edited through Back.
    setPaymentButtonsDisabled(screen, true);
    if (screen === 'cash') cashInput.disabled = true;
    renderTransaction();
    showScreen('success');
  } catch (error) {
    setPaymentFeedback(screen, error.message, 'error');
    if (screen === 'cash') {
      cashInput.setAttribute('aria-invalid', 'true');
      cashInput.focus();
    }
  }
}

document.querySelector('#pay-cash').addEventListener('click', () => finishPayment('Cash', 'cash'));
document.querySelector('#confirm-qr').addEventListener('click', () => finishPayment('QR Payment', 'qr'));
document.querySelector('#process-card').addEventListener('click', () => {
  if (processing || payment) return;
  processing = true;
  const section = document.querySelector('[data-screen="card"]');
  section.setAttribute('aria-busy', 'true');
  setPaymentButtonsDisabled('card', true);
  document.querySelector('#card-feedback').textContent = 'Processing payment…';
  cardTimer = window.setTimeout(() => {
    cardTimer = null;
    processing = false;
    section.setAttribute('aria-busy', 'false');
    setPaymentButtonsDisabled('card', false);
    finishPayment('Credit/Debit Card', 'card');
  }, 1000);
});

function renderTransaction() {
  const transaction = completedTransaction;
  const display = {
    reference: transaction.reference,
    date: new Intl.DateTimeFormat('en-PH', {
      dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Manila',
    }).format(new Date(transaction.date)),
    total: money(transaction.totalCentavos), paid: money(transaction.paidCentavos),
    change: money(transaction.changeCentavos), method: transaction.method,
    status: transaction.status,
  };
  for (const field of document.querySelectorAll('[data-transaction-field]')) {
    field.textContent = display[field.dataset.transactionField];
  }
  const rows = document.querySelector('#receipt-items');
  rows.replaceChildren();
  for (const item of transaction.items) {
    const row = document.createElement('tr');
    const name = element('th', '', item.name);
    name.scope = 'row';
    row.append(name, element('td', '', `${item.quantity} × ${money(item.unitPriceCentavos)}`),
      element('td', '', money(item.subtotalCentavos)));
    rows.append(row);
  }
}

function resetTransaction() {
  window.clearTimeout(cardTimer);
  cardTimer = null;
  cart = [];
  processing = false;
  payment = null;
  completedTransaction = null;
  cashInput.value = '';
  cashInput.removeAttribute('aria-invalid');
  cashInput.disabled = false;
  document.querySelector('#cash-change').textContent = '—';
  for (const name of ['cash', 'qr', 'card']) {
    const section = document.querySelector(`[data-screen="${name}"]`);
    section.removeAttribute('aria-busy');
    setPaymentButtonsDisabled(name, false);
    setPaymentFeedback(name, initialPaymentMessages[name]);
  }
  for (const field of document.querySelectorAll('[data-transaction-field]')) field.textContent = '';
  document.querySelector('#receipt-items').replaceChildren();
  feedback.textContent = 'Tap a product to start your order.';
  renderCart();
  showScreen('selection');
}

document.querySelector('#new-transaction').addEventListener('click', resetTransaction);
