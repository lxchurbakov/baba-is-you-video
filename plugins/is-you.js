const UP_KEY = 87;
const DOWN_KEY = 83;
const LEFT_KEY = 65;
const RIGHT_KEY = 68;

const getDirection = (keyCode) => {
    return {
        [UP_KEY]: 'top',
        [LEFT_KEY]: 'left',
        [RIGHT_KEY]: 'right',
        [DOWN_KEY]: 'bottom',
    }[keyCode] || null;
};


export class IsYou {
    constructor (world, rules, isPush) {
        this.world = world;
        this.rules = rules;
        this.isPush = isPush;

        this.setupKeyEvents();
    }

    // move = (entityId, direction, depth = 0) => {
    //     if (depth > MAX_DEPTH) {
    //         return false;
    //     }

    //     const entity = this.world.get(entityId);
    //     const position = move(entity.position, direction);

    //     for (let obstacleId of this.world.findByPosition(position)) {
    //         if (!this.move(obstacleId, direction, depth + 1)) {
    //             return false;
    //         }
    //     }

    //     this.world.set(entityId, { ...entity, position })

    //     return true;
    // };
    
    setupKeyEvents = () => {
        window.addEventListener('keydown', (e) => {
            const direction = getDirection(e.keyCode);
            const types = this.rules.getTypes('you');

            for (let type of types) {
                for (let entityId of this.world.findByType(type)) {
                    this.isPush.move(entityId, direction);
                }
            }
        });
    };
};
