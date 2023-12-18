var app = new Vue({
  el: '#app',
  data: {
    regions: {
      hokkaido: { title: "北海道・東北", prefectures: [], isFaded: true, buttonColor: "#99CCFF" },
      kanto: { title: "関東", prefectures: [], isFaded: true, buttonColor: "#eaf6fd" },
      tyubu: { title: "中部", prefectures: [], isFaded: true, buttonColor: "#99CC99" },
      kinki: { title: "近畿", prefectures: [], isFaded: true, buttonColor: "#FFCC66" },
      tyugoku: { title: "中国", prefectures: [], isFaded: true, buttonColor: "#FF9966" },
      shikoku: { title: "四国", prefectures: [], isFaded: true, buttonColor: "#CC6666" },
      kyusyu: { title: "九州", prefectures: [], isFaded: true, buttonColor: "#CC99CC" }
    },
    titleArray: ['hokkaido', 'kanto', 'tyubu', 'kinki', 'tyugoku', 'shikoku', 'kyusyu'],
    selectedArray: [],
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
    setRegionData(regionKey, prefecturesArray) {
      if (!this.regions[regionKey]) {
        this.$set(this.regions, regionKey, {});
      }

      this.$set(this.regions[regionKey], 'prefectures', prefecturesArray.map(item => ({ name: item.prefecture_name, flg: true })));
    },
    async fetchPrefectures() {
      try {
        const prefecturesData = await this.fetchPrefecturesData();
        Object.keys(prefecturesData).forEach((regionKey) => {
          const regionData = prefecturesData[regionKey];
          const prefecturesArray = JSON.parse(regionData.prefectures);
          this.setRegionData(this.titleArray[regionKey], prefecturesArray);
        });
      } catch (error) {
        console.error("データの設定に失敗しました。", error);
      }
    },
    redirectTo(url) {
      window.location.href = `./${url}.html`;
    },
    toggleFade(regionKey) {
      this.$set(this.regions[regionKey], 'isFaded', !this.regions[regionKey]?.isFaded);
    },
    select_on(key,item) {
      this.regions[key].prefectures[item].flg = !this.regions[key].prefectures[item].flg;
      this.selectedArray.push(this.regions[key].prefectures[item].name);
    },
    select_off(key,item) {
      this.regions[key].prefectures[item].flg = !this.regions[key].prefectures[item].flg;
      this.selectedArray = this.selectedArray.filter((str) => str !== this.regions[key].prefectures[item].name);
    },
  },
  created() {
    this.fetchPrefectures();
  },
});
