import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'

// 导入Todos数据
import {
  Todos
} from './data/todoList'

export default {
  /**
   * mock start
   */

  // 初始化函数
  start () {
    let mock = new MockAdapter(axios)

    // 获取todo列表
    // config 指前台传过来的值
    mock.onGet('todo/list').reply(config => {
      let mockTodo = Todos.map(tode => { // 重组 Todos数组，变成我们想要的数据
        return {
          id: tode.id,
          title: tode.title,
          count: tode.record.filter(data => {
            if (data.checked === false) return true
            return false
          }).length, // 过滤到record里面 ‘checked’ 为true的数据，因为它们已经被完成了
          locked: tode.locked,
          isDelete: tode.isDelete
        }
      }).filter(tode => {
        if (tode.isDelete === true) return false
        return true
      })

      console.log('===mockjs===mockTodo===', mockTodo)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 返回状态为200，并且返回todos数据
          resolve([
            200,
            {todos: mockTodo}
          ])
        }, 200)
      })
    })

    // 新增一条todo
    mock.onPost('/todo/addTodo').reply(config => {
      Todos.push({
        id: Mock.Random.guid(),
        title: '未命名',
        isDelete: false,
        locked: false,
        record: []
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })

    // 获取todo单个列表
    mock.onGet('/todo/listId').reply(config => {
      let { id } = config.params
      let todo = Todos.find(item => {
        return id && item.id === id
      })
      todo ? todo.count == todo ? todo.record.filter(data => {
        return data.checked === false
      }).length : null : false
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { todo }])
        }, 200)
      })
    })

    mock.onPost('/todo/addRecord').reply(config => {
      let {
        id,
        text
      } = JSON.parse(config.data)
      // id 是传进来的值唯一待办项的id
      // text 用户新增输入的数据
      Todos.some((t, index) => {
        if (t.id === id) {
          t.record.push({
            text: text,
            isDelete: false,
            checked: false
          })
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
  }
}
