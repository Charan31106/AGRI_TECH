# Krishi-Sanjeevini High-Performance Unified Asset Bundler for PowerShell
# Concatenates module files, strips ES module syntax, and outputs app.bundle.js.

$files = @(
    "translations.js",
    "mandi.js",
    "schemes.js",
    "gemini.js",
    "voice.js",
    "app.js"
)

# Load local .env API Key if available
$envKey = ""
if (Test-Path ".env") {
    $envContent = [System.IO.File]::ReadAllText(".env", [System.Text.Encoding]::UTF8)
    if ($envContent -match 'GEMINI_API_KEY\s*=\s*([^\s#\r\n]+)') {
        $envKey = $Matches[1].Trim()
        Write-Host "Found API key in .env: $envKey"
    }
}

$bundledContent = "// Krishi-Sanjeevini High-Performance Unified Bundle`r`n// Generated automatically to support double-click (file:// protocol) and local servers.`r`n`r`n"

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        Write-Error "Required file not found: $file"
        Exit 1
    }
    
    Write-Host "Processing file: $file"
    $content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
    
    if ($file -eq "app.js") {
        # Strip imports from top of app.js
        $content = $content -replace '(?s)import\s+[\s\S]*?\s+from\s+[''"][^''"]+[''"]\s*;?', '// import removed'
        
        # Inject the key into the state object if found
        if ($envKey) {
            $content = $content -replace 'apiKey:\s*""', "apiKey: `"$envKey`""
            Write-Host "Injected API key into app.js state."
        }
    }
    
    # Strip export keywords
    $content = $content -replace "\bexport\s+const\b", "const"
    $content = $content -replace "\bexport\s+function\b", "function"
    $content = $content -replace "\bexport\s+async\s+function\b", "async function"
    $content = $content -replace "\bexport\s+\{\s*SpeechRecognition\s*\}\s*;?", "/* exported SpeechRecognition */"
    
    $bundledContent += "`r`n// ==========================================`r`n// SECTION: $file`r`n// ==========================================`r`n`r`n"
    $bundledContent += $content
}

# Write app.bundle.js using UTF8 encoding
[System.IO.File]::WriteAllText("app.bundle.js", $bundledContent, [System.Text.Encoding]::UTF8)
Write-Host "✅ Success: app.bundle.js created successfully!"
