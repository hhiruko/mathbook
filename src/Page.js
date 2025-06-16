import { Storage } from "./Storage";

export class Page {
    constructor(guid = crypto.randomUUID(), storage = Storage) {
        this.guid = guid;
        this.storage = storage;

        this.#setWriter();
    }

    #setWriter() {
        this.writer = document.getElementById('writer');
        const keybindings = [
            {
                key: 'space',
                command: ['insert', '\\quad '],
            },
            {
                key: 'enter',
                command: ['addRowAfter'],
            }
        ];
        this.writer.keybindings = [...this.writer.keybindings, ...keybindings];
        this.writer.addEventListener('input', () => {
            this.storage.set(this.guid, this.writer.value);
        });

        const value = this.storage.get(this.guid);
        if(value !== null){
            this.writer.value = value;
        }
    }
}