new Vue({
    el: '#app', // Vue.js を適用する要素のセレクタ
    data: {
        prefecture_name:"",
        attraction_data:[],
        id:0,
    },
    mounted() {
        this.fetchAttractions(this.getQueryParam('prefecture_id'));
        this.prefecture_name = this.get_prefecture_name(this.getQueryParam('prefecture_id'));
        this.id=this.getQueryParam('prefecture_id');
    },
    methods: {
        redirectTo(url) {
            window.location.href = `./${url}.html`;
        },
        //特定のGETパラメータを取得する関数
        getQueryParam(paramName) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(paramName);
        },
        fetchAttractions(prefecture_id) {
            const url = "../../back/src/get_attractions.php";
            const timestamp = new Date().getTime(); // 毎回違うアドレスで検索するためのタイムスタンプ
            axios
              .get(`${url}?prefecture_id=${prefecture_id}&timestamp=${timestamp}`)
              .then((response) => {
                this.attraction_data = response.data; // 取得したデータをcommentsに代入
              })
              .catch((error) => {
                console.log(error); // エラーが発生した場合はエラーメッセージをコンソールに表示
              });
        },
        get_prefecture_name(prefecture_id){
            let prefectures = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];
            return prefectures[prefecture_id-1];
        },
        goBack() {
            window.history.back();
        },
    }
});