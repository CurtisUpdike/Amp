param(
    [string]$Server,
    [string]$TargetDirectory = "/var/www/amp"
)

if ([string]::IsNullOrWhiteSpace($Server)) {
    Write-Error "Must provide the target server as a parameter."
    Exit
}

$Path = Get-Location
Write-Host "Deploying to $Server/$TargetDirectory"

Write-Host "Building ReactUI"
Set-Location -Path $Path/ReactUI
npm run build

Write-Host "Cleaning up $Server/$TargetDirectory/ReactUI";
ssh $Server "rm -rf $TargetDirectory/ReactUI";
ssh $Server "mkdir -p $TargetDirectory/ReactUI"

Write-Host "Uploading ReactUI"
scp -r ./dist/* "${Server}:$TargetDirectory/ReactUI/"
Set-Location -Path $Path

Write-Host "Building WebApi"
Set-Location -Path $Path/WebApi
dotnet publish

Write-Host "Cleaning up $Server/$TargetDirectory/WebApi";
ssh $Server "rm -rf $TargetDirectory/WebApi";
ssh $Server "mkdir -p $TargetDirectory/WebApi"

Write-Host "Uploading WebApi"
scp -r ./bin/Debug/net7.0/publish/* "${Server}:$TargetDirectory/WebApi/"
Set-Location -Path $Path

Write-Host "Done"