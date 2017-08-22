export angularversion=4.2.2

# dependencies
yarn add -E core-js@2.4.1 \
  rxjs@5.4.1 \
  zone.js@0.8.12 \
  @angular/core@$angularversion \
  @angular/common@$angularversion \
  @angular/compiler@$angularversion \
  @angular/platform-browser@$angularversion \
  @angular/platform-browser-dynamic@$angularversion \
  @angular/forms@$angularVersion \
  @angular/http@$angularVersion \
  @angular/router@$angularVersion \
  @angular/upgrade@$angularversion \
  @angular/animations$angularVersion

# devDependencies
yarn add -ED typescript@2.3.4 \
  @angular/cli@1.1.2 \
  @angular/compiler-cli@$angularVersion \
  @angular/language-service@$angularVersion \
  @types/node@6.0.78 \
  codelyzer@3.0.1 \
  ts-node@3.0.6 \
  tslint@5.4.3


# packages that will likely conflict with existing apps
# test that upgrading these versions don't break what you already do
# recommended to hold off on these until your app is working with the UpgradeModule
yarn add -ED jasmine-core@2.6.3 \
  jasmine-spec-reporter@4.1.0 \
  karma@1.7.0 \
  karma-chrome-launcher@2.1.1 \
  karma-cli@1.0.1 \
  karma-coverage-istanbul-reporter@1.3.0 \
  karma-jasmine@1.1.0 \
  karma-jasmine-html-reporter@0.2.2 \
  protractor@5.1.2 \
  @types/jasmine@2.5.52
