import { render } from 'preact';
import { useRef } from 'preact/hooks';
import { forwardRef } from 'preact/compat';
import { Storage } from "../models/Storage";
import { Theme } from "../models/Theme";
import { Transfer } from "../models/Transfer"
import { FolderGit2, FilePlus2, BookText, Download, Trash2 } from "lucide-preact";
import { Dependencies } from './Dependencies';

export const Frontpage = forwardRef(({ notebook }, ref) => {
    const storage = Storage;
    const theme = new Theme(storage);
    const transfer = new Transfer(notebook.storage);

    const importButtonRef = useRef(null);
    const deleteDialogRef = useRef(null);
    const themeButtonRef = useRef(null);

    const ThemeIcon = theme.getIcon();

    let importJson = null;

    const handleJsonInput = (e) => {
        const file = e.target.files[0];
        if (!file) {
            importJson = null;
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                importJson = JSON.parse(e.target.result);
                importButtonRef.current.removeAttribute('disabled');
            } catch (error) {
                importJson = null;
                alert('Invalid JSON file.');
            }
        };
        reader.readAsText(file);
    };

    const handleImportButton = () => {
        if(importJson === null){
            return;
        }
        transfer.import(importJson);
        location.reload();
    };

    const handleExportButton = () => {
        transfer.export();
    };

    const handleDeleteDialogTriggerButton = () => {
        deleteDialogRef.current.showModal();
    };

    const handleDeleteButton = (e) => {
        e.preventDefault();
        notebook.storage.clear();
        location.reload();
    };

    const handleThemeButton = () => {
        theme.toggle();
        themeButtonRef.current.innerHTML = '';
        const ThemeIcon = theme.getIcon();
        render(<ThemeIcon />, themeButtonRef.current);
    };

    return (
        <>
            <div id="frontpage" ref={ref}>
                <h1>
                    Mathbook <a id="github-link" href="https://github.com/hhiruko/mathbook"><FolderGit2 /></a>
                    <button id="theme-button" ref={themeButtonRef} onClick={handleThemeButton}><ThemeIcon /></button>
                </h1>
                <p>Mathbook is a simple, interactive notebook for writing, organizing, and managing math notes and formulas, with a clean, responsive interface and page-based navigation.</p>
                <blockquote>All your data is saved in your browser. If you clear the cache, your data will be lost.</blockquote>
                <p>To start, click on the <FilePlus2 /> button at the top of the page. This will add a blank page.</p>
                <p>To return to this page, click on the <BookText /> button at the top of the page.</p>
                
                <Dependencies />

                <h2>Import/Export Pages <Download /></h2>
                <p>You can import new pages in JSON format:</p>
                <div id="import-container">
                    <input type="file" id="json-input" accept=".json" onChange={handleJsonInput}/>
                    <button id="import-button" disabled ref={importButtonRef} onClick={handleImportButton}>Import</button>
                </div>
                <p>You can export your existing pages to JSON:</p>
                <button id="export-button" onClick={handleExportButton}>Export</button>

                <h2>Delete Pages <Trash2 /></h2>
                <div id="delete-container">
                    <p>You can delete all your pages. This process is irreversible.</p>
                    <button id="delete-dialog-trigger-button" onClick={handleDeleteDialogTriggerButton}>Delete</button>
                </div>
                <dialog id="delete-dialog" ref={deleteDialogRef} closedby="any">
                    <p>Are you sure you want to delete all pages?</p>
                    <form class="delete-dialog-form" method="dialog">
                        <button autofocus>Cancel</button>
                        <button id="delete-button" onClick={handleDeleteButton}>Delete</button>
                    </form>
                </dialog>
            </div>
        </>
    );
});