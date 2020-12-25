<template>
  <section class="container">
    <!--最外层容器-->
    <section class="menu">
      <menus />
    </section>
    <section class="content-container">
      <todo />
    </section>
  </section>
</template>

<script>
import menus from './menus'
import todo from './todo'

export default {
  components: {
    menus,
    todo
  }
}
</script>

<style lang="less">
  @import '../common/style/layouts.less';
</style>
