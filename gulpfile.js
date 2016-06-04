var gulp=require("gulp");
var browserSync = require("browser-sync").create();
var cached = require("gulp-cached");
var less = require("gulp-less");
var jade = require("gulp-jade");
var prefixer=require("gulp-autoprefixer");
var del=require("del");
var seq=require("gulp-sequence");
var proxyMiddleware = require('http-proxy-middleware');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var TMP_FOLDER="tmp/";

var FOLDER=TMP_FOLDER;
var JSSRC=["src/js/**/*js"];
var CSSMAIN=["src/style/paper/*.less"];
var CSSDIR=["src/style/**/*.less"];
var VIEWS=["src/views/*.jade"];
var VIEWSAll=["src/views/**/*.jade"];
var VIEWSINDEX=["src/index.jade"];
var IMAGES=["src/image/**/*"];


var SERVER_PORT=7077;

var SERVER_PROXY = "http://www.iclassedu.com";
//飞哥电脑
//var SERVER_PROXY = "http://172.16.40.54:9000/";
//强哥电脑
//var SERVER_PROXY = "http://172.16.51.250:8090/tem-rest-frontend/";



var proxy = proxyMiddleware("/rest", {
    target: SERVER_PROXY,
    changeOrigin: true
});


gulp.task("clear",function(cb){
    del([FOLDER],cb);
});


gulp.task("compile-js",function(){
    return gulp.src(JSSRC)
        //.pipe(uglify())
        .pipe(gulp.dest(FOLDER+"js"));
});

gulp.task("compile-lib",function(){
    return gulp.src(["libs/**/*"])
        .pipe(gulp.dest(FOLDER+"libs"));
});

gulp.task("compile-views",function(){
    return gulp.src(VIEWS)
        .pipe(cached("debug",{optimizeMemory:true}))
        .pipe(jade({locals:{time:"?v="},pretty: true}))
        //.pipe(jade({locals:{time:"?v="}}))
        .on("error",function(error){console.dir(error);this.emit('end');})
        .pipe(gulp.dest(FOLDER+"views"));
});

gulp.task("compile-viewsIndex",function(){
    return gulp.src(VIEWSINDEX)
        .pipe(cached("debug",{optimizeMemory:true}))
        .pipe(jade({locals:{time:"?v="},pretty: true}))
        .on("error",function(error){console.dir(error);this.emit('end');})
        .pipe(gulp.dest(FOLDER));
});

gulp.task("compile-style",function(){
    return gulp.src(CSSMAIN,{base:"src/style/paper"})
        .pipe(less())
        .on("error",function(error){console.dir(error);this.emit('end');})
        .pipe(prefixer())
        //.pipe(minifycss())
        .pipe(gulp.dest(FOLDER+"style"));
});

gulp.task("compile-image",function(){
    return gulp.src(IMAGES,{base:"src"})
        .pipe(cached("debug",{optimizeMemory:true}))
        .pipe(gulp.dest(FOLDER));
});


gulp.task("watch",function(){
    gulp.watch(VIEWSAll,["compile-views"]);
    gulp.watch(VIEWSINDEX,["compile-viewsIndex"]);
    gulp.watch(CSSDIR,["compile-style"]);
    gulp.watch(IMAGES,["compile-image"]);
    gulp.watch(JSSRC,["compile-js"]);
    gulp.watch(FOLDER+"/**/*",{read:false}).on('change', function(event){
        browserSync.reload();
    });
});

gulp.task("default",["compile-js","compile-views","compile-viewsIndex","compile-lib","compile-style","compile-image"]);

gulp.task("dev",["default"],function(){
    console.log("##Starting Server.......");
    browserSync.init({
        //proxy:'http://172.16.40.53/',
        port:SERVER_PORT,
        //startPath:"http://172.16.40.53:9002/",
        ghostMode:false,
        server:FOLDER,
        middleware: [proxy]
    });
    gulp.start("watch");
});

gulp.task("server",seq("clear","dev"));



