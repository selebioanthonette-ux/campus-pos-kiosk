# IT415 Practical Exam — AI Prompt Log

## Project
Campus POS Kiosk

## Scenario
Touchscreen Point of Sale (POS) Kiosk System

## AI Development Rules

- Work on only one checkpoint at a time.
- Do not build the entire application in one step.
- Read `AGENTS.md` and the current project files before making changes.
- Prioritize required functionality over optional enhancements.
- Keep the implementation simple, readable, testable, and explainable.
- Do not add a backend, database, authentication, real payment gateway,
  inventory system, or other optional features unless explicitly requested.
- Test every checkpoint before considering it complete.
- Do not create fake bugs or fake debugging evidence.
- Do not create branches or pull requests.
- Work on `main`.
- Do not make Git commits or push to GitHub unless I explicitly ask.
- After completing a checkpoint, summarize:
  1. What you changed
  2. Files changed
  3. How you tested it
  4. Test results
  5. Any issues or decisions I should understand
- Stop after each checkpoint and wait for my next instruction.


---

# P0 — Requirements Analysis

Analyze the provided IT415 Practical Exam Practice scenario for a
Touchscreen Point of Sale (POS) Kiosk System.

Do NOT write or generate application code yet.

Based only on the scenario, identify:

1. Problem definition
2. Target users
3. Main transaction flow
4. Functional requirements
5. Inputs
6. Outputs
7. Business rules and calculations
8. Input validation requirements
9. Data requirements
10. UI/UX requirements
11. Testing requirements
12. Recommended technology stack
13. Development checkpoints
14. Scope control

Clearly separate REQUIRED requirements from your RECOMMENDATIONS.

Recommend the simplest technology appropriate for a timed individual
practical examination.

Do not add unnecessary frameworks, databases, APIs, authentication,
or optional features.

Prioritize a simple, functional, testable, and explainable application.

Do not generate application code.

---

# P1 — Initial Project Setup

Read `AGENTS.md`, `PROMPTS.md`, and the approved requirements analysis
before making changes.

Implement ONLY Checkpoint 1: Initial Project Setup.

Use this technology approach:

- HTML5
- Vanilla JavaScript
- Tailwind CSS via CDN
- Hard-coded product data
- In-memory transaction state
- Node built-in test runner if available
- Local static server for browser testing

Create a clean project structure appropriate for the POS kiosk.

The setup should include:

- Minimal runnable `index.html`
- JavaScript structure for application and reusable business logic
- Test directory and initial test scaffolding
- `.gitignore`
- `README.md`
- Documentation directory if needed

Do NOT implement the POS features yet.

Do NOT build:
- Product selection functionality
- Cart functionality
- Payment processing
- Receipt generation
- Optional enhancements

Verify that:

1. The application can be served/opened locally.
2. The initial page loads without JavaScript errors.
3. The test command can run successfully.

After verification, show me:

- Files created
- Purpose of each important file
- Commands used for verification
- Test results
- `git status`

Do NOT commit or push.

Stop after Checkpoint 1.

---

# P2 — Touchscreen Application Interface

Implement ONLY Checkpoint 2: Application Interface.

Do not implement the full business logic yet.

Create the touchscreen POS interface required by the scenario.

Include:

- At least six visible product cards
- Product names and prices
- Large touchscreen-friendly controls
- Clearly accessible cart/order area
- Order Summary layout
- Payment Method layout
- Cash Payment layout
- QR Payment layout
- Card Payment layout
- Payment Successful layout
- Digital Receipt layout
- Clear Back and Continue controls where appropriate

The interface should have:

- Large buttons
- Readable text
- Sufficient spacing
- Understandable labels
- Minimal typing
- Responsive layout
- Clear visual feedback areas

Use the sample products:

- Coffee — ₱45
- Sandwich — ₱50
- Soft Drink — ₱35
- Cookies — ₱25
- Bottled Water — ₱20
- Chocolate — ₱25

Do not add decorative or optional features such as:

- Login
- Inventory
- Search
- Categories
- Reports
- Discounts
- Theme switching
- Product management

Verify the interface at desktop and smaller viewport sizes.

Do NOT commit or push.

Report what changed and stop after Checkpoint 2.

---

# P3 — Product Selection and Cart

Implement ONLY Checkpoint 3: Product Selection and Cart.

Use test-driven development for business logic where practical.

Implement:

- Select/add products
- Increase quantity
- Decrease quantity
- Remove product
- Prevent negative quantities
- Display quantity
- Display unit price
- Calculate item subtotal
- Calculate order total
- Automatically recalculate after cart changes

Use:

Item subtotal = unit price × quantity

Order total = sum of all item subtotals

Verify the instructor's calculation sequence:

1. Coffee ×2 = ₱90
2. Sandwich ×1 = ₱50
3. Soft Drink ×1 = ₱35
4. Total = ₱175

Then:

5. Increase Coffee to ×3
6. Coffee subtotal = ₱135
7. Total = ₱220

Then:

8. Decrease Coffee to ×2
9. Total returns to ₱175

Then:

10. Remove Soft Drink
11. Total becomes ₱140

Add or update automated tests for calculation logic.

Run the full test suite.

Do NOT implement payment processing or receipts yet.

Do NOT commit or push.

Report:
- Logic implemented
- Tests added
- Test results
- Files changed
- `git status`

Then stop.

---

# P4 — Order Review and Payment Selection

Implement ONLY Checkpoint 4: Order Review and Payment Selection.

Implement the required flow from the cart to order review.

Requirements:

- Continue from Item Selection to Order Summary
- Show all selected products
- Show quantities
- Show unit prices/subtotals
- Show correct total
- Order Summary must match the cart
- Back must return to Item Selection
- Back must preserve all selected products and quantities

After confirming the order, show three large payment options:

1. Cash
2. QR Payment
3. Credit/Debit Card

Selecting a payment method should navigate to the correct payment interface.

Do not complete actual payment processing yet.

Test specifically that:

Coffee ×2 + Sandwich ×1 = ₱140 after Soft Drink is removed.

Navigate:

Item Selection
→ Order Summary
→ Back
→ Item Selection

Verify the cart remains unchanged.

Then navigate forward and verify all three payment methods are available.

Run all existing tests.

Do NOT commit or push.

Report results and stop.

---

# P5 — Payment Processing

Implement ONLY Checkpoint 5: Payment Processing.

Implement all three required payment methods.

## Cash

Display:

- Total amount due
- Amount Paid input
- Pay Now button

Implement successful cash calculation:

change = amount paid - total

Valid payment requires:

amount paid >= total

Do not complete payment when the amount is insufficient.

## QR Payment

Display:

- Amount due
- QR code placeholder clearly identified as simulated
- Instructions to scan
- Confirm Payment button

No real QR/payment integration is required.

Confirmation should simulate successful payment.

For QR:

amount paid = total
change = ₱0

## Credit/Debit Card

Display:

- Amount due
- Tap/insert/swipe instructions
- Process Payment button
- Short processing state

Simulate successful card processing.

For Card:

amount paid = total
change = ₱0

Do not implement optional payment integrations.

Add/update automated tests for pure payment calculations where practical.

Run the full test suite.

Do NOT commit or push.

Report results and stop.

---

# P6 — Payment Success, Receipt, and New Transaction

Implement ONLY Checkpoint 6: Receipt and Transaction Reset.

After a successful payment, display:

- Payment Successful message
- Transaction total
- Amount paid
- Payment method
- Unique transaction/reference number
- View Receipt button

Generate a unique transaction reference for every completed transaction.

The digital receipt must contain:

- Transaction/reference number
- Date
- Purchased items
- Quantities
- Unit prices
- Item subtotals
- Total
- Payment method
- Amount paid
- Change
- Successful status

The receipt must use a snapshot of the completed transaction so later
state changes cannot alter the receipt.

Implement New Transaction.

New Transaction must clear:

- Cart
- Quantities
- Subtotals
- Total
- Selected payment method
- Cash input
- Amount paid
- Change
- Processing/success state
- Previous receipt
- Previous transaction information

Then return to Item Selection with:

- Empty cart
- ₱0 total

Do NOT remove the product catalog.

Complete at least two transactions and verify that their transaction
references are different.

Run all automated tests.

Do NOT commit or push.

Report results and stop.

---

# P7 — Input Validation and Error Feedback

Implement and verify the complete required validation behavior.

Do not redesign unrelated features.

Validate:

## Quantity

- Quantity must never become negative.
- Invalid quantity states must be prevented.

## Cash

Reject:

- Blank amount
- Non-numeric amount
- Negative amount
- Amount below the total

For rejected payments:

- Stay on the payment screen
- Display a clear error message
- Do NOT create a successful transaction
- Do NOT create a successful receipt

Accept:

- Exact payment
- Payment above the total

Verify:

Total ₱140
Paid ₱100
→ Reject

Total ₱140
Paid ₱140
→ Accept
→ Change ₱0

Total ₱140
Paid ₱200
→ Accept
→ Change ₱60

Also verify QR and Card payments produce:

amount paid = total
change = ₱0

If empty-cart checkout prevention has already been implemented as an
approved usability safeguard, verify it as well.

Add/update automated tests for validation logic.

Run the full test suite.

Do NOT commit or push.

Report all validation cases tested and their results.

Stop after Checkpoint 7.

---

# P8 — Real Application Error / Debugging

Do NOT invent a bug.

First run the application and existing tests and identify an ACTUAL
functional error, regression, or requirement mismatch.

If a genuine error exists:

1. Reproduce it.
2. Describe:
   - Expected behavior
   - Actual behavior
   - Steps to reproduce
3. Investigate the root cause.
4. Explain the root cause to me BEFORE changing the implementation.

STOP and wait for my approval before applying the fix.

Do not modify unrelated code.

Do not commit or push.

If no genuine error can be found after reasonable testing, tell me that
honestly. Do not create an artificial error just to produce a Git commit.

---

# P8B — Apply Approved Bug Fix

The previously identified bug and root cause are approved.

Before changing production code:

1. Add a regression test that reproduces the bug when practical.
2. Confirm the test fails for the expected reason.
3. Apply the smallest appropriate fix.
4. Run the regression test again.
5. Run the complete test suite.
6. Manually verify the affected user flow.

Do not modify unrelated functionality.

Report:

- Root cause
- Test added
- Fix made
- Before/after behavior
- Full test results
- Files changed
- `git status`

Do NOT commit or push.

Stop after the fix is verified.

---

# P9 — Refactor Application Code

The required functionality should now be working.

Refactor the application WITHOUT changing its behavior.

Review for:

- Duplicated logic
- Large functions
- Unclear function/variable names
- Repeated DOM operations
- Mixed business logic and interface logic
- Unnecessary complexity
- Poor organization

Only refactor where it clearly improves:

- Readability
- Maintainability
- Testability
- Explainability

Do NOT:

- Add new features
- Change the UI unnecessarily
- Change required behavior
- Add frameworks
- Add optional enhancements

Run the complete automated test suite after refactoring.

Manually verify the main transaction flow.

Report exactly what was refactored and why.

Do NOT commit or push.

Stop after Checkpoint 9.

---

# P10 — Documentation

Implement ONLY the documentation checkpoint.

Update the project documentation to accurately describe the application
that was actually built.

Document:

1. Project title
2. Problem definition
3. Target users
4. Functional requirements
5. Technology stack
6. Project structure
7. Setup/run instructions
8. Main transaction flow
9. Business rules/calculations
10. Input validation
11. Testing performed
12. Bugs discovered and fixes
13. Refactoring performed
14. AI-assisted development process
15. Git/GitHub workflow
16. Known limitations
17. Optional features intentionally excluded

Update the AI development log with:

- Prompt used
- AI response summary
- My evaluation
- Modifications/decisions
- Testing performed

Do not claim that functionality or testing exists unless it actually does.

Run the full test suite once more.

Do NOT commit or push.

Report documentation files changed and stop.

---

# P11 — Final Examination Verification

Perform a FINAL VERIFICATION of the application.

Do not add new features unless a required feature is missing.

Test the complete instructor flow:

1. Application starts correctly.
2. At least six products appear.
3. Coffee ×2 + Sandwich ×1 + Soft Drink ×1 = ₱175.
4. Coffee ×3 changes total to ₱220.
5. Coffee back to ×2 returns total to ₱175.
6. Removing Soft Drink changes total to ₱140.
7. Order Summary matches the cart.
8. Back preserves the cart.
9. Cash, QR Payment, and Credit/Debit Card are available.
10. ₱100 cash for ₱140 is rejected.
11. ₱200 cash for ₱140 succeeds with ₱60 change.
12. Exact ₱140 succeeds with ₱0 change.
13. Successful payment information is correct.
14. Receipt information is correct.
15. QR simulation works.
16. Card simulation and processing state work.
17. New Transaction clears previous transaction state.
18. A second completed transaction receives a different reference.
19. Invalid/blank/negative cash inputs are rejected.
20. No obvious console errors occur.

Run all automated tests.

Then inspect the project for:

- Missing required files
- Broken navigation
- Incorrect calculations
- Unnecessary optional features
- Documentation inconsistencies

Do NOT refactor working code merely for preference.

Do NOT commit or push.

Give me a final PASS/FAIL checklist for every required function and clearly
identify anything I must fix before submission.