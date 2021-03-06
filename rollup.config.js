const genName = name => `apollo.${name}`;

export const globals = {
  // Angular
  '@angular/core': 'ng.core',
  '@angular/common/http': 'ng.common.http',
  '@ngrx/store': 'ngrx.store',
  // Apollo
  'apollo-link': 'httpLink',
  'apollo-client-rxjs': 'apollo.rxjs',
  'apollo-client': 'apollo',
  'apollo-angular-link-http-common': genName('link.httpCommon'),
  'apollo-link-context': 'apolloLink.context',
  'apollo-link-persisted-queries': 'persistedQueryLink',
  // RxJS
  'rxjs/Observable': 'Rx',
  'rxjs/observable/from': 'Rx.Observable',
  'rxjs/observable/fromPromise': 'Rx.Observable',
  'rxjs/scheduler/queue': 'Rx.Scheduler',
  'rxjs/operator/observeOn': 'Rx.Observable.prototype',
  'rxjs/operator/take': 'Rx.Observable.prototype',
};

export default name => ({
  input: 'build/src/index.js',
  output: {
    file: 'build/bundle.umd.js',
    format: 'umd',
  },
  name: genName(name),
  exports: 'named',
  sourcemap: true,
  external: Object.keys(globals),
  onwarn,
  globals,
});

function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED'];

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message);
  }
}
