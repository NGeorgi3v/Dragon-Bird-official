import * as Vector from 'vectorjs';
import { GameObj } from './game_obj';
export class Pipe extends GameObj {
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
        self.acc = new Vector(0, 0);
    }

}
