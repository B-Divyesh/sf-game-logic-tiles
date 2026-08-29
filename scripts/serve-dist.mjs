import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {extname, join, normalize} from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const port = Number(process.env.PORT ?? 4173);
const appRoutes = new Set(['/', '/demo', '/play', '/privacy', '/terms']);
const types = {
  '.avif': 'image/avif', '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
};
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

async function sendFile(response, file, statusCode = 200) {
  const body = await readFile(file);
  response.writeHead(statusCode, {'Content-Type': types[extname(file)] ?? 'application/octet-stream', ...securityHeaders});
  response.end(body);
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  try {
    if (appRoutes.has(pathname)) return await sendFile(response, join(root, 'index.html'));
    const relative = normalize(pathname).replace(/^[/\\]+/, '');
    const candidate = join(root, relative);
    if (candidate.startsWith(root) && (await stat(candidate)).isFile()) return await sendFile(response, candidate);
  } catch { /* Missing files use the product's not-found document. */ }
  await sendFile(response, join(root, '404.html'), 404);
}).listen(port, '127.0.0.1', () => {
  process.stdout.write(`Static build at http://127.0.0.1:${port}\n`);
});
