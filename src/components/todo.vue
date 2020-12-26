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
        <span class="count-list">{{todo.count || 0}}</span><!-- 数目-->
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
      <div v-for="(item, index) in items" :key="index">
        <item :item="item"></item>
      </div>
    </div>

  </div>
</template>

<script>
import Item from './item'
import { getTodo, addRecord } from '../api/api'

export default {
  data () {
    return {
      todo: {
        title: '星期一',
        count: 12,
        locked: false
      },
      // 代办单项列表
      items: [],
      // 新增代办单项绑定的值
      text: ''
    }
  },
  components: {
    Item
  },
  watch: {
    '$route.params.id' () {
    // 监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据。
      this.init()
    }
  },
  created () {
    // created生命周期，在实例已经创建完成，页面还没渲染时调用init方法。
    this.init()
  },
  methods: {
    onAdd () {
      // 当用户输入文字，并且回车时调用次方法。
      const ID = this.$route.params.id
      addRecord({ id: ID, text: this.text }).then(res => {
        this.text = ''
        this.init() // 请求成功后初始化
      })
    },
    init () {
    // 获取到 $route下params下的id,即我们在menus.vue组件处传入的数据。
      const ID = this.$route.params.id
      getTodo({ id: ID }).then(res => {
        console.log('===init===res===', res)
        let { id, title, count, isDelete, locked, record
        } = res.data.todo
        // 请求成功，拿到res.data.todo;在将record 赋值到代办单项列表，其它数据赋值到todo对象
        this.items = record
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        }
      })
    }

  }
}
</script>

<style lang = "less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>
