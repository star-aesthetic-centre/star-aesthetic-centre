# Star Aesthetic Centre — local snapshot backup (nextjs app + SQL outputs)
# Usage: powershell -File scripts/backup-project.ps1

$ErrorActionPreference = "Stop"
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmm"
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$backupRoot = Join-Path $root "backups"
$dest = Join-Path $backupRoot "star-aesthetic_$timestamp"

New-Item -ItemType Directory -Path $dest -Force | Out-Null

$nextjs = Join-Path $root "nextjs"
$exclude = @("node_modules", ".next", ".turbo", "backups")

Write-Host "Backing up nextjs -> $dest\nextjs"
robocopy $nextjs (Join-Path $dest "nextjs") /E /XD $exclude /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed with exit $LASTEXITCODE" }

$sqlSrc = Join-Path $nextjs "scripts\output"
if (Test-Path $sqlSrc) {
  $sqlDest = Join-Path $dest "sql-output"
  New-Item -ItemType Directory -Path $sqlDest -Force | Out-Null
  Copy-Item -Path (Join-Path $sqlSrc "*.sql") -Destination $sqlDest -Force
}

$manifest = @"
Star Aesthetic Centre backup
Created: $(Get-Date -Format o)
Path: $dest
Includes: nextjs source (excludes node_modules, .next), scripts/output/*.sql
"@
$manifest | Set-Content (Join-Path $dest "BACKUP_README.txt") -Encoding UTF8

Write-Host "Backup complete: $dest"
