# Campus POS Kiosk

IT415 Application Development practical examination practice project.

Student name and GitHub URL: to be supplied by the student. No repository URL
or completed commit history has been verified. This document describes the
application through Checkpoint 9; documentation is Checkpoint 10.

## 1. Problem definition

A small campus food/merchandise outlet relies on a cashier to encode orders
and calculate totals manually. The kiosk lets customers select items, review
their order, simulate payment, and view a digital receipt using simple touch controls.

## 2. Target users

Customers at the campus outlet are the primary users. The instructor evaluates
the application and development process. No administrator or cashier account
is implemented or required for this scope.

## 3. Functional requirements and implementation

| Requirement | Implemented behavior |
|---|---|
| At least six products | Six large product buttons with names and prices |
| Product selection | Tapping adds one unit; repeated taps increase quantity |
| Quantity adjustment/removal | +/− and Remove; decreasing from one removes the item |
| Automatic calculations | Unit price, quantity, item subtotal, and total displayed |
| Order review | Live summary with quantities, prices, subtotals, and total |
| Back navigation | Returns to selection without clearing cart |
| Payment choices | Cash, QR Payment, Credit/Debit Card |
| Cash | Validates input and sufficient amount; computes change |
| QR | Clearly labeled simulated placeholder and confirmation |
| Card | Simulated one-second processing state; controls locked while processing |
| Confirmation | Success, total, paid amount, method, UUID reference, View Receipt |
| Receipt | Completed snapshot, reference, date, items, prices, amounts, and status |
| New Transaction | Clears transaction state and previous receipt; retains catalog |
| Feedback | Cart actions, cash errors/recovery, processing, and success messages |

Known keyboard-focus limitation is described in sections 12 and 16. This table
does not claim the application is free of defects.

## 4. Technology stack

- HTML5 and vanilla JavaScript ES modules: no frontend framework or build step.
- Tailwind CSS via CDN plus local CSS: shared readable touchscreen styles.
- Hard-coded products and in-memory state: no server API or database needed.
- Node built-in test runner: no npm dependencies to install.
- Python static HTTP server: local browser serving only, not application backend logic.
- Git/GitHub workflow is student-controlled; AI has not committed or pushed.

This keeps the timed project small and explainable. Logic functions are separate
from DOM code, so calculations can run in Node without a browser.

## 5. Project structure

| Path | Purpose |
|---|---|
| index.html | Kiosk screens and accessible controls |
| css/styles.css | Shared component styles, focus styling, responsive rules |
| js/app.js | In-memory state, DOM rendering, navigation, payment orchestration, reset |
| js/logic.js | Catalog, pure cart calculations, payment validation, frozen snapshots |
| tests/cart.test.js | Cart and quantity rules, instructor sequence |
| tests/payment.test.js | Payment validation, paid/change calculations |
| tests/transaction.test.js | Snapshot contents and immutability |
| tests/setup.test.js | Logic-module import smoke test |
| package.json | ES-module mode and test command; no package dependencies |
| .gitignore | Excludes temporary files, dependencies, local data, and secrets |
| Docs/PLAN.md | Historical checkpoint decisions and current status |
| Docs/TESTING.md | Actual automated/browser verification and reproduction steps |
| Docs/AI_LOG.md | AI interactions and student evaluation drafts |
| Docs/DOCUMENTATION.md | This application report |
| Docs/DOCUMENTATION_TEMPLATE.md | Original unfilled exam template, retained for student use |
| AGENTS.md / PROMPTS.md | Working instructions and checkpoint prompts |

## 6. Setup and run

Prerequisites: modern browser, Python 3 for serving, and Node for tests. Node
v24.19.0 was used in this session. Internet is needed to load Tailwind from CDN.
No npm install step is required.

From the project root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/. Stop the server with Ctrl+C. Use HTTP serving rather
than opening index.html directly because the application imports ES modules.

The normal Python command pointed to an unavailable Windows launcher in this
environment. The verified alternative was:

```powershell
& 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe' -m http.server 8000 --bind 127.0.0.1
```

That bundled path is specific to this computer; other computers should use
their installed Python executable.

Tests, from the project root:

```powershell
node --test
```

`npm test` is configured to invoke the same command. The directly verified
command in this session was `node --test`.

## 7. Main transaction flow

Item Selection → Order Summary → Payment Method → Cash/QR/Card processing →
Payment Successful → View Receipt → New Transaction → empty Item Selection.

Back from review preserves the cart. Back from a payment interface permits
another method before completion. During card processing, navigation is locked.
After success, the customer proceeds to receipt and New Transaction.

## 8. Products

| Product | Unit price |
|---|---:|
| Coffee | ₱45.00 |
| Sandwich | ₱50.00 |
| Soft Drink | ₱35.00 |
| Cookies | ₱25.00 |
| Bottled Water | ₱20.00 |
| Chocolate | ₱25.00 |

## 9. Business rules and calculations

- Internal money uses integer centavos: ₱45.00 is 4500.
- Item subtotal = unit price × quantity; total = sum of subtotals.
- Quantities change by one whole unit; zero removes the item.
- Cash paid must cover the total; change = paid − total.
- QR/Card simulations set paid equal to total and change to zero.
- A completed transaction copies and freezes item/payment values for the receipt.
- Reference = TXN- plus browser crypto.randomUUID; it is independent of cart reset.
- Timestamp is stored as ISO text and displayed using Asia/Manila time.
- State is memory-only. Reloading loses the current order and receipt.

Instructor examples verified:

Coffee ×2 (₱90) + Sandwich ×1 (₱50) + Soft Drink ×1 (₱35) = ₱175.
Coffee ×3 makes ₱220; returning to ×2 restores ₱175; removing Soft Drink makes ₱140.
₱200 cash against ₱175 gives ₱25; against ₱140 gives ₱60.

## 10. Input validation

Quantity controls prevent negative values; invalid deltas and unknown products
are rejected by logic functions. Customers do not type quantity or product names.

Cash rejects blank/whitespace, nonnumeric, negative, malformed, unsafe, or
insufficient amounts. Format is digits with an optional one- or two-digit
fraction; exponent notation and more than two decimal places are rejected.
Exact and excess payments succeed. Invalid cash leaves the user on Cash,
shows a friendly message, marks/focuses the field, and creates no successful
transaction or receipt. Editing clears stale error feedback.

Empty-cart Continue is disabled as an implemented usability safeguard.

## 11. Testing performed

Automated suite contains 26 tests covering cart totals, quantity/removal,
cash validation and precision, QR/Card amounts, and receipt snapshot independence.
The setup smoke test is included. These do not automate the DOM or browser focus.
The Checkpoint 10 rerun is recorded in TESTING.md after execution.

Earlier browser verification covered the instructor calculation sequence,
summary/Back preservation, all payment methods, invalid cash, exact/excess cash,
card processing, success/receipt fields, repeated transactions with different
references, and complete reset. Responsive layouts were checked at 1280×900
and 390×844 during interface work; later live summary/receipt phone checks
confirmed no page overflow. These are recorded manual/browser checks, not
automated responsive tests. They were not all repeated during documentation.

## 12. Bugs discovered and fixes

Actual unresolved error: cart quantity updates lose keyboard focus. Add Coffee,
Tab to Increase Coffee quantity, and press Enter twice. The first Enter increases
quantity to 2, removes/recreates cart controls, and moves focus to BODY. The
second Enter does nothing. Expected focus should remain on the equivalent control.

Root cause: renderCart uses replaceChildren without restoring focus. The issue
was reproduced in the browser and reported for approval. No approved fix or
regression test for it has been applied. It was deliberately excluded from refactoring.

Earlier server socket restrictions/Windows Python launcher failure were local
verification issues, not invented application bugs. Serving succeeded using the
bundled runtime with execution permission. No completed bug-fix commit exists.

## 13. Refactoring performed

Checkpoint 9 extracted setPaymentFeedback and setPaymentButtonsDisabled to
remove repeated DOM/style/control operations. initialPaymentMessages replaces
nested reset-message conditions. resetTransaction names the cleanup handler.
Calculation logic remained in logic.js. All 26 tests and browser payment/reset
checks passed after refactoring. No framework or visual redesign was introduced.

## 14. AI-assisted development

The student supplied the scenario, approved the stack, and requested individual
checkpoints. AI generated scoped code/tests/docs and ran available checks.
Cart, payment, and snapshot work used failing tests before implementation.
The validation audit added coverage for existing behavior without claiming a
new RED/GREEN cycle. Browser checks supplemented pure tests.

AI_LOG.md records prompts, responses, decisions, and verification. Student
evaluation/modification entries are explicitly drafts, not fabricated personal
assessments. The student must review the source, rerun tests, rewrite those
drafts in their own words, and supply their name/repository details as appropriate.

## 15. Git/GitHub workflow

Verified state: main branch, no commits yet, project files untracked. AI has
not staged, committed, or pushed. No GitHub remote/push was verified.

The intended workflow is student review → tests → git status → stage → inspect
status → meaningful commit → student push. No branches or pull requests.
Commit prefixes follow AGENTS.md. AI-log commit messages are suggestions only.

The current checkout does not demonstrate the required incremental committed
history. Do not claim it does or fabricate past commits. An actual fix remains
pending approval; do not invent a fix merely to obtain a commit prefix.

## 16. Known limitations

- Keyboard quantity-control focus loss remains unresolved.
- Current Git history has no commits; GitHub publishing is unverified.
- Orders/receipts disappear on reload; there is no history or persistence.
- Payments are simulations; the QR placeholder is not scannable.
- Tailwind CDN needs connectivity and emits its standard development-use warning.
- Modern browser support for ES modules, Intl, and crypto.randomUUID is needed.
- Tests cover pure logic; browser interactions require the documented manual checks.
- Student identity, repository URL, screenshots for the exam, and personal
  evaluation drafts still need student completion.

## 17. Optional features intentionally excluded

Inventory/stock deduction, login, admin/product management, search, categories,
decorative product images, discounts, reports, transaction history, database
persistence, printing, real QR generation/payment gateways, themes, fullscreen
enhancements, and additional platforms were excluded to keep the required flow
simple, functional, and explainable.
