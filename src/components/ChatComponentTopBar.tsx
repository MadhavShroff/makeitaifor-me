import { ChatContext } from '@/pages/chat';
import { fetchFilesMetaData, fetchModels } from '@/utils/fetches';
import { FileData, Model, S3MetaData } from '@/utils/types';
import React, { useState } from 'react';

type ChatComponentTopBarPropType = {
    title: string | undefined;
}

export const ChatComponentTopBar = (props: ChatComponentTopBarPropType) => {
    const [isCollectionsDropdownVisible, setCollectionsDropdownVisible] = useState(false);
    const [isModelDropdownVisible, setModelDropdownVisible] = useState(false);
    const [modelsAvailable, setModelsAvailable] = useState<Model[]>([]);
    const [fileNamesArr, setFileNamesArr] = useState<{ name: string, fileKey: string }[]>([]);
    const [filesData, setFilesData] = useState<FileData[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);

    const context = React.useContext(ChatContext);
    if (!context) throw new Error("YourChildComponent must be used within a ChatProvider");
    const {
        user,
    } = context;

    React.useEffect(() => {
        if (user) fetchFilesMetaData(user.userId).then((metas) => {
            setFilesData(metas.map((meta: S3MetaData) => {
                return {
                    meta: meta,
                    parsedContent: null
                }
            }));
            setFileNamesArr(metas.sort((a, b) => new Date(a.LastModified).getTime() - new Date(b.LastModified).getTime()).map((meta: S3MetaData) => {
                const fileName = meta.Key.split('/')[1];
                const fileId = meta.Key;
                return {
                    name: fileName.length > 70 ? fileName.substring(0, 70) + '...' + fileName.split('.')[1] : fileName, // truncate file name if too long
                    fileKey: fileId
                }
            }));
        }).catch(console.error);
    }, [user]);

    const onModelDropdownClicked = () => {
        setModelDropdownVisible(!isModelDropdownVisible);
        setCollectionsDropdownVisible(false);
        console.log("onModelDropdownClicked", isModelDropdownVisible && modelsAvailable.length == 0);
        if (modelsAvailable.length == 0) {
            fetchModels().then(setModelsAvailable).catch(console.error);
        }
    }

    return (
        <div className="flex gap-1 p-1 mt-2 flex-wrap items-center w-[50%] h-auto border-[2px] border-white bg-black z-10 z-10 bg-black top-1 rounded-lg justify-between">
            {/* {props.title && <div className="mx-2">{props.title}</div>} */}
            <div>
                <div className="relative inline-block text-left">
                    <div className='group'>
                        <button
                            type="button"
                            onClick={() => { setCollectionsDropdownVisible(!isCollectionsDropdownVisible); setModelDropdownVisible(false); }}
                            className={"inline-flex w-full justify-center items-center text-left gap-x-1.5 rounded-md px-3 py-0.5 text-sm sm:text-xs font-semibold hover:text-black shadow-sm hover:bg-orange-500 " + (selectedFile == null ? "bg-black text-white" : "bg-white text-black")}
                            id="menu-button"
                            aria-expanded={isCollectionsDropdownVisible ? 'true' : 'false'}
                            aria-haspopup="true"
                        >
                            {selectedFile == null && "Use File or Collection"}
                            {selectedFile != null && selectedFile.meta.Key.split('/')[1]}
                            <svg className="-mr-1 h-5 w-5 text-gray-400 group-hover:text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {isCollectionsDropdownVisible && (
                        <div className="absolute right-0 z-10 mt-1 w-auto origin-top-right rounded-md bg-black shadow-lg ring-1 ring-white focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                            <div className="py-1" role="none">
                                {fileNamesArr.length == 0 &&
                                    <a key={1} href="/documents" className="flex items-center px-2 py-1 hover:text-black hover:bg-white rounded mx-1" role="menuitem">
                                        <div>
                                            + Upload a file or Collection
                                        </div>
                                    </a>
                                }
                                {fileNamesArr.map((file, index) => (
                                    <a key={index} href="#" className="flex items-center px-2 py-1 hover:text-black hover:bg-white rounded mx-1" role="menuitem" onClick={
                                        () => {
                                            setSelectedFile(filesData[index]);
                                            setCollectionsDropdownVisible(false);
                                        }
                                    }>
                                        <svg className='mr-2 h-10 w-10 flex-shrink-0' width="40" height="40" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="40" y="0" width="80" height="50" fill="#8B5CF6" rx="5" ry="5" stroke="white" stroke-width="1" />
                                            <rect x="32" y="6" width="80" height="50" fill="#000000" rx="5" ry="5" stroke="white" stroke-width="1" />
                                            <rect x="24" y="12" width="80" height="50" fill="#EF4444" rx="5" ry="5" stroke="white" stroke-width="1" />
                                            <rect x="16" y="18" width="80" height="50" fill="#FBBF24" rx="5" ry="5" stroke="white" stroke-width="1" />
                                            <rect x="8" y="24" width="80" height="50" fill="#059669" rx="5" ry="5" stroke="white" stroke-width="1" />
                                            <rect x="0" y="30" width="80" height="50" fill="#3B82F6" rx="5" ry="5" stroke="white" stroke-width="1" />
                                        </svg>
                                        {file.name}
                                    </a>
                                ))}
                            </div>

                        </div>
                    )}
                </div>
                <div className="relative inline-block text-left">
                    <div className='group'>
                        <button
                            type="button"
                            onClick={onModelDropdownClicked}
                            className={
                                "inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-3 py-0.5 text-sm sm:text-xs font-semibold hover:text-black shadow-sm hover:bg-orange-500 " + (selectedModel == null ? "bg-black text-white" : "bg-white text-black") }
                            id="menu-button"
                            aria-expanded={isModelDropdownVisible ? 'true' : 'false'}
                            aria-haspopup="true"
                        >
                            {selectedModel == null && "Select Model"}
                            {selectedModel != null && "Using " + selectedModel.name}
                            <svg className="-mr-1 h-5 w-5 text-gray-400 group-hover:text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {isModelDropdownVisible && (
                        <div className="absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-white focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                            <div className="py-1" role="none">
                                {modelsAvailable.map((model, index) => (
                                    <a key={index} href="#" className="flex items-center px-4 py-2 hover:text-black hover:bg-white rounded mx-1" role="menuitem"
                                    onClick={() => {
                                        setSelectedModel(model);
                                        setModelDropdownVisible(false);
                                    }}>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mr-2 h-5 w-5">
                                            <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"></path>
                                            <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"></path>
                                        </svg> */}
                                        {model.color && <div className={`mr-2 h-4 w-4 bg-${model.color} rounded-full`}></div>}
                                        {model.image && <img itemProp="image" className="avatar mr-2 h-4 w-4 rounded-full" src={model.image} width="100" height="100" alt="@anthropics" />}
                                        {model.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}