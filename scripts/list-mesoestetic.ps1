$src = 'E:\' + '$$ignatius\' + '$$$$$customers\' + '$$$$$$$$star-aesthetic\2026\product-list\mesoestetic\mesoesthetic-images-webp'
Write-Host "Source: $src"
if (Test-Path $src) {
    Get-ChildItem -Path $src -Recurse -Filter '*.webp' | ForEach-Object {
        Write-Host $_.FullName
    }
} else {
    Write-Host "PATH NOT FOUND"
    # Try alternate spelling
    $src2 = 'E:\' + '$$ignatius\' + '$$$$$customers\' + '$$$$$$$$star-aesthetic\2026\product-list\mesoestetic'
    Write-Host "Trying: $src2"
    if (Test-Path $src2) {
        Get-ChildItem -Path $src2 -Recurse -Filter '*.webp' | ForEach-Object {
            Write-Host $_.FullName
        }
    }
}
