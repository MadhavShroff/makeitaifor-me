var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Fundamental Entities
var EText = /** @class */ (function () {
    function EText(value) {
        this.value = value;
    }
    EText.prototype.getEntityTypeName = function () {
        return 'EText';
    };
    return EText;
}());
var ENumber = /** @class */ (function () {
    function ENumber(value) {
        this.value = value;
    }
    ENumber.prototype.getEntityTypeName = function () {
        return 'ENumber';
    };
    return ENumber;
}());
var EAspectRatio = /** @class */ (function () {
    function EAspectRatio(value) {
        this.value = value;
    }
    EAspectRatio.prototype.getEntityTypeName = function () {
        return 'EAspectRatio';
    };
    return EAspectRatio;
}());
var EImage = /** @class */ (function () {
    function EImage(value) {
        this.value = value;
    }
    EImage.prototype.getEntityTypeName = function () {
        return 'EImage';
    };
    return EImage;
}());
var EContext = /** @class */ (function () {
    // Context can be an object containing various parameters
    function EContext(data) {
        if (data === void 0) { data = {}; }
        this.data = data;
    }
    EContext.prototype.getEntityTypeName = function () {
        return 'EContext';
    };
    return EContext;
}());
// Collection Entities
var EList = /** @class */ (function () {
    function EList(values) {
        this.values = values;
    }
    EList.prototype.getEntityTypeName = function () {
        return 'EList';
    };
    return EList;
}());
var EMap = /** @class */ (function () {
    function EMap(values) {
        this.values = values;
    }
    EMap.prototype.getEntityTypeName = function () {
        return 'EMap';
    };
    return EMap;
}());
var ETable = /** @class */ (function () {
    function ETable(values) {
        this.values = values;
    }
    ETable.prototype.getEntityTypeName = function () {
        return 'ETable';
    };
    return ETable;
}());
// Factory Functions for Entity Creation
function createEntity(entityClass) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new (entityClass.bind.apply(entityClass, __spreadArray([void 0], args, false)))();
}
// Generic Module Class
var Module = /** @class */ (function () {
    function Module(inputs) {
        this.inputs = inputs;
        this.outputs = [];
    }
    Module.prototype.inputSize = function () {
        return this.inputs.length;
    };
    Module.prototype.outputSize = function () {
        return this.outputs.length;
    };
    return Module;
}());
// Specific Modules with Explicit Input and Output Types
var GenerateImage = /** @class */ (function (_super) {
    __extends(GenerateImage, _super);
    function GenerateImage(inputs) {
        return _super.call(this, inputs) || this;
    }
    GenerateImage.prototype.execute = function () {
        var _a = this.inputs, text = _a[0], aspectRatio = _a[1], context = _a[2];
        // Logic to generate image from text, aspect ratio, and context
        var imageUrl = 'http://example.com/generated_image.jpg'; // Placeholder URL
        var image = createEntity(EImage, imageUrl);
        this.outputs = [image];
    };
    return GenerateImage;
}(Module));
var ExtractText = /** @class */ (function (_super) {
    __extends(ExtractText, _super);
    function ExtractText(inputs) {
        return _super.call(this, inputs) || this;
    }
    ExtractText.prototype.execute = function () {
        var image = this.inputs[0];
        // Logic to extract text from image
        var extractedText = 'Extracted text from image'; // Placeholder text
        var text = createEntity(EText, extractedText);
        this.outputs = [text];
    };
    return ExtractText;
}(Module));
// Example Usage
(function main() {
    // Create entities using factory functions
    var textEntity = createEntity(EText, 'A beautiful sunset');
    var aspectRatioEntity = createEntity(EAspectRatio, 1.6);
    var contextEntity = createEntity(EContext, { mood: 'serene' });
    // Initialize and execute GenerateImage module
    var generateImageModule = new GenerateImage([textEntity, aspectRatioEntity, contextEntity]);
    generateImageModule.execute();
    console.log('GenerateImage Inputs:', generateImageModule.inputSize());
    console.log('GenerateImage Outputs:', generateImageModule.outputSize());
    console.log('Generated Image URL:', generateImageModule.outputs[0].value);
    // Initialize and execute ExtractText module
    var extractTextModule = new ExtractText([generateImageModule.outputs[0]]);
    extractTextModule.execute();
    console.log('ExtractText Inputs:', extractTextModule.inputSize());
    console.log('ExtractText Outputs:', extractTextModule.outputSize());
    console.log('Extracted Text:', extractTextModule.outputs[0].value);
})();
