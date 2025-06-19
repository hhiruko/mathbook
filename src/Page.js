export class Page {
    constructor(storage) {
        this.storage = storage;
        this.writer = document.getElementById('writer');
        this.writer.smartMode = 'on';
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
    }

    set(number = Date.now()) {
        this.number = number;
        this.#setWriter();
    }

    #setWriter() {
        this.writer.style.display = 'block';
        
        this.writer.addEventListener('input', () => {
            this.storage.set(this.number, this.writer.value);
        });

        const value = this.storage.get(this.number);
        if(value !== null){
            console.log(value);
            this.writer.value = value;
        } else {
            this.writer.value = '\\displaylines{\\phantom{0}}';
        }
    }
}