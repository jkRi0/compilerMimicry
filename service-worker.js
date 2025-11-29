const CACHE_NAME = 'code-evaluator-cache-v12';

// All static files to cache for offline use (190 files total)
const FILES_TO_CACHE = [
  // HTML files
  './index.html',
  './sample.html',
  
  // CSS
  './styles.css',
  
  // Core JavaScript files
  './challengeData.js',
  './codeAnalyzer.js',
  './codeSimulation.js',
  './connectionMonitor.js',
  './mobileControls.js',
  './modalManager.js',
  './monacoEditor.js',
  './rubrics.js',
  './tips.js',
  
  // Compiler files
  './compiler/cppCompiler.js',
  './compiler/cppCompiler2.js',
  './compiler/csharpCompiler.js',
  './compiler/csharpCompiler2.js',
  './compiler/javaAST-toJSON.js',
  './compiler/javaCompiler.js',
  './compiler/javaCompiler2.js',
  
  // Monaco Editor core files
  './node_modules/monaco-editor/min/vs/loader.js',
  './node_modules/monaco-editor/min/vs/editor/editor.main.js',
  './node_modules/monaco-editor/min/vs/editor/editor.main.css',
  './node_modules/monaco-editor/min/vs/editor.api-i0YVFWkl.js',
  './node_modules/monaco-editor/min/vs/assets/editor.worker-DM0G1eFj.js',
  './node_modules/monaco-editor/min/vs/java-CI4ZMsH9.js',
  './node_modules/monaco-editor/min/vs/cpp-CkKPQIni.js',
  './node_modules/monaco-editor/min/vs/csharp-CX28MZyh.js',
  './node_modules/monaco-editor/min/vs/basic-languages/monaco.contribution.js',
  './node_modules/monaco-editor/min/vs/nls.messages-loader.js',
  './node_modules/monaco-editor/min/vs/cssMode-CGp6dFmI.js',
  './node_modules/monaco-editor/min/vs/htmlMode-DtjCNH-N.js',
  './node_modules/monaco-editor/min/vs/jsonMode-CJjR_ECa.js',
  './node_modules/monaco-editor/min/vs/tsMode-i88JHxDY.js',
  './node_modules/monaco-editor/min/vs/language/css/monaco.contribution.js',
  './node_modules/monaco-editor/min/vs/language/html/monaco.contribution.js',
  './node_modules/monaco-editor/min/vs/language/json/monaco.contribution.js',
  './node_modules/monaco-editor/min/vs/language/typescript/monaco.contribution.js',
  './node_modules/monaco-editor/min/vs/workers-CbP2cVmy.js',
  './node_modules/monaco-editor/min/vs/_commonjsHelpers-CT9FvmAN.js',
  
  // === JAVA (1j) ===  
  './1j/tips.js',
  './1j/analysis_grammars/grammarLoader.js',
  './1j/analysis_grammars/index.html',
  './1j/analysis_grammars/main.js',
  './1j/analysis_grammars/parseJava.js',
  './1j/analysis_grammars/antlr/antlr4.web.js',
  './1j/analysis_grammars/antlr/JavaLexer.js',
  './1j/analysis_grammars/antlr/JavaParser.js',
  './1j/analysis_grammars/antlr/JavaParserListener.js',
  './1j/analysis_grammars/antlr/JavaParserVisitor.js',
  './1j/lvl1/objectives.js',
  './1j/lvl1/solutions.js',
  './1j/lvl2/objectives.js',
  './1j/lvl2/solutions.js',
  './1j/lvl3/objectives.js',
  './1j/lvl3/solutions.js',
  './1j/lvl4/objectives.js',
  './1j/lvl4/solutions.js',
  './1j/lvl5/objectives.js',
  './1j/lvl5/solutions.js',
  './1j/lvl6/objectives.js',
  './1j/lvl6/solutions.js',
  './1j/lvl7/objectives.js',
  './1j/lvl7/solutions.js',
  './1j/lvl8/objectives.js',
  './1j/lvl8/solutions.js',
  './1j/lvl9/objectives.js',
  './1j/lvl9/solutions.js',
  './1j/lvl10/objectives.js',
  './1j/lvl10/solutions.js',
  './1j/lvl11/objectives.js',
  './1j/lvl11/solutions.js',
  './1j/lvl12/objectives.js',
  './1j/lvl12/solutions.js',
  './1j/lvl13/objectives.js',
  './1j/lvl13/solutions.js',
  './1j/lvl14/objectives.js',
  './1j/lvl14/solutions.js',
  './1j/lvl15/objectives.js',
  './1j/lvl15/solutions.js',
  './1j/lvl16/objectives.js',
  './1j/lvl16/solutions.js',
  './1j/lvl17/objectives.js',
  './1j/lvl17/solutions.js',
  './1j/lvl18/objectives.js',
  './1j/lvl18/solutions.js',
  './1j/lvl19/objectives.js',
  './1j/lvl19/solutions.js',
  './1j/lvl20/objectives.js',
  './1j/lvl20/solutions.js',
  
  // === C++ (2cP) ===
  './2cP/tips.js',
  './2cP/analysis_grammars/grammarLoader.js',
  './2cP/analysis_grammars/antlr/antlr4.web.js',
  './2cP/analysis_grammars/antlr/CPP14Lexer.js',
  './2cP/analysis_grammars/antlr/CPP14Parser.js',
  './2cP/analysis_grammars/antlr/CPP14ParserListener.js',
  './2cP/analysis_grammars/antlr/CPP14ParserVisitor.js',
  './2cP/lvl1/objectives.js',
  './2cP/lvl1/solutions.js',
  './2cP/lvl2/objectives.js',
  './2cP/lvl2/solutions.js',
  './2cP/lvl3/objectives.js',
  './2cP/lvl3/solutions.js',
  './2cP/lvl4/objectives.js',
  './2cP/lvl4/solutions.js',
  './2cP/lvl5/objectives.js',
  './2cP/lvl5/solutions.js',
  './2cP/lvl6/objectives.js',
  './2cP/lvl6/solutions.js',
  './2cP/lvl7/objectives.js',
  './2cP/lvl7/solutions.js',
  './2cP/lvl8/objectives.js',
  './2cP/lvl8/solutions.js',
  './2cP/lvl9/objectives.js',
  './2cP/lvl9/solutions.js',
  './2cP/lvl10/objectives.js',
  './2cP/lvl10/solutions.js',
  './2cP/lvl11/objectives.js',
  './2cP/lvl11/solutions.js',
  './2cP/lvl12/objectives.js',
  './2cP/lvl12/solutions.js',
  './2cP/lvl13/objectives.js',
  './2cP/lvl13/solutions.js',
  './2cP/lvl14/objectives.js',
  './2cP/lvl14/solutions.js',
  './2cP/lvl15/objectives.js',
  './2cP/lvl15/solutions.js',
  './2cP/lvl16/objectives.js',
  './2cP/lvl16/solutions.js',
  './2cP/lvl17/objectives.js',
  './2cP/lvl17/solutions.js',
  './2cP/lvl18/objectives.js',
  './2cP/lvl18/solutions.js',
  './2cP/lvl19/objectives.js',
  './2cP/lvl19/solutions.js',
  './2cP/lvl20/objectives.js',
  './2cP/lvl20/solutions.js',
  
  // === C# (3cS) ===
  './3cS/tips.js',
  './3cS/analysis_grammars/grammarLoader.js',
  './3cS/analysis_grammars/antlr/antlr4.web.js',
  './3cS/analysis_grammars/antlr/CSharpLexer.js',
  './3cS/analysis_grammars/antlr/CSharpParser.js',
  './3cS/analysis_grammars/antlr/CSharpParserListener.js',
  './3cS/analysis_grammars/antlr/CSharpParserVisitor.js',
  './3cS/lvl1/objectives.js',
  './3cS/lvl1/solutions.js',
  './3cS/lvl2/objectives.js',
  './3cS/lvl2/solutions.js',
  './3cS/lvl3/objectives.js',
  './3cS/lvl3/solutions.js',
  './3cS/lvl4/objectives.js',
  './3cS/lvl4/solutions.js',
  './3cS/lvl5/objectives.js',
  './3cS/lvl5/solutions.js',
  './3cS/lvl6/objectives.js',
  './3cS/lvl6/solutions.js',
  './3cS/lvl7/objectives.js',
  './3cS/lvl7/solutions.js',
  './3cS/lvl8/objectives.js',
  './3cS/lvl8/solutions.js',
  './3cS/lvl9/objectives.js',
  './3cS/lvl9/solutions.js',
  './3cS/lvl10/objectives.js',
  './3cS/lvl10/solutions.js',
  './3cS/lvl11/objectives.js',
  './3cS/lvl11/solutions.js',
  './3cS/lvl12/objectives.js',
  './3cS/lvl12/solutions.js',
  './3cS/lvl13/objectives.js',
  './3cS/lvl13/solutions.js',
  './3cS/lvl14/objectives.js',
  './3cS/lvl14/solutions.js',
  './3cS/lvl15/objectives.js',
  './3cS/lvl15/solutions.js',
  './3cS/lvl16/objectives.js',
  './3cS/lvl16/solutions.js',
  './3cS/lvl17/objectives.js',
  './3cS/lvl17/solutions.js',
  './3cS/lvl18/objectives.js',
  './3cS/lvl18/solutions.js',
  './3cS/lvl19/objectives.js',
  './3cS/lvl19/solutions.js',
  './3cS/lvl20/objectives.js',
  './3cS/lvl20/solutions.js'
];

// Patterns to NEVER cache (only external resources now)
const NEVER_CACHE_PATTERNS = [
  '/assets/'
  // Note: node_modules removed to allow Monaco Editor caching
];

// External URLs to never intercept
const EXTERNAL_PATTERNS = [
  'api.github.com',
  'cloudflare.com',
  'google.com',
  'status',
  'cdn-cgi',
  'favicon.ico'
];

// Install Service Worker and cache files
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        // Cache files one by one to avoid failing on missing files
        return Promise.allSettled(
          FILES_TO_CACHE.map(url => 
            cache.add(url).catch(err => {
              console.warn('[Service Worker] Failed to cache:', url, err.message);
            })
          )
        );
      })
      .catch(error => {
        console.error('[Service Worker] Cache failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate Service Worker and clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Helper function to check if URL should never be cached
function shouldNeverCache(url) {
  return NEVER_CACHE_PATTERNS.some(pattern => url.includes(pattern));
}

// Helper function to check if URL is external
function isExternal(url) {
  return EXTERNAL_PATTERNS.some(pattern => url.includes(pattern));
}

// Helper function to serve cached files with correct headers
function serveCachedFile(cachedResponse, urlPath) {
  // Ensure JavaScript files have correct MIME type for ES6 modules
  if (urlPath.endsWith('.js') || urlPath.endsWith('.mjs')) {
    // Check if Content-Type needs fixing
    const contentType = cachedResponse.headers.get('Content-Type');
    if (!contentType || !contentType.includes('javascript')) {
      // Need to recreate with correct Content-Type for ES6 modules
      const headers = new Headers(cachedResponse.headers);
      headers.set('Content-Type', 'application/javascript; charset=utf-8');
      return cachedResponse.text().then(body => {
        return new Response(body, {
          status: cachedResponse.status,
          statusText: cachedResponse.statusText,
          headers: headers
        });
      });
    }
    // Content-Type is already correct, serve as-is
  }
  return cachedResponse;
}

// Fetch strategy: Network first, cache fallback (for better dynamic loading)
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Don't intercept external requests
  if (requestUrl.origin !== location.origin || isExternal(requestUrl.href)) {
    return;
  }
  
  // Don't intercept files that should never be cached
  if (shouldNeverCache(requestUrl.pathname)) {
    return;
  }
  
  event.respondWith(
    // Try network first
    fetch(event.request)
      .then(response => {
        // If successful, cache it (unless it's in never-cache list)
        if (response && response.status === 200 && !shouldNeverCache(requestUrl.pathname)) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(() => {
              // Silently fail cache writes
            });
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        const requestUrl = new URL(event.request.url);
        const urlPath = requestUrl.pathname;
        
        // Try to find the file in cache using multiple URL formats
        return caches.open(CACHE_NAME).then(cache => {
          // Try exact match first
          return cache.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return serveCachedFile(cachedResponse, urlPath);
              }
              
              // Try with leading dot (relative path) - how it was cached
              const relativePath = '.' + urlPath;
              return cache.match(new Request(relativePath, { method: 'GET' }))
                .then(cachedResponse => {
                  if (cachedResponse) {
                    return serveCachedFile(cachedResponse, urlPath);
                  }
                  
                  // Try without leading slash
                  const noSlashPath = urlPath.startsWith('/') ? urlPath.substring(1) : urlPath;
                  return cache.match(new Request(noSlashPath, { method: 'GET' }))
                    .then(cachedResponse => {
                      if (cachedResponse) {
                        return serveCachedFile(cachedResponse, urlPath);
                      }
                      
                      // Try with leading dot and slash - most common format in FILES_TO_CACHE
                      const dotSlashPath = './' + noSlashPath;
                      return cache.match(new Request(dotSlashPath, { method: 'GET' }))
                        .then(cachedResponse => {
                          if (cachedResponse) {
                            return serveCachedFile(cachedResponse, urlPath);
                          }
                          
                          // Try matching by URL pathname only (ignoring query/hash)
                          return cache.match(urlPath, { ignoreSearch: true, ignoreMethod: true })
                            .then(cachedResponse => {
                              if (cachedResponse) {
                                return serveCachedFile(cachedResponse, urlPath);
                              }
                              
                              // If it's an HTML request and nothing cached, return index.html
                              const acceptHeader = event.request.headers.get('accept');
                              if (acceptHeader && acceptHeader.includes('text/html')) {
                                return cache.match('./index.html');
                              }
                              
                              // Log what we're looking for (only in dev)
                              if (urlPath.includes('grammarLoader')) {
                                console.log('[SW] Cache miss for grammarLoader:', urlPath);
                                console.log('[SW] Tried formats:', event.request.url, relativePath, noSlashPath, dotSlashPath);
                              }
                              
                              // Otherwise, return a proper error response
                              return new Response('Offline - resource not available: ' + urlPath, {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: { 'Content-Type': 'text/plain' }
                              });
                            });
                        });
                    });
                });
            });
        });
      })
  );
});

