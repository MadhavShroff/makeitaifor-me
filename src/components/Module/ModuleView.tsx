import React, { useState, useEffect } from 'react';

const inputTypeColors: Record<string, string> = {
    Text: '#FFB7CE', 
    File: '#C4E7E6', 
    Image: '#B2DFE7', 
    Password: '#FFDAB9', 
    Date: '#CFCFFF' 
};

interface InputProps {
    value: string;
    type: string;
}

interface ModuleProps {
    name: string;
    context: string;
    input: InputProps[];
    output: string[];
}

interface ModuleMain {
    moduleName: string;
    inputCount: number;
    outputCount: number;
    inputTypes: string[]; 
}

const Module: React.FC<ModuleMain> = ({ moduleName, inputCount, outputCount, inputTypes }) => {
    const initialInputCount = inputCount;
    const initialOutputCount = outputCount;

    const [moduleProps, setModuleProps] = useState<ModuleProps>({
        name: moduleName,
        context: '',
        input: Array.from({ length: initialInputCount }, (_, i) => ({
            value: '',
            type: inputTypes[i % inputTypes.length] 
        })),
        output: Array(initialOutputCount).fill('')
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const updateValue = (index: number, value: string) => {
        setModuleProps(prevState => ({
            ...prevState,
            input: prevState.input.map((input, i) => i === index ? { ...input, value } : input)
        }));
    };

    const handleRunClick = () => {
        console.log("Run button clicked!");
        setModuleProps(prevState => ({
            ...prevState,
            output: prevState.input.map((input, index) =>
                `Result ${index + 1}: ${input.value} \nContext: ${prevState.context}`
            )
        }));
    };

    const updateIsButtonEnabled = () => {
        const buttonEnabled =
            moduleProps.input.every(input => input.value.trim() !== '') && moduleProps.context.trim() !== '';
        setIsButtonEnabled(buttonEnabled);
    };

    useEffect(() => {
        updateIsButtonEnabled();
    }, [moduleProps.input, moduleProps.context]);

    useEffect(() => {
        setModuleProps(prevState => ({
            ...prevState,
            input: Array.from({ length: inputCount }, (_, i) => ({
                value: prevState.input[i]?.value || '',
                type: inputTypes[i % inputTypes.length]
            })),
            output: Array.from({ length: outputCount }, (_, i) => prevState.output[i] || '')
        }));
    }, [inputCount, outputCount, inputTypes]);

    return (
        <>
            <div className="container flex flex-col p-6 sm:p-4 rounded-[36px] shadow-lg border-2 border-white bg-black mb-16">
                <h1 className="text-4xl md:text-5xl mt-2 font-bold mb-12 text-center">{moduleProps.name}</h1>
                <form method="post" action="" className="flex flex-row gap-6">
                    <div className="flex flex-col w-1/2 space-y-4">
                        {moduleProps.input.map((input, index) => (
                            <div key={index} className="flex-1 flex flex-col">
                                <label className="text-white mb-1 font-normal">
                                    INPUT {index + 1}{' '}
                                    <span style={{ color: inputTypeColors[input.type] }}>
                                        {`<${input.type}>`}
                                    </span>
                                </label>
                                <textarea
                                    className="px-2 py-2 text-sm md:text-base placeholder-gray-400 font-light rounded-lg border resize-none text-black flex-1"
                                    id={`input-${index}`}
                                    name={`input-${index}`}
                                    value={input.value}
                                    onChange={(e) => updateValue(index, e.target.value)}
                                    placeholder={`Enter ${input.type}`}
                                    style={{ borderColor: inputTypeColors[input.type], borderWidth: '2px', borderStyle: 'solid' }}
                                />
                            </div>
                        ))}
                        <div className="flex-1 flex flex-col">
                            <label className="text-white mb-1 font-normal">CONTEXT</label>
                            <textarea
                                className="px-2 py-2 text-sm md:text-base placeholder-gray-400 font-light rounded-lg border resize-none text-black flex-1"
                                id="context"
                                name="context"
                                value={moduleProps.context}
                                onChange={(e) => setModuleProps(prevState => ({ ...prevState, context: e.target.value }))}
                                placeholder="Context"
                                style={{ borderColor: '#FDFD96', borderWidth: '2px', borderStyle: 'solid' }} 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 space-y-4">
                        {moduleProps.output.map((output, index) => (
                            <div key={index} className="flex-1 flex flex-col">
                                <label className="text-white mb-1 font-normal">OUTPUT {index + 1}</label>
                                <textarea
                                    className="px-2 py-2 text-sm md:text-base placeholder-gray-400 font-light rounded-lg border resize-none text-black flex-1 overflow-y-scroll"
                                    id={`output-${index}`}
                                    name={`output-${index}`}
                                    value={output}
                                    readOnly
                                    style={{ borderColor: '#B5E7A0', borderWidth: '2px', borderStyle: 'solid' }} 
                                />
                            </div>
                        ))}
                    </div>
                </form>
                <div className="flex justify-center mt-12">
                    <button
                        className={`text-xl rounded-lg w-1/8 px-3 py-1 ${isButtonEnabled ? 'bg-green-500 hover:bg-green-700 text-white border-2 cursor-pointer' : 'bg-green-900 text-gray-500 border-2 border-gray-500 cursor-not-allowed'}`}
                        onClick={handleRunClick}
                        disabled={!isButtonEnabled}
                    >
                        Run ▶
                    </button>
                </div>
            </div>
        </>
    );
};

export default Module;
