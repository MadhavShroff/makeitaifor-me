
const NavButton = ({ toggleSideNav, showSideNav }) =>
    <button
        className={"nav-button border-2 p-2 rounded hover:bg-orange-500" + (showSideNav ? " hidden" : "")}
        onClick={toggleSideNav}
    >
        <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-white" // change the height and width classes here
            height="3em" // increase the height here
            width="3em" // increase the width here
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="4" x2="9" y2="20"></line>
        </svg>
    </button>

const NavRow = ({text, onEditClicked, onDeleteClicked, onChatClicked}) => {
    return <li className="pt-2">
        <a className="flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all border-2 group">
            <svg className="h-4 w-4" onClick={onChatClicked} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative" onClick={onChatClicked}>
                {text}
                <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-black" />
            </div>
            <div className="absolute flex right-1 z-10 text-white group-hover:visible invisible">
                <button className="p-1 hover:text-white" onClick={onEditClicked}>
                    <svg className="h-4 w-4" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                </button>
                {/* <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r24:" data-state="closed" className="p-1 hover:text-white">
                    <svg className="h-4 w-4" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                </button> */}
                <button className="p-1 hover:text-white" onClick={onDeleteClicked}>
                    <svg className="h-4 w-4" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                </button>
            </div>
        </a>
    </li>
}

export const ChatComponentNav = ({ toggleSideNav, showSideNav }) =>
    <div id="chat-nav" className={"p-2 w-fit absolute " + (showSideNav ? "border-r-2 border-b-2" : "")}>
        <NavButton toggleSideNav={toggleSideNav} showSideNav={showSideNav} />
        {showSideNav &&
            <nav className="flex h-full w-full flex-col p-2" aria-label="Chat history">
                <div className="mb-1 flex flex-row space-x-2">
                    <a className="flex p-3 items-center transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white hover:bg-orange-500 h-11 flex-shrink-0 flex-grow">
                        <div className="text-xl p-2">
                            +
                        </div>
                        New chat +
                    </a>
                    <NavButton toggleSideNav={toggleSideNav} showSideNav={false} />
                </div>
                <div className="flex-col flex-1 transition-opacity duration-500 overflow-y-auto">
                    <div className="flex flex-col space-y-2 pb-2 text-white text-sm">
                        <div className="relative" data-projection-id="38" style={{ height: "auto", opacity: 1, transform: "none", transformOrigin: "50% 50% 0px" }}>
                            <div className="sticky top-0 z-[16]" data-projection-id="39" style={{ transform: "none", transformOrigin: "50% 50% 0px", opacity: 1 }}>
                                <h3 className="h-9 pb-2 pt-3 pl-1 text-xs text-white font-medium text-ellipsis overflow-hidden break-all">Yesterday</h3>
                            </div>
                            <ol>
                                {
                                    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((text, index) => <NavRow key={index} text={text}  onChatClicked={() => {
                                        console.log("Chat clicked " + text);
                                    }} onEditClicked={() => {
                                        console.log("Edit clicked " + text);
                                    }} onDeleteClicked={() => {
                                        console.log("Delete clicked " + text);
                                    }} />)
                                }
                                <li className="relative" data-projection-id="41" style={{ opacity: 1, height: "auto", transform: "none", transformOrigin: "50% 50% 0px" }}>
                                    <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 bg-orange-500 group">
                                        <svg className="h-4 w-4" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                        <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                                            Delete Icon for Compact Web Tables
                                            <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-orange-500 group-hover:from-[#2A2B32]" />
                                        </div>
                                    </a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/20 pt-2 hidden">
                    <div className="group relative">
                        {/* Rest of the content goes here */}
                    </div>
                </div>
            </nav>
        }
    </div>