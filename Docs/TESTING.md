# Testing

## Checkpoint 1 checks

Run from the project root:

```powershell
node --test
python -m http.server 8000 --bind 127.0.0.1
```

If the Python launcher is unavailable, use the bundled executable documented
in README.md.

Browser checks at http://127.0.0.1:8000/:

1. The title is Campus POS Kiosk.
2. The welcome text is readable.
3. "Loading application..." changes to "Application ready." through js/app.js.
4. No JavaScript errors appear in the browser console.
5. No product, cart, payment, or receipt controls appear yet.

The automated smoke test imports js/logic.js in Node. No business rules exist
yet, so RED/GREEN business-logic tests begin in the relevant later checkpoint.

## Actual verification

Verified on October 9, 2026:

- Node v24.19.0: `node --test` completed with 1 test passed, 0 failed,
  0 skipped, and 0 cancelled. This is scaffolding coverage only.
- `node --check js/app.js` and `node --check js/logic.js` exited successfully.
- Started the bundled Python server using the command in README.md.
- `Invoke-WebRequest` for `/`, `/js/app.js`, and `/js/logic.js` returned HTTP 200.
- Browser displayed Campus POS Kiosk, welcome text, and "Application ready."
- Browser console: no JavaScript errors; Tailwind emitted its standard warning
  that its CDN is intended for development rather than production.
- Visually checked the minimal page; no POS controls are present.

The first sandboxed HTTP attempt failed with a socket-permission error, and
the first browser tab timed out. Retrying outside the sandbox and opening a
fresh browser tab completed verification. No application bug was identified.

## Checkpoint 2 verification

The Checkpoint 1 browser content checks above are historical. The page now
opens on Item Selection with "Item Selection preview ready."

Verified all eight views using the Preview screen selector at 1280×900 and
390×844: Item Selection, Order Summary, Payment Method, Cash, QR, Card,
Payment Successful, and Digital Receipt. Each view had no page-level horizontal
overflow; its visible buttons were at least 56px tall. Browser console errors:
none. Product/card and receipt layouts were visually inspected at both widths.

`node --test`: 1 passed, 0 failed. `node --check js/app.js`: passed.
The existing automated test remains scaffolding coverage only; responsive
checks were performed in the browser, not added as business-logic tests.

To repeat the browser checks:

1. Open the local page and confirm all six sample product names/prices.
2. At desktop width, check the product grid beside Your order.
3. At phone width, check products above the cart; scroll to see the complete order.
4. Use Preview screen to inspect all eight layouts. Check Back/Continue controls,
   three payment choices, cash label/change, identified QR placeholder, card
   processing-state text, confirmation fields, and complete receipt fields.
5. Confirm transaction buttons and the cash input are disabled. Only preview
   switching works; no cart or payment behavior is expected at this checkpoint.
6. Confirm readable text, no page horizontal overflow, and no console errors.

## Checkpoint 3 verification

The previous disabled-product checks are historical: product and cart controls
are now active. Other layouts remain static previews.

TDD RED: `node --test` ran before cart implementation: 6 cart tests failed
because cart functions were missing, and the setup smoke test passed.
GREEN: all 7 tests passed after implementation, with 0 failures or skips.
`node --check js/app.js` and `git diff --check` also passed.

Automated coverage includes the complete instructor sequence, empty total,
removal at zero, repeated decrease of an absent item, explicit removal, unknown
products, invalid quantity changes, and preservation of previous cart state.

Actual browser clicks confirmed:

| Action | Coffee subtotal | Total |
|---|---:|---:|
| Coffee ×2, Sandwich ×1, Soft Drink ×1 | ₱90.00 | ₱175.00 |
| Increase Coffee to 3 | ₱135.00 | ₱220.00 |
| Decrease Coffee to 2 | ₱90.00 | ₱175.00 |
| Remove Soft Drink | ₱90.00 | ₱140.00 |
| Decrease remaining items to zero | No items | ₱0.00 |

Browser console: no JavaScript errors. At 390×844, the live cart had no
page-level horizontal overflow and buttons were at least 56px tall.

Repeat by reloading to an empty cart, then performing the table's sequence.
Verify item names, unit prices, quantities, subtotals, total, and feedback text
after each action. Verify Remove on an item and decrease from one both remove
it. Continue remains disabled; payment and receipt previews do not use this cart.

## Checkpoint 4 verification

Previous preview-selector and disabled-review instructions are historical.
Use the actual Back/Continue controls now. No new pure calculation rules were
introduced; existing logic tests were retained and navigation was checked in
the browser. Full suite: 7 passed, 0 failed. JavaScript syntax and diff checks passed.

Actual browser results:

- Added Coffee twice, Sandwich once, Soft Drink once, then removed Soft Drink.
- Order Summary: Coffee ×2, unit ₱45, subtotal ₱90; Sandwich ×1, unit ₱50,
  subtotal ₱50; total ₱140. Soft Drink absent.
- Back to Items: cart contents matched the before-review text exactly; total ₱140.
- Continued forward: all three payment buttons available.
- Cash, QR, and Card each opened the matching interface and displayed ₱140.
  Back to Payment Methods worked each time. Payment-submit buttons remained disabled.
- Returned to Items and increased Coffee to 3: summary refreshed to Coffee ₱135
  plus Sandwich ₱50, total ₱185. This verifies edits do not leave stale summary values.
- Empty initial cart: Continue to Order Summary disabled.
- Phone summary at 390×844: no horizontal page overflow; buttons at least 56px tall.
- Browser JavaScript errors: none.

Repeat the same steps in the browser. Confirm order quantities, unit prices,
subtotals, total, and Back preservation before selecting each payment method.

## Checkpoint 5 verification

TDD RED: 7 new payment tests failed because calculatePayment did not exist;
all 7 existing tests passed. GREEN and full suite: 14 passed, 0 failed,
0 skipped. JavaScript syntax and diff checks passed.

Pure tests cover cash change for ₱140/₱200 and ₱175/₱200, exact payment,
insufficient payment, malformed/blank/negative cash, decimal centavo precision,
QR/card paid/change, unsupported methods, invalid totals, and unsafe amounts.

Browser checks used Coffee ×2 + Sandwich ×1 = ₱140:

| Payment action | Actual result |
|---|---|
| Cash blank, abc, -1 | Friendly invalid-input message; retry remains available |
| Cash 100 | Insufficient payment; asks for at least ₱140; no success |
| Cash 200 | Success; paid ₱200, change ₱60; controls lock |
| Cash 140 | Success; paid ₱140, change ₱0 |
| Confirm QR Payment | Simulated success; paid ₱140, change ₱0 |
| Process Card | Processing message and disabled Back/submit, then success; paid ₱140, change ₱0 |

Browser JavaScript errors: none. Tests of separate completed payments used a
page reload because receipt/reset is not implemented yet. Success remains on
the payment screen; hidden sample success/receipt layouts are not generated
transactions and remain unreachable.

Repeat by building the same order, navigating to the desired method, and
performing the table's actions. Confirm rejected cash stays on Cash and permits
correction. Observe the card processing state before success. Verify the QR
placeholder says it is simulated and not scannable. Reload between successful
payments until Checkpoint 6 adds the New Transaction flow.

## Checkpoint 6 verification

TDD RED: 3 snapshot tests failed because createTransaction was missing; the
14 existing tests passed. GREEN/full suite: 17 passed, 0 failed, 0 skipped.
Tests verify all receipt values, frozen/copied nested items, independence from
mutated cart/payment objects, and QR/card snapshot paid/change consistency.
JavaScript syntax and diff checks passed.

Actual browser checks completed three transactions without reloading:

| Method | Items | Total | Paid | Change |
|---|---|---:|---:|---:|
| Cash | Coffee ×2, Sandwich ×1 | ₱140 | ₱200 | ₱60 |
| QR Payment | Coffee ×1 | ₱45 | ₱45 | ₱0 |
| Credit/Debit Card | Bottled Water ×1 | ₱20 | ₱20 | ₱0 |

All three displayed Payment Successful and distinct TXN-UUID references.
Receipts included reference, Philippine date/time, purchased items, quantity,
unit prices, subtotals, total, method, paid, change, and successful status.
Rejected ₱100 cash left the customer on Cash with no reference or receipt rows.

After the cash receipt, New Transaction returned to selection with ₱0 total,
empty cart, blank cash input, cleared change, zero receipt rows, all transaction
fields blank, six product buttons, and payment buttons re-enabled. Subsequent
QR/Card completions prove payment/success locks and processing state reset.
Phone receipt at 390×844: no page overflow, 56px New Transaction button.
Browser JavaScript errors: none.

Repeat with Cash, select View Receipt, inspect every field, then select New
Transaction and verify no previous customer data remains. Complete QR or Card
and compare references. The older reload-between-payments instructions above
are historical; the New Transaction button is now the supported flow.

## Checkpoint 7 validation audit

Full suite: 26 passed, 0 failed, 0 skipped. Nine additional verification tests
passed against the existing validation logic: individual cash rejection cases,
one-cent boundaries, and repeated add/decrease cycles. No missing business rule
was found; these are coverage additions, not a claimed RED/GREEN implementation.
The only application change improves cash error accessibility: aria-invalid,
focus on the rejected field, and clearing stale error feedback when editing.

| Case | Verification | Result |
|---|---|---|
| Negative quantities | Decrease at one removes item; repeated absent-item decreases tested | PASS |
| Invalid quantity changes | Fractional, nonnumeric, zero, and unsupported deltas rejected | PASS |
| Blank/whitespace cash | Automated and browser rejection | PASS |
| Nonnumeric cash | Automated and browser rejection | PASS |
| Negative cash | Automated and browser rejection | PASS |
| ₱100 against ₱140 | Rejected; message asks for at least ₱140 | PASS |
| Each rejected browser payment | Cash remains visible; no reference; zero receipt rows; field marked/focused | PASS |
| Correcting invalid cash | Editing clears aria-invalid and stale error; retry works | PASS |
| ₱140 against ₱140 | Receipt paid ₱140, change ₱0 | PASS |
| ₱200 against ₱140 | Receipt paid ₱200, change ₱60 | PASS |
| QR against ₱140 | Receipt paid ₱140, change ₱0 | PASS |
| Card against ₱140 | Receipt paid ₱140, change ₱0 | PASS |
| Empty-cart checkout | Continue disabled initially and after removing the last item | PASS |
| One-cent boundaries | 139.99 rejected; 140.01 gives 0.01 change (automated) | PASS |
| Malformed/unsafe cash | Exponent, trailing text, excess decimals, unsafe value rejected (automated) | PASS |

No browser JavaScript errors occurred. Repeat invalid cases before a valid cash
payment; verify the error message and absence of success/receipt. Use New
Transaction between accepted payments, then inspect paid/change on each receipt.

## Checkpoint 9 refactor verification

`node --test`: 26 passed, 0 failed, 0 skipped. `node --check js/app.js` and
`git diff --check` passed. No tests were deleted or weakened.

Browser exercised selection → summary → payment → success → receipt → reset
for all methods without reloading. Cash ₱100 against ₱140 was rejected; Cash
₱200 produced ₱60 change; QR/Card each paid ₱140 with ₱0 change. Each reset
returned total to ₱0, cleared cash/receipt rows, and re-enabled payment buttons.
Browser JavaScript errors: none.

Known issue from the read-only debugging checkpoint: quantity updates replace
the cart controls, causing keyboard focus to move to BODY. Repeated Enter on
a previously focused quantity button does not repeat the change. This remains
unfixed pending specific approval; this refactor does not claim to resolve it.

## Checkpoint 10 documentation verification

Ran `node --test` on the unchanged application: 26 tests passed, 0 failed,
0 skipped, 0 cancelled. `git diff --check` passed. No new browser testing was
performed in this documentation-only checkpoint; earlier browser results
remain historical evidence. The known keyboard-focus error remains unresolved.

## Checkpoint 11 final verification

Fresh `node --test`: 26 passed, 0 failed, 0 skipped. Both JavaScript syntax
checks passed. A fresh browser run passed all 20 requested instructor checks:
startup, six products, ₱175 → ₱220 → ₱175 → ₱140, matching summary, Back
preservation, all payment options, insufficient/invalid cash rejection, excess
and exact cash, accurate confirmation/receipt, QR/Card simulation, visible card
processing, complete reset, distinct references, and no console errors.

Cash ₱200 against ₱140 gave ₱60 change; exact cash/QR/Card each paid ₱140 with
zero change. Four transactions completed without reloading had distinct UUIDs.
Each reset cleared cash, receipt rows, transaction fields and total, retaining
six products. Rejected cash remained on Cash and created no receipt.

Required application/test/doc files are present. Tested navigation/calculations
passed; no unnecessary optional features found. Historical notes are labeled
and consolidated docs reflect current limitations. Known keyboard-focus loss
remains unfixed, and Git has no commits on main, with project files untracked.
These submission issues remain despite passing the 20 transaction checks.
