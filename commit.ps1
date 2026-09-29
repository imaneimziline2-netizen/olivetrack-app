[CmdletBinding(PositionalBinding=$false)]
param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$RelativeDate,

    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$GitArgs
)

$targetDate = Get-Date

if ($RelativeDate -match '(?i)^(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago$') {
    $value = -[int]$matches[1] # Make it negative to go back in time
    $unit = $matches[2].ToLower()

    switch ($unit) {
        'second' { $targetDate = $targetDate.AddSeconds($value) }
        'minute' { $targetDate = $targetDate.AddMinutes($value) }
        'hour'   { $targetDate = $targetDate.AddHours($value) }
        'day'    { $targetDate = $targetDate.AddDays($value) }
        'week'   { $targetDate = $targetDate.AddDays($value * 7) }
        'month'  { $targetDate = $targetDate.AddMonths($value) }
        'year'   { $targetDate = $targetDate.AddYears($value) }
    }
} else {
    Write-Warning "Could not parse '$RelativeDate'. Expected format: 'X unit ago' (e.g., '1 day ago')."
    exit 1
}

$gitDateString = $targetDate.ToString('O') 

Write-Host "Setting commit date to: $gitDateString ($RelativeDate)" -ForegroundColor Cyan

# Set environment variables for the current PowerShell process
$env:GIT_AUTHOR_DATE = $gitDateString
$env:GIT_COMMITTER_DATE = $gitDateString

try {
    # Run git commit -v, passing along any extra arguments you provided
    git commit -v @GitArgs
} finally {
    # Clean up the environment variables so they don't infect future standard commits
    Remove-Item Env:\GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
    Remove-Item Env:\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue
}