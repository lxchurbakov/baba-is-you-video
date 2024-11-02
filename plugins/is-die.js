import _ from 'lodash';
import { same } from '../lib/point';

export class IsDie {
    constructor (world, rules) {
        this.world = world;
        this.rules = rules;

        this.world.onUpdate.on(this.check);
        this.world.onUpdate.on(this.alert);
    }

    alert = () => {
        const typesForYou = this.rules.getTypes('you');
        const entitiesForYou = _(typesForYou)
            .uniq()
            .map(($) => this.world.findByType($))
            .flatten()
            .map(($) => this.world.get($))
            .value();

        if (entitiesForYou.length === 0) {
            alert('Game Over');
        }
    };

    check = () => {
        const typesForYou = this.rules.getTypes('you');
        const typesForDie = this.rules.getTypes('die');

        const entitiesForYou = _(typesForYou)
            .uniq()
            .map(($) => this.world.findByType($))
            .flatten()
            .map(($) => this.world.get($))
            .value();
        
        const entitiesForDie = _(typesForDie)
            .uniq()
            .map(($) => this.world.findByType($))
            .flatten()
            .map(($) => this.world.get($))
            .value();

        const toRemove = [];

        for (let entityForYou of entitiesForYou) {
            for (let entityForDie of entitiesForDie) {
                if (same(entityForYou.position, entityForDie.position)) {
                    toRemove.push(entityForYou.id);
                }
            }
        }

        // console.log(toRemove);

        if (toRemove.length > 0) {

            this.world.removeBulk(toRemove);
        }
    };
}
