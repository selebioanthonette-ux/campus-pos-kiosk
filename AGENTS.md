# AGENTS.md — IT415 Touchscreen POS Kiosk

## 1. Project Context

This project is for the IT415 Application Development practical examination.

Project:

**Campus POS Kiosk — Touchscreen Point of Sale Kiosk System**

The application is a self-service touchscreen POS kiosk for a small campus
food/merchandise outlet.

Customers must be able to:

1. Select products.
2. Adjust product quantities.
3. Review their order.
4. Select a payment method.
5. Complete a simulated payment.
6. See payment confirmation.
7. View a digital receipt.
8. Start a new transaction.

This is an individual practical examination project.

The student must understand, evaluate, modify, test, and explain
AI-generated work.

Do not optimize for maximum features.

Optimize for:

- Correctness
- Simplicity
- Readability
- Testability
- Explainability
- Required functionality


---

# 2. Source of Truth

Before making changes, read:

1. `AGENTS.md`
2. `PROMPTS.md`
3. Existing project files
4. Existing tests
5. Existing documentation

The provided IT415 practical examination scenario is the primary
requirements source.

If a recommendation conflicts with an explicit scenario requirement,
follow the scenario.

Do not silently invent requirements.

Clearly distinguish:

- Required behavior
- Implementation decisions
- Optional enhancements


---

# 3. Development Workflow

Work ONE checkpoint at a time.

Do not implement future checkpoints unless they are necessary for the
current checkpoint.

For every checkpoint:

1. Read the current prompt.
2. Inspect the existing project.
3. State a short implementation plan.
4. Implement only the requested scope.
5. Test the changes.
6. Run existing relevant tests.
7. Inspect for obvious errors.
8. Summarize the work.
9. Show `git status`.
10. STOP and wait for the student's next instruction.

Do not automatically continue to another checkpoint.


---

# 4. Git and GitHub Rules

The instructor requires basic Git/GitHub workflow.

Use only:

- Local Git repository
- `main` branch
- Remote GitHub repository
- Meaningful commits
- Push to remote repository

Do NOT create:

- Feature branches
- Pull requests
- Merge workflows
- Unnecessary Git complexity

Stay on:

`main`

IMPORTANT:

Codex must NOT automatically:

- Run `git add`
- Create a Git commit
- Push to GitHub
- Rewrite Git history
- Reset commits
- Force push
- Create branches
- Merge branches

unless the student explicitly instructs Codex to perform that specific
Git action.

The student normally performs:

```bash
git status
git add .
git status
git commit -m "Meaningful commit message"
git push
```

Codex may show or recommend Git commands, but should not execute them
without explicit permission.

Development history must represent real development progress.

Never create fake changes only to produce a commit.


---

# 5. Required Development History

The project should naturally produce meaningful development checkpoints
similar to:

1. Initial project setup
2. Create application interface
3. Implement core functionality
4. Add input validation
5. Fix an actual application error
6. Refactor application code
7. Update documentation

For this POS project, core functionality may be divided into additional
meaningful commits such as:

- Product selection and cart
- Order review and payment selection
- Payment processing
- Receipt and transaction reset

Do not create empty, fake, or meaningless commits.


---

# 6. Technology Constraints

Use a simple static web application unless explicitly instructed otherwise.

Preferred stack:

- HTML5
- Vanilla JavaScript
- Tailwind CSS via CDN
- Hard-coded product catalog
- In-memory JavaScript transaction state
- Node.js built-in test runner when available
- Local static HTTP server for browser testing

Do NOT introduce without explicit approval:

- React
- Vue
- Angular
- Next.js
- Express
- Backend APIs
- Databases
- Authentication
- Payment SDKs
- Cloud services
- Build systems
- Large third-party libraries

The required application does not need a backend or database.

Keep dependencies minimal.


---

# 7. Product Catalog

Use the following six sample products for this practice:

| Product | Price |
|---|---:|
| Coffee | ₱45.00 |
| Sandwich | ₱50.00 |
| Soft Drink | ₱35.00 |
| Cookies | ₱25.00 |
| Bottled Water | ₱20.00 |
| Chocolate | ₱25.00 |

Products must be selectable using large touchscreen-friendly controls.

Customers must not need to type product names.


---

# 8. Required Transaction Flow

Preserve this logical transaction sequence:

```text
Item Selection
      ↓
Order Summary
      ↓
Payment Method
      ↓
Payment Processing
      ↓
Payment Successful
      ↓
Receipt
      ↓
New Transaction
      ↓
Item Selection
```

Screens may be combined where appropriate, but the required flow and
behavior must remain clear.

Back navigation from Order Summary must preserve the cart.


---

# 9. Cart Requirements

The application must support:

- Adding products
- Increasing quantity
- Decreasing quantity
- Removing products
- Displaying quantity
- Displaying unit price
- Displaying item subtotal
- Displaying transaction total
- Automatic recalculation

Business rules:

```text
item subtotal = unit price × quantity

order total = sum of all item subtotals
```

Quantity must never become negative.

Use whole-number quantities.

An explicit Remove action is acceptable and preferred for clarity.

Keep calculation logic separate from DOM/UI manipulation where practical.


---

# 10. Money Handling

Money calculations must be predictable and accurate.

Prefer representing monetary values internally using integer centavos
rather than floating-point decimal calculations.

Examples:

```text
₱45.00 = 4500 centavos
₱50.00 = 5000 centavos
```

Format values as Philippine pesos when displaying them.

Do not allow rounding errors to affect totals, payment, or change.


---

# 11. Order Review Requirements

Order Summary must accurately display the current cart.

Include:

- Product name
- Quantity
- Unit price and/or subtotal
- Correct total

The summary must match Item Selection.

Back must:

- Return to Item Selection
- Preserve selected products
- Preserve quantities
- Preserve the calculated order


---

# 12. Payment Methods

Provide exactly the required payment methods:

1. Cash
2. QR Payment
3. Credit/Debit Card

Use large touchscreen-friendly payment buttons.

Real payment integration is NOT required.


---

# 13. Cash Payment

Cash payment must display:

- Total amount due
- Amount Paid input
- Pay Now button

Business rule:

```text
change = amount paid - total
```

Successful cash payment requires:

```text
amount paid >= total
```

Reject:

- Blank input
- Non-numeric input
- Negative amount
- Amount below total

Exact payment must succeed:

```text
amount paid = total
change = ₱0.00
```

Payment above the total must succeed with correct change.

A rejected payment must NOT:

- Create a successful transaction
- Generate a successful receipt
- Navigate to Payment Successful


---

# 14. QR Payment

QR payment is simulated.

Display:

- Amount due
- QR code or clearly identified placeholder
- Scanning instructions
- Confirm Payment button

No real QR payment integration is required.

After simulated confirmation:

```text
amount paid = total
change = ₱0.00
```

Then continue to successful payment.


---

# 15. Credit/Debit Card Payment

Card payment is simulated.

Display:

- Amount due
- Tap/insert/swipe instruction
- Process Payment button
- Short processing state

No real card details or payment provider integration is required.

After simulated successful processing:

```text
amount paid = total
change = ₱0.00
```

Then continue to successful payment.


---

# 16. Payment Success

After successful payment, display:

- Payment Successful message
- Transaction amount
- Amount paid
- Payment method
- Unique transaction/reference number
- View Receipt button

Do not display this screen for rejected or incomplete payments.


---

# 17. Transaction Reference

Every successfully completed transaction must have a transaction/reference
number.

Different completed transactions must receive different references.

Reference generation must not depend only on resettable cart state.

Resetting the application must not cause transaction-reference reuse.


---

# 18. Digital Receipt

The receipt must accurately represent the completed transaction.

Include:

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

Prefer storing a completed transaction snapshot.

The receipt should read from the completed transaction snapshot rather
than mutable cart state so later changes cannot alter a completed receipt.


---

# 19. New Transaction

New Transaction must clear all previous customer transaction state.

Clear:

- Cart
- Quantities
- Item subtotals
- Total
- Selected payment method
- Cash input
- Amount paid
- Change
- Processing state
- Payment success state
- Previous receipt
- Previous completed transaction information

Return to:

`Item Selection`

Expected state:

```text
Cart: empty
Total: ₱0.00
```

Do NOT remove the product catalog.


---

# 20. UI/UX Rules

This is a touchscreen kiosk.

Prioritize:

- Large tappable controls
- Readable text
- Clear product names and prices
- Sufficient spacing
- Simple navigation
- Clear Back and Continue buttons
- Minimal typing
- Understandable labels
- Clearly accessible cart
- Visible error feedback
- Visible success feedback
- Responsive layout

Avoid:

- Tiny links
- Tiny buttons
- Complex menus
- Excessive typing
- Hover-only interactions
- Desktop-only interactions
- Decorative complexity

The UI should be functional and understandable before being decorative.


---

# 21. Responsive Design

The application should remain usable at different viewport sizes.

On wider screens, a product grid and cart may appear beside each other.

On smaller screens, content may stack vertically.

Do not sacrifice touchscreen control size merely to fit more content.


---

# 22. Validation Rules

Validation must be implemented alongside relevant features.

At minimum verify:

### Quantity

- Quantity cannot become negative.
- Invalid quantity states cannot persist.

### Cash

Reject:

- Blank input
- Non-numeric input
- Negative input
- Insufficient amount

Accept:

- Exact amount
- Amount above total

Rejected payments must remain unsuccessful.

Display clear, understandable error messages.

Example:

`Insufficient payment. Please enter at least ₱140.00.`

If empty-cart checkout prevention is implemented as an approved usability
safeguard, keep the message simple and clear.


---

# 23. Required Instructor Test Sequence

Use this sequence as a regression test throughout development.

### Initial cart

```text
Coffee ×2
Sandwich ×1
Soft Drink ×1
```

Expected:

```text
Coffee:
2 × ₱45 = ₱90

Sandwich:
1 × ₱50 = ₱50

Soft Drink:
1 × ₱35 = ₱35

Total = ₱175
```

### Increase Coffee

```text
Coffee ×3
```

Expected:

```text
Coffee subtotal = ₱135
Total = ₱220
```

### Decrease Coffee

Return Coffee to ×2.

Expected:

```text
Total = ₱175
```

### Remove Soft Drink

Expected:

```text
Coffee = ₱90
Sandwich = ₱50

Total = ₱140
```

### Order Summary

Expected:

```text
Coffee ×2 = ₱90
Sandwich ×1 = ₱50

Total = ₱140
```

Back must preserve this cart.


---

# 24. Required Payment Tests

For a ₱140 order:

### Insufficient Cash

```text
Paid = ₱100
```

Expected:

```text
REJECT
Remain on payment screen
No successful receipt
```

### Exact Cash

```text
Paid = ₱140
```

Expected:

```text
ACCEPT
Change = ₱0
```

### Cash Above Total

```text
Paid = ₱200
```

Expected:

```text
ACCEPT
Change = ₱60
```

Also test:

- Blank cash
- Invalid/non-numeric cash
- Negative cash
- QR payment
- Card payment


---

# 25. Required Receipt/Reset Tests

For a successful ₱140 cash transaction paid with ₱200, verify:

```text
Total = ₱140
Amount paid = ₱200
Change = ₱60
Payment method = Cash
```

Verify receipt items match the completed order.

Then select New Transaction.

Expected:

```text
Item Selection displayed
Cart empty
Total ₱0
Previous payment cleared
Previous receipt cleared
```

Complete another transaction and verify its reference differs from the
previous transaction.


---

# 26. Testing Rules

Do not claim a feature works without verification.

Use two levels of testing where practical:

## Automated Tests

Use automated tests for pure business logic such as:

- Subtotal calculations
- Total calculations
- Quantity rules
- Cash validation
- Change calculation
- Transaction-state helpers

Use Node's built-in test runner if available.

## Manual Browser Tests

Use manual testing for:

- Navigation
- Product interaction
- Responsive interface
- Touchscreen usability
- Payment screens
- Processing states
- Receipt presentation
- New Transaction behavior

Run relevant existing tests after every meaningful implementation change.


---

# 27. Test-Driven Development

For pure business logic, prefer:

```text
RED
↓
Write a test describing required behavior.
Confirm it fails for the expected reason.

GREEN
↓
Implement the smallest correct solution.
Confirm the test passes.

VERIFY
↓
Run the complete relevant test suite.
```

Do not create meaningless tests merely to claim TDD was used.

UI-only work may require manual browser verification instead.


---

# 28. Debugging Rules

Never invent an application error.

When a genuine bug is discovered:

1. Reproduce the problem.
2. Record expected behavior.
3. Record actual behavior.
4. Identify reliable reproduction steps.
5. Investigate the root cause.
6. Explain the root cause to the student.
7. STOP before applying the fix if the debugging prompt requires approval.
8. After approval, add a regression test when practical.
9. Apply the smallest appropriate fix.
10. Run the affected test.
11. Run the complete test suite.
12. Manually verify the affected flow.

Do not change unrelated code during a bug fix.

If no genuine error is discovered, say so honestly.


---

# 29. Refactoring Rules

Refactoring must preserve existing behavior.

Good refactoring targets include:

- Duplicate logic
- Large functions
- Poor naming
- Mixed business/UI logic
- Repeated DOM operations
- Unnecessary complexity

Do NOT use refactoring as an excuse to:

- Add features
- Redesign the application
- Replace the technology stack
- Introduce frameworks
- Change required behavior

Run the complete test suite after refactoring.


---

# 30. Documentation Rules

Documentation must describe the application that actually exists.

Do not document imaginary functionality.

Maintain documentation for:

- Problem definition
- Target users
- Requirements
- Technology stack
- Project structure
- Setup/run instructions
- Transaction flow
- Validation
- Testing
- Bugs and fixes
- Refactoring
- AI-assisted development
- Git/GitHub workflow
- Known limitations

Record meaningful AI interactions.

For each important AI-assisted development step, preserve:

- Prompt
- AI response summary
- Student evaluation
- Student modifications/decisions
- Testing/verification performed


---

# 31. Scope Control

Build REQUIRED functionality first.

Priority:

1. Six selectable products
2. Cart and calculations
3. Order review
4. Back navigation
5. Payment selection
6. Cash payment
7. Simulated QR payment
8. Simulated card payment
9. Payment success
10. Unique transaction reference
11. Digital receipt
12. New Transaction reset
13. Required validation
14. Required testing
15. Documentation

Do NOT implement unless explicitly requested after all required work is
complete:

- Inventory
- Stock deduction
- Login
- Administrator interface
- Product management
- Database
- Transaction history
- Search
- Product categories
- Decorative product images
- Discounts
- Sales reports
- Physical receipt printing
- Real QR generation
- Real payment integration
- Theme switching
- Fullscreen enhancements


---

# 32. Code Quality

Write code that the student can understand and explain.

Prefer:

- Small functions
- Clear names
- Simple control flow
- Separation of business logic from UI logic
- Minimal global state
- Comments only where they add useful explanation
- Consistent formatting

Avoid:

- Clever but difficult code
- Premature abstractions
- Overengineering
- Large dependencies
- Unnecessary design patterns
- Copy-pasted duplicated logic


---

# 33. Security and Privacy

Do not add or expose:

- Passwords
- API keys
- Tokens
- Real card information
- Real payment credentials
- Personal customer information

The payment process is simulated.

No sensitive customer data is required.


---

# 34. Checkpoint Completion Report

At the end of every implementation checkpoint, report:

## Completed
What was implemented.

## Files Changed
List files created or modified.

## Testing
List tests and verification performed.

## Results
State what passed or failed.

## Important Decisions
Explain implementation decisions the student should understand.

## Remaining Scope
State what intentionally remains for later checkpoints.

## Git Status
Show the current repository status.

Then STOP.

Do not begin the next checkpoint automatically.


---

# 35. Final Rule

A simple application that correctly satisfies the scenario is better than
a complicated application with incomplete requirements.

When uncertain:

1. Return to the scenario.
2. Choose the simplest implementation that satisfies it.
3. Test the behavior.
4. Explain the decision.
5. Ask the student before expanding scope.