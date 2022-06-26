/**
 * MOVIE一覧 TAB
*/

export default function() {
	var searchBox = '.c-content-index__tab , .c-content-index__tags';
	var listItem = '.c-media-list__item';
	var movieCategory = $('.c-content-index__tab > ul > li');
	var movieTag = $('.c-content-index__tags > ul > li');


	var urlLinkLoad = window.location.href.match(/[a-z-]{1,}/g) || []; // URL取得

	// タブとカテゴリー 初期表示で「中学校」「ALL」をcurrentにする
	if ($('.c-page-sub[data-page="movie"] .c-content-index').length) {
		$('.c-content-index__tab > ul > li:first-child').attr('data-current', 'true');
		$('.c-content-index__tags > ul > li:first-child').attr('data-current', 'true');
		$('.c-media-list__item[data-category != "中学校"]').attr('data-display', 'none');
		tab_parameter();
	}

	var workItem = $('.c-media-list__item');
	var indexOfvalue = '中学校'; // ロードの時にvalueを変更↓↓↓


	if(urlLinkLoad.indexOf('high-school') > -1) {
		indexOfvalue = '高等学校';
	}

	function matchArray(bigArray, smallArray) {
		if(smallArray == null){
			return false;
		}
		for(let i = 0; i < smallArray.length; i++){
			if(bigArray.indexOf(smallArray[i]) != -1) {
				return true;
			}
		}
		return false;
	}
	function getAllTagSelect(jqElement){
		let tags = [];
		jqElement.each(function(){
			tags.push($(this).val());
		});
		return tags.length == 0 ? null : tags;
	}

	function renderShowHideOption(){
		var category = $('input[name="category"]:checked').val();
		var tagSelect = getAllTagSelect($('input[name="tags"]:checked'));
		var count = 0; // count item

		$(workItem).each(function(){
			try{
				let matchCategory = tagSelect == 'ALL' || $(this).data('category') == category;
				let tag =  $(this).attr('data-tags').match(/[ぁ-んァ-ン一-龥]{1,}/g) || [];

				if(matchCategory && tagSelect == 'ALL' &&  $(this).data('category').indexOf(category) > -1 ){
					$(this).attr('data-display', 'block');
					count ++;
					return true;
				}

				if(matchArray(tag, tagSelect) && matchCategory){
					$(this).attr('data-display', 'block');
					count ++;
				}else {
					$(this).attr('data-display', 'none');
				}
			}catch(e){
				console.log(e);
			}
		})

		if(count === 0) {
			$('.c-media-list').after('<p class="c-media-list__none">該当の実績がありません。</p>');
		} else {
			$('.c-media-list__none').remove();
		}
	}
	$('.c-content-index__tags input[name="tags"], input[name="category"]').on('change', renderShowHideOption);

	// タブとカテゴリー current切り替え
	$(movieCategory).on('click', function () {
		$(movieCategory).attr('data-current', '');
		if ($(this).attr('data-current', '')) {
			$(this).attr('data-current', 'true');
		}
	});


	$(movieTag).on('click', function () {
		$(movieTag).attr('data-current', '');
		if ($(this).attr('data-current', '')) {
			$(this).attr('data-current', 'true');
		}
	});

	// パラメーター引き継ぎ
	var prm;
	function retrieveGETqs() {
		var query = window.location.search.substring(1);
		return query;
		 /* 引数がない時は処理しない */
		if (!query) return false;
	}
	$(function(){
		$('.c-pagination a').on('click', function () {
			//リンク先を取得
			var target_url = $(this).attr('href');

			//パラメータを取得
			var str = retrieveGETqs();
			prm = decodeURIComponent(str);

			if (prm) {
				//target_urlに'？'を含む場合
				if (target_url.indexOf('?') != -1) {
					//追加パラメータの先頭文字列を'&'に置換
					$('.c-pagination a').attr('href', target_url + '&' + prm);
				} else {
					$('.c-pagination a').attr('href', target_url + '?' + prm);
				}
			}
		})
	});

	$(function() {
		// カテゴリー・タグ絞り込み項目を変更した時
		$(document).on('change', searchBox + ' input', function() {
			// search_filter();
			permalink();
		});
	});

	function search_filter() {
		$(listItem).removeAttr('data-display');
		$('.c-media-list__none').remove();

		for (var i = 0; i < $(searchBox).length; i++) {
			var name = $(searchBox).eq(i).find('input').attr('name');
			var searchData = get_selected_input_items(name);

			if (searchData.length === 0 || searchData[0] === 'ALL') {
				continue;
			}

			for (var j = 0; j < $(listItem).length; j++) {
				var itemData = get_setting_values_in_item($(listItem).eq(j), name);
				var check = array_match_check(itemData, searchData);
				if(!check) {
					$(listItem).eq(j).attr('data-display', 'fff'); // 20220624 チェック削除
				}
			}
		}

		// 該当の実績がない場合
		var elem = $('.c-media-list__item[data-display="none"]');
		if ($(listItem).length == $(elem).length) {
			$('.c-media-list').after('<p class="c-media-list__none">該当の実績がありません。</p>')
		}
	}



	// チェックされたチェックボックスのvalueを返す
	function get_selected_input_items(name) {
		var searchData = [];
		$('[name=' + name + ']:checked').each(function() {
			searchData.push($(this).val());
		});
		return searchData;
	}

	// listItemが持つdata属性(categoryとtag)の値を全てを返す
	function get_setting_values_in_item(target, data) {
		var itemData = target.data(data);
		if(!Array.isArray(itemData)) {
				itemData = [itemData];
		}
		return itemData;
	}

	// 絞り込みの対象となるかどうかを返す
	function array_match_check(arr1, arr2) {
		var arrCheck = false;
		for (var i = 0; i < arr1.length; i++) {
			if(arr2.indexOf(arr1[i]) >= 0) {
				arrCheck = true;
				break;
			}
		}
		return arrCheck;
	}

	function tab_parameter() {
		// カテゴリー パラメータ取得
		function getParam(name, url) {
			if (!url) url = window.location.href;
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		}
		// タグ パラメータ取得
		function getParamTag(name, url) {
			if (!url) url = window.location.href;
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[&&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		}

		// ページ読み込み時のタブ切り替え
		var tabPram = ['middle-school', 'high-school'];
		var pram = getParam('active');
		var tabPramTag = ['all', 'event', 'school-life', 'other'];
		var pramTag = getParamTag('active');
		var moviePram = $('[data-category="' + pram + '"]');
		var moviePramTag = $('[data-tag="' + pramTag + '"]');
		if ((pramTag && $.inArray(pramTag, tabPramTag) !== -1) && (pram && $.inArray(pram, tabPram) !== -1)) {
			$(movieCategory).removeAttr('data-current');
			$(movieTag).removeAttr('data-current');
			moviePramTag.attr('data-current','true');

			if(moviePramTag.attr('data-current') == 'true') {
				$(moviePramTag).children().children().prop('checked', true);
			}

			moviePram.attr('data-current','true');
			if(moviePram.attr('data-current') == 'true') {
				$(moviePram).children().children().prop('checked', true);
			}
			$('.c-content-index__tab li[data-current="true"] input').trigger('change');
		}
	}


	// パーマリンクに選択したカテゴリーとタグを設定
	function permalink() {
		var movieCategoryCurrent = $('.c-content-index__tab > ul > li[data-current="true"]');
		var movieTagCurrent = $('.c-content-index__tags > ul > li[data-current="true"]');
		var dataCategory = $(movieCategoryCurrent).data('category');
		var dataTag = $(movieTagCurrent).data('tag');

		$(function() {
			var path = location.pathname;
			window.history.pushState(null, null, path + '?active=' + dataCategory + '&active=' + dataTag);
		});
	}

	// url load page
	if(urlLinkLoad.indexOf('active') > -1 && urlLinkLoad.indexOf('middle-school') > -1 || urlLinkLoad.indexOf('active') > -1 && urlLinkLoad.indexOf('high-school') > -1)  {
		$(listItem).removeAttr('data-display'); // 念の為　movieページだけで対応する。
	}
	try {
		$('.c-media-list__item').each(function() {
			var itemListCatelogy = $(this).data('category');
			var itemListTag = $(this).data('tags');

			for(var i = 0; i < urlLinkLoad.length; i++){
				switch(urlLinkLoad[i]) {
					case "middle-school":
						if(urlLinkLoad.indexOf('all') > -1 && itemListCatelogy === '中学校') {
							$(this).addClass('active');
						}else if(urlLinkLoad.indexOf('event') > -1 && itemListCatelogy === '中学校' && itemListTag.indexOf('行事') > -1) {
							$(this).addClass('active');
						}else if(urlLinkLoad.indexOf('school-life') > -1 && itemListCatelogy === '中学校' && itemListTag.indexOf('学校生活') > -1) {
							$(this).addClass('active');
						}else if(urlLinkLoad.indexOf('other') > -1 && itemListCatelogy === '中学校' && itemListTag.indexOf('その他') > -1) {
							$(this).addClass('active');
						}else {
							$(this).addClass('removeActive');
						}
					break;
					case "high-school":
						if(urlLinkLoad.indexOf('all') > -1 && itemListCatelogy === '高等学校') {
							$(this).addClass('active');
						}else if(urlLinkLoad.indexOf('event') > -1 && itemListCatelogy === '高等学校' && itemListTag.indexOf('行事') > -1) {
							$(this).addClass('active');
						}else if(urlLinkLoad.indexOf('school-life') > -1 && itemListCatelogy === '高等学校' && itemListTag.indexOf('学校生活') > -1) {
							$(this).addClass('active');
						}else if(urlLinkLoad.indexOf('other') > -1 && itemListCatelogy === '高等学校' && itemListTag.indexOf('その他') > -1) {
							$(this).addClass('active');
						}else {
							$(this).addClass('removeActive');

						}
					break;

					default:
				}
			}
		})
	} catch(event) {
		console.log(event)
	}

	// item none
	$('.c-media-list').each(function() {
		let noneItem = $(this).find('.active');
		if(noneItem.length == 0) {
			$('.c-media-list').after('<p class="c-media-list__none">該当の実績がありません。</p>');
		}
	})
};