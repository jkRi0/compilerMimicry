// Load ANTLR4 modules with error handling
// Export a promise that resolves when ANTLR4 is ready
window.antlr4LoadPromise = (async function() {
    try {
        console.log('Loading ANTLR4 C++ modules...');
        // Use absolute URLs for imports to work correctly with service worker cache
        const currentModuleUrl = typeof import.meta !== 'undefined' && import.meta.url 
            ? import.meta.url 
            : (document.currentScript?.src || window.location.href);
        const baseUrl = new URL('.', currentModuleUrl).href;
        console.log('Base URL for imports:', baseUrl);
        
        const antlr4Url = new URL('antlr/antlr4.web.js', baseUrl).href;
        const cppLexerUrl = new URL('antlr/CPP14Lexer.js', baseUrl).href;
        const cppParserUrl = new URL('antlr/CPP14Parser.js', baseUrl).href;
        
        console.log('Import URLs:', { antlr4Url, cppLexerUrl, cppParserUrl });
        
        const antlr4Module = await import(antlr4Url);
        const CPP14LexerModule = await import(cppLexerUrl);
        const CPP14ParserModule = await import(cppParserUrl);

        // Handle both default and named exports
        const antlr4 = antlr4Module.default || antlr4Module;
        const CPP14Lexer = CPP14LexerModule.default || CPP14LexerModule;
        const CPP14Parser = CPP14ParserModule.default || CPP14ParserModule;

        // Make sure the classes are properly loaded
        window.antlr4 = antlr4;
        window.CPP14Lexer = CPP14Lexer;
        window.CPP14Parser = CPP14Parser;

        // Signal that ANTLR4 is ready
        window.antlr4Ready = true;
        console.log('ANTLR4 C++ modules loaded successfully:', {
            antlr4: typeof window.antlr4,
            CPP14Lexer: typeof window.CPP14Lexer,
            CPP14Parser: typeof window.CPP14Parser
        });
        return true;
    } catch (error) {
        console.error('Failed to load ANTLR4 C++ modules:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            url: error.url || window.location.href
        });
        window.antlr4Ready = false;
        throw error;
    }
})();
