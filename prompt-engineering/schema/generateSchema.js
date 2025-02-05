// generateSchema.js
const ts = require('typescript');
const fs = require('fs');

function generateSchema(fileNames) {
    // Set up options for the TypeScript compiler
    const options = { target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS };

    // Create a program
    const program = ts.createProgram(fileNames, options);

    // Get the checker, we will use it to find more about classes
    const checker = program.getTypeChecker();

    const output = {
        modules: [],
        entities: []
    };

    // Visit every sourceFile in the program
    for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
            // Walk the tree to search for classes
            ts.forEachChild(sourceFile, visit);
        }
    }

    // Print the JSON schema
    console.log(JSON.stringify(output, null, 2));

    return;

    /** visit nodes finding exported classes */
    function visit(node) {
        if (ts.isClassDeclaration(node) && node.name) {
            const symbol = checker.getSymbolAtLocation(node.name);

            // Get the heritage clauses (extends, implements)
            const heritageClauses = node.heritageClauses;

            // Check if the class extends Module
            let extendsModule = false;
            if (heritageClauses) {
                for (const clause of heritageClauses) {
                    if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
                        for (const type of clause.types) {
                            const typeText = checker.typeToString(
                                checker.getTypeAtLocation(type)
                            );
                            if (typeText.startsWith('Module')) {
                                extendsModule = true;
                                break;
                            }
                        }
                    }
                }
            }

            if (extendsModule) {
                // This is a module class
                const details = serializeModuleClass(symbol);
                output.modules.push(details);
            } else {
                // Check if class implements IEntity or extends IFundamentalEntity
                let isEntity = false;
                if (heritageClauses) {
                    for (const clause of heritageClauses) {
                        if (
                            clause.token === ts.SyntaxKind.ImplementsKeyword ||
                            clause.token === ts.SyntaxKind.ExtendsKeyword
                        ) {
                            for (const type of clause.types) {
                                const typeText = checker.typeToString(
                                    checker.getTypeAtLocation(type)
                                );
                                if (
                                    typeText.startsWith('IEntity') ||
                                    typeText.startsWith('IFundamentalEntity') ||
                                    typeText.startsWith('ICollectionEntity')
                                ) {
                                    isEntity = true;
                                    break;
                                }
                            }
                        }
                    }
                }

                if (isEntity) {
                    const details = serializeEntityClass(symbol);
                    output.entities.push(details);
                }
            }
        } else {
            ts.forEachChild(node, visit);
        }
    }

    /** Serialize a class symbol information */
    function serializeModuleClass(symbol) {
        const details = {
            name: symbol.getName(),
            inputs: [],
            outputs: []
        };

        const type = checker.getDeclaredTypeOfSymbol(symbol);

        // Get the constructor
        const constructorType = checker.getTypeOfSymbolAtLocation(
            symbol,
            symbol.valueDeclaration
        );
        const signatures = constructorType.getConstructSignatures();

        if (signatures.length > 0) {
            const constructor = signatures[0];
            const params = constructor.getParameters();
            if (params.length > 0) {
                const inputParam = params.find((p) => p.name === 'inputs');
                if (inputParam) {
                    const inputType = checker.getTypeOfSymbolAtLocation(
                        inputParam,
                        inputParam.valueDeclaration
                    );
                    const inputTypeString = checker.typeToString(inputType);

                    // Parse the input types
                    const inputTypes = parseModuleInputOutputType(inputTypeString);
                    details.inputs = inputTypes;
                }

                const outputParam = params.find((p) => p.name === 'outputs');
                if (outputParam) {
                    const outputType = checker.getTypeOfSymbolAtLocation(
                        outputParam,
                        outputParam.valueDeclaration
                    );
                    const outputTypeString = checker.typeToString(outputType);

                    // Parse the output types
                    const outputTypes = parseModuleInputOutputType(outputTypeString);
                    details.outputs = outputTypes;
                }
            }
        }

        return details;
    }

    function serializeEntityClass(symbol) {
        const details = {
            name: symbol.getName(),
            properties: []
        };

        const type = checker.getDeclaredTypeOfSymbol(symbol);

        const properties = checker.getPropertiesOfType(type);

        for (const prop of properties) {
            const propType = checker.getTypeOfSymbolAtLocation(
                prop,
                prop.valueDeclaration
            );
            const propTypeString = checker.typeToString(propType);
            details.properties.push({
                name: prop.getName(),
                type: propTypeString
            });
        }

        return details;
    }

    function parseModuleInputOutputType(typeString) {
        // The typeString can be something like '[EText, EAspectRatio?, EContext?]'
        // We need to parse it into an array of types
        const types = [];
        // Remove brackets
        typeString = typeString.trim();
        if (typeString.startsWith('[') && typeString.endsWith(']')) {
            typeString = typeString.slice(1, -1);
        }

        // Split by commas, but need to handle nested generics
        const tokens = [];
        let currentToken = '';
        let angleBrackets = 0;
        for (let i = 0; i < typeString.length; i++) {
            const char = typeString[i];
            if (char === '<') {
                angleBrackets++;
            }
            if (char === '>') {
                angleBrackets--;
            }
            if (char === ',' && angleBrackets === 0) {
                tokens.push(currentToken.trim());
                currentToken = '';
            } else {
                currentToken += char;
            }
        }
        if (currentToken) {
            tokens.push(currentToken.trim());
        }

        for (const token of tokens) {
            types.push(token);
        }

        return types;
    }
}

// Read the file names from the command line arguments
const fileNames = process.argv.slice(2);

if (fileNames.length === 0) {
    console.error('Usage: node generateSchema.js <file1.ts> [file2.ts ...]');
    process.exit(1);
}

generateSchema(fileNames);
