import { EventEmitter } from "../lib/events";

const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const same = (a, b) => a.x === b.x && a.y === b.y;

export class World {
    constructor () {
        this.entities = [
            { id: 0, type: 'baba', position: { x: 0, y: 0 } },
            { id: 1, type: 'wall', position: { x: 5, y: 5 } },
            { id: 2, type: 'wall', position: { x: 6, y: 6 } },
            { id: 3, type: 'wall', position: { x: 7, y: 6 } },
            { id: 4, type: 'word', position: { x: 8, y: 6 }, word: 'baba' },
            { id: 5, type: 'word', position: { x: 8, y: 7 }, word: 'is' },
            { id: 6, type: 'word', position: { x: 8, y: 8 }, word: 'you' },
        ];

        this.onUpdate = new EventEmitter(); 
    }

    all = () => {
        return this.entities;
    };

    get = (id) => {
        return this.entities.find(($) => $.id === id) ?? null;
    };

    set = (id, entity) => {
        this.entities = this.entities.map(($) => {
            if ($.id === id) {
                return entity;
            } else {
                return $;
            }
        });

        this.onUpdate.emitps();
    };

    findByType = (type) => {
        return this.entities.filter(($) => $.type === type).map(($) => $.id);
    };

    findByPosition = (position) => {
        return this.entities.filter(($) => same($.position, position)).map(($) => $.id);
    };
};
