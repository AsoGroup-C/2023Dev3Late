var app = new Vue({
  el: '#app',
  data: {
    regions: {
      hokkaido: { title: "北海道・東北", prefectures: [], isFaded: true, buttonColor: "#99CCFF" },
      kanto: { title: "関東", prefectures: [], isFaded: true, buttonColor: "#CCFFFF" },
      tyubu: { title: "中部", prefectures: [], isFaded: true, buttonColor: "#99CC99" },
      kinki: { title: "近畿", prefectures: [], isFaded: true, buttonColor: "#FFCC66" },
      tyugoku: { title: "中国", prefectures: [], isFaded: true, buttonColor: "#FF9966" },
      shikoku: { title: "四国", prefectures: [], isFaded: true, buttonColor: "#CC6666" },
      kyusyu: { title: "九州", prefectures: [], isFaded: true, buttonColor: "#FF99FF" }
    },
    titleArray:['hokkaido','kanto','tyubu','kinki','tyugoku','shikoku','kyusyu'],
  },
  computed: {
    fadeClasses() {
      return {
        'fade-in': this.isFaded,
      };
    },
  },
  methods: {
    async fetchPrefecturesData() {
      const url = "../../back/src/get_prefectures.php";
      const timestamp = new Date().getTime();

      try {
        const response = await axios.get(`${url}?timestamp=${timestamp}`);
        return response.data;
      } catch (error) {
        console.error("データの取得に失敗しました。", error);
        throw error;
      }
    },
    setPrefecturesData(prefecturesData) {
      Object.keys(prefecturesData).forEach((regionKey) => {
        const regionData = prefecturesData[regionKey];
        const prefecturesArray = JSON.parse(regionData.prefectures);

        // 未定義の場合は新しいオブジェクトを作成する
        if (!this.regions[this.titleArray[regionKey]]) {
          this.$set(this.regions, regionKey, {});
          console.log(this.titleArray[regionKey]);
        }

        // データの設定
        this.$set(this.regions[this.titleArray[regionKey]], 'prefectures', prefecturesArray.map(item => item.prefecture_name));
        console.log(this.regions[this.titleArray[regionKey]]);
      });
    },
    async fetchPrefectures() {
      try {
        const prefecturesData = await this.fetchPrefecturesData();
        this.setPrefecturesData(prefecturesData);
      } catch (error) {
        console.error("データの設定に失敗しました。", error);
      }
    },
    redirectTo(url) {
      window.location.href = `./${url}.html`;
    },
    toggleFade(regionKey) {
      // リアクティブなプロパティの切り替え
      this.$set(this.regions[regionKey], 'isFaded', !this.regions[regionKey]?.isFaded);
    },
  },
  created() {
    this.fetchPrefectures();
  },
});
