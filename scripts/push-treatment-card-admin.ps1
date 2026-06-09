# Deploy treatment grid card admin (homepage + /treatments image upload)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "Repo: $(git rev-parse --show-toplevel)"
Write-Host "Branch: $(git branch --show-current)"
git status

git add `
  lib/queries/treatment-cards.ts `
  components/admin/TreatmentCardImageField.tsx `
  components/treatments/TreatmentCardGrid.tsx `
  components/home/TreatmentCategories.tsx `
  app/treatments/page.tsx `
  app/admin/treatments/actions.ts `
  app/admin/treatments/page.tsx `
  app/admin/treatments/[slug]/edit/EditTreatmentClient.tsx `
  app/admin/treatments/[slug]/edit/page.tsx `
  app/api/admin/treatments/[slug]/card-image/route.ts `
  scripts/sql/treatment-card-image-migration.sql `
  scripts/sql/treatments-admin-migration.sql

git status
git diff --cached --stat

$msg = @"
Add admin treatment grid card image upload for homepage and /treatments.

Upload saves to Supabase Storage so Nakita can update card photos on live Vercel without git deploys.
"@

git commit -m $msg
Write-Host "Commit: $(git rev-parse --short HEAD)"
git push origin HEAD
Write-Host "Done - check Vercel for new production deployment."
