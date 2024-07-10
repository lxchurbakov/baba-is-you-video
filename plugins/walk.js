const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
const distance = (a, b, c = sub(a, b)) => Math.sqrt(c.x * c.x + c.y * c.y);

const mul = (a, b) => ({ x: a.x * b, y: a.y * b });
const sum = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

const codeToColor = (code) => {
    const letter = Math.floor(code + 4).toString(16);

    return '#' + [letter, letter, letter].join('');
};

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
    }

    setupRender = (context, rect) => {
        let dots = new Array(1000).fill(0).map(() => ({
            x: Math.random() * rect.width * .8 + rect.width * .1,
            y: Math.random() * rect.height * .8 + rect.height * .1,
            angle: Math.random() * 2 * Math.PI,
            code: Math.random() * 12,
        }));

        const render = () => {
            context.clearRect(0, 0, rect.width, rect.height);

            for (let dot of dots) {
                context.fillStyle = codeToColor(dot.code);

                context.beginPath()
                context.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
                context.fill();
            }

            for (let dot of dots) {

                for (let otherDot of dots) {
                    if (dot === otherDot) {
                        continue;
                    }

                    const d = distance(otherDot, dot);

                    if (d < 100 && d > 0) {
                        const offset = mul(sub(otherDot, dot), -(100 / (d * d)));

                        dot.x += offset.x;
                        dot.y += offset.y;
                    }
                }

                for (let otherDot of dots) {
                    if (dot === otherDot) {
                        continue;
                    }

                    const similarity = Math.abs(dot.code - otherDot.code);
                    const d = distance(otherDot, dot);

                    const offset = mul(sub(otherDot, dot), (1 / (d * d)) * .5 * similarity);

                    dot.x += offset.x;
                    dot.y += offset.y;
                }
            }

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);      
    };
};
