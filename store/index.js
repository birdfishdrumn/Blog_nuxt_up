import imgDefault from "~/assets/images/imgDefault.png";

import {
  createClient
} from "~/plugins/contentful.js";
const client = createClient();

export const state = () => ({
  works: [],
  categories: [],
  tags: [],
  query: '',
  layout: {
    width: 1280,
    padding: 20,
    toolbarHeight: 50,
    drawerWidth: 300
  }
});

export const getters = {
  // image写真を投稿したかしてないかで、eyecatchを分ける関数
  setEyeCatch: () => work => {
    if (!!work.fields.image && !!work.fields.image.fields)
      return {
        url: `https:${work.fields.image.fields.file.url}`,

        title: work.fields.image.fields.title
      };
    // なければ、デフォルトの写真になる
    else
      return {
        url: imgDefault,
        title: "imageDefault"
      };
  },
  // 下書きの場合に表示する文字
  draftChip: () => obj => {
    if (!obj.fields.date) return "draftChip";
  },
  // タグやカテゴリー、個別記事などに移動する際の関数。
  // nameにはフォルダの名前、objには受け取ったデータからの名前が入る。
  linkTo: () => (name, obj) => {
    return {
      name: `${name}-slug`,
      params: {
        slug: obj.fields.slug
      }
    };
  },
  // カテゴリーの一覧を表示する関数。
  relatedPosts: state => category => {
    const works = [];
    for (let i = 0; i < state.works.length; i++) {
      const catId = state.works[i].fields.category.sys.id;
      if (category.sys.id === catId) works.push(state.works[i]);
    }
    return works;
  },
  mainCategories: state => () => {
    const categories = [];
    for (const cat of state.categories) {
      if (cat.fields.isMain) {
        categories.push(cat);
      }
    }
    return categories;
  },
  // タグ一覧の取得,この算出プロパティは、tagPostsから引数に渡したcurrentTagに関連付くpostの配列を返します タグに関連づく記事を取得するメソッド
  associatePosts: state => currentTag => {
    const works = [];
    for (let i = 0; i < state.works.length; i++) {
      const work = state.works[i];
      if (work.fields.tags) {
        const tag = work.fields.tags.find(
          tag => tag.sys.id === currentTag.sys.id
        );

        if (tag) works.push(work);
      }
    }
    return works;
  }
};

export const mutations = {
  setPosts(state, payload) {
    state.works = payload;
  },

  setCategories(state, payload) {
    state.categories = payload;
    console.log(state.categories);
  },
  setLinks(state, entries) {
    state.tags = [];
    state.categories = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry.sys.contentType.sys.id === "tag") state.tags.push(entry);
      else if (entry.sys.contentType.sys.id === "category")
        state.categories.push(entry);
    }
    // モデルの並び替えは自分で行わなければなりません  カテゴリーモデルはsortの小さい順に並び替えるよう、 Javascriptのsortメソッドを使用しています。

    state.categories.sort((a, b) => a.fields.sort - b.fields.sort);
  },
  setQuery(state, payload) {
    state.query = payload
  }
};

export const actions = {
  async getPosts({
    commit
  }) {
    await client
      .getEntries({
        content_type: "work",
        order: "-sys.createdAt",
        include: 1 // 追記

        // 削除
        // }).then(res =>
        //   commit('setPosts', res.items)
        // ).catch(console.error)
        // getPosts() からsetLinks() へコミットするようにコードを追加

        // res.includes.Entryには、 カテゴリーモデルとタグモデルが混ざっているため、 setLinks() で振り分けを行っています。
        // 変更・追記
      })
      .then(res => {
        commit("setLinks", res.includes.Entry);
        commit("setPosts", res.items);
      })
      .catch(console.error);
  },


};
