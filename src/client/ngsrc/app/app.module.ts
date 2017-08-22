import { BrowserModule } from '@angular/platform-browser';
import { Component, Input, NgModule } from '@angular/core';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';

import { AppComponent } from './app.component';

declare var angular: angular.IAngularStatic;

@Component({
  selector: 'hello-world',
  styles: [`
    :host {
      color: red;      
    }
  `],
  template: `
    Hello Wordddld!
  `
})
export class HelloWorldComponent { 
  @Input() testInput: string;
}

angular.module('ng2.downgrades', [])
  .directive(
    'helloWorld', 
    downgradeComponent({
      component: HelloWorldComponent,
      inputs: [
        'testInput'
      ]
    }) as angular.IDirectiveFactory
  );

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  entryComponents: [
    HelloWorldComponent
  ],
  providers: [],
  bootstrap: []
})

export class AppModule {
  constructor(private upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['angularSeed', 'ng2.downgrades'], {strictDi: true})
  }
}
