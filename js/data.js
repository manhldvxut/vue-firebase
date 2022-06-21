window.$ = window.jQuery; // jquery in vue 3

// Vue.use(VueFire);
var config = {
    apiKey: "AIzaSyD_dR2JTiUyNMWAwz7GrujiLsYGf5Vc9JE",
    authDomain: "card2023-test.firebaseapp.com",
    databaseURL: "https://card2023-test-default-rtdb.firebaseio.com",
    projectId: "card2023-test",
    storageBucket: "card2023-test.appspot.com",
    messagingSenderId: "445231659052",
    appId: "1:445231659052:web:887a40fc67c8602d773989"
  };
  var app = firebase.initializeApp(config);
  var db = app.database();
  var ref = db.ref('playlists');

window.addEventListener('load', function () {
  var app = Vue.createApp({
    data() {
      return {
        areaText: "",
        url: "",
      }
    },
      firebase: {
        playlists: ref
      }, 
      methods: {
        addPlaylist: function () {

          if (this.areaText.trim()) {
            ref.push({
              "areaText": this.areaText,
              "url": this.url,
            })
            alert('Ok')
            this.areaText = ""
            this.url = ""
            
          }
        },
        fileUpload(props) {
          const file = props.target.files[0];
          this.img_url = URL.createObjectURL(file);
          const storageRef = firebase.storage().ref();

          const thisRef = storageRef.child("files/" + file.name);
          thisRef.put(file).then(function (snapshot) {
            console.log('Uploaded');
        });
        }
      },
      watch: {
        
      },
      computed: {
        
      }
    }).mount('#app');
});




(function() {
	'use strict';
	/**
	 * DOM読み込み後実行
	 */
	$(function() {
    setTimeout(() => {
    const productCategory = $('.c-shop__products-category');
    $('.jumbotron ul > li button').on('click', function() {
      let imgSrc = $(this).find('img').attr('src');

      $('.contentBig .img-show img').each(function() {
        $(this).attr('src', imgSrc)
      })
      $('.URLinput').text(imgSrc)
    })
  }, 3000);
    
	});
})();


