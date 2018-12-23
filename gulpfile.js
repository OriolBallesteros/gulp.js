let gulp = require('gulp');

//Styles
gulp.task('styles', ()=>{                   //command = gulp styles
    console.log('starting styles task!');
});

//Scripts
gulp.task('scripts', ()=>{                   //command = gulp scripts
    console.log('starting scripts task!');
});

//Images
gulp.task('images', ()=>{                   
    console.log('starting images task!');
});


gulp.task('default', ()=>{
    console.log('starting default task');
});