$ErrorActionPreference = "Stop"
Write-Host "Installing the five requested Kokonut UI registry components..." -ForegroundColor Cyan
npx shadcn@latest add https://kokonutui.com/r/card-flip.json
npx shadcn@latest add https://kokonutui.com/r/notification-stack.json
npx shadcn@latest add https://kokonutui.com/r/page-flip.json
npx shadcn@latest add https://kokonutui.com/r/receipt-printer.json
npx shadcn@latest add https://kokonutui.com/r/marking-menu.json
Write-Host "Kokonut UI source components installed under src/components/kokonutui or components/kokonutui (see CLI output)." -ForegroundColor Green
Write-Host "NEXORA currently uses app-adapted interactions in src/App.tsx; review the installed upstream source before swapping components." -ForegroundColor Yellow
