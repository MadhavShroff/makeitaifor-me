import { MathpixMarkdownModel as MM } from 'mathpix-markdown-it';
import styles from './Page.module.css';

export interface PageProps {
    content: string;
    pgNum: number;
}

export const Page = (props: PageProps) => {
    return (
        <div className={`${styles.pageRoot} relative bg-white text-black rounded-lg h-full mx-5 my-1 flex flex-col`} style={{ minWidth: 'min(45rem, 80vw)', maxWidth: 'min(45rem, 80vw)' }}>
            <div id='preview-content' dangerouslySetInnerHTML={{ __html: MM.markdownToHTML(props.content) }} />
            <div className="border-t border-black h-4 flex justify-between text-[10px] items-center px-2">
                <p className="text-left"></p>
                <p className="text-right">{"Page " + props.pgNum}</p>
            </div>
        </div>
    )
};