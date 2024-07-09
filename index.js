import { HelloWorld, HelloWorld } from './plugins/hello-world';

const canvas = document.getElementById('app');

if (!canvas) {
    throw new Error('canvas isnt there!');
}

const HelloWorld = new HelloWorld(canvas);
