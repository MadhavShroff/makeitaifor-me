export const Box = (props) => {
    return (
        <div className="group p-1">
            <div className="relative w-72 h-40 sm:w-40 sm:h-32">
                <div className="w-full sm:h-24 h-40 flex flex-col items-center border-4 border-white absolute rounded-lg text-xl sm:text-sm p-1 break-all">
                    {props.children}
                </div>
            </div>
        </div>
    );
}