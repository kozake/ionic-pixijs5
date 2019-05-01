import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.page.html',
  styleUrls: ['./basic.page.scss'],
})
export class BasicPage implements OnInit {

  @ViewChild('screen')
  screen: ElementRef;

  app: PIXI.Application;

  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.zone.runOutsideAngular(() => this.appOnInit());
  }

  appOnInit() {
    this.app = new PIXI.Application({ backgroundColor: 0x1099bb });
    this.screen.nativeElement.appendChild(this.app.view);

    // create a new Sprite from an image path

    const bunny = PIXI.Sprite.from('assets/bunny.png');
    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = this.app.screen.width / 2;
    bunny.y = this.app.screen.height / 2;

    this.app.stage.addChild(bunny);

    // Listen for animate update
    this.app.ticker.add((delta) => {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        bunny.rotation += 0.1 * delta;
    });
  }
}
