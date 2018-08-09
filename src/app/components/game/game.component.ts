import { Component, OnInit, ElementRef, Renderer2, NgZone } from '@angular/core';
import { States } from '../../core/states.enum';
import { PlayerComponent } from '../player/player.component';

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
  bestScore: number;
  state = States.initialized;
  bgImage: HTMLImageElement;


  constructor(private renderer: Renderer2, private ngZone: NgZone) {
    window.onresize = (e) => {
      ngZone.run(() => {
        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;
        this.renderer.setProperty(this.canvas, 'width', this.WIDTH);
        this.renderer.setProperty(this.canvas, 'height', this.HEIGHT);
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        this.ctx.drawImage(this.bgImage, 0, 0, this.WIDTH, this.HEIGHT, 0, 0, this.WIDTH, this.HEIGHT);
      });
    };
    window.onkeydown = (e) => {
      ngZone.run( () => {
        const player = PlayerComponent._p[0].player;
        if (e.keyCode === 38 && this.state === States.running) { // Up arrow key - jump()
          player.jump();
        }if (e.keyCode === 39 && this.state === States.running) { // Right arrow key - jump()
          player.moveRight();
        }if (e.keyCode === 37 && this.state === States.running) { // Left arrow key - jump()
          player.moveLeft();
        } else if (e.keyCode === 80) { // P key - pause()
            if (this.state === States.running) {
              this.state = States.paused;
            }else if ( this.state === States.paused) {
              this.state = States.running;
            }
        }
      });
    };
  }

  ngOnInit() {
    this.canvas = this.renderer.selectRootElement('#bg-canvas');
    this.renderer.setProperty(this.canvas, 'width', this.WIDTH);
    this.renderer.setProperty(this.canvas, 'height', this.HEIGHT);
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
