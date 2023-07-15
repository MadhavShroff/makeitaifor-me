import Stack from "./Stack";
import { Box }from "./Box";
import Droppable from "../documents/Droppable";

export const ScrollableStackContainer = (props) => {
    const titles = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    return (
        <div className="flex overflow-x-scroll sm:pl-2 pl-6">
            {titles.map((title, index) => (
                <Stack key={index} title={title} />
                // <div className="transform translate-y-20"> {/* Increase translate value if needed */}
                // </div>
            ))}
        </div>
    );
};

export const ScrollableBoxContainer = (props) => {
    const titles = props.titles || [];
    let Boxes: JSX.Element[] = [];
    for(let i = 0; i < titles.length; i++)
        Boxes.push(<Box id={i} key={i}>{titles[i]}</Box>);
    return (
        <div className="flex flex-wrap p-2 w-full justify-around">
            {Boxes}
        </div>
    );
}



