// Interfaces for Entities
abstract class IEntity {
    abstract getEntityTypeName(): string;
    pendingExecution: boolean = true;
}

// ---------------------------------

class IFundamentalEntity<T> implements IEntity {
    value?: T;
    pendingExecution: boolean;
    constructor(value: T, pendingExecution: boolean) {
        this.value = value;
        this.pendingExecution = pendingExecution;
    }
    getEntityTypeName = () : string => 'FundamentalEntity';
}

abstract class ICollectionEntity implements IEntity {
    pendingExecution: boolean;
    constructor(pendingExecution: boolean) {
        this.pendingExecution = pendingExecution;
    }
    abstract getEntityTypeName(): string;
}

class EContext extends IEntity {
    id: string;
    isEmpty: boolean;
    constructor(id: string, isEmpty: boolean) {
        super();
        this.id = id;
        this.isEmpty = isEmpty;
    }
    getEntityTypeName = () => 'Context';
}

// ----------------------------------------------------------------

class EText extends IFundamentalEntity<string> {
    constructor(value: string, pendingExecution: boolean) {
        super(value, pendingExecution);
    }
    getEntityTypeName = () => 'Text';
}

class ENumber extends IFundamentalEntity<number> {
    constructor(value: number, pendingExecution: boolean) {
        super(value, pendingExecution);
    }
    getEntityTypeName = () => 'Number';
}

class EAspectRatio extends IFundamentalEntity<number> {
    constructor(value: number, pendingExecution: boolean) {
        super(value, pendingExecution);
    }
    getEntityTypeName = () => 'AspectRatio';
}

class EImage extends IFundamentalEntity<string> {
    constructor(value: string, pendingExecution: boolean) {
        super(value, pendingExecution);
    }
    getEntityTypeName = () => 'Image';
}

class EURL extends IFundamentalEntity<string> {
    constructor(value: string, pendingExecution: boolean) {
        super(value, pendingExecution);
    }
    getEntityTypeName = () => 'URL';
}

class ES3URL extends IFundamentalEntity<string> {
    constructor(value: string, pendingExecution: boolean) {
        super(value, pendingExecution);
    }
    getEntityTypeName = () => 'S3URL';
}

class ESearchInput extends IEntity {
    query: string;
    settings: any = {};
    constructor(query: string) {
        super();
        this.query = query;
    }
    setSettings(settings: any) { this.settings = settings; }
    getEntityTypeName = () => 'SearchInput';
}

class EMarkdown extends IFundamentalEntity<string> {
    constructor(value: string, pendingExecution: boolean) {
        super(value, pendingExecution);
    }
    getEntityTypeName = () => 'Markdown';
}

// EList class for list collections
class EList<T extends IEntity> extends ICollectionEntity {
    values: T[];
    constructor(values: T[], pendingExecution: boolean) {
        super(pendingExecution);
        this.values = values;
    }
    getEntityTypeName = (): string => 'List'

    length = (): number => this.values.length;

    get = (index: number): T | undefined => { return this.values[index] }

    add = (item: T): void => { this.values.push(item) }

    delete = (item: T): void => {
        const index = this.values.indexOf(item);
        if (index !== -1) {
            this.values.splice(index, 1);
        }
    }
}

// EMap class for map collections
class EMap<V extends IEntity> extends ICollectionEntity {
    values: { [key: string]: V };
    constructor(values: { [key: string]: V }, pendingExecution: boolean) {
        super(pendingExecution);
        this.values = values;
    }
    getEntityTypeName = (): string => 'Map';

    get = (key: string): V | undefined => { return this.values[key]; };

    set = (key: string, value: V): void => { this.values[key] = value; };

    delete = (key: string): void => { delete this.values[key]; };

    keys = (): string[] => { return Object.keys(this.values);};

    valuesArray = (): V[] => { return Object.values(this.values); };

    has = (key: string): boolean => { return Object.prototype.hasOwnProperty.call(this.values, key); };

    clear = (): void => { this.values = {}; };
}

class ETable extends ICollectionEntity {
    rows: EList<EList<IEntity>>;
    constructor(rows: EList<EList<IEntity>>, pendingExecution: boolean) {
        super(pendingExecution);
        this.rows = rows;
    }
    getEntityTypeName = (): string => 'Table';

    getRow = (index: number): EList<IEntity> | undefined => { return this.rows.get(index); }

    addRow = (row: EList<IEntity>): void => { this.rows.add(row); }

    deleteRow = (row: EList<IEntity>): void => { this.rows.delete(row); }
}

class EWebLookupResult extends IEntity {
    url: string;
    searchQuery: string;
    images: string[];
    // other fields will be necessary
    constructor(url: string, searchQuery: string, images: string[]) {
        super();
        this.url = url;
        this.searchQuery = searchQuery;
        this.images = images;
    }
    getEntityTypeName = () => 'WebLookupResult';
}

// Factory Functions for Entity Creation
function createEntity<T extends IEntity>(entityClass: new (...args: any[]) => T, ...args: any[]): T {
    return new entityClass(...args);
}

// Creates pending execution entity
function createPEEntity<T extends IEntity>(entityClass: new (...args: any[]) => T, ...args: any[]): T {
    var t: T = new entityClass(...args);
    t.pendingExecution = true;
    return t;
}

// ************************************************************
// ************************************************************


abstract class Module<InputTypes extends (IEntity | undefined)[], OutputTypes extends (IEntity | undefined)[]> { 
    inputs: InputTypes;
    outputs: OutputTypes;

    constructor(inputs: InputTypes, outputs: OutputTypes) {
        this.inputs = inputs;
        this.outputs = outputs;
    }

    setInputs(inputs: InputTypes) { this.inputs = inputs; }

    setOutputs(outputs: OutputTypes) { this.outputs = outputs; }

    inputSize() { return this.inputs.length; }

    outputSize() { return this.outputs.length; }
}

// Specific Modules with Explicit Input and Output Types
class GenerateImage extends Module<[EText, EAspectRatio?, EContext?], [EImage]> { // (text: string, aspectRatio: number, context: id) => Generated Image
    constructor(inputs: [EText, EAspectRatio, EContext]) {
        super(inputs, [
            createPEEntity(EImage)
        ]);
    }

    setImageUrl(url: string) { this.outputs[0].value = url; }

    setInputText(text: string) { this.inputs[0].value = text; }

    setAspectRatio(aspectRatio: number) { 
        if (this.inputs[1]) {
            this.inputs[1].value = aspectRatio; 
        }
    }

    setContextId(id: string) { 
        if (this.inputs[2]) {
            this.inputs[2].id = id; 
        }
    }
}

class ExtractText extends Module<[EImage], [EText]> { // (image) => extracted text
    constructor(inputs: [EImage]) {
        super(inputs, [
            createPEEntity(EText)
        ]);
    }

    setExtractedText(text: string) { this.outputs[0].value = text;}

    setImageUrl(url: string) { this.inputs[0].value = url; }
}

class SummarizeText extends Module<[EText], [EText]> { // (text) => summary text
    constructor(inputs: [EText]) {
        super(inputs, [
            createPEEntity(EText)
        ]);
    }

    setSummarizedText(text: string) { this.outputs[0].value = text; }

    setInputText(text: string) { this.inputs[0].value = text; }
}

class GoogleSearch extends Module<[ESearchInput, EContext?, EImage?], [EWebLookupResult]> { // (query: string) => WebLookupResult
    constructor(inputs: [ESearchInput, EContext, EImage]) {
        super(inputs, [
            createPEEntity(EWebLookupResult)
        ]);
    }

    setWebLookupResult(result: EWebLookupResult) { this.outputs[0] = result; }

    setSearchQuery(query: ESearchInput) { if(this.inputs[0]) this.inputs[0] = query; }
}

class TableOperation extends Module<[ETable, EText], [ETable]> { // (table: Table, operation: string) => transformed table
    constructor(inputs: [ETable, EText]) {
        super(inputs, [
            createPEEntity(ETable)
        ]);
    }

    setTable(table: ETable) { this.outputs[0] = table; }

    setOperation(operation: string) { this.inputs[1].value = operation; }
}

class ExtractTables extends Module<[ES3URL?, EText?, EImage?], [ETable]> { // (url or text or image) => Table
    constructor(inputs: [EText]) {
        super(inputs, [
            createPEEntity(ETable)
        ]);
    }

    setExtractedTable(table: ETable) { this.outputs[0] = table; }

    setS3URL(url: string) {  if (this.inputs[0]) this.inputs[0].value = url; }

    setInputText(text: string) { if (this.inputs[1]) this.inputs[1].value = text; }

    setImageUrl(url: string) { if (this.inputs[2]) this.inputs[2].value = url; }
}

class GetSiteContent extends Module<[EURL], [EText]> { // (url: string) => string
    constructor(inputs: [EURL]) {
        super(inputs, [
            createPEEntity(EText)
        ]);
    }

    setExtractedContent(content: string) { this.outputs[0].value = content; }

    setURL(url: string) { this.inputs[0].value = url; }
}

class LanguageTranslate extends Module<[EText, EText], [EText]> { // (text: string, language: string) => string
    constructor(inputs: [EText, EText]) {
        super(inputs, [
            createPEEntity(EText)
        ]);
    }

    setTranslatedText(text: string) { this.outputs[0].value = text; }

    setInputText(text: string) { this.inputs[0].value = text; }
}

class GenerateMarkdown extends Module<[EText], [EMarkdown]> { // (text: string) => Properly formatted Markdown
    constructor(inputs: [EText]) {
        super(inputs, [
            createPEEntity(EMarkdown)
        ]);
    }

    setMarkdown(markdown: string) { this.outputs[0].value = markdown; }

    setInputText(text: string) { this.inputs[0].value = text; }
}

class MarkdownToHTML extends Module<[EMarkdown], [EText]> { // (markdown: string) => HTML
    constructor(inputs: [EMarkdown]) {
        super(inputs, [
            createPEEntity(EText)
        ]);
    }

    setHTML(html: string) { this.outputs[0].value = html; }

    setInputMarkdown(markdown: string) { this.inputs[0].value = markdown; }
}

class HTMLtoPDF extends Module<[EText | EMarkdown], [EURL]> { // (html: string) => URL
    constructor(inputs: [EText]) {
        super(inputs, [
            createPEEntity(EURL)
        ]);
    }

    setPDFURL(url: string) { this.outputs[0].value = url; }

    setInputHTML(html: string) { this.inputs[0].value = html; }
}