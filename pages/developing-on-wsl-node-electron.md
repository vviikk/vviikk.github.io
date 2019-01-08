# Install Windows binary for electron

This ensures that Electron runs on Windows rather than break under WSL if you don't have any X11 solution.

```javascript
// add this to your package.json
{
  "install-wsl": "npm install && npm uninstall electron && export npm_config_platform=win32 && npm install electron && unset npm_config_platform"
}
```
