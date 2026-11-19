# NEXORA BANK — Functional interaction map

## Shared demo state
`src/store/demoBank.ts` owns fictional accounts, beneficiaries, transactions, notifications and card controls. It persists to browser `localStorage` under `nexora-bank-demo-v2`.

## Screens and key interactions

| Screen | Functional behaviour |
|---|---|
| Dashboard | Total balance derives from account balances; hide/show balance; recent transaction detail; shortcuts to payments, transfers, accounts and investments |
| Accounts | Account selector; account balances; paginated transaction book with animated page turns; transaction detail |
| Cards | 3D front/back card flip; persistent freeze, online and international toggles; add-card demo flow |
| Transfers | Internal and external beneficiaries; add beneficiary; review and validation; success/pending/failure simulation |
| Payments | Merchant payment review and validation; success/pending/failure simulation |
| Activity | Search and filter; open transaction detail; receipt download for completed records |
| Investments | Portfolio summary and chart |
| Loans | Live EMI calculation as principal, annual rate and tenure change |
| Services | Routes to related screens and statement export |
| Support | Demo help categories and links to local activity |
| Settings | Appearance; local demo information; reset demo data |

## Transaction rules in the UI simulation

- Amounts are represented as integer paise in state.
- A completed payment debits the selected account.
- A completed internal transfer debits the source and credits the linked NEXORA demo account.
- A completed external transfer debits the source account; the external institution is simulated and not connected.
- Pending and failed scenarios create transaction records but do not alter balances.
- A success receipt is generated only for `COMPLETED` transactions.
- Every transaction gets a demo reference ID.
- All screens derive their activity and balances from the same state.

## Receipt lifecycle

`Review → Confirm → Local simulation outcome → Completed receipt printer / Pending or failed transaction details`

The receipt printer is only opened for completed outcomes. The receipt contains a clear simulation disclaimer. HTML download can be printed to PDF from the browser.

## Kokonut UI integration points

The in-app NEXORA adaptations are implemented in `src/App.tsx` and styled in `src/styles.css`:
- Card Flip: `CardFlip`
- Notification Stack: `NotificationStack`
- Page Flip: Accounts transaction book spread
- Receipt Printer: `ReceiptPrinter`
- Marking Menu: `MarkingMenu`

The exact upstream registry sources can be installed with `npm run kokonut:install`. They are not imported by the app until their API and generated paths are reviewed; the current NEXORA versions keep the app runnable as one self-contained prototype.

## Acceptance walkthrough

- [ ] Make a successful internal transfer and verify both account balances update.
- [ ] Make a successful external transfer and verify source balance updates.
- [ ] Complete a merchant payment and verify balance update.
- [ ] Confirm the receipt appears only on success.
- [ ] Choose pending or failed and verify no balance changes and no success receipt.
- [ ] Refresh and verify state persists.
- [ ] Reset demo data and verify seed state returns.
- [ ] Flip the card and toggle card controls.
- [ ] Add an external beneficiary and transfer to it.
- [ ] Dismiss a notification by swipe and mark all notifications read.
- [ ] Turn through the account transaction book.
- [ ] Export a CSV statement.
