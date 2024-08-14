const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const same = (a, b) => a.x === b.x && a.y === b.y;

const ZERO_POINT = { x: 0, y: 0 }

export class Rules {
    constructor (world) {
        this.world = world;

        this.world.onUpdate.on(this.combineRules);
        this.combineRules();
    }

    extractRule = (position, change) => {
        return [
            add(position, { ...ZERO_POINT, ...{ [change]: -1 } }),
            position,
            add(position, { ...ZERO_POINT, ...{ [change]: 1 } })
        ].map((p) => {
            const [id] = this.world.findByPosition(p);
            const word = this.world.get(id)?.word ?? null;

            return word;
        }).filter(Boolean);
    };

    combineRules = () => {
        this.rules = [];

        for (let wordId of this.world.findByType('word')) {
            const { position } = this.world.get(wordId);

            const horizontalRule = this.extractRule(position, 'x');
            const verticalRule = this.extractRule(position, 'y');

            if (horizontalRule.length === 3) {
                this.rules.push(horizontalRule);
            }

            if (verticalRule.length === 3) {
                this.rules.push(verticalRule);
            }
        }
    };

    all = () => {
        return this.rules;
    };
}
