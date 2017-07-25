import { downgradeComponent } from '@angular/upgrade/static';
import { downgradeInjectable, UpgradeComponent, UpgradeModule } from '@angular/upgrade/static';

// our components
import { AppComponent } from './app.component';
import { FileInfoCardComponent } from './github/fileInfoCard/fileInfoCard.component';

// our services
/* empty */

declare var angular: angular.IAngularStatic;

// this is the module that will need to be included in our AngularJS application
angular.module('ng.downgrades', [])
  .directive(
    'aseedRoot',
    downgradeComponent({
      component: AppComponent,
    })
  )
  .directive(
    'aseedFileInfoCard',
    downgradeComponent({
      component: FileInfoCardComponent,
      inputs: [
        'fileInfo'
      ],
    }) as angular.IDirectiveFactory
  )
;
