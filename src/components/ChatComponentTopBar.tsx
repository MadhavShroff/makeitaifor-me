import React, { useState } from 'react';

type ChatComponentTopBarPropType = {
    title: string | undefined;
}

export const ChatComponentTopBar = (props: ChatComponentTopBarPropType) => {
    const [isCollectionsDropdownVisible, setCollectionsDropdownVisible] = useState(false);
    const [isModelDropdownVisible, setModelDropdownVisible] = useState(false);

    return (
        <div className="flex gap-1 p-1 mt-2 flex-wrap items-center w-[50%] h-auto border-[2px] border-white bg-black z-10 z-10 bg-black top-1 rounded-lg justify-between">
            {/* {props.title && <div className="mx-2">{props.title}</div>} */}
            <div>
                <div className="relative inline-block text-left">
                    <div className='group'>
                        <button
                            type="button"
                            onClick={() => { setCollectionsDropdownVisible(!isCollectionsDropdownVisible); setModelDropdownVisible(false); }}
                            className="inline-flex w-full justify-center items-center text-left gap-x-1.5 rounded-md bg-black px-3 py-0.5 text-sm sm:text-xs font-semibold text-white hover:text-black shadow-sm hover:bg-orange-500"
                            id="menu-button"
                            aria-expanded={isCollectionsDropdownVisible ? 'true' : 'false'}
                            aria-haspopup="true"
                        >
                            Use File or Collection
                            <svg className="-mr-1 h-5 w-5 text-gray-400 group-hover:text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {isCollectionsDropdownVisible && (
                        <div className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-white focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                            <div className="py-1 mx-1 rounded" role="none">
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm sm:text-xs hover:bg-white hover:text-black rounded" role="menuitem" tabIndex={-1} id="menu-item-0">Coming Soon...</a>
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative inline-block text-left">
                    <div className='group'>
                        <button
                            type="button"
                            onClick={() => { setModelDropdownVisible(!isModelDropdownVisible); setCollectionsDropdownVisible(false); }}
                            className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-black px-3 py-0.5 text-sm sm:text-xs font-semibold text-white hover:text-black shadow-sm hover:bg-orange-500"
                            id="menu-button"
                            aria-expanded={isModelDropdownVisible ? 'true' : 'false'}
                            aria-haspopup="true"
                        >
                            Model
                            <svg className="-mr-1 h-5 w-5 text-gray-400 group-hover:text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {isModelDropdownVisible && (
                        <div className="absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-white focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                            <div className="py-1" role="none">
                                {/* <a href="#" className="flex items-center px-4 py-2 hover:text-black hover:bg-white" role="menuitem">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mr-2 h-5 w-5">
                                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"></path>
                                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"></path>
                                    </svg>
                                    Duplicate
                                </a> */}
                                <a href="#" className="flex items-center px-4 py-2 hover:text-black hover:bg-white rounded mx-1" role="menuitem">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mr-2 h-5 w-5">
                                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"></path>
                                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"></path>
                                    </svg> */}
                                    <div className="mr-2 h-4 w-4 bg-orange-500 rounded-full"></div>
                                    GPT-4
                                </a>
                                <a href="#" className="flex items-center px-4 py-2 hover:text-black hover:bg-white rounded mx-1" role="menuitem">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mr-2 h-5 w-5">
                                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"></path>
                                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"></path>
                                    </svg> */}
                                    <div className="mr-2 h-4 w-4 bg-blue-500 rounded-full"></div>
                                    GPT-3
                                </a>
                                <a href="#" className="flex items-center px-4 py-2 hover:text-black hover:bg-white rounded mx-1" role="menuitem">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mr-2 h-5 w-5">
                                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"></path>
                                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"></path>
                                    </svg> */}
                                    <img itemProp="image" className="avatar mr-2 h-4 w-4 rounded-full" src="https://avatars.githubusercontent.com/u/76263028?s=200&amp;v=4" width="100" height="100" alt="@anthropics" />
                                    Claude 2
                                </a>
                                <a href="#" className="flex items-center px-4 py-2 hover:text-black hover:bg-white rounded mx-1" role="menuitem">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mr-2 h-5 w-5">
                                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"></path>
                                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"></path>
                                    </svg> */}
                                    <img itemProp="image" className="avatar mr-2 h-4 w-4 rounded-full" src="https://avatars.githubusercontent.com/u/76263028?s=200&amp;v=4" width="100" height="100" alt="@anthropics" />
                                    Claude
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
