import { add } from '../lib/point';

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
            const [id] = this.world.findByPosition(p).filter(($) => this.world.get($).type === 'word');
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

     // Проверим, применяется ли правило к определенному типу
     is = (type, rule) => {
        return this.rules.some(($) => {
            return ($[0] === type && $[2] === rule)
                || ($[2] === type && $[0] === rule);
        });
    };

    // Вернем все типы, к которым применяется правило
    getTypes = (rule) => {
        return this.rules.map(($) => {
            if ($[0] === rule) {
                return $[2];
            }

            if ($[2] === rule) {
                return $[0];
            }

            return null;
        }).filter(Boolean);
    };
}
