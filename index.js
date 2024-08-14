import { World } from './plugins/world';
import { Rules } from './plugins/rules';
import { Walk } from './plugins/walk';

const canvas = document.getElementById('app');

if (!canvas) {
    throw new Error('canvas isnt there!');
}

const world = new World();
const rules = new Rules(world);
const walk = new Walk(canvas, world, rules);
