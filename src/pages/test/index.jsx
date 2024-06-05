import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TestPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const elements = gsap.utils.toArray('.scroll-item');
    }, []);

    return (
        <div className="bg-black min-h-screen flex flex-col justify-end items-center p-2">
        <div className="w-[98vw] h-[91vh] overflow-hidden border-4 fixed top-2 rounded-xl">
            <div ref={containerRef} className="absolute w-[96vw] mx-1">
                <div className="scroll-item w-full py-4 px-6 flex items-center justify-center border-4 border-white rounded-lg my-4">
                    <h2 className="text-white text-3xl">Lorem ipsum dolor sit amet</h2>
                </div>
            </div>
        </div>
        <div className="p-4 bg-gray-800 border-white border-4 fixed bottom-2 z-50 rounded-xl w-[98vw] flex flex-row justify-between">
            <input 
                type="text" 
                id='follow-up'
                className="flex-col w-[80vw] py-2 px-4 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-blue-500" 
                placeholder="Got a follow up?..."/>
            <button className="flex-col w-[10vw] py-2 px-4 rounded-lg bg-blue-500 text-white border-2 hover:border-white border-blue-500">Send</button>
        </div>
        </div>
    );
};

export default TestPage;
