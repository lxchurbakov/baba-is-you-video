import baba from '../assets/baba.png';
import wall from '../assets/wall.png';

const UP_KEY = 87;
const DOWN_KEY = 83;
const LEFT_KEY = 65;
const RIGHT_KEY = 68;

const GRID_SIZE = 60;
const MAX_DEPTH = 2;

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
    constructor (canvas) {
        const rect = canvas.parentNode.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = rect.width * pixelRatio;
        canvas.height = rect.height * pixelRatio;

        const context = canvas.getContext('2d');

        context.scale(pixelRatio, pixelRatio);

        this.entities = [
            { type: 'baba', position: { x: 0, y: 0 } },
            { type: 'wall', position: { x: 5, y: 5 } },
            { type: 'wall', position: { x: 6, y: 6 } },
            { type: 'wall', position: { x: 7, y: 6 } },
        ];

        this.setupRender(context, rect);
        this.setupKeyEvents();
    }

    findByType = (type) => {
        return this.entities.filter(($) => $.type === type);
    };

    findByPosition = (position) => {
        return this.entities.filter(($) => same($.position, position));
    };

    move = (entity, direction, depth = 0) => {
        if (depth > MAX_DEPTH) {
            return false;
        }

        const newPosition = move(entity.position, direction);

        for (let obstacle of this.findByPosition(newPosition)) {
            if (!this.move(obstacle, direction, depth + 1)) {
                return false;
            }
        }

        entity.position = newPosition;

        return true;
    };

    setupKeyEvents = () => {
        window.addEventListener('keydown', (e) => {
            const direction = getDirection(e.keyCode);

            for (let baba of this.findByType('baba')) {
                this.move(baba, direction);
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

            for (let entity of this.entities) {
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
