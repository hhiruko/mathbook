import { useEffect, useRef } from 'preact/hooks';
import { CollectionStorage } from "../models/CollectionStorage";
import { Notebook } from "../models/Notebook";
import { Frontpage } from './Frontpage';
import { Navbar } from "./Navbar";

export function App() {
    const writerRef = useRef(null);
    const frontpageRef = useRef(null);

    const notebookStorage = new CollectionStorage('notebook-pages');
    const notebook = new Notebook(notebookStorage);

    useEffect(() => {
        notebook.load();
    }, []);

    return (
        <>
            <Navbar notebook={notebook} writerRef={writerRef} frontpageRef={frontpageRef} />
            <div id="main">
                <math-field id="writer" ref={writerRef}></math-field>
                <Frontpage ref={frontpageRef} notebook={notebook} />
            </div>
        </>
    );
}