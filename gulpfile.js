let gulp = require('gulp');                 //npm install gulp --save-dev
let uglify = require('gulp-uglify');        //npm install gulp-uglify --save-dev. Not ES6!


//Styles
gulp.task('styles', ()=>{                       //command = gulp styles
    console.log('starting styles task!');
});

//Scripts
gulp.task('scripts', ()=>{                                  //command = gulp scripts
    console.log('starting scripts task!');
    return gulp.src('public/scripts/*.js')                  //gulp.src() makes gulp know about files
                .pipe(uglify())                             //.pipe() makes file go different steps
                .pipe(gulp.dest('public/dist'));            //gulp.dest() sets the resultant file on the destination provided               
});

//Images
gulp.task('images', ()=>{                   
    console.log('starting images task!');
});


gulp.task('default', ()=>{
    console.log('starting default task');
});