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

function splitByPlus(expr) {
    const tokens = [];
    let current = "";
    let inString = false;
    let stringChar = null;

    for (let i = 0; i < expr.length; i++) {
        const ch = expr[i];

        if ((ch === '"' || ch === "'") && expr[i - 1] !== "\\") {
            if (inString && ch === stringChar) {
                inString = false;
                stringChar = null;
            } else if (!inString) {
                inString = true;
                stringChar = ch;
            }
            current += ch;
            continue;
        }

        if (ch === "+" && !inString) {
            if (current.trim()) {
                tokens.push(current.trim());
            }
            current = "";
        } else {
            current += ch;
        }
    }

    if (current.trim()) {
        tokens.push(current.trim());
    }

    return tokens;
}

function removeStringLiterals(expr) {
    return expr.replace(/"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g, "");
}

function containsStringLiteral(expr) {
    const stringPattern = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/;
    return stringPattern.test(expr);
}

function referencesStringVariable(expr, declarations) {
    const identifierPattern = /\b[A-Za-z_]\w*\b/g;
    let match;
    while ((match = identifierPattern.exec(expr)) !== null) {
        const name = match[0];
        const declaration = declarations[name];
        if (!declaration) {
            continue;
        }
        if (
            declaration.type === "String" ||
            declaration.type === "char" ||
            declaration.type === "Character"
        ) {
            return true;
        }
    }
    return false;
}

function classifyExpression(expr, declarations) {
    if (containsStringLiteral(expr) || referencesStringVariable(expr, declarations)) {
        return "concatenation";
    }

    const cleaned = removeStringLiterals(expr);
    if (/[+\-*/]/.test(cleaned)) {
        return "arithmetic";
    }

    return "value";
}

function evaluateArithmeticExpression(expr, declarations) {
    const withoutStrings = removeStringLiterals(expr);
    const replaced = withoutStrings.replace(
        /\b[A-Za-z_]\w*\b/g,
        (identifier) => {
            const lower = identifier.toLowerCase();
            if (lower === "true" || lower === "false") {
                return lower;
            }

            const declaration = declarations[identifier];
            if (!declaration) {
                throw new Error(`Unknown identifier "${identifier}" in arithmetic expression`);
            }
            if (!declaration.isValid) {
                throw new Error(
                    `Cannot use invalid value from "${identifier}" in arithmetic expression`,
                );
            }
            if (typeof declaration.jsValue !== "number") {
                throw new Error(
                    `Identifier "${identifier}" is not numeric and cannot be used arithmetically`,
                );
            }
            return declaration.jsValue.toString();
        },
    );

    const sanitized = replaced.replace(/\s+/g, "");
    if (!/^[0-9+\-*/().eE]+$/.test(sanitized)) {
        throw new Error(
            `Unsupported tokens in arithmetic expression "${expr}" after sanitizing`,
        );
    }

    try {
        // eslint-disable-next-line no-new-func
        const evaluator = new Function(`return (${replaced});`);
        return evaluator();
    } catch (error) {
        throw new Error(`Failed to evaluate arithmetic expression "${expr}": ${error.message}`);
    }
}

function evaluateExpression(expr, declarations) {
    const classification = classifyExpression(expr, declarations);
    if (classification === "arithmetic") {
        return evaluateArithmeticExpression(expr, declarations);
    }
    return evaluatePrintExpression(expr, declarations);
}

function evaluatePrintExpression(expr, declarations) {
    const tokens = splitByPlus(expr);

    return tokens
        .map((token) => {
            if (
                (token.startsWith('"') && token.endsWith('"')) ||
                (token.startsWith("'") && token.endsWith("'"))
            ) {
                return unquoteLiteral(token);
            }
            const identifier = token.replace(/[()]/g, "").trim();
            if (declarations[identifier]) {
                const declaration = declarations[identifier];
                if (!declaration.isValid) {
                    throw new Error(`Invalid value detected for identifier "${identifier}"`);
                }
                return declaration.valueForPrinting;
            }
            if (/^-?\d+(\.\d+)?$/.test(identifier)) {
                return identifier;
            }
            throw new Error(`Unknown token or identifier "${token}" in print expression`);
        })
        .join("");
}

function findInvalidSystemOutCalls(src) {
    const invalidCalls = [];
    const seen = new Set();
    const systemOutPattern = /System\.out\.([A-Za-z_]\w*)\s*\(/g;
    let match;

    while ((match = systemOutPattern.exec(src)) !== null) {
        const method = match[1];
        if (method !== "print" && method !== "println" && !seen.has(match.index)) {
            invalidCalls.push(
                `Unsupported System.out method "${method}". Only print and println are supported.`,
            );
        }
        seen.add(match.index);
    }

    return invalidCalls;
}

function simulateSystemOutPrinting(src) {
    const { declarations, errors } = extractDeclarations(src);
    const printCallPattern = /System\.out\.(println|print)\s*\(([^;]*)\);/g;
    let match;

    const syntaxErrors = findInvalidSystemOutCalls(src);
    const runtimeErrors = [];
    const outputLines = [];
    let lineBuffer = "";

    while ((match = printCallPattern.exec(src)) !== null) {
        const method = match[1];
        const expression = match[2].trim();
        try {
            const evaluated = evaluateExpression(expression, declarations);
            if (method === "print") {
                lineBuffer += evaluated;
            } else {
                outputLines.push(lineBuffer + evaluated);
                lineBuffer = "";
            }
        } catch (error) {
            runtimeErrors.push(error.message);
        }
    }

    if (lineBuffer) {
        outputLines.push(lineBuffer);
    }

    const allErrors = [...errors, ...syntaxErrors, ...runtimeErrors];
    if (allErrors.length > 0) {
        console.error("=== ERRORS DETECTED ===");
        allErrors.forEach((message) => console.error(message));
        return;
    }

    outputLines.forEach((line) => console.log(line));
}

simulateSystemOutPrinting(code);