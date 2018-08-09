import * as Vector from 'vectorjs';
import { GameObj } from './game_obj';
export class Player extends GameObj {
    upForce = new Vector(0, -10);
    firstJump = true;
    constructor(c: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        sprite: HTMLImageElement,
        spriteFrames?: number,
        repeat?: string) {
        super(c, ctx, sprite, spriteFrames);
        const self = this;
        self.pos.x = 50;
    }

    jump() {
        const self = this;
        self.acc = self.acc.add(self.upForce.mul(1.5));
    }

    moveLeft() {
        const self = this;
        self.pos.x -= 5;
    }

    moveRight() {
        const self = this;
        self.pos.x += 5;
    }
}

