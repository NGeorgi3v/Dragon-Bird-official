import { States } from './../../core/states.enum';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Input() gameState: number;
  @Input() score: number;
  public States = States;
  constructor() { }

  ngOnInit() {
  }

}
