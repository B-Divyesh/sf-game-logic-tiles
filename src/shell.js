export function iconMark() {
  return `<svg class="wordmark-icon" aria-hidden="true" viewBox="0 0 40 40"><path d="M4 4h32v32H4z"/><path d="M15 4v32M26 4v32M4 15h32M4 26h32"/><circle cx="15" cy="26" r="4"/><path d="m27 12 6 4-6 4z"/></svg>`;
}

export function shellHeader(route) {
  return `<header class="site-header">
      <a class="wordmark" href="/" data-route aria-label="Game Logic Tiles home">${iconMark()}<span>Game Logic Tiles</span></a>
      <nav aria-label="Main navigation">
        <a href="/demo" data-route ${route === '/demo' ? 'aria-current="page"' : ''}>Demo</a>
        <a href="/#how" data-home-anchor>How it works</a>
        <a href="/privacy" data-route ${route === '/privacy' ? 'aria-current="page"' : ''}>Privacy</a>
      </nav>
    </header>`;
}

export function shellFooter() {
  return `<footer class="site-footer">
      <div><span class="footer-mark">◇</span><p><strong>Game Logic Tiles</strong><br>Change a rule. See what it caused.</p></div>
      <nav aria-label="Footer navigation"><a href="/privacy" data-route>Privacy</a><a href="/terms" data-route>Terms</a><a href="https://hello-factory.sociobot.in" rel="noreferrer">Built by Param Factory <span class="sr-only">(external site)</span></a></nav>
      <p class="build-id">Version 1.0 · build 2026.08</p>
      <p class="art-credit">Environmental artwork generated for this project.</p>
    </footer>`;
}
