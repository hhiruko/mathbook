import { Notebook } from "./src/Notebook";
const notebook = new Notebook();

const pages = document.getElementById('pages');
let last = 0;
notebook.list().forEach((number, i) => {
    const page = document.createElement('div');
    page.textContent = `Page ${i}`;
    page.classList.add('page');

    page.addEventListener('click', () => {
        notebook.open(number);
    });

    pages.appendChild(page);
    last = i;
});

document.getElementById('add-button').addEventListener('click', () => {
    last++;

    const page = document.createElement('div');
    page.textContent = `Page ${last}`;
    page.classList.add('page');

    const number = notebook.add();

    page.addEventListener('click', () => {
        notebook.open(number);
    });

    pages.appendChild(page);
});