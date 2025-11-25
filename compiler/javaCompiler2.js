let code = `
public class MainDemo {
    public static void main(String[] args) {

        // === PRIMITIVES ===
        byte byteVar = 10;
        short shortVar = 300;
        int intVar = 50000;
        long longVar = 90000000000L;

        float floatVar = 3.14f;
        double doubleVar = 3.14159265359;

        char charVar = 'A';
        boolean boolVar = true;

        // === NON-PRIMITIVES ===
        String stringVar = "Hello Java!";
        Integer wrapperInt = 42;
        Double wrapperDouble = 10.5;
        Boolean wrapperBoolean = false;

        // Print primitives
        System.out.println("=== PRIMITIVES ===");
        System.out.println("byte: " + byteVar);
        System.out.println("short: " + shortVar);
        System.out.println("int: " + intVar);
        System.out.println("long: " + longVar);
        System.out.println("float: " + floatVar);
        System.out.println("double: " + doubleVar);
        System.out.println("char: " + charVar);
        System.out.println("boolean: " + boolVar);

        System.out.println("\n=== NON-PRIMITIVES ===");
        System.out.println("String: " + stringVar);
        System.out.println("Integer wrapper: " + wrapperInt);
        System.out.println("Double wrapper: " + wrapperDouble);
        System.out.println("Boolean wrapper: " + wrapperBoolean);

        System.out.println("\n123" + "456");
        System.out.print(" 123" + 456);
        System.out.println(123 + 456);


        // === ARRAYS ===
        int[] numArray = {1, 2, 3, 4, 5};
        String[] strArray = {"One", "Two", "Three"};
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };

        System.out.print("\n1D Array: ");
        for (int num : numArray) System.out.print(num + " ");
        System.out.println();

        System.out.print("String Array: ");
        for (String s : strArray) System.out.print(s + " ");
        System.out.println();

        System.out.println("2D Array:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }

        // === CONTROL FLOW ===
        int value = 10;
        if (value > 5) {
            System.out.println("\nValue is greater than 5");
        } else {
            System.out.println("\nValue is 5 or less");
        }

        int day = 3;
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Another day");
        }


        // === LOOPS ===
        System.out.print("\nFor Loop: ");
        for (int i = 1; i <= 5; i++) System.out.print(i + " ");
        System.out.println();

        System.out.print("While Loop: ");
        int w = 1;
        while (w <= 5) {
            System.out.print(w + " ");
            w++;
        }
        System.out.println();

        System.out.print("Do-While Loop: ");
        int d = 1;
        do {
            System.out.print(d + " ");
            d++;
        } while (d <= 5);
        System.out.println();

        System.out.print("Enhanced For Loop (numArray): ");
        for (int num : numArray) System.out.print(num + " ");
        System.out.println();
    }
}

`;

// console.log(code);

const primitiveTypes = new Set([
    "byte",
    "short",
    "int",
    "long",
    "float",
    "double",
    "char",
    "boolean",
]);

const nonPrimitiveTypes = new Set(["String", "Integer", "Double", "Boolean"]);

function extractDeclarations(src) {
    const declarationPattern =
        /\b(byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)\s+([A-Za-z_]\w*)\s*=\s*([^;]+);/g;
    const declarations = {};
    const errors = [];

    let match;
    while ((match = declarationPattern.exec(src)) !== null) {
        const [, type, name, value] = match;
        const trimmedValue = value.trim();
        const validation = validateLiteral(type, trimmedValue);

        if (!validation.isValid) {
            errors.push(
                `Invalid value for ${type} ${name}: ${validation.message}`,
            );
        }

        declarations[name] = {
            type,
            literal: trimmedValue,
            valueForPrinting: validation.printValue,
            jsValue: validation.jsValue,
            isValid: validation.isValid,
        };
    }

    return { declarations, errors };
}

function unquoteLiteral(literal) {
    const trimmed = literal.trim();
    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed
            .slice(1, -1)
            .replace(/\\n/g, "\n")
            .replace(/\\t/g, "\t")
            .replace(/\\r/g, "\r");
    }
    return trimmed;
}

function validateNumericRange(value, min, max, typeLabel) {
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
        return {
            isValid: false,
            message: `${typeLabel} must be an integer`,
        };
    }

    if (value < min || value > max) {
        return {
            isValid: false,
            message: `${typeLabel} out of range (${min}..${max})`,
        };
    }

    return { isValid: true };
}

function stripSuffix(raw, suffixes) {
    const trimmed = raw.trim();
    const lastChar = trimmed.slice(-1).toLowerCase();
    if (suffixes.includes(lastChar)) {
        return trimmed.slice(0, -1);
    }
    return trimmed;
}

function validateLiteral(type, rawValue) {
    const result = {
        isValid: true,
        message: "",
        jsValue: null,
        printValue: rawValue,
    };

    const normalizedBoolean = rawValue.toLowerCase();
    const numericValue = Number(rawValue);

    switch (type) {
        case "byte": {
            const parsed = Number(stripSuffix(rawValue, []));
            const validation = validateNumericRange(parsed, -128, 127, "byte");
            if (!validation.isValid) {
                return { ...result, ...validation };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "short": {
            const parsed = Number(stripSuffix(rawValue, []));
            const validation = validateNumericRange(
                parsed,
                -32768,
                32767,
                "short",
            );
            if (!validation.isValid) {
                return { ...result, ...validation };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "int":
        case "Integer": {
            const parsed = Number(stripSuffix(rawValue, []));
            const validation = validateNumericRange(
                parsed,
                -2147483648,
                2147483647,
                "int",
            );
            if (!validation.isValid) {
                return { ...result, ...validation };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "long": {
            const stripped = stripSuffix(rawValue, ["l"]);
            if (!/^-?\d+$/.test(stripped.trim())) {
                return {
                    ...result,
                    isValid: false,
                    message: "long must be an integer literal",
                };
            }
            const parsed = Number(stripped);
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "float": {
            const stripped = stripSuffix(rawValue, ["f"]);
            const parsed = Number(stripped);
            if (!Number.isFinite(parsed)) {
                return {
                    ...result,
                    isValid: false,
                    message: "float must be numeric",
                };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "double":
        case "Double": {
            if (!Number.isFinite(numericValue)) {
                return {
                    ...result,
                    isValid: false,
                    message: "double must be numeric",
                };
            }
            return {
                ...result,
                jsValue: numericValue,
                printValue: String(numericValue),
            };
        }
        case "char": {
            const trimmed = rawValue.trim();
            if (
                !trimmed.startsWith("'") ||
                !trimmed.endsWith("'") ||
                trimmed.length < 3
            ) {
                return {
                    ...result,
                    isValid: false,
                    message: "char must use single quotes",
                };
            }
            const charValue = unquoteLiteral(trimmed);
            if (charValue.length !== 1) {
                return {
                    ...result,
                    isValid: false,
                    message: "char must be exactly one character",
                };
            }
            return {
                ...result,
                jsValue: charValue,
                printValue: charValue,
            };
        }
        case "boolean":
        case "Boolean": {
            if (normalizedBoolean !== "true" && normalizedBoolean !== "false") {
                return {
                    ...result,
                    isValid: false,
                    message: "boolean must be true or false",
                };
            }
            return {
                ...result,
                jsValue: normalizedBoolean === "true",
                printValue: normalizedBoolean,
            };
        }
        case "String": {
            const trimmed = rawValue.trim();
            if (
                !trimmed.startsWith('"') ||
                !trimmed.endsWith('"') ||
                trimmed.length < 2
            ) {
                return {
                    ...result,
                    isValid: false,
                    message: "String must use double quotes",
                };
            }
            const strValue = unquoteLiteral(trimmed);
            return {
                ...result,
                jsValue: strValue,
                printValue: strValue,
            };
        }
        default:
            return result;
    }
}

function findInvalidSystemOutCalls(src) {
    const invalidCalls = [];
    const systemOutPattern = /System\.out\.([A-Za-z_]\w*)\s*\(/g;
    let match;

    while ((match = systemOutPattern.exec(src)) !== null) {
        const method = match[1];
        if (method !== "print" && method !== "println") {
            invalidCalls.push(
                `Unsupported System.out method "${method}". Only print and println are supported.`,
            );
        }
    }

    return invalidCalls;
}

function extractMainMethodBody(src) {
    const mainIndex = src.indexOf("public static void main");
    if (mainIndex === -1) {
        return null;
    }
    const braceStart = src.indexOf("{", mainIndex);
    if (braceStart === -1) {
        return null;
    }
    const braceEnd = findMatchingBrace(src, braceStart);
    if (braceEnd === -1) {
        return null;
    }
    return src.slice(braceStart + 1, braceEnd);
}

function findMatchingBrace(src, openBraceIndex) {
    let depth = 0;
    let inString = false;
    let stringChar = null;

    for (let i = openBraceIndex; i < src.length; i++) {
        const ch = src[i];
        const prev = src[i - 1];

        if (inString) {
            if (ch === stringChar && prev !== "\\") {
                inString = false;
                stringChar = null;
            }
            continue;
        }

        if ((ch === '"' || ch === "'") && prev !== "\\") {
            inString = true;
            stringChar = ch;
            continue;
        }

        if (ch === "{") {
            depth += 1;
            continue;
        }

        if (ch === "}") {
            depth -= 1;
            if (depth === 0) {
                return i;
            }
        }
    }

    return -1;
}

function escapeNewlinesInStringLiterals(source) {
    let result = "";
    let inString = false;
    let stringChar = null;

    for (let i = 0; i < source.length; i++) {
        const ch = source[i];
        const prev = source[i - 1];

        if (inString) {
            if (ch === "\n") {
                result += "\\n";
                continue;
            }
            if (ch === "\r") {
                result += "\\r";
                continue;
            }
            if (ch === stringChar && prev !== "\\") {
                inString = false;
                stringChar = null;
            }
            result += ch;
            continue;
        }

        if ((ch === '"' || ch === "'") && prev !== "\\") {
            inString = true;
            stringChar = ch;
            result += ch;
            continue;
        }

        result += ch;
    }

    return result;
}

function convertMultiDimArrayDeclarations(source) {
    const typePattern =
        "(?:byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)";
    const multiPattern = new RegExp(
        `(\\s*)${typePattern}(?:\\s*\\[\\s*\\])+\\s+([A-Za-z_]\\w*)\\s*=\\s*(\\{[\\s\\S]*?\\})\\s*;`,
        "g",
    );

    return source.replace(multiPattern, (_, indent, name, initializer) => {
        const convertedInitializer = initializer.replace(/\{/g, "[").replace(/\}/g, "]");
        return `${indent}let ${name} = ${convertedInitializer};`;
    });
}

function convertArrayDeclarations(source) {
    const typePattern =
        "(?:byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)";
    const arrayPattern = new RegExp(
        `(\\s*)${typePattern}\\s*\\[\\s*\\]\\s+([A-Za-z_]\\w*)\\s*=\\s*\\{([\\s\\S]*?)\\};`,
        "g",
    );

    return source.replace(arrayPattern, (_, indent, name, values) => {
        const normalizedValues = values.replace(/\s*\n\s*/g, " ").trim();
        return `${indent}let ${name} = [${normalizedValues}];`;
    });
}

function convertEnhancedForLoops(source) {
    const typePattern =
        "(?:final\\s+)?(?:byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)";
    const enhancedPattern = new RegExp(
        `for\\s*\\(\\s*${typePattern}\\s+([A-Za-z_]\\w*)\\s*:\\s*([^\\)]+)\\)`,
        "g",
    );

    return source.replace(enhancedPattern, (_, iterator, iterable) => {
        return `for (const ${iterator} of ${iterable.trim()})`;
    });
}

function transformJavaBodyToJs(body) {
    let transformed = body;
    transformed = convertMultiDimArrayDeclarations(transformed);
    transformed = convertArrayDeclarations(transformed);
    transformed = convertEnhancedForLoops(transformed);
    transformed = transformed.replace(/System\.out\.println/g, "__println");
    transformed = transformed.replace(/System\.out\.print/g, "__print");
    transformed = transformed.replace(
        /\b(byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)\s+([A-Za-z_]\w*)\s*=/g,
        "let $2 =",
    );
    transformed = transformed.replace(/(\d+)[lL]\b/g, "$1");
    transformed = transformed.replace(/(\d+(?:\.\d+)?)[fF]\b/g, "$1");
    transformed = escapeNewlinesInStringLiterals(transformed);
    return transformed;
}

function executeJavaMain(src) {
    const mainBody = extractMainMethodBody(src);
    if (!mainBody) {
        throw new Error("Unable to locate the main method body.");
    }

    const jsBody = transformJavaBodyToJs(mainBody);

    try {
        const prefix = `
            const outputs = [];
            let currentLine = "";
            const __print = (value = "") => {
                currentLine += String(value ?? "");
            };
            const __println = (value = "") => {
                outputs.push(currentLine + String(value ?? ""));
                currentLine = "";
            };
        `;
        const suffix = `
            if (currentLine) {
                outputs.push(currentLine);
            }
            return outputs;
        `;
        const runner = new Function(`${prefix}${jsBody}${suffix}`);

        return runner();
    } catch (error) {
        throw new Error(`Failed to execute Java snippet: ${error.message}`);
    }
}

function simulateSystemOutPrinting(src) {
    const { errors } = extractDeclarations(src);
    const syntaxErrors = findInvalidSystemOutCalls(src);
    const allErrors = [...errors, ...syntaxErrors];
    let outputs = [];

    if (allErrors.length === 0) {
        try {
            outputs = executeJavaMain(src);
        } catch (error) {
            allErrors.push(error.message);
        }
    }

    if (allErrors.length > 0) {
        console.error("=== ERRORS DETECTED ===");
        allErrors.forEach((message) => console.error(message));
        return;
    }

    outputs.forEach((line) => console.log(line));
}

simulateSystemOutPrinting(code);