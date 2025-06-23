import { Storage } from "./Storage"
import { Page } from "./Page";

export class Notebook {
    constructor(storage = Storage) {
        this.storage = storage;
        this.pages = storage.keys();
        this.page = new Page(storage);
        this.count = this.pages.length;
    }

    add() {
        this.page.set();
        return this.page.number;
    }

    open(number) {
        this.page.set(number);
    }

    delete(number) {
        this.storage.remove(number);
        this.page.writer.style.display = 'none';
    }

    list() {
        return this.pages;
    }
}