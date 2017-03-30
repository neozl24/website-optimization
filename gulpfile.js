/**
 * 这里是一些压缩的任务，但是目前来看，项目并不复杂，压缩代码带来的性能优化非常有限。
 * 而且Github page默认只能读取根目录下的index.html作为首页，生成一个生产版本的dist文件夹
 * 并不方便在Github page上部署，因此目前这个功能只是放在这里，暂时不使用压缩后的代码
 */

/* jshint undef: false, unused: false */

var gulp = require('gulp'),
    minifyhtml = require('gulp-htmlmin'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint');

gulp.task('minifyhtml', function () {
    'use strict';
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('*.html')
        .pipe(rename({suffix: '.min'}))//rename压缩后的文件名
        .pipe(minifyhtml(options))
        .pipe(gulp.dest('minified/html'));
});

gulp.task('minifycss',  function() {
    'use strict';
    return gulp.src('css/*.css')
        .pipe(rename({suffix: '.min'}))//rename压缩后的文件名
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('minified/css'));
});

gulp.task('minifyjs', function() {
    'use strict';
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('minified/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('minified/js'));
});

gulp.task('jshint', function() {
    'use strict';
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/* 默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作) */
gulp.task('default', ['jshint'], function() {
    'use strict';
    gulp.start('minifyhtml', 'minifycss', 'minifyjs');
});
