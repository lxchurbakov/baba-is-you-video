import { add } from '../lib/point';

const UP_KEY = 87;
const DOWN_KEY = 83;
const LEFT_KEY = 65;
const RIGHT_KEY = 68;

const MAX_DEPTH = 3;

const getDirection = (keyCode) => {
    return {
        [UP_KEY]: 'top',
        [LEFT_KEY]: 'left',
        [RIGHT_KEY]: 'right',
        [DOWN_KEY]: 'bottom',
    }[keyCode] || null;
};

const move = (p, dir) => {
    return {
        right: add(p, { x: 1, y: 0 }),
        left: add(p, { x: -1, y: 0 }),
        top: add(p, { x: 0, y: -1 }),
        bottom: add(p, { x: 0, y: 1 }),
    }[dir] || p;
};

export class IsYou {
    constructor (world, rules) {
        this.world = world;
        this.rules = rules;

        this.setupKeyEvents();
    }

    move = (entityId, direction, depth = 0) => {
        if (depth > MAX_DEPTH) {
            return false;
        }

        const entity = this.world.get(entityId);
        const position = move(entity.position, direction);

        for (let obstacleId of this.world.findByPosition(position)) {
            if (!this.move(obstacleId, direction, depth + 1)) {
                return false;
            }
        }

        this.world.set(entityId, { ...entity, position })

        return true;
    };

    setupKeyEvents = () => {
        window.addEventListener('keydown', (e) => {
            const direction = getDirection(e.keyCode);

            const types = this.rules.all().filter(($) => $.join(' ').endsWith('is you')).map(($) => $[0]);

            for (let type of types) {
                for (let babaId of this.world.findByType(type)) {
                    this.move(babaId, direction);
                }
            }
        });
    };
};
