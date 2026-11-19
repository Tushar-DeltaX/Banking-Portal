# Changelog

## Functional UI v1

- Removed the shared generic prototype modal.
- Added a shared persistent local demo banking store.
- Connected dashboard balances to account data.
- Added internal and external simulated transfers.
- Added beneficiary creation.
- Added merchant payment simulation.
- Added completed, pending and failed scenario outcomes.
- Added balance checks and integer-paise amounts.
- Added automatic receipt printer experience for completed transactions.
- Added downloadable HTML receipt and print styling.
- Added searchable/filterable activity and transaction details.
- Added notification stack in the navbar with unread count, mark-all-read, read and swipe-dismiss actions.
- Added 3D card flip and persistent card controls.
- Added animated transaction book pages.
- Added radial quick navigation.
- Added working EMI calculator and CSV statement export.
- Added localStorage persistence and reset-demo action.
- Added shadcn registry configuration and Kokonut UI installer script.

## Receipt flow hotfix
- Fixed runtime `ReferenceError: outcome is not defined` in both simulated payment and transfer handlers by destructuring the requested outcome.
- Retained successful receipt animation, pending/failed status handling, and the prior radial-menu hover fix.
- Added **View receipt printer** on completed transaction details to replay the receipt animation.
- Updated transaction state writes to preserve notification updates batched in the same event.

## Halo Select dropdown refresh
- Replaced all native HTML select controls with a reusable NEXORA-styled Halo Select dropdown.
- Applied the espresso, deep-brown and amber palette with a frosted popover, animated open state, selected-state indicator and descriptive options for simulation outcomes.
- Preserved each dropdown's existing controlled state and selection behavior across Accounts, Activity, Transfers, Payments and beneficiary setup.


## Public landing page + demo login
- Added an animated NEXORA BANK public landing page in `src/NexoraLanding.tsx`.
- Added a short login modal with demo credentials.
- Successful demo login transitions into the preserved existing banking dashboard.
- Original dashboard source retained as `src/BankingDashboard.tsx`; existing UI flows and styles were not rewritten.


## Landing page polish and session navigation
- Fixed duplicated navigation link hover text and corrected escaped spaces in the statement animation.
- Changed login CTAs to black with amber hover glow and white text.
- Added signed-in username state to the public homepage; the navbar no longer shows Login while authenticated.
- Dashboard brand logo returns to the homepage without ending the session; homepage end CTA returns to the dashboard.
- Logout still clears the demo session and returns to the public homepage.
- Tightened oversized homepage spacing and added an animated feature rail.
