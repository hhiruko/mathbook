import { useEffect, useRef } from 'preact/hooks';
import { FilePlus2, BookText, Trash2 } from "lucide-preact";

export function Navbar({notebook, writerRef, frontpageRef}) {
    const pagesRef = useRef(null);
    const frontpageButtonRef = useRef(null);
    const deletePageDialogTriggerButtonRef = useRef(null);
    const deletePageDialogRef = useRef(null);

    let lastPage = notebook.count;

    const addPage = (number, index) => {
        const page = document.createElement('button');
        page.textContent = index;
        page.classList.add('page');
    
        page.addEventListener('click', () => {
            notebook.open(number);
            pagesRef.current.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
            page.classList.add('active');
            frontpageRef.current.style.display = 'none';
            deletePageDialogTriggerButtonRef.current.style.display = 'block';
        });
    
        return page;
    };
    
    const appendPage = (number, index) => {
        const page = addPage(number, index);
        pagesRef.current.appendChild(page);
        return page;
    };
    
    const insertPage = (number, index) => {
        const page = addPage(number, index);
        pagesRef.current.insertBefore(page, pagesRef.current.firstChild);
        return page;
    };

    const handleFrontpageButton = () => {
        writerRef.current.style.display = 'none';
        pagesRef.current.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
        frontpageRef.current.style.display = 'block';
        deletePageDialogTriggerButtonRef.current.style.display = 'none';
    };

    const handleAddPageButton = () => {
        lastPage++;
        const number = notebook.add();
        const page = insertPage(number, lastPage);
        page.click();
    };

    const handleDeletePageDialogTriggerButton = () => {
        deletePageDialogRef.current.showModal();
    };

    const handleDeletePageButton = (e) => {
        e.preventDefault();
        notebook.storage.remove(notebook.page.number);
        location.reload();
    }

    useEffect(() => {
        let last = lastPage;
        notebook.list().forEach(number => {
            appendPage(number, last);
            last--;
        });

        frontpageButtonRef.current.click();
    }, []);

    return (
        <>
            <nav id="navbar">
                <button id="frontpage-button" ref={frontpageButtonRef} onClick={handleFrontpageButton}><BookText /></button>
                <button id="add-page-button" onClick={handleAddPageButton}><FilePlus2 /></button>
                <button id="delete-page-dialog-trigger-button" ref={deletePageDialogTriggerButtonRef} onClick={handleDeletePageDialogTriggerButton}><Trash2 /></button>
                <dialog id="delete-page-dialog" ref={deletePageDialogRef} closedby="any">
                    <p>Are you sure you want to delete this page?</p>
                    <form class="delete-dialog-form" method="dialog">
                        <button autofocus>Cancel</button>
                        <button id="delete-page-button" onClick={handleDeletePageButton}>Delete</button>
                    </form>
                </dialog>
                <div id="pages" ref={pagesRef}></div>
            </nav>
        </>
    );
}