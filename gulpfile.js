let gulp = require('gulp');                 //npm install gulp --save-dev
let uglify = require('gulp-uglify');        //npm install gulp-uglify --save-dev. Not ES6!
let livereload = require('gulp-livereload');


//file paths
let scripts_PATH = 'public/scripts/**/*.js';


//Styles
gulp.task('styles', ()=>{                       //command = gulp styles
    console.log('starting styles task!');
});


//Scripts
gulp.task('scripts', ()=>{                                  //command = gulp scripts
    console.log('starting scripts task!');
    return gulp.src(scripts_PATH)                  //gulp.src() makes gulp know about files
                .pipe(uglify())                             //.pipe() makes file go different steps
                .pipe(gulp.dest('public/dist'))            //gulp.dest() sets the resultant file on the destination provided               
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
    gulp.watch(scripts_PATH, gulp.series('scripts'));
});