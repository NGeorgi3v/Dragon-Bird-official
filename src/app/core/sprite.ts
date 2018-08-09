export class Sprite {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    spriteSheet: HTMLImageElement;
    width: number;
    height: number;
    numberOfFrames: number;
    frameIndex = 0;
    repeat: string;

    constructor(canvas: HTMLCanvasElement,
                ctx: CanvasRenderingContext2D,
                spriteSheet: HTMLImageElement,
                width: number,
                height: number,
                numberOfFrames?: number,
                repeat?: string) {
        const self = this;
        self.canvas = canvas;
        self.ctx = ctx;
        self.spriteSheet = spriteSheet;
        self.width = width;
        self.height = height;
        self.numberOfFrames = numberOfFrames;
        self.repeat = repeat;
    }

    render(drawCoordinates) {
        const self = this;
        self.ctx.clearRect(
            0, 0,
            self.canvas.width,
            self.canvas.height
        );
        if (self.repeat !== undefined) {
            const pattern = self.ctx.createPattern(self.spriteSheet, self.repeat);
            self.ctx.fillStyle = pattern;
            self.ctx.beginPath();
            self.ctx.moveTo(drawCoordinates.x, drawCoordinates.y);
            self.ctx.rect(drawCoordinates.x, drawCoordinates.y, self.width, self.height);
            self.ctx.fill();
            self.ctx.closePath();
        }else {
            self.ctx.drawImage(
                self.spriteSheet,
                self.frameIndex * self.width,
                0,
                self.width,
                self.height,
                drawCoordinates.x,
                drawCoordinates.y,
                self.width,
                self.height
            );
        }

    }

    update(frameCount) {
        const self = this;
        if (frameCount % 5 === 0) {
            self.frameIndex++;
        }
        if (self.frameIndex === self.numberOfFrames) {
            self.frameIndex = 0;
        }
    }

}
