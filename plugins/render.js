import baba from '../assets/baba.png';
import wall from '../assets/wall.png';
import water from '../assets/water.png';

const GRID_SIZE = 40;

const loadImage = async (url) => new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);

    img.src = url;
});

export class Render {
    constructor (canvas, world, rules) {
        this.world = world;
        this.rules = rules;

        const rect = canvas.parentNode.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = rect.width * pixelRatio;
        canvas.height = rect.height * pixelRatio;

        const context = canvas.getContext('2d');

        context.scale(pixelRatio, pixelRatio);

        this.setupRender(context, rect);
    }
    
    setupRender = (context, rect) => {
        const assets = new Map();

        Object.entries({ baba, wall, water }).map(([key, src]) => {
            return loadImage(src).then((value) => {
                assets.set(key, value);
            });
        });

        context.imageSmoothingEnabled = false;

        const render = () => {
            context.clearRect(0, 0, rect.width, rect.height);

            // const rules = this.rules.all();

            // for (let i = 0; i < rules.length; ++i) {
            //     context.beginPath();
            //     context.fillStyle = '#ffffff';
            //     context.textAlign = 'left';
            //     context.font = '18px monospace'
            //     context.fillText(rules[i].join(' '), 10, (i + 1) * 22);
            // }

            for (let entity of this.world.all()) {
                if (entity.type === 'word') {
                    const position = { x: entity.position.x * GRID_SIZE, y: entity.position.y * GRID_SIZE };
                    
                    context.beginPath();
                    context.fillStyle = '#ffffff';
                    context.textAlign = 'center';
                    context.font = '18px monospace'
                    context.fillText(entity.word, position.x + GRID_SIZE / 2, position.y + GRID_SIZE / 2);

                    continue;
                }

                const img = assets.get(entity.type);

                if (!img) {
                    continue;
                }

                const size = { x: img.width * 9, y: img.height * 9 };
                const position = { x: entity.position.x * GRID_SIZE, y: entity.position.y * GRID_SIZE };

                context.drawImage(img, position.x + GRID_SIZE / 2 - size.x / 2, position.y + GRID_SIZE - size.y, size.x, size.y);
            }

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);      
    };
};
