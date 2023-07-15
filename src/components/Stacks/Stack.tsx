import Button from "../Button";
import Droppable from "../documents/Droppable";

export const Stack = (props) => {
    return (
        <Droppable id={props.title}>
            <div className="group pl-16 sm:pl-12 pt-8 pb-8">
                <div className="relative w-72 h-60 sm:w-40 sm:h-32">
                    <div className="w-full sm:h-24 sm:w-44 h-40 bg-green-400 transform transition-all absolute rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                    </div>
                    <div className="w-full sm:h-24 sm:w-44 h-40 bg-yellow-400 transform transition-all absolute sm:top-2 top-4 sm:-left-2 -left-4 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                    </div>
                    <div className="w-full sm:h-24 sm:w-44 h-40 bg-red-400 transform transition-all absolute sm:top-4 top-8 sm:-left-4 -left-8 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                    </div>
                    <div className="w-full sm:h-24 sm:w-44 h-40 bg-black transform transition-all absolute sm:top-6 top-12 sm:-left-6 -left-12 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                    </div>
                    <div className="w-full sm:h-24 sm:w-44 h-40 bg-purple-400 transform transition-all absolute sm:top-8 top-16 sm:-left-8 -left-16 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                    </div>
                    <div className="w-full sm:h-24 sm:w-44 h-40 bg-white flex flex-col justify-center text-black items-center border-2 border-black transform transition-all absolute sm:top-10 top-20 sm:-left-10 -left-20 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                        <img
                            src={`https://source.boringavatars.com/marble/50/HelloHi?colors=EF233C,FED4E7,313638,003E1F`}
                            alt="Profile Picture"
                        />
                        Sample collection
                    </div>
                </div>
                <Button _key={0} text={"Start Chat"} className="mt-4 group-hover:visible invisible ml-0 align-start"/>
            </div>
        </Droppable>
    );
};

export default Stack;