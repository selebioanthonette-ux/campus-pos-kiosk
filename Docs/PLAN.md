# Project plan

Checkpoint sections below are historical snapshots of each stage, not the
current application status. The current flow includes payments, live success/
receipt, reset, validation, and Checkpoint 9 refactoring. Checkpoint 8 found
a keyboard-focus bug; its fix remains unapproved. Checkpoint 10 documents this
state. See DOCUMENTATION.md for the consolidated application report.

Source: the approved requirements analysis in the project chat and the IT415
Touchscreen POS Kiosk practice scenario. This file summarizes the approved
direction; it does not replace the scenario.

## Approved direction

- Self-service customers select products, review orders, choose a payment
  method, complete payment, view confirmation/receipt, and start a new transaction.
- At least six products; use the six sample products listed in AGENTS.md.
- Cash, simulated QR, and simulated Credit/Debit Card payments.
- Automatic calculations, friendly validation, distinct transaction references,
  and complete transaction reset.
- HTML5, vanilla JavaScript, Tailwind CDN, hard-coded products, in-memory state,
  Node built-in tests, and a local static server.
- Keep pure calculation/validation logic separate from DOM manipulation.
- Omit optional features, databases, login, and real payment integration.

## Checkpoint 1 scope

1. Create a minimal welcome page and module entry points.
2. Add dependency-free test scaffolding and Git exclusions.
3. Document startup, testing, decisions, and AI assistance.
4. Verify HTTP serving, browser startup, and the complete initial test suite.
5. Report Git status and stop without staging, committing, or pushing.

No product catalog, transaction state implementation, cart, payment, or receipt
behavior is needed in this setup checkpoint.

## Checkpoint 2 scope

Eight static layouts, the six sample product cards, disabled transaction
controls, feedback areas, and desktop/mobile styling. A temporary labeled
preview selector switches layouts without creating transaction state.
Sample order: Coffee ×2, Sandwich ×1, Soft Drink ×1; sample total ₱175,
cash paid ₱200, change ₱25. These are display fixtures, not calculations.

Visual direction: light background, dark text, blue primary actions, system
font, consistent 56px minimum touch-control height, desktop product/cart
columns that stack on small screens. No decorative or optional POS features.

## Checkpoint 3 implementation decisions

The cart starts empty and lives only in memory. Products have stable identifiers
and integer-centavo unit prices. Pure functions return updated cart arrays;
the browser renders names and values with textContent. Decrementing from one
removes the item; decrementing an absent item cannot create negative quantity.
Only +1/-1 changes and catalog products are accepted. Order review remains a
static preview and checkout remains disabled until Checkpoint 4.

## Checkpoint 4 implementation decisions

Summary renders from the same cart using the existing subtotal/total helpers.
Back navigation only changes the visible screen, so cart state is preserved.
The temporary screen-preview selector is removed. Back/Continue buttons now
lead through selection, review, payment choices, and Cash/QR/Card interfaces.
Each payment interface displays the current order total, but payment submission
is disabled. No payment, success, receipt, or reset behavior is implemented.
Empty-cart review is disabled as a simple usability safeguard.

## Checkpoint 5 implementation decisions

Payment calculation is pure logic using integer centavos. Cash accepts a
nonnegative decimal with up to two fractional digits and must cover the total.
Invalid/insufficient input leaves payment incomplete and permits retry.
QR is explicitly a non-scannable placeholder with confirmation; Card simulates
one second of processing with controls locked. QR/card paid equals total and
change is zero. Completed payment results stay in memory and lock controls.
Success feedback appears on the payment screen for now; the complete success
screen, reference, receipt snapshot, and reset belong to Checkpoint 6.

## Checkpoint 6 implementation decisions

Successful payments create a copied, frozen snapshot of purchased items and
payment values. Success and receipt fields render from that snapshot, never
from the mutable cart. UUID references use browser crypto.randomUUID and do
not depend on resettable state. Dates store an ISO timestamp and display in
Asia/Manila time. New Transaction clears payment/cart state, pending timer,
cash entry, receipt/success fields, summary totals, and feedback; it re-enables
controls and returns to Item Selection. Products remain available.

## Checkpoints

2. Touchscreen interface (layout only).
3. Product selection and cart calculations.
4. Order review and payment selection.
5. Payment processing.
6. Confirmation, receipt, and reset.
7. Complete validation verification.
8. Investigate and fix an actual error only if one is found and approved.
9. Refactor without changing behavior.
10. Update documentation.
11. Final examination verification.

Follow PROMPTS.md for the exact scope of each later checkpoint. Stop after each.
