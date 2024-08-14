import baba from '../assets/baba.png';
import wall from '../assets/wall.png';

const UP_KEY = 87;
const DOWN_KEY = 83;
const LEFT_KEY = 65;
const RIGHT_KEY = 68;

const GRID_SIZE = 60;
const MAX_DEPTH = 3;

const loadImage = async (url) => new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);

    img.src = url;
});

// Определим несколько простых операций над типом точки

const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const same = (a, b) => a.x === b.x && a.y === b.y;

// Пара функций для перемещения

const move = (p, dir) => {
    return {
        right: add(p, { x: 1, y: 0 }),
        left: add(p, { x: -1, y: 0 }),
        top: add(p, { x: 0, y: -1 }),
        bottom: add(p, { x: 0, y: 1 }),
    }[dir] || p;
};

const getDirection = (keyCode) => {
    return {
        [UP_KEY]: 'top',
        [LEFT_KEY]: 'left',
        [RIGHT_KEY]: 'right',
        [DOWN_KEY]: 'bottom',
    }[keyCode] || null;
};

export class Walk {
    constructor (canvas, world) {
        this.world = world;

        const rect = canvas.parentNode.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = rect.width * pixelRatio;
        canvas.height = rect.height * pixelRatio;

        const context = canvas.getContext('2d');

        context.scale(pixelRatio, pixelRatio);

        this.setupRender(context, rect);
        this.setupKeyEvents();
    }

    move = (entityId, direction, depth = 0) => {
        if (depth > MAX_DEPTH) {
            return false;
        }

        const entity = this.world.get(entityId);
        const position = move(entity.position, direction);

        for (let obstacleId of this.world.findByPosition(position)) {
            if (!this.move(obstacleId, direction, depth + 1)) {
                return false;
            }
        }

        this.world.set(entityId, { ...entity, position })

        return true;
    };

    setupKeyEvents = () => {
        window.addEventListener('keydown', (e) => {
            const direction = getDirection(e.keyCode);

            for (let babaId of this.world.findByType('baba')) {
                this.move(babaId, direction);
            }
        });
    };

    setupRender = (context, rect) => {
        const assets = new Map();

        Object.entries({ baba, wall }).map(([key, src]) => {
            return loadImage(src).then((value) => {
                assets.set(key, value);
            });
        });

        context.imageSmoothingEnabled = false;

        const render = () => {
            context.clearRect(0, 0, rect.width, rect.height);

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
