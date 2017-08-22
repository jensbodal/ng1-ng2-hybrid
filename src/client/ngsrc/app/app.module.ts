import { BrowserModule } from '@angular/platform-browser';
import { Component, Inject, Input, NgModule, Pipe, PipeTransform, OnChanges, SimpleChanges } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { RouterModule, Routes, UrlHandlingStrategy, UrlTree } from '@angular/router';
import { AppComponent } from './app.component';

declare var angular: angular.IAngularStatic;

@Pipe({
  name: 'object'
})

export class ObjectPipe implements PipeTransform {
  transform(value: any, exclude: string | string[]): any {
    if (!value) {
      return value;
    }

    const keys = [];

    for (const key of Object.keys(value)) {
      if (exclude.indexOf(key) !== -1) {
        continue;
      }

      keys.push({key: key, value: value[key]});
    }

    return keys;
  }
}

export class GithubFileInfo {
  public sha: string;
  public filename: string;
  public status: string;
  public additions: number;
  public deletions: number;
  public changes: number;
  public blob_url: string;
  public raw_url: string;
  public contents: string;
  public patch: string;

  constructor(obj: any) {
    this.sha = obj.sha;
    this.filename = obj.filename;
    this.status = obj.status;
    this.additions = obj.additions;
    this.deletions = obj.deletions;
    this.changes = obj.changes;
    this.blob_url = obj.blob_url;
    this.raw_url = obj.raw_url;
    this.contents = obj.contents;

    if (obj.patch) {
      this.patch = this.formatPatch(obj.patch);
    }
  }

  public toString(): string {
    return this.filename;
  }

  private formatPatch(patch: string) {
    return patch.replace(/\/n\+/g, '\n');
  }
}

@Component({
  selector: 'app-file-info-card',
  styleUrls: ['./app.component.scss'],
  template: `
    <div>
      <div *ngFor="let item of fileInfo | object:'patch'">
        <span class="key-value">{{ item.key }}:</span> {{ item.value }}
      </div>

      <pre>{{patchInfo}}</pre>
    </div>
  `
})
export class AppFileInfoCardComponent implements OnChanges {
  @Input() fileInfo: GithubFileInfo;

  public patchInfo: string;

  constructor(@Inject('githubApi') githubApi) {
    console.log(githubApi);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.fileInfo && changes.fileInfo.currentValue) {
      const fileInfo: GithubFileInfo = new GithubFileInfo(changes.fileInfo.currentValue);

      if (fileInfo.patch) {
        this.patchInfo = fileInfo.patch;
      }
    }
  }

}

angular.module('ng2.downgrades', [])
  .directive(
    'appFileInfoCard',
    downgradeComponent({
      component: AppFileInfoCardComponent,
      inputs: [
        'fileInfo'
      ]
    }) as angular.IDirectiveFactory
  );

export class AngularUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    switch (url.toString()) {
      case '/hello-world':
        return true;
      default:
        return false;
    }
  }

  extract(url: UrlTree): UrlTree {
    return url;
  }

  merge(url: UrlTree, whole: UrlTree): UrlTree {
    return url;
  }
}

@Component({
  selector: 'hello-world',
  styles: [`
    :host {
      color: red;
    }
  `],
  template: `
    Hello World!
  `
})
export class HelloWorldComponent {
  @Input() testInput: string;
}

@Component({
  selector: 'asdf',
  styles: [`
    :host {
      color: red;
    }
  `],
  template: `
    page not found
  `
})
export class BComponent {
  @Input() testInput: string;
}

export const routes: Routes = [
  { path: 'hello-world', component: HelloWorldComponent },
  { path: '**', component: BComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppFileInfoCardComponent,
    BComponent,
    HelloWorldComponent,
    ObjectPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- for debugging purposes only
    ),
    UpgradeModule
  ],
  entryComponents: [
    AppFileInfoCardComponent
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: UrlHandlingStrategy, useClass: AngularUrlHandlingStrategy },
    {
      provide: 'githubApi',
      useFactory: () => (i: any) => i.get('githubApi'),
      deps: ['$injector']
    }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
  constructor(private upgrade: UpgradeModule) {
    this.upgrade.bootstrap(document.body, ['angularSeed', 'ng2.downgrades'], {strictDi: true});
  }

  ngDoBootstrap() { }
}
