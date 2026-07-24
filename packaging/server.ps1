$ErrorActionPreference = 'Stop'
$root = (Split-Path -Parent $MyInvocation.MyCommand.Path).TrimEnd('\')
$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, 48767)
$listener.Start()

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.js' = 'text/javascript; charset=utf-8'
  '.css' = 'text/css; charset=utf-8'
  '.svg' = 'image/svg+xml'
  '.png' = 'image/png'
  '.jpg' = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.woff' = 'font/woff'
  '.woff2' = 'font/woff2'
}

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $requestLine = $reader.ReadLine()
    $requested = if ($requestLine) { ($requestLine -split ' ')[1] } else { '/' }
    $path = [Uri]::UnescapeDataString(($requested -split '\?')[0].TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($path)) { $path = 'index.html' }
    $candidate = [IO.Path]::GetFullPath((Join-Path $root $path))
    $valid = $candidate.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $candidate -PathType Leaf)
    if ($valid) {
      $body = [IO.File]::ReadAllBytes($candidate)
      $ext = [IO.Path]::GetExtension($candidate).ToLowerInvariant()
      $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
      $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
    } else {
      $body = [Text.Encoding]::UTF8.GetBytes('Not found')
      $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
    }
    $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    $stream.Write($body, 0, $body.Length)
    $stream.Flush()
  } catch {
    Add-Content -LiteralPath (Join-Path $root 'server-error.log') -Value $_.Exception.ToString()
  } finally {
    if ($reader) { $reader.Dispose() }
    $client.Close()
  }
}
