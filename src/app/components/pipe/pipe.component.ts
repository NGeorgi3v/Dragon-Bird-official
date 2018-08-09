import { States } from './../../core/states.enum';
import { Component, OnInit, Input, Renderer2, NgZone } from '@angular/core';
import { Pipe } from '../../core/pipe';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit {
  public static _p: PipeComponent[] = [];
  WIDTH  = Math.max(document.documentElement.clientWidth, document.querySelector('body').offsetWidth || 0);
  HEIGHT = Math.max(document.documentElement.clientHeight, document.querySelector('body').offsetHeight || 0);
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  score: number;
  pipeImg: HTMLImageElement;
  pipe: Pipe;
  @Input() gameState: number;
  public States = States;
  static loop() {
    const self = PipeComponent._p[0];

        self.pipe.update();
        self.pipe.draw();

      window.requestAnimationFrame(PipeComponent.loop);
  }
  constructor(private renderer: Renderer2, private ngZone: NgZone) {
    PipeComponent._p.push(this);
  }

  ngOnInit() {
    this.canvas = this.renderer.selectRootElement('#player-canvas');
    this.renderer.setProperty(this.canvas, 'width', this.WIDTH);
    this.renderer.setProperty(this.canvas, 'height', this.HEIGHT);
    this.ctx = this.canvas.getContext('2d');
  }

  afterLoad() {
    this.pipeImg = this.renderer.selectRootElement('#pipe_body');
    this.pipe = new Pipe(this.canvas, this.ctx, this.pipeImg, 0, 'repeat-y');
    window.requestAnimationFrame(PipeComponent.loop);
  }

}
