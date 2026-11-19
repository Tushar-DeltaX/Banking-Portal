# NEXORA BANK — Functional UI Website

A frontend-only banking simulation built on the approved NEXORA visual direction: espresso/charcoal surfaces, warm amber accents and emerald positive states.

## Start

Requirements: Node.js 20+ and npm.

```powershell
npm install
npm run dev
```

Open the local Vite URL.

Build check:

```powershell
npm run build
```

## What's functional

- **Dashboard:** live total balance derived from shared demo accounts, hide/show balance, page navigation, transaction details.
- **Accounts:** two fictional accounts, account selector, available balances and a page-turn transaction book with previous/next spreads.
- **Cards:** interactive 3D flip card, freeze toggle, online-payment toggle, international-usage toggle, add-card flow and persisted card count.
- **Transfers:** internal NEXORA transfers and simulated external beneficiary transfers, review step, validation and balance checks. A scenario selector demonstrates completed, pending and failed outcomes; only completed transfers move balances.
- **Beneficiaries:** add an internal demo account recipient or an external fictional recipient.
- **Payments:** simulated merchant payment, review step, balance validation and automatic success receipt. A scenario selector demonstrates completed, pending and failed outcomes; only completed payments debit balances.
- **Receipt:** animated printer-style receipt after each successful transfer/payment, tear-off interaction, print action and downloadable HTML receipt (open it and choose Print → Save as PDF). Pending and failed outcomes never show a success receipt.
- **Activity:** searchable and filterable transaction history with transaction detail drawers.
- **Notifications:** navbar bell opens a fan-out stack, unread count, mark all read, tap to read and swipe to dismiss.
- **Quick navigation:** radial menu navigates to the main sections.
- **Investments:** portfolio overview and chart.
- **Loans:** interactive EMI calculator.
- **Services:** shortcuts to relevant sections and downloadable CSV statement.
- **Settings:** theme preference for the current session and persistent demo reset.
- **Persistence:** balances, transactions, beneficiaries, card controls and notifications persist in localStorage across refreshes.

## Demo flows to test

1. Open **Transfers** → **New transfer**.
2. Select Aarya Sharma (internal) or Rahul Mehta (external).
3. Enter an amount, review and confirm.
4. Verify that account balances, dashboard total, activity and notification count update.
5. Watch the receipt printer animation. Use Print or Download receipt.
6. Refresh the browser; the simulated balances and transaction should remain.
7. Use **Settings → Privacy & data → Reset demo** or the profile menu to restore the seed data.
8. Open **Cards** and flip the card; try the controls.
9. Click the navbar bell; mark notifications read or swipe one away.
10. Open **Accounts** and turn through the transaction book pages.

## Kokonut UI registry components

The project is configured with the shadcn registry prerequisites (`components.json`, `@/lib/utils`, Tailwind v4 Vite plugin and the `motion` package). To install the exact upstream component source files you requested, run:

```powershell
npm run kokonut:install
```

Or run individually:

```powershell
npx shadcn@latest add https://kokonutui.com/r/card-flip.json
npx shadcn@latest add https://kokonutui.com/r/notification-stack.json
npx shadcn@latest add https://kokonutui.com/r/page-flip.json
npx shadcn@latest add https://kokonutui.com/r/receipt-printer.json
npx shadcn@latest add https://kokonutui.com/r/marking-menu.json
```

The current app includes NEXORA-adapted interactions for these five concepts in `src/App.tsx` and `src/styles.css`: card flip, swipe-dismiss notification stack, animated transaction book page turns, receipt printer, and radial quick navigation. The install script adds the official Kokonut source separately; review its generated paths and props before replacing the NEXORA adaptations. This keeps the prototype usable even if a registry install is temporarily unavailable.

## Data and safety boundary

This is a local frontend simulation only. It does not connect to a bank, payment network, real identity provider or backend. All names, accounts, balances, beneficiaries and transactions are fictional demo data. The browser's localStorage is not a secure financial ledger and must not be used for real customer funds or sensitive financial data.

### Dropdown component
All dropdown controls use the shared `HaloSelect` component in `src/App.tsx`, styled in `src/styles.css` to match NEXORA's espresso/amber palette. It preserves the existing controlled values and callbacks, closes on outside click or Escape, and supports empty states and option descriptions.


## Public landing page and demo login

The public NEXORA BANK landing page is now the application entry point. The existing banking application has been preserved in `src/BankingDashboard.tsx` and is rendered after a successful demo login.

Demo credentials:
- Email: `demo@nexorabank.com`
- Password: `Nexora@123`

The login is a frontend-only demo gate. It is not production authentication and must not be used with real customer credentials or funds. Existing banking UI, demo state, Halo Select controls, Receipt Printer, and radial navigation remain in the preserved dashboard component.


## Landing navigation update
After demo login, selecting the NEXORA BANK brand in the dashboard sidebar returns to the public homepage while keeping the demo session active. The homepage displays the signed-in username and its final call-to-action returns to the dashboard. Use the dashboard profile menu's Log out action to end the session.
