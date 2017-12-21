import { Component, OnInit, ElementRef, Renderer2, NgZone } from '@angular/core';
import { States } from '../../core/states.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  WIDTH  = Math.max(document.documentElement.clientWidth, document.querySelector('body').offsetWidth || 0);
  HEIGHT = Math.max(document.documentElement.clientHeight, document.querySelector('body').offsetHeight || 0);
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  score: number;
  bestScore: number;
  state = States.initialized;
  bgImage: HTMLImageElement;


  constructor(private elRef: ElementRef, private renderer: Renderer2, private ngZone: NgZone) {
    window.onresize = (e) => {
      ngZone.run(() => {
        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;
        this.renderer.setProperty(this.canvas, 'width', this.WIDTH);
        this.renderer.setProperty(this.canvas, 'height', this.HEIGHT);
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        this.ctx.drawImage(this.bgImage, 0, 0, this.WIDTH, this.HEIGHT);
      });
    };
  }

  ngOnInit() {
    this.canvas = this.renderer.selectRootElement('#bg-canvas');
    this.renderer.setProperty(this.canvas, 'width', this.WIDTH);
    this.renderer.setProperty(this.canvas, 'height', this.HEIGHT);
    this.renderer.appendChild(this.elRef.nativeElement, this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  afterLoad() {
    this.bgImage = this.renderer.selectRootElement('#bg-img');
    this.ctx.drawImage(this.bgImage, 0, 0, this.WIDTH, this.HEIGHT);
  }

  onMenuChange(_state) {
    this.state = _state;
  }

}
