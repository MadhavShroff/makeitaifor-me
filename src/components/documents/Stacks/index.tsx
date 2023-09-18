import Stack from "./Stack";
import { Box } from "./Box";
import FileUploadComponent from "../FileUploadComponent";
import { FilesStack } from "../FilesStack";

export const ScrollableStackContainer = (props) => {
    return (
        <div className="flex overflow-auto no-scrollbar sm:pl-2 pl-6 overscroll-x-contain">
            <div className="">
            </div>
            <FileUploadComponent />
            <FilesStack fileNames={props.fileNames} fileOrStackClicked={props.fileOrStackClicked} fileSelected={props.fileSelected} />
            {["Sample: Podcasts", "Sample: Research PDFs & Lectures", "Sample: Tax Documents"].map((title, index) => (
                <div className=" pt-8" key={index}>
                    <Stack title={title} fileOrStackClicked={props.fileOrStackClicked} />
                </div>
                // <div className="transform translate-y-20"> {/* Increase translate value if needed */}
                // </div>
            ))}
        </div>
    );
};

export const StacksContainer = (props) => {
    const items = ["Sample: Podcasts", "Sample: Research PDFs & Lectures"];
    return (
        <div className="flex justify-center transform scale-75">
            {items.map((title, index) => (
                <div className="min-w-1/2 lg:w-1/4" key={index}>
                    <Stack title={title} />
                </div>
            ))}
            {/* Repeat the items for lg screens */}
            {items.map((title, index) => (
                <div className="min-w-1/2 lg:w-1/4 hidden lg:block" key={index + items.length}>
                    <Stack title={title} />
                </div>
            ))}
        </div>
    );
};