<template>
  <div class="list-todos">
    <a
      v-for="(item, index) in items"
      v-bind:key="index"
      @click="handleChange(item.id)"
      class="list-todo activeListClass list"
      :class="{'active': item.id === activeId}"
    >
      <span class="icon-lock" v-if="item.locked" />
      <span class="count-list">{{ item.count }}</span>
      {{ item.title }}
    </a>
    <a class=" link-list-new" @click="handleAddTodo">
      <span class="icon-plus" /> 新增
    </a>
  </div>
</template>

<script>
import { getTodoList, addTodo } from '../api/api'

console.log('===getTodoList===', getTodoList)

export default {
  data () {
    return {
      items: [],
      activeId: ''
    }
  },
  created () {
    getTodoList({}).then(res => {
      const TODOS = res.data.todos
      this.items = TODOS
      this.activeId = TODOS[0].id
    })
  },
  methods: {
    handleChange (id) {
      this.activeId = id
    },
    handleAddTodo () {
      addTodo({}).then(data => {
        getTodoList({}).then(res => {
          const TODOS = res.data.todos
          this.todoId = TODOS[TODOS.length - 1].id
          this.items = TODOS
        })
      })
    }
  }
}
</script>

<style lang="less">
@import "../common/style/menu.less";
</style>
