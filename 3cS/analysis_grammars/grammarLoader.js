// Load ANTLR4 modules with error handling
// Export a promise that resolves when ANTLR4 is ready
window.antlr4LoadPromise = (async function() {
    try {
        console.log('Loading ANTLR4 C# modules...');
        // Use absolute URLs for imports to work correctly with service worker cache
        const currentModuleUrl = typeof import.meta !== 'undefined' && import.meta.url 
            ? import.meta.url 
            : (document.currentScript?.src || window.location.href);
        const baseUrl = new URL('.', currentModuleUrl).href;
        console.log('Base URL for imports:', baseUrl);
        
        const antlr4Url = new URL('antlr/antlr4.web.js', baseUrl).href;
        const csharpLexerUrl = new URL('antlr/CSharpLexer.js', baseUrl).href;
        const csharpParserUrl = new URL('antlr/CSharpParser.js', baseUrl).href;
        
        console.log('Import URLs:', { antlr4Url, csharpLexerUrl, csharpParserUrl });
        
        const antlr4Module = await import(antlr4Url);
        const CSharpLexerModule = await import(csharpLexerUrl);
        const CSharpParserModule = await import(csharpParserUrl);

        // Handle both default and named exports
        const antlr4 = antlr4Module.default || antlr4Module;
        const CSharpLexer = CSharpLexerModule.default || CSharpLexerModule;
        const CSharpParser = CSharpParserModule.default || CSharpParserModule;

        // Make sure the classes are properly loaded
        window.antlr4 = antlr4;
        window.CSharpLexer = CSharpLexer;
        window.CSharpParser = CSharpParser;

        // Signal that ANTLR4 is ready
        window.antlr4Ready = true;
        console.log('ANTLR4 C# modules loaded successfully:', {
            antlr4: typeof window.antlr4,
            CSharpLexer: typeof window.CSharpLexer,
            CSharpParser: typeof window.CSharpParser
        });
        return true;
    } catch (error) {
        console.error('Failed to load ANTLR4 C# modules:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            url: error.url || window.location.href
        });
        window.antlr4Ready = false;
        throw error;
    }
})();
