new Vue({
    el: '#app', // Vue.js を適用する要素のセレクタ
    data: {
        p_id: 0,
    },
    mounted() {
        this.p_id = this.getQueryParam('prefecture_id');
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
    }
});