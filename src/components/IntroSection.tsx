import Link from "next/link";

const IntroSection = () => {
    return (
        <div className="flex flex-col justify-center items-center border-t-4 border-b-4 border-white pt-24 pb-32 sm:pb-10 sm:pt-10 text-center antialiased text-black text-white">
            <div className="container mx-auto px-4 sm:px-0">
                <h1 className="text-7xl sm:text-4xl lg:text-7xl font-semibold mb-4">Engineered from start to finesse</h1>
                {/* <h2 className="text-6xl sm:text-4xl lg:text-6xl font-normal mb-8">
                    <Link href="/" className="px-2 py-1 sm:py-2 font-bold text-white hover:underline decoration-orange-500 decoration-4">
                        MakeIt<span className="text-orange-500">Ai</span>For.
                        <span className="text-orange-500">Me</span>
                    </Link> is a Suite of AI Tools and Services</h2> */}
                <br />
                <p className="text-4xl lg:text-4xl font-light mb-8 sm:text-3xl">
                    Apply the <span className="text-orange-500 font-semibold">Latest AI models</span> and the <span className="text-orange-500 font-semibold">Greatest UI</span> to advance <span className="text-orange-500 font-semibold">Your Work</span>
                </p>
                <div className="justify-center items-center">
                    <Link href="/chat">
                        <button
                            key="1"
                            className={"px-3 sm:px-4 py-2 mt-4 text-4xl border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold m-1 text-white border-white hover:text-black hover:border-black "} >
                            {"Start for Free →"}
                        </button>
                    </Link>
                    <br />
                    {/* <span className="text-sm sm:text-lg lg:text-xl font-light ml-4">with sample collections, or create your own!</span> */}
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
