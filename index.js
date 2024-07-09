import { Walk } from './plugins/walk';

const canvas = document.getElementById('app');

if (!canvas) {
    throw new Error('canvas isnt there!');
}

const walk = new Walk(canvas);
