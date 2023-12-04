var app = new Vue({
    el: '#app',
    data: {
        regions:{
          hokkaido:{
            title:"北海道・東北",
            sample:["北海道","青森県","秋田県","長野県","岩手県"],
            isFaded: true,
           buttonColor: "#FFFF00",
          },
          kanto:{
            title:"関東",
            sample:["茨城県","栃木県","群馬県","埼玉県","千葉県"],
            isFaded: true,
          buttonColor: "#00FFFF",
          },
           

         
       }
    },
    computed: {
        fadeClasses() {
          return {
            'fade-in': this.isFaded,
          };
        },
      },
    methods:{
        redirectTo(url){
            window.location.href="./"+url+".html";
        },
        toggleFade(key) {
          this.regions[key].isFaded = !this.regions[key].isFaded;
      },
      changeButtonColor() {
        // 例えば別の色に変更するロジック
        this.buttonColor = '#FF0000';
      },
  
    }
})