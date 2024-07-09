export class HelloWorld {
    constructor (canvas) {
        const rect = canvas.parentNode.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = rect.width * pixelRatio;
        canvas.height = rect.height * pixelRatio;

        const context = canvas.getContext('2d');

        context.scale(pixelRatio, pixelRatio);

        context.font = '18px Rubik';
        context.fillText('Hello World', 10, 10 + 18);
    }
};
