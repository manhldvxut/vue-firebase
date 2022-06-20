/**
 * copyright © 2020
 */
(function() {
	'use strict';

	// 定数定義
	// var BREAK_POINT_XS = 0;
	var BREAK_POINT_SM = 768;
	// var BREAK_POINT_MD = 768;
	// var BREAK_POINT_LG = 992;
	var BREAK_POINT_XL = 1260; // PCのコンテンツ幅 - 値は適宜変更してください

	/**
	 * タブレットではPCのViewportで表示する
	 *
	 */
	var breakPoint = BREAK_POINT_SM;
	var pcViewWidth = BREAK_POINT_XL;
	var vp = document.querySelector('[name="viewport"]');
	if (vp) {
		var media = matchMedia('(min-width: ' + (breakPoint - 1) + 'px)');
		if (media.matches) {
			vp.content = 'width=' + pcViewWidth;
		}
    }

    // UA判定 タブレット時 不要な場合は削除
    // var ua = navigator.userAgent
    // if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    //     // ここに実行したい処理を記述する
    // }

	/**
	 * DOM読み込み後実行
	 */
	$(function() {
		// CSS `object-fit` ポリフィル for IE11 & Edge
		/* global objectFitImages */
		// objectFitImages();

		// スムーズスクロールの実装 headerをfixedしていない場合
        $('a[href^="#"]').on('click', function () {
            var speed = 500;
            var href = $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            $("html, body").animate({ scrollTop: position }, speed, "swing");
            return false;
        });

        // スムーズスクロールの実装 headerをfixedしている場合
        // var headerHeight = $('.c-header').innerHeight();
        // $('a[href^="#"]').on('click', function () {
        //     var speed = 500;
        //     var href = $(this).attr("href");
        //     var target = $(href == "#" || href == "" ? 'html' : href);
        //     var position = target.offset().top - headerHeight;
        //     $("html, body").animate({ scrollTop: position }, speed, "swing");
        //     return false;
        // });

	});
})();
