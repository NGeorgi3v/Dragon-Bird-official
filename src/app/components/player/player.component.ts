import { States } from './../../core/states.enum';
import { Component, OnInit, Input, Renderer2, NgZone } from '@angular/core';
import { Player } from '../../core/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public static _p: PlayerComponent[] = [];
  WIDTH = Math.max(
    document.documentElement.clientWidth,
    document.querySelector('body').offsetWidth || 0
  );
  HEIGHT = Math.max(
    document.documentElement.clientHeight,
    document.querySelector('body').offsetHeight || 0
  );
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  score: number;
  flyingDragImg: HTMLImageElement;
  player: Player;
  animate = true;
  @Input()
  gameState: number;
  @Input()
  bestScore: number;
  public States = States;
  static loop() {
    const self = PlayerComponent._p[0];
    if (self.gameState === States.initialized) {
      self.player.update();
      self.player.draw();
      self.player.checkInitPos();
      self.player.applyGravity();
    } else if (self.gameState === States.running) {
      self.player.update();
      self.player.draw();
      self.player.applyGravity();
    }
    window.requestAnimationFrame(PlayerComponent.loop);
  }
  constructor(private renderer: Renderer2, private ngZone: NgZone) {
    PlayerComponent._p.push(this);
  }

  ngOnInit() {
    this.canvas = this.renderer.selectRootElement('#player-canvas');
    this.renderer.setProperty(this.canvas, 'width', this.WIDTH);
    this.renderer.setProperty(this.canvas, 'height', this.HEIGHT);
    this.ctx = this.canvas.getContext('2d');
  }

  afterLoad() {
    this.flyingDragImg = this.renderer.selectRootElement('#flying_bird');
    this.player = new Player(this.canvas, this.ctx, this.flyingDragImg, 7);
    window.requestAnimationFrame(PlayerComponent.loop);
  }
}
