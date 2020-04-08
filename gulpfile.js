// プラグインの読み込み
var gulp = require("gulp");
var gulpsass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

// ソースディレクトリ
var source = 'src/';

// Bootstrap sass ディレクトリ
var bootstrapSass = {
    in: './node_modules/bootstrap/scss'
};

// sass、css関連の変数を設定
var sass = {
    in: source + 'scss/**/*scss',
    // 特定のディレクトリ以下全てのファイルとディレクトリを扱う場合は scss/**/* と アスタリスク２つとスラッシュ、その後ろにさらにアスタリスク１つをつけて指定します。
    out: source + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',                       // 圧縮方法を指定（作成されたcssの可読性、容量に影響する。）
        includePaths: [bootstrapSass.in]             // @import機能で利用できるパスを指定
    }
};

// browser-syncの初期設定
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: source                          // browser-syncのコンテキストルートを指定
        },
        startPath: 'index.html'                 // 最初に開くページを指定
    });

    // sassディレクトリを監視し、更新があれば自動コンパイルと修正したcssをブラウザに反映する。
    gulp.watch(sass.watch, gulp.series('sass'));
    // htmlディレクトリ、jsディレクトリを監視し、更新があればブラウザをリロードする。
    gulp.watch([
      source + '*.html',
      source + 'css/*',
      source + 'js/*'
    ]).on('change', browserSync.reload);

});

// sassをコンパイルするタスク
gulp.task('sass', function() {
    return gulp.src(sass.in)                         // コンパイル対象のsassディレクトリを指定
        .pipe(plumber({                              // コンパイルエラー時、エラーメッセージをデスクトップ通知する。
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(gulpsass(sass.sassOpts))               // コンパイル実行（sass->css）
        .pipe(postcss([
          autoprefixer()
        ]))
        .pipe(gulp.dest(sass.out))                   // cssをcssディレクトリに出力
        .pipe(browserSync.stream())                  // cssをブラウザに反映する。（ブラウザのリロード無し）
        .pipe(notify({                               // コンパイル成功時、正常メッセージをデスクトップ通知する。
            message: 'Finished sass.'
        }));
});

// デフォルトタスク
// sassタスク、browser-syncタスクを直列で実行する。
gulp.task('default', gulp.series('sass', 'browser-sync'));
