import { Storage } from "./Storage";

export class NotebookStorage {
    static COLLECTION_KEY = 'notebook-pages';

    static get(key) {
        return NotebookStorage.#getPages()[key];
    }

    static set(key, value) {
        const pages = NotebookStorage.#getPages();
        pages[key] = value;
        NotebookStorage.#setPages(pages);
    }

    static remove(key) {
        const pages = NotebookStorage.#getPages();
        delete pages[key];
        NotebookStorage.#setPages(pages);
    }

    static clear() {
        Storage.remove(NotebookStorage.COLLECTION_KEY);
    }

    static keys() {
        const pages = NotebookStorage.#getPages();
        const keys = Object.keys(pages).map(key => parseInt(key));
        keys.sort((a,b) => b - a);
        return keys;
    }

    static #getPages() {
        return JSON.parse(Storage.get(NotebookStorage.COLLECTION_KEY) ?? '{}');
    }

    static #setPages(pages) {
        Storage.set(NotebookStorage.COLLECTION_KEY, JSON.stringify(pages));
    }
}