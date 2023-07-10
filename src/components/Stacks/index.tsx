export const Stacks = (props) => {
    return (
        <div className="group pl-24 pt-7 pb-7">
            <div className="relative w-72 h-60">
                <div className="w-full h-40 bg-green-400 transform transition-all absolute rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                </div>
                <div className="w-full h-40 bg-yellow-400 transform transition-all absolute top-4 -left-4 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                </div>
                <div className="w-full h-40 bg-red-400 transform transition-all absolute top-8 -left-8 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                </div>
                <div className="w-full h-40 bg-black transform transition-all absolute top-12 -left-12 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                </div>
                <div className="w-full h-40 bg-purple-400 transform transition-all absolute top-16 -left-16 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                </div>
                <div className="w-full h-40 bg-white flex flex-col justify-center text-black items-center border-2 border-black transform transition-all absolute top-20 -left-20 rounded-lg group-hover:skew-x-12 group-hover:-skew-y-12">
                    <img
                        src={`https://source.boringavatars.com/marble/50/HelloHi?colors=EF233C,FED4E7,313638,003E1F`}
                        alt="Profile Picture"
                    />
                    Hello hi
                </div>
            </div>
        </div>
    );
};

export const ScrollableStackContainer = () => {
    const titles = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    return (
        <div className="flex overflow-x-scroll overflow-y-hidden">
            {titles.map((title, index) => (
                <Stacks key={index} title={title} />
                // <div className="transform translate-y-20"> {/* Increase translate value if needed */}
                // </div>
            ))}
        </div>
    );
};

