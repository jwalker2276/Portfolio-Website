const gulp = require('gulp');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const browserSync = require('browser-sync');
const server = browserSync.create();

const babel = require('gulp-babel');

const paths = {
  styles: {
    src: 'src/css/**/*.css',
    dest: 'assets/',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'assets/',
  },
  markup: {
    src: 'index.html',
  },
};

//CSS Pipe
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(postcss([autoprefixer({ browsers: ['last 2 version'] })]))
    .pipe(gulp.dest(paths.styles.dest));
}

//JS Pipe
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest(paths.scripts.dest));
}

//Setup browser
function serverSetup(done) {
  server.init({
    server: {
      baseDir: './',
    },
  });
  done();
}

//Browser Sync
function reload(done) {
  server.reload();
  done();
}

//Watch task
function watch() {
  //Watch JS
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));

  //Watch CSS
  gulp.watch(paths.styles.src, gulp.series(styles, reload));

  //Watch HTML
  gulp.watch(paths.markup.src, reload);
}

//Default task
let build = gulp.series(gulp.parallel(styles, scripts), serverSetup, watch);

//Default task
gulp.task('default', build);
