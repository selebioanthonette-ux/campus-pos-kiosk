# Campus POS Kiosk

IT415 practical exam project: a touchscreen self-service POS kiosk.

## Current checkpoint

Documentation is current through Checkpoint 9, with Checkpoint 10 documenting
the built application. See Docs/DOCUMENTATION.md for the complete report.
Tap products,
use +/− to adjust quantities, or Remove to delete an item. Decreasing from one
removes the item. Unit prices, subtotals, and the total update automatically.
Reloading the page clears the cart; no transaction data is stored persistently.

Continue to Order Summary shows the live cart with quantities, unit prices,
subtotals, and total. Back to Items preserves the cart for editing. Continue to
Payment offers Cash, QR Payment, and Credit/Debit Card; each opens its matching
interface with the current total. Cash validates the amount and calculates
change; QR confirms a simulated payment; Card shows a one-second processing
state before simulated completion. QR/card amount paid equals the order total.

After payment, the success screen displays the amount, method, and a UUID
reference. View Receipt shows a frozen snapshot of the completed transaction
with its Philippine-time date, items, prices, totals, payment, and change.
New Transaction clears previous order/payment/receipt details and returns to
an empty cart while retaining the product catalog. No reload is needed.
The temporary preview selector has been removed in favor of Back/Continue controls.

## Technology

- HTML5, vanilla JavaScript ES modules, and Tailwind CSS via CDN.
- Node's built-in test runner; no npm dependencies or installation step.
- Python's static HTTP server for local browser testing.
- The cart uses hard-coded products and in-memory transaction state.
  No database or persistent transaction storage is planned.

## Run locally

From the project root, with Python 3 installed:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ and check that the page says "Select your items."
Use HTTP serving rather than opening the HTML as a file because it uses ES modules.
Press Ctrl+C in the server terminal to stop it.

If `python` is unavailable, use a working Python executable. The Codex bundled
runtime used for this checkpoint is:

```powershell
& 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe' -m http.server 8000 --bind 127.0.0.1
```

Internet access is needed for Tailwind CDN styling. The HTML and application
modules are served locally.

## Tests

With Node installed, run from the project root:

```powershell
node --test
```

Alternatively, `npm test` runs the same command. Tests cover the instructor's
cart calculation sequence, empty/removal behavior, quantity safeguards, and
state updates. The setup import smoke test is retained. Payment and receipt
snapshot tests verify accurate fields and independence from later cart/payment
changes. Pure payment tests cover cash validation,
individual rejected-input cases and one-cent payment boundaries,
exact/excess payment, centavo precision, and QR/card paid/change calculations.

## Structure

```text
index.html                  Kiosk screens wired to live cart/payment/receipt state
css/styles.css              Shared touchscreen controls and responsive styles
js/app.js                   Cart/summary rendering and screen navigation
js/logic.js                 Product catalog and pure cart/calculation functions
tests/cart.test.js          Cart behavior and instructor calculation sequence
tests/payment.test.js       Pure cash and simulated-payment calculations
tests/transaction.test.js   Completed-transaction snapshot tests
tests/setup.test.js         Initial module-import smoke test
package.json                ES-module configuration and test shortcut
Docs/PLAN.md                Approved direction and checkpoint scope
Docs/TESTING.md             Verification instructions and actual results
Docs/AI_LOG.md              AI assistance and student evaluation drafts
Docs/DOCUMENTATION.md       Complete application report and known limitations
Docs/DOCUMENTATION_TEMPLATE.md  Existing examination documentation template
AGENTS.md                   Project working rules
PROMPTS.md                  Checkpoint prompts
.gitignore                  Local/generated files excluded from Git
```

Work locally on `main`. Review and verify each checkpoint before manually
staging, committing, and pushing; Codex does not perform those actions automatically.

## Known outstanding work

Quantity updates currently lose keyboard focus after rebuilding the cart.
This bug was reproduced and reported but has not been approved for a fix.
The latest verified Git state has no commits on main; files remain untracked.
No GitHub push or required development commit history is claimed.
