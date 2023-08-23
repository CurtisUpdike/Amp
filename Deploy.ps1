param(
    [string]$Server,
    [string]$TargetDirectory = "/var/www/amp"
)

if ([string]::IsNullOrWhiteSpace($Server)) {
    Write-Error "Must provide the target server as a parameter."
    Exit
}

$Path = Get-Location

Write-Host "Getting $Server ready..."
ssh $Server "rm -rf $TargetDirectory/*"
ssh $Server "mkdir -p $TargetDirectory/ReactUI"
ssh $Server "mkdir -p $TargetDirectory/WebApi"

Write-Host "Building ReactUI"
Set-Location -Path $Path/ReactUI
npm run build

Write-Host "Uploading ReactUI"
scp -r ./dist/* "${Server}:$TargetDirectory/ReactUI/"
Set-Location -Path $Path

Write-Host "Building WebApi"
Set-Location -Path $Path/WebApi
dotnet publish

Write-Host "Uploading WebApi"
scp -r ./bin/Debug/net7.0/publish/* "${Server}:$TargetDirectory/WebApi/"
Set-Location -Path $Path

Write-Host "Done"