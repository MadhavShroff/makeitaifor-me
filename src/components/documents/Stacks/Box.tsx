import Draggable from "../Draggable";

export const Box = (props) => {
    return (
        <Draggable id={props.id}>
            <div className="p-1 z-50">
                <div className="lg:w-72 md:w-32 sm:w-32 sm:h-24 md:h-24 lg:h-40 flex flex-col border-2 border-black text-black rounded-lg text-xl sm:text-sm pt-1.5 pl-2 break-all bg-white">
                    {props.children}
                </div>
            </div>
        </Draggable>
    );
}
