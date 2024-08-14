import { World } from './plugins/world';
import { Rules } from './plugins/rules';
import { Render } from './plugins/render';
import { IsYou } from './plugins/is-you';

const canvas = document.getElementById('app');

if (!canvas) {
    throw new Error('canvas isnt there!');
}

const world = new World();
const rules = new Rules(world);
const render = new Render(canvas, world, rules);
const isYou = new IsYou(world, rules);