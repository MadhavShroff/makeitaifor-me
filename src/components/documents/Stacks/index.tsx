import Stack from "./Stack";
import { Box } from "./Box";
import FileUploadComponent from "../FileUploadComponent";
import { FilesStack } from "../FilesStack";

export const ScrollableStackContainer = (props) => {
    return (
        <div className="flex overflow-auto no-scrollbar sm:pl-2 pl-6">
            <div className="">
            </div>
            <FileUploadComponent />
            <FilesStack fileNames={props.fileNames} />
            {["Sample: Podcasts", "Sample: Research PDFs & Lectures", "Sample: Tax Documents"].map((title, index) => (
                <Stack key={index} title={title} />
                // <div className="transform translate-y-20"> {/* Increase translate value if needed */}
                // </div>
            ))}
        </div>
    );
};

export const StacksContainer = (props) => {
    return (
        <div className="h-82 flex">
            <div className="flex overflow-auto no-scrollbar sm:pl-2 px-10 justify-end">
                {/* <FilesStack fileNames={props.fileNames} /> */}
                {["Sample: Podcasts", "Sample: Research PDFs & Lectures", "Sample: Tax Documents"].map((title, index) => (
                    <Stack key={index} title={title} />
                    // <div className="transform translate-y-20"> {/* Increase translate value if needed */}
                    // </div>
                ))}
            </div>
        </div>
    );
};

export const ScrollableBoxContainer = (props) => {
    const titles = props.titles || [];
    let Boxes: JSX.Element[] = [];
    for (let i = 0; i < titles.length; i++)
        Boxes.push(<Box id={i} key={i}>{titles[i]}</Box>);
    return (
        <div className="flex flex-wrap p-2 w-full justify-center-start">
            {Boxes}
        </div>
    );
}