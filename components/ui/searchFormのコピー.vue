<template mt-10>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field
        ref="searchForm"
        v-model="query"
        hide-details
        placeholder="キーワードを入力"
        dense
      />
    </v-form>
    <!-- <v-btn icon>
      <v-icon @submit.prevent="submit">mdi-magnify</v-icon>
    </v-btn> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
  },
  computed: {
    // 検索キーワードが有効な場合にtrueを返す
    validQuery() {
      return (
        !!this.query && // 入力必須
        !/^\s+$/.test(this.query) && // 空白のみ禁止
        this.$route.query.q !== this.query
      ); // 値の変化
    }
  },
  methods: {
    // this.queryにはユーザーが入力した検索キーワードが入ります。
    submit() {
      if (this.validQuery) {
        this.$router.push({ path: "/search", query: { q: this.query } });
        this.query = "";
        this.$refs.searchForm.blur();
      }
    }
    // this.$refs.<キー> … DOM（Htmlタグのこと）を直接操作したい場合に使用します。操作したいDOMにはref=<任意のキー>を設定する必要があります。
    // blur() … フォームのフォーカスを外すVue.jsの命令です。
  }
};
</script>
