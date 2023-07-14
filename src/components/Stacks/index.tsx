import Stack from "./Stack";
import { Box }from "./Box";

export const ScrollableStackContainer = (props) => {
    const titles = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    return (
        <div className="flex overflow-x-scroll overflow-y-hidden sm:pl-2 pl-6">
            {titles.map((title, index) => (
                <Stack key={index} title={title} />
                // <div className="transform translate-y-20"> {/* Increase translate value if needed */}
                // </div>
            ))}
        </div>
    );
};

export const ScrollableBoxContainer = (props) => {
    const titles = props.titles || ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    console.log(titles);
    return (
        <div className="flex overflow-x-scroll overflow-y-hidden p-1">
            {props.children}
            {titles.map((title, index) => (
                <Box key={index}>
                    {title}
                </Box>
            ))}
        </div>
    );
}


