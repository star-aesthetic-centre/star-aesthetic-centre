$src = 'E:\' + '$$ignatius\' + '$$$$$customers\' + '$$$$$$$$star-aesthetic\2026\product-list\isdin\images-webp'
$dst = 'C:\Users\ignat\Local Sites\star-aesthetic-centre\nextjs\public\images'

Write-Host "Looking in: $src"

if (Test-Path $src) {
    $files = Get-ChildItem -Path $src -Recurse -Filter '*.webp'
    foreach ($f in $files) {
        Copy-Item $f.FullName -Destination $dst -Force
        Write-Host "Copied: $($f.Name)"
    }
    Write-Host "DONE"
} else {
    Write-Host "NOT FOUND at images-webp, trying images-master"
    $src2 = 'E:\' + '$$ignatius\' + '$$$$$customers\' + '$$$$$$$$star-aesthetic\2026\product-list\isdin\images-master'
    $files = Get-ChildItem -Path $src2 -Recurse -Filter '*.webp' -ErrorAction SilentlyContinue
    foreach ($f in $files) {
        Copy-Item $f.FullName -Destination $dst -Force
        Write-Host "Copied: $($f.Name)"
    }
    Write-Host "DONE"
}
