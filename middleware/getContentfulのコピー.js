export default async ({
  store
}) => {
  if (!store.state.works.length) await store.dispatch('getPosts')
}
