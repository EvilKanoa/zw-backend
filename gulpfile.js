const gulp = require('gulp');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const ts = require('gulp-typescript');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];

const tsProject = ts.createProject('tsconfig.json');

gulp.task('build', ['assets'], () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], () => {
    gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('assets', () => {
    return gulp.src(JSON_FILES).pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watch'], () => {
    nodemon({
        script: 'dist/index.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('test', ['build'], () => {
    return gulp.src(['dist/**/*.tests.js'], { read: false })
           .pipe(mocha({
               reporter: 'spec',
               compilers: 'ts:ts-node/register'
           })).on('error', gutil.log);
});

gulp.task('default', ['build']);

