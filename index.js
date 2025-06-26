import { Notebook } from "./src/Notebook";
import { NotebookStorage } from "./src/NotebookStorage";
import { Storage } from "./src/Storage";
import { createElement, FilePlus2, BookText, FolderGit2, Boxes, Download, Trash2 } from 'lucide';
import { Transfer } from "./src/Transfer";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/mathbook/service-worker.js');
    });
}

const storage = Storage;
const notebookStorage = NotebookStorage;
const transfer = new Transfer(notebookStorage);
const notebook = new Notebook(notebookStorage);
let importJson = null;

const addButton = document.getElementById('add-button');
const homeButton = document.getElementById('home-button');
const pages = document.getElementById('pages');
const srcCode = document.getElementById('src-code');
const frontpage = document.getElementById('frontpage');
const newpageSpan = document.getElementById('newpage-icon');
const frontpageSpan = document.getElementById('frontpage-icon');
const jsonInput = document.getElementById('json-input');
const importButton = document.getElementById('import');
const exportButton = document.getElementById('export');
const dependenciesSpan = document.getElementById('dependencies-icon');
const importExportSpan = document.getElementById('import-export-icon');
const deleteSpan = document.getElementById('delete-icon');
const triggerDeleteDialogButton = document.getElementById('trigger-delete-dialog');
const deleteDialog = document.getElementById('delete-dialog');
const deleteButton = document.getElementById('delete');
const triggerDeletePageDialogButton = document.getElementById('trigger-delete-page-dialog');
const deletePageDialog = document.getElementById('delete-page-dialog');
const deletePageButton = document.getElementById('delete-page');

const addIcon = createElement(FilePlus2);
const homeIcon = createElement(BookText);
const gitIcon = createElement(FolderGit2);
const newpageIcon = createElement(FilePlus2);
const frontpageIcon = createElement(BookText);
const dependenciesIcon = createElement(Boxes);
const importExportIcon = createElement(Download);
const deleteIcon = createElement(Trash2);
const deletePageIcon = createElement(Trash2);

addButton.appendChild(addIcon);
homeButton.appendChild(homeIcon);
srcCode.appendChild(gitIcon);
newpageSpan.appendChild(newpageIcon);
frontpageSpan.appendChild(frontpageIcon);
dependenciesSpan.appendChild(dependenciesIcon);
importExportSpan.appendChild(importExportIcon);
deleteSpan.appendChild(deleteIcon);
triggerDeletePageDialogButton.appendChild(deletePageIcon);

const addPage = (number, index) => {
    const page = document.createElement('button');
    page.textContent = index;
    page.classList.add('page');

    page.addEventListener('click', () => {
        notebook.open(number);
        document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
        page.classList.add('active');
        frontpage.style.display = 'none';
        triggerDeletePageDialogButton.style.display = 'block';
    });

    return page;
};

const appendPage = (number, index) => {
    const page = addPage(number, index);
    pages.appendChild(page);
    return page;
};

const insertPage = (number, index) => {
    const page = addPage(number, index);
    pages.insertBefore(page, pages.firstChild);
    return page;
};

let last = notebook.count;
notebook.list().forEach(number => {
    appendPage(number, last);
    last--;
});

last = notebook.count;
addButton.addEventListener('click', () => {
    last++;
    const number = notebook.add();
    const page = insertPage(number, last);
    page.click();
});

homeButton.addEventListener('click', () => {
    document.getElementById('writer').style.display = 'none';
    document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
    frontpage.style.display = 'block';
    triggerDeletePageDialogButton.style.display = 'none';
});

jsonInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) {
        importJson = null;
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            importJson = JSON.parse(e.target.result);
            importButton.removeAttribute('disabled');
        } catch (error) {
            importJson = null;
            alert('Invalid JSON file.');
        }
    };
    reader.readAsText(file);
});

importButton.addEventListener('click', () => {
    if(importJson === null){
        return;
    }
    transfer.import(importJson);
    location.reload();
});

exportButton.addEventListener('click', () => {
    transfer.export();
});

triggerDeleteDialogButton.addEventListener('click', () => {
    deleteDialog.showModal();
});

deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    notebookStorage.clear();
    location.reload();
});

triggerDeletePageDialogButton.addEventListener('click', () => {
    deletePageDialog.showModal();
});

deletePageButton.addEventListener('click', (e) => {
    e.preventDefault();
    notebookStorage.remove(notebook.page.number);
    location.reload();
});

homeButton.click();