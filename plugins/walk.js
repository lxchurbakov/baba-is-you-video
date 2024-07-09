import baba from '../assets/baba.png';

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

        this.loadAndSetupRender(context, rect);
    }

    loadAndSetupRender = (context, rect) => {
        let img = null;

        loadImage(baba).then((i) => {
            img = i;
        });
        
        context.imageSmoothingEnabled = false;

        const render = () => {
            context.clearRect(0, 0, rect.width, rect.height);

            const center = { x: rect.width / 2, y: rect.height / 2 };

            const pos = center;
            const GRID_SIZE = 100;

            if (img) {
                const size = { x: img.width * 9, y: img.height * 9 };

                context.drawImage(img, pos.x + GRID_SIZE / 2 - size.x / 2, pos.y + GRID_SIZE - size.y, size.x, size.y);
            }

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);      
    };
};
