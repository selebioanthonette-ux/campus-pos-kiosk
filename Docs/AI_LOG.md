# AI development log

## Checkpoint 11 - Final examination verification

- **Prompt used:** Verify all 20 instructor checks, run all tests, inspect the
  project and report submission issues without refactoring or committing.
- **AI response summary:** Ran fresh automated and browser checks, inspected
  files/docs, and updated verification records only.
- **My evaluation (student draft):** Repeat the checklist and assess the pending
  keyboard-focus defect, Git history, and personal documentation details.
- **Modifications/decisions (student draft):** No student edits recorded. No
  application code change, commit, or push was performed.
- **Testing performed:** 26 tests passed; all 20 instructor browser checks passed;
  four transactions had distinct references. No JavaScript console errors.
  Known focus bug and no-commit Git state remain outstanding.

## Checkpoint 8 - Read-only debugging (recorded during documentation)

- **Step / commit:** Investigation only; no fix or commit created.
- **Prompt:** Find an actual error, reproduce and explain its cause, then wait
  for approval before fixing it.
- **AI response:** Reproduced keyboard-focus loss after cart quantity updates:
  replaceChildren removes the active control and focus moves to BODY.
- **Evaluation (student draft):** Reproduce two Enter presses on the quantity +
  button and review the proposed focus-preservation fix.
- **Modifications/decisions:** No approval/fix recorded. Refactoring preserved behavior.
- **Testing:** All 26 tests passed; browser confirmed first Enter increases
  Coffee to 2 and second Enter does nothing. No implementation files changed.

## Checkpoint 10 - Documentation

- **Prompt used:** Document only the application actually built, including all
  requested sections, testing, unresolved bugs, refactoring, AI use, and Git state.
- **AI response summary:** Added DOCUMENTATION.md and corrected README/current
  plan context. Preserved historical test evidence and recorded the unfixed
  keyboard-focus bug and absence of committed Git history.
- **My evaluation (student draft):** Compare the report with source and actual
  browser behavior; replace this draft with my own assessment.
- **Modifications/decisions (student draft):** No student edits recorded yet.
  Student name, repository URL, exam screenshots, and personal evaluation remain
  for me to supply. No application code changed in this checkpoint.
- **Testing performed:** `node --test`: 26 passed, 0 failed, 0 skipped;
  `git diff --check` passed. No new browser testing is claimed for this
  documentation-only checkpoint.

## Checkpoint 1 - Initial project setup

- **Step / commit:** Initial project setup: prepare kiosk project and test structure
  (suggested message only; no commit created).
- **Prompt:** Implement only P1 using HTML, vanilla JavaScript, Tailwind CDN,
  Node tests, and local static serving; verify and stop without committing.
- **AI response:** Added a minimal welcome page, separate application/business
  logic module scaffolding, an import smoke test, Git exclusions, and setup docs.
- **Evaluation (student draft):** Check the module separation and reproduce the
  documented browser/test checks. This checkpoint does not prove POS functionality.
- **Modifications (student draft):** No student modifications recorded yet;
  rewrite after reviewing the files.
- **Verification:** Node smoke test: 1 passed, 0 failed. Both JavaScript syntax
  checks passed. Page and modules returned HTTP 200. Browser displayed
  "Application ready." with no JavaScript errors; the expected Tailwind CDN
  development warning was present. Initial sandbox connectivity failed;
  an approved server/HTTP retry and fresh browser tab succeeded.

## Checkpoint 2 - Touchscreen application interface

- **Step / commit:** Create application interface: add responsive touchscreen
  kiosk layouts (suggested only; no commit created).
- **Prompt:** Build only the required touchscreen layouts with six sample
  products; verify desktop and smaller viewports; do not commit or push.
- **AI response:** Added eight static screen layouts, shared control styles,
  a labeled preview selector, sample order/receipt values, and disabled POS
  actions. No business logic or optional features were added.
- **Evaluation (student draft):** Review readability, spacing, labels, and all
  screen previews. Static values do not prove calculations or payment behavior.
- **Modifications (student draft):** No student modifications recorded yet.
  Rewrite after reviewing the interface and source.
- **Verification:** Existing Node suite: 1 passed, 0 failed. JavaScript syntax
  check passed. All eight previews checked at 1280×900 and 390×844: no page
  horizontal overflow and visible buttons at least 56px tall. Browser console
  had no JavaScript errors. Visual review prompted a CSS specificity adjustment
  to preserve button padding against the Tailwind CDN reset.

## Checkpoint 3 - Product selection and cart

- **Step / commit:** Implement core functionality: select products and calculate
  cart totals (suggested only; no commit created).
- **Prompt:** Implement only product addition, quantity controls, removal, and
  subtotal/total calculations using TDD; verify the instructor sequence.
- **AI response:** Added the hard-coded centavo catalog and pure cart helpers,
  live DOM rendering, empty state, and action feedback. Checkout stays disabled;
  payment and receipt layouts remain static samples.
- **Evaluation (student draft):** Review the pure functions and repeat the
  instructor sequence. Integer centavos avoid decimal calculation errors;
  reloading clears the in-memory cart. No payment behavior is proven here.
- **Modifications (student draft):** No student changes recorded yet. Review
  the decision to remove an item when its quantity decreases from one.
- **Verification:** RED: 6 failing cart tests, 1 passing setup test. GREEN:
  7 passed, 0 failed. Browser totals: ₱175 → ₱220 → ₱175 → ₱140; decreasing
  remaining items to zero produced an empty cart and ₱0. Phone layout checked
  at 390×844 with no page overflow; no browser JavaScript errors.

## Checkpoint 4 - Order review and payment selection

- **Step / commit:** Implement core functionality: review orders and select
  payment methods (suggested only; no commit created).
- **Prompt:** Connect the cart to review, preserve it through Back, and navigate
  to Cash/QR/Card interfaces; verify ₱140; do not process payments or commit.
- **AI response:** Added live summary rows and totals, Back/Continue navigation,
  active payment-choice buttons, and matching live totals in payment interfaces.
  Removed the temporary preview selector; payment submissions remain disabled.
- **Evaluation (student draft):** Verify the summary uses the same cart and pure
  calculations. Back should preserve state, and later edits should refresh totals.
- **Modifications (student draft):** No student modifications recorded yet.
- **Verification:** 7 existing tests passed. Browser showed Coffee ×2 and
  Sandwich ×1 totaling ₱140; Back preserved cart exactly; all three payment
  routes showed ₱140 with submission disabled. After an edit, summary updated
  to ₱185. Phone summary had no overflow. No browser JavaScript errors.

## Checkpoint 5 - Payment processing

- **Step / commit:** Implement core functionality: process cash and simulated
  QR and card payments (suggested only; no commit created).
- **Prompt:** Implement the three payment methods and calculations, test the
  logic, run the full suite, and stop without committing or pushing.
- **AI response:** Added pure centavo payment calculations, friendly cash
  validation, QR confirmation, one-second card processing, result feedback,
  and control locking after payment. No payment providers or receipts added.
- **Evaluation (student draft):** Reproduce invalid cash and all three success
  paths. Check paid/change consistency and that rejected cash does not complete.
  Full confirmation/receipt/reset still awaits Checkpoint 6.
- **Modifications (student draft):** No student modifications recorded yet.
  Review the cash format rule (at most two decimal places).
- **Verification:** RED: 7 new failures, 7 existing passes. GREEN: 14 passes.
  Browser verified blank/invalid/negative/insufficient cash rejection, ₱60
  change for ₱200 against ₱140, exact cash, QR, card processing and zero change.
  No browser JavaScript errors. Reloaded between completed-payment checks.

## Checkpoint 6 - Confirmation, receipt, and reset

- **Step / commit:** Implement core functionality: generate transaction receipts
  and reset the kiosk (suggested only; no commit created).
- **Prompt:** Add complete success/receipt fields, unique references, immutable
  receipt snapshots, and New Transaction; verify repeated transactions.
- **AI response:** Added copied/frozen transaction snapshots, UUID references,
  Philippine-time dates, live success/receipt rendering, and complete state/DOM
  cleanup through New Transaction. Product catalog is preserved.
- **Evaluation (student draft):** Inspect snapshot copying/freezing and reset
  cleanup. Reproduce multiple transactions and compare receipt references.
- **Modifications (student draft):** No student modifications recorded yet.
- **Verification:** RED: 3 failures, 14 existing passes. GREEN: 17 passes.
  Browser completed Cash/QR/Card without reload, all with distinct references;
  correct receipt fields and reset confirmed. Rejected cash produced no receipt.
  Phone receipt had no overflow and no browser JavaScript errors occurred.

## Checkpoint 7 - Input validation and error feedback

- **Step / commit:** Add input validation: verify payment safeguards and improve
  cash error feedback (suggested only; no commit created).
- **Prompt:** Audit required quantity/cash validation, rejection safety, exact
  and excess payment, QR/card consistency, and empty-cart prevention.
- **AI response:** Added nine focused validation verification tests and improved
  cash error accessibility/focus and recovery. Existing calculation rules met
  the requirements; no unrelated redesign or new features were added.
- **Evaluation (student draft):** Repeat the validation table in TESTING.md.
  Check rejected payments stay on Cash and cannot produce a reference/receipt.
- **Modifications (student draft):** No student modifications recorded yet.
- **Verification:** 26 tests passed. Browser verified all required rejected cash
  cases and cleared error state when edited; exact/excess cash, QR/card receipts,
  quantity removal, and empty-cart blocking passed. No JavaScript errors.

## Checkpoint 9 - Refactor application code

- **Step / commit:** Refactor application code: share payment feedback and
  control handling (suggested only; no commit created).
- **Prompt:** Refactor for readability without changing behavior, run all tests,
  verify the main flow, and stop without committing or pushing.
- **AI response:** Extracted setPaymentFeedback and setPaymentButtonsDisabled;
  replaced the reset-message ternary with initialPaymentMessages; named the
  resetTransaction handler. Business logic and UI appearance were unchanged.
- **Evaluation (student draft):** Compare repeated feedback/button handling
  before and after; repeat all payment/reset paths. Smaller named operations
  make payment and reset responsibilities easier to explain.
- **Modifications (student draft):** No student modifications recorded yet.
- **Verification:** 26 tests passed. Browser completed Cash/QR/Card for ₱140,
  verified receipt amounts and reset after each, and rejected insufficient cash.
  No browser JavaScript errors. The previously identified keyboard-focus bug
  was not fixed; specific approval was not supplied.
