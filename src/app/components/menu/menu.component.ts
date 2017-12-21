import { States } from './../../core/states.enum';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public States = States;
  @Input() gameState: number;
  @Output() change = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }

  startGame() {
    this.gameState = States.running;
    this.change.emit(this.gameState);
  }

}
