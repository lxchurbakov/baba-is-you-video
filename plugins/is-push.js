import { add } from '../lib/point';

const MAX_DEPTH = 3;

const move = (p, dir) => {
    return {
        right: add(p, { x: 1, y: 0 }),
        left: add(p, { x: -1, y: 0 }),
        top: add(p, { x: 0, y: -1 }),
        bottom: add(p, { x: 0, y: 1 }),
    }[dir] || p;
};

export class IsPush {
    constructor (world, rules) {
        this.world = world;
        this.rules = rules;
    }

    push = (id, direction, depth = 0) => {
        const entity = this.world.get(id);
        const isStop = this.rules.is(entity.type, 'stop');

        if (isStop) {
            return false;
        }

        const isPush = this.rules.is(entity.type, 'push');

        if (!isPush) {
            return true;
        }

        if (depth > MAX_DEPTH) {
            return false;
        }
        
        const position = move(entity.position, direction);

        for (let obstacleId of this.world.findByPosition(position)) {
            if (!this.push(obstacleId, direction, depth + 1)) {
                return false;
            }
        }

        // if ()
        this.world.set(id, { ...entity, position })

        return true;
    };

    move = (id, direction) => {
        const entity = this.world.get(id);
        const position = move(entity.position, direction);

        for (let obstacleId of this.world.findByPosition(position)) {
            if (!this.push(obstacleId, direction)) {
                return false;
            }
        }

        this.world.set(id, { ...entity, position });
    };
};
