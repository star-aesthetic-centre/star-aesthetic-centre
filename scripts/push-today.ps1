# Star Aesthetic Centre — commit and push today's changes to GitHub (Vercel auto-deploys from main)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "Repo: $(git rev-parse --show-toplevel)"
Write-Host "Branch: $(git branch --show-current)"
git status

git add -- `
  lib/treatment-cards.ts `
  lib/treatment-routes.ts `
  "app/treatments/[category]/[slug]/page.tsx" `
  scripts/sql/anti-wrinkle-maintenance-products-fix.sql `
  scripts/output/phase-a-treatment-product-recommendations.sql `
  public/images/anti-wrinkle-treatment-star-durban-north.webp `
  public/images/lip-filler-treatment-durban-north.webp

# Include any other modified files from today
git add -A
git status
git diff --cached --stat

$msg = @"
Treatment cards, lip filler rename, UI and SQL fixes

- New treatment card images for anti-wrinkle and lip filler
- Rename lip card to Lip Filler Treatment
- Clearer maintenance product section heading on treatment pages
- SQL script and seed update for anti-wrinkle product recommendations
"@

git commit -m $msg
Write-Host "Commit: $(git rev-parse --short HEAD)"
git push origin HEAD
Write-Host "Pushed to origin. Check Vercel Deployments for a new build on main."
