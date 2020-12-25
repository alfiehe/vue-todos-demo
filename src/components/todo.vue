<template>
  <div class="page lists-show"><!--最外层容器-->

    <nav>

      <!--移动端的菜单图标-->
      <div class="nav-group">
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>

      <h1 class="title-page">
        <span class="title-wrapper">{{todo.title}}</span> <!-- 标题-->
        <span class="count-list">{{todo.count}}</span><!-- 数目-->
      </h1>

      <!-- 右边的删除，锁定图标容器-->
      <div class="nav-group right">
        <div class="options-web">
          <!-- 锁定图标-->
          <a class=" nav-item">
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <!-- 删除图标-->
          <a class=" nav-item">
            <span class="icon-trash">
            </span>
          </a>
        </div>
      </div>

      <!--
        新增单个代办单项输入框,监听了回车事件，
        双向绑定text值,监听了disabled属性，
        在todo.locked为true的情况下无法编辑
      -->
      <div class="form todo-new input-symbol">
        <input
          type="text"
          v-model="text"
          placeholder='请输入'
          @keyup.enter="onAdd"
          :disabled="todo.locked"
        />
        <span class="icon-add"></span>
      </div>

    </nav>

    <div class="content-scrollable list-items">
      <!--容器下半部分-->
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      todo: {
        title: '星期一',
        count: 12,
        locked: false
      },
      items: [ // 代办单项列表
        { checked: false, text: '新的一天', isDelete: false },
        { checked: false, text: '新的一天', isDelete: false },
        { checked: false, text: '新的一天', isDelete: false }
      ],
      text: '' // 新增代办单项绑定的值
    }
  },
  methods: {
    onAdd () {
      this.items.push({
        checked: false,
        text: this.text,
        isDelete: false
      })
      this.text = ''
    }
  }
}
</script>

<style lang = "less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>
