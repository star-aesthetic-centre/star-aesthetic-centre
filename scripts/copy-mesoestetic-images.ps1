$src = 'E:\' + '$$ignatius\' + '$$$$$customers\' + '$$$$$$$$star-aesthetic\2026\product-list\mesoestetic\mesoesthetic-images-webp'
$dst = 'C:\Users\ignat\Local Sites\star-aesthetic-centre\nextjs\public\images'

$files = Get-ChildItem -Path $src -Recurse -Filter '*.webp'
foreach ($f in $files) {
    Copy-Item $f.FullName -Destination $dst -Force
    Write-Host "Copied: $($f.Name)"
}
Write-Host "DONE: $($files.Count) files copied"
