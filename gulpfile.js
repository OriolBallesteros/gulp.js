let gulp = require('gulp');                         
let uglify = require('gulp-uglify');             
let livereload = require('gulp-livereload');
let concat = require('gulp-concat');
let minifyCSS = require('gulp-minify-css');

//file paths
let dist_PATH = 'public/dist';
let scripts_PATH = 'public/scripts/**/*.js';
let css_PATH = 'public/css/**/*.css';

//Styles
gulp.task('styles', ()=>{                       //command = gulp styles
    console.log('starting styles task!');
    return gulp.src(['public/css/reset.css', css_PATH])         //using arrays to specify files, and the ORDER of them              //take those files in this path
                .pipe(concat('combined.css'))       //apply concat() plugin and name the result combined.css
                .pipe(minifyCSS())                  //minifiying it
                .pipe(gulp.dest(dist_PATH))         //put the result file in this path
                .pipe(livereload());                //live reload the page; (due to the HTML is using this combined.css)
});


//Scripts
gulp.task('scripts', ()=>{                                  //command = gulp scripts
    console.log('starting scripts task!');
    return gulp.src(scripts_PATH)                  //gulp.src() makes gulp know about files
                .pipe(uglify())                             //.pipe() makes file go different steps
                .pipe(gulp.dest(dist_PATH))            //gulp.dest() sets the resultant file on the destination provided               
                .pipe(livereload());
});


//Images
gulp.task('images', ()=>{                   
    console.log('starting images task!');
});


gulp.task('default', ()=>{                          //as default, run only calling gulp
    console.log('starting default task');
});


//watch = run a gulp task automatically every time a specified file is changed
gulp.task('watch', ()=>{
    console.log('Starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(scripts_PATH, gulp.series('scripts'));       //when any of the files in the path provided is changed, re-apply the gulp.task given
    gulp.watch(css_PATH, gulp.series('styles'));
});