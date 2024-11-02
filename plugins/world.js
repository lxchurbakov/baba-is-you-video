import { EventEmitter } from "../lib/events";
import { same } from '../lib/point';

export class World {
    constructor () {
        this.entities = [
            { id: 0, type: 'baba', position: { x: 0, y: 0 } },
            // { id: 1, type: 'wall', position: { x: 5, y: 5 } },
            // { id: 2, type: 'wall', position: { x: 6, y: 6 } },
            // { id: 3, type: 'wall', position: { x: 7, y: 6 } },
            { id: 7, type: 'word', position: { x: 8, y: 6 }, word: 'baba' },
            { id: 4, type: 'word', position: { x: 9, y: 6 }, word: 'wall' },
            { id: 5, type: 'word', position: { x: 8, y: 7 }, word: 'is' },
            { id: 6, type: 'word', position: { x: 8, y: 8 }, word: 'you' },

            { id: 8, type: 'word', position: { x: 1, y: 3 }, word: 'wall' },
            { id: 9, type: 'word', position: { x: 2, y: 3 }, word: 'is' },
            { id: 10, type: 'word', position: { x: 3, y: 3 }, word: 'stop' },
            { id: 11, type: 'word', position: { x: 1, y: 2 }, word: 'word' },
            { id: 12, type: 'word', position: { x: 2, y: 2 }, word: 'is' },
            { id: 13, type: 'word', position: { x: 3, y: 2 }, word: 'push' },

            { id: 14, type: 'water', position: { x: 5, y: 5 } },

            { id: 15, type: 'word', position: { x: 1, y: 10 }, word: 'water' },
            { id: 16, type: 'word', position: { x: 2, y: 10 }, word: 'is' },
            { id: 17, type: 'word', position: { x: 3, y: 10 }, word: 'die' },
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

    remove = (id) => {
        this.entities = this.entities.filter(($) => $.id !== id);

        this.onUpdate.emitps();
    };

    removeBulk = (ids) => {
        this.entities = this.entities.filter(($) => {
            if (ids.includes($.id)) {
                return false;
            } 

            return true;
        });

        if (ids.length > 0) {
            this.onUpdate.emitps();
        }
    };

    findByType = (type) => {
        return this.entities.filter(($) => $.type === type).map(($) => $.id);
    };

    findByPosition = (position) => {
        return this.entities.filter(($) => same($.position, position)).map(($) => $.id);
    };
};
