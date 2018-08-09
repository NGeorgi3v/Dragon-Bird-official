import * as Vector from 'vectorjs';
import { Sprite } from './sprite';

export class GameObj {
    canvas: HTMLCanvasElement;
    ctx:    CanvasRenderingContext2D;
    pos = new Vector(0, 0);
    vel = new Vector(0, 0);
    spriteSheet: HTMLImageElement;
    sprite: any;
    frameCount = 0;
    gravity = new Vector(0, 0.45);
    acc = this.gravity;
    constructor(c: HTMLCanvasElement,
                ctx: CanvasRenderingContext2D,
                sprite: HTMLImageElement,
                spriteFrames?: number,
                repeat?: string
                ) {
        const self = this;
        self.canvas = c;
        self.ctx    = ctx;
        self.spriteSheet = sprite;
        self.sprite = new Sprite(self.canvas,
                                self.ctx,
                                self.spriteSheet,
                                self.spriteSheet.width / spriteFrames,
                                self.spriteSheet.height,
                                spriteFrames,
                                repeat);
    }

    draw() {
        const self = this;
        self.sprite.render({
            x: self.pos.x,
            y: self.pos.y
        });
    }

    update() {
        const self = this;
        self.vel = self.vel.add(self.acc);
        self.pos = self.pos.add(self.vel);
        self.acc = self.vel.mul(0);
        self.sprite.update(self.frameCount);
        self.frameCount++;

    }

    checkInitPos() {
        const self = this;
        if (self.pos.y > (self.canvas.height - self.sprite.height) / 2) {
            self.pos = new Vector(self.pos.x, (self.canvas.height - self.sprite.height) / 2);
            self.vel = new Vector(self.vel.x, 0.5 * (-self.vel.y));
            self.acc = new Vector(self.acc.x, 0.5 * (-self.acc.y));
        }
    }
    applyGravity() {
        const self = this;
        if (self.pos.y > self.canvas.height - self.sprite.height) {
            self.pos = new Vector(self.pos.x, self.canvas.height - self.sprite.height);
            self.vel = new Vector(self.vel.x, 0.5 * (-self.vel.y));
            self.acc = new Vector(self.acc.x, 0.5 * (-self.acc.y));
            return;
        }else if ( self.pos.y < 0) {
            self.pos = new Vector(self.pos.x, 0);
            self.vel = new Vector(self.vel.x, 0.5 * (-self.vel.y));
            self.acc = new Vector(self.acc.x, 0.5 * (-self.acc.y));
        }else {
            self.acc = self.acc.add(self.gravity);
        }
    }

}
