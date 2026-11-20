# Pyn Visuals — local preview server (no installs needed)
# Usage (from this folder):   powershell -ExecutionPolicy Bypass -File .\serve.ps1
# Then open http://localhost:8080   Press Ctrl+C to stop.
param([int]$Port = 8080)

$root = $PSScriptRoot
$types = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"
  ".json" = "application/json"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".png" = "image/png"; ".webp" = "image/webp"
  ".svg" = "image/svg+xml"; ".gif" = "image/gif"; ".mp4" = "video/mp4"; ".webm" = "video/webm"; ".ico" = "image/x-icon"
  ".txt" = "text/plain; charset=utf-8"; ".md" = "text/plain; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Pyn Visuals preview running at http://localhost:$Port  (Ctrl+C to stop)"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $res = $ctx.Response
    try {
      $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
      if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }
      $file = [IO.Path]::GetFullPath((Join-Path $root $path))
      if ((Test-Path $file -PathType Container)) { $file = Join-Path $file "index.html" }
      if (-not $file.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $file -PathType Leaf)) {
        $res.StatusCode = 404
        $bytes = [Text.Encoding]::UTF8.GetBytes("Not found")
      } else {
        $ext = [IO.Path]::GetExtension($file).ToLower()
        $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" }
        $bytes = [IO.File]::ReadAllBytes($file)
      }
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } catch { $res.StatusCode = 500 } finally { $res.OutputStream.Close() }
  }
} finally { $listener.Stop() }
