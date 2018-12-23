let gulp = require('gulp');                         
let uglify = require('gulp-uglify');             
let livereload = require('gulp-livereload');
let concat = require('gulp-concat');
let minifyCSS = require('gulp-minify-css');
let autoprefixer = require('gulp-autoprefixer');
let plumber = require('gulp-plumber');          //error handler -- prevents the task to crash when it finds an error
let sourcemaps = require('gulp-sourcemaps');    //makes it easy to debug. (Even we are concatenating and minifying files and everything, once we us the inspector, everything is displayed to us in a nice easy way)
let babel = require('gulp-babel');              

let del = require('del');
let zip = require('gulp-zip');

//Image compression
let imagemin = require('gulp-imagemin');
let imageminPngquant = require('imagemin-pngquant');
let imageminJpegRecompress = require('imagemin-jpeg-recompress');


//files paths
let dist_PATH = 'public/dist';
let scripts_PATH = 'public/scripts/**/*.js';
let css_PATH = 'public/css/**/*.css';
let images_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';



//Styles - CSS fyles
gulp.task('styles', ()=>{                                       //command = gulp styles
    console.log('starting styles task!');
    return gulp.src(['public/css/reset.css', css_PATH])         //using arrays to specify files, and the ORDER of them              
                .pipe(plumber((err)=>{
                    console.log('Styles task Error');
                    console.log(err);
                    this.emit('end');
                }))
                .pipe(sourcemaps.init())
                .pipe(autoprefixer())               //one of the most useful gulp tasks
                .pipe(concat('combined.css'))       //apply concat() plugin and name the result combined.css
                .pipe(minifyCSS())                  //minifiying it
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(dist_PATH))         //put the result file in this path
                .pipe(livereload());                //live reload the page; (due to the HTML is using this combined.css)
});



//Scripts - JS files
gulp.task('scripts', ()=>{                                  //command = gulp scripts
    console.log('starting scripts task!');
    return gulp.src(scripts_PATH)                           //gulp.src() makes gulp know about files
                .pipe(plumber((err)=>{
                    console.log('Scripts Task Error');
                    console.log(err);
                    this.emit('end');
                }))
                .pipe(sourcemaps.init())
                .pipe(babel({
                    presets: ['@babel/env']
                }))
                .pipe(uglify())                    //.pipe() makes file go different steps
                .pipe(concat('scripts.js'))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(dist_PATH))        //gulp.dest() sets the resultant file on the destination provided               
                .pipe(livereload());
});



//Images
gulp.task('images', ()=>{                   
    console.log('starting images task!');
    return gulp.src(images_PATH)
                .pipe(imagemin(                    //image compression - up to 70% without losing quality
                    [
                        imagemin.gifsicle(),
                        imagemin.jpegtran(),
                        imagemin.optipng(),
                        imagemin.svgo(),
                        imageminPngquant(),
                        imageminJpegRecompress()
                    ]
                ))
                .pipe(gulp.dest(dist_PATH + '/images'));
});



//Cleaning - deleting
gulp.task('clean', ()=>{
    console.log('Starting Clean Task');
    return del.sync([
        dist_PATH
    ]);
});


//Default - list of commands running only one
gulp.task('default', gulp.parallel('clean', 'images', 'styles', 'scripts'), (done)=> {       //as default, it's called only with gulp command
    console.log('Starting default task');
    done();
  });


//Zip and export
gulp.task('export', ()=>{
    console.log('Starting Export Task');
    return gulp.src('public/**/*')
                .pipe(zip('website.zip'))
                .pipe(gulp.dest('./'));
});


//watch = run a gulp task automatically every time a specified file is changed
gulp.task('watch', ()=>{
    console.log('Starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(scripts_PATH, gulp.series('scripts'));       //when any of the files in the path provided is changed, re-apply the gulp.task given
    gulp.watch(css_PATH, gulp.series('styles'));
});