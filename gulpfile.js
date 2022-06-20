const gulp = require("gulp");
const connectSSI = require("connect-ssi");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const postcss = require("gulp-postcss");
const cssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const flexBugsFixes = require("postcss-flexbugs-fixes");
const customMedia = require("postcss-custom-media");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const cssWring = require("csswring");

const browserSyncOption = {
	files: './', // ルートにしたい場所
	server: "./", // ルートにしたい場所
	// ↓ SSIを有効にしたい場合にコメントを取る
	// notify: false,
	// middleware: [
	//   connectSSI({
	// 	baseDir: __dirname + './', // ルートにしたい場所
	// 	ext: '.html'
	//   })
	// ]
};

gulp.task("serve", (done) => {
	browserSync.init(browserSyncOption);
	done();
	console.log("Server was launched");
});

gulp.task("watch", () => {
	const browserReload = (done) => {
		browserSync.reload();
		done();
		console.log("Browser reload completed");
	};
	gulp.watch("./**/*", browserReload);
	console.log("gulp watch started");
});

// ローカルサーバー起動、自動更新用タスク
gulp.task("browser-sync", () => {
	browserSync.init();
});

const autoprefixerOption = {
	grid: true,
};

const postcssOption = [
	flexBugsFixes,
	autoprefixer(autoprefixerOption),
	customMedia,
	cssWring,
	cssImport({
		path: ["node_modules"],
	}),
];

gulp.task("sass", () => {
	return gulp
		.src("./src/sass/evkentou.scss", { sourcemaps: true })
		.pipe(
			plumber(
				//エラーが出ても処理を止めない
				{
					errorHandler: notify.onError("Error:<%= error.message %>"),
					//エラー出力設定
				}
			)
		)
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(postcss(postcssOption))
		.pipe(gulp.dest("./css", { sourcemaps: true }));
});

gulp.task("watch", () => {
	return gulp.watch("./src/sass/**/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.series("serve", "watch"));
