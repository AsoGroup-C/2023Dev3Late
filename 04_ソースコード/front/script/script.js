var app = new Vue({
    el: '#app',
    data: {
        msg: 'Hello Vue.js!'
    },
    methods:{
        redirectTo(url){
            window.location.href="./"+url+".html";
        }
    }
})