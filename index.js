import { Notebook } from "./src/Notebook";
import { createElement, FilePlus2, BookText, FolderGit2 } from 'lucide';

const notebook = new Notebook();

const addButton = document.getElementById('add-button');
const homeButton = document.getElementById('home-button');
const pages = document.getElementById('pages');
const srcCode = document.getElementById('src-code');
const frontpage = document.getElementById('frontpage');

const addIcon = createElement(FilePlus2);
const homeIcon = createElement(BookText);
const gitIcon = createElement(FolderGit2);

addButton.appendChild(addIcon);
homeButton.appendChild(homeIcon);
srcCode.appendChild(gitIcon);

const addPage = (number, index) => {
    const page = document.createElement('div');
    page.textContent = index;
    page.classList.add('page');

    page.addEventListener('click', () => {
        notebook.open(number);
        document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
        page.classList.add('active');
        frontpage.style.display = 'none';
    });

    pages.appendChild(page);
    return page;
};

let last = 0;
notebook.list().forEach((number, i) => {
    i++;
    addPage(number, i);
    last = i;
});

addButton.addEventListener('click', () => {
    last++;
    const number = notebook.add();
    const page = addPage(number, last);
    page.click();
});

homeButton.addEventListener('click', () => {
    document.getElementById('writer').style.display = 'none';
    frontpage.style.display = 'block';
});

homeButton.click();