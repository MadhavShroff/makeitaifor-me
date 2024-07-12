import React, { useState, useEffect } from 'react'; 
import Module from './ModuleView';

const ModuleSection: React.FC = () => {
    return (
        <div className="mt-4 w-11/12">
            <h1 className="text-7xl font-semibold mt-12 mb-12 text-center">Current Available Modules</h1>
            <Module moduleName="AI Search" inputCount={1} outputCount={3} inputTypes={["Image", "File"]}/>
        </div>
    );
}

export default ModuleSection;