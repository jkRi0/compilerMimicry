async function compileCode(code, difficulty, language = 'java') {
    // Route to appropriate analysis based on language
    switch(language.toLowerCase()) {
        case 'c++':
        case 'cpp':
            if (typeof window.compileCppCode === 'function') {
                return await window.compileCppCode(code, difficulty);
            } else {
                return {
                    success: false,
                    output: "",
                    errors: [{
                        id: 'compiler-missing',
                        severity: 'error',
                        title: 'Compiler Error',
                        desc: 'C++ compiler is not loaded. Please refresh the page.',
                        line: 1,
                        excerpt: ''
                    }]
                };
            }
        case 'c#':
        case 'csharp':
            if (typeof window.compileCsharpCode === 'function') {
                return await window.compileCsharpCode(code, difficulty);
            } else {
                return {
                    success: false,
                    output: "",
                    errors: [{
                        id: 'compiler-missing',
                        severity: 'error',
                        title: 'Compiler Error',
                        desc: 'C# compiler is not loaded. Please refresh the page.',
                        line: 1,
                        excerpt: ''
                    }]
                };
            }
        case 'java':
        default:
            if (typeof window.compileJavaCode === 'function') {
                return await window.compileJavaCode(code, difficulty);
            } else {
                return {
                    success: false,
                    output: "",
                    errors: [{
                        id: 'compiler-missing',
                        severity: 'error',
                        title: 'Compiler Error',
                        desc: 'Java compiler is not loaded. Please refresh the page.',
                        line: 1,
                        excerpt: ''
                    }]
                };
            }
    }
}

// Export to window (browser environment)
window.compileCode = compileCode;
