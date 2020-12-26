// 导入mockjs模块
import Mock from 'mockjs'

// 定义待办事项数据
let Todos = []
// 定义待办事项数据
let COUNT = [1, 2, 3, 4, 5]

for (let i = 0; i < COUNT.length; i++) {
  const obj = Mock.mock({
    id: Mock.Random.guid(), // 生成随机id
    title: Mock.Random.ctitle(), // 生成随机标题
    isDelete: false, // 是否删除
    locked: Mock.Random.boolean(), // 随机锁定
    record: COUNT.map(() => {
      return {
        text: Mock.Random.cparagraph(2), // 随机内容
        isDelete: false, // 是否删除
        checked: Mock.Random.boolean() // 是否完成
      }
    })
  })
  Todos.push(obj)
}

console.log('===mockjs===Todos===', Todos)

// 导出数据
export {
  Todos
}
