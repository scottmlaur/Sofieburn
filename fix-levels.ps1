# Set paths
$projectRoot = "C:\Users\scott\SofieBurn"
$srcPath = Join-Path $projectRoot "src"
$levelFile = Join-Path $projectRoot "levels.json"
$targetLevelPath = Join-Path $srcPath "levels.json"
$gameJS = Join-Path $srcPath "game.js"

# Move levels.json to src/
if (Test-Path $levelFile) {
    Move-Item -Path $levelFile -Destination $targetLevelPath -Force
    Write-Host "Moved levels.json to /src/"
} else {
    Write-Host "levels.json not found in project root."
}

# Replace fetch path in game.js
if (Test-Path $gameJS) {
    (Get-Content $gameJS) -replace "fetch\(['""]\.\.\/levels\.json['""]\)", "fetch('levels.json')" |
        Set-Content $gameJS
    Write-Host "Updated fetch path in game.js."
} else {
    Write-Host "game.js not found in /src/"
}
