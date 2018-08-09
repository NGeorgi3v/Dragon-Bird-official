import * as _ from 'underscore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';

import { GameComponent } from './components/game/game.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { PlayerComponent } from './components/player/player.component';
import { ScoreComponent } from './components/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    MenuComponent,
    PlayerComponent,
    ScoreComponent
  ],
  imports: [BrowserModule, MaterializeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
