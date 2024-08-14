import { World } from './plugins/world';
import { Walk } from './plugins/walk';

const canvas = document.getElementById('app');

if (!canvas) {
    throw new Error('canvas isnt there!');
}

const world = new World();
const walk = new Walk(canvas, world);
