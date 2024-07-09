import baba from '../assets/baba.png';

const UP_KEY = 87;
const DOWN_KEY = 83;
const LEFT_KEY = 65;
const RIGHT_KEY = 68;

const GRID_SIZE = 60;

const loadImage = async (url) => new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);

    img.src = url;
});

export class Walk {
    constructor (canvas) {
        const rect = canvas.parentNode.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = rect.width * pixelRatio;
        canvas.height = rect.height * pixelRatio;

        const context = canvas.getContext('2d');

        context.scale(pixelRatio, pixelRatio);

        this.position = { x: 0, y: 0 };

        this.setupRender(context, rect);
        this.setupKeyEvents();
    }

    setupKeyEvents = () => {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === UP_KEY) {
                this.position.y -= 1;
            }

            if (e.keyCode === DOWN_KEY) {
                this.position.y += 1;
            }

            if (e.keyCode === RIGHT_KEY) {
                this.position.x += 1;
            }

            if (e.keyCode === LEFT_KEY) {
                this.position.x -= 1;
            }
        });
    };

    setupRender = (context, rect) => {
        let img = null;

        loadImage(baba).then((i) => {
            img = i;
        });
        
        context.imageSmoothingEnabled = false;

        const render = () => {
            context.clearRect(0, 0, rect.width, rect.height);

            if (img) {
                const size = { x: img.width * 9, y: img.height * 9 };
                const position = { x: this.position.x * GRID_SIZE, y: this.position.y * GRID_SIZE };

                context.drawImage(img, position.x + GRID_SIZE / 2 - size.x / 2, position.y + GRID_SIZE - size.y, size.x, size.y);
            }

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);      
    };
};
