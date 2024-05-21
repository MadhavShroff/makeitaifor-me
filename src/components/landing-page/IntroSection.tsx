import Link from "next/link";
import StartForFreeButton from "./StartForFreeButton";

const IntroSection = () => {
    return (
        <div className="flex flex-col justify-center items-center border-t-4 border-b-4 border-white pt-24 pb-32 sm:pb-10 sm:pt-10 text-center antialiased text-black text-white mx-6">
            <div className="container mx-auto px-4 sm:px-0">
                <h1 className="text-7xl sm:text-4xl lg:text-7xl font-semibold mb-4">Engineered from start to finesse</h1>
                <h2 className="text-6xl sm:text-4xl lg:text-6xl font-normal mb-8">
                    <Link href="/" className="px-2 py-1 sm:py-2 font-bold text-white hover:underline decoration-orange-500 decoration-4">
                        MakeIt<span className="text-orange-500">Ai</span>For.
                        <span className="text-orange-500">Me</span>
                    </Link> is a Suite of AI Tools that work together seamlessly</h2>
                <br />
                <p className="text-4xl lg:text-4xl font-light mb-8 sm:text-3xl">
                    Leverage the <span className="text-orange-500 font-semibold">Latest and greatest AI models</span> to get the job done.  
                </p>
                {/* TODO: Add the following large graphic with text something like: Access to all the latest and greatest Open source and Proprietary LLM models in the market, Check (large green tick mark), Autoflows - Ai driven workflows that are constructed and run automatically, on demand and in real time (Check), A sexy user interface to tie it all together (Check) */}
                <div className="justify-center items-center">
                    <Link href="/chat">
                        <StartForFreeButton />
                    </Link>
                    <br />
                    {/* <span className="text-sm sm:text-lg lg:text-xl font-light ml-4">with sample collections, or create your own!</span> */}
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
