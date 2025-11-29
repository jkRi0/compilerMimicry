// Load ANTLR4 modules with error handling
// Export a promise that resolves when ANTLR4 is ready
window.antlr4LoadPromise = (async function() {
    try {
        console.log('Loading ANTLR4 Java modules...');
        // Use absolute URLs for imports to work correctly with service worker cache
        // Use import.meta.url to get the current module's URL (ES6 module standard)
        const currentModuleUrl = typeof import.meta !== 'undefined' && import.meta.url 
            ? import.meta.url 
            : (document.currentScript?.src || window.location.href);
        const baseUrl = new URL('.', currentModuleUrl).href;
        console.log('Base URL for imports:', baseUrl);
        
        const antlr4Url = new URL('antlr/antlr4.web.js', baseUrl).href;
        const javaLexerUrl = new URL('antlr/JavaLexer.js', baseUrl).href;
        const javaParserUrl = new URL('antlr/JavaParser.js', baseUrl).href;
        
        console.log('Import URLs:', { antlr4Url, javaLexerUrl, javaParserUrl });
        
        const antlr4Module = await import(antlr4Url);
        const JavaLexerModule = await import(javaLexerUrl);
        const JavaParserModule = await import(javaParserUrl);

        // Handle both default and named exports
        const antlr4 = antlr4Module.default || antlr4Module;
        const JavaLexer = JavaLexerModule.default || JavaLexerModule;
        const JavaParser = JavaParserModule.default || JavaParserModule;

        // Make sure the classes are properly loaded
        window.antlr4 = antlr4;
        window.JavaLexer = JavaLexer;
        window.JavaParser = JavaParser;

        // Signal that ANTLR4 is ready
        window.antlr4Ready = true;
        console.log('ANTLR4 java modules loaded successfully:', {
            antlr4: typeof window.antlr4,
            JavaLexer: typeof window.JavaLexer,
            JavaParser: typeof window.JavaParser
        });
        return true;
    } catch (error) {
        console.error('Failed to load ANTLR4 Java modules:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            url: error.url || window.location.href
        });
        window.antlr4Ready = false;
        throw error;
    }
})();
