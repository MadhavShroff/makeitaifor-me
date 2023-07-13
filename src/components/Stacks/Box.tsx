export const Box = (props) => {
    return (
        <div className="group p-1">
            <div className="relative w-72 h-40 sm:w-40 sm:h-32">
                <div className="w-full sm:h-24 sm:w-44 h-40 flex flex-col justify-center items-center border-4 border-white absolute rounded-lg text-xl sm:text-lg p-2 whitespace-pre-line">
                    {props.children}
                </div>
            </div>
        </div>
    );
}