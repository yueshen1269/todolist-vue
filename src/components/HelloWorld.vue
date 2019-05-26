<template>
  <div class="todolist">
    <h1 v-text="title"></h1>
    <input type="checkbox" @click="all" :checked="checkall"></input>
    <input type="text" v-model="newtodo.detail" @keyup.enter="addTodo" autofocus autocomplete="off"
    placeholder="add new todo">
    <ul v-if="todos[0]">
      <li v-for="(todo,index) in todos" :key="todo.detail" :class="{
        completed:todo.iscompleted}" >
        <input type="checkbox" :checked="todo.iscompleted"  @click="completed(index)">
        <span>{{index+1}}</span>
        <span class="content">{{ todo.detail}}</span>
        <input type="button" value="delete"
        @click="removeItem(index)">
      </li>
    </ul>
    <div v-show="left" class="left"><strong>{{left}}</strong>left</div>
  </div>
</template>

<script>
var ls = window.localStorage;
var lsLists = new Array();
if (ls.getItem("lists") != null) {
  //从localStorage取出JSON字符串，并转为对象
  lsLists = JSON.parse(ls.getItem("lists"));
}
function sortF(a, b) {
  return a.iscompleted-b.iscompleted
}
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: "a todolist",
      newtodo: {
        detail: "",
        iscompleted: false,
        deleted: false,
      },
      todos: lsLists,
      checkall: false
    }
  },
  methods: {
    // togglestatus(todo) {
    //   todo.iscompleted = !todo.iscompleted;
    // },
    addTodo: function () {
      if(this.newtodo.detail.trim() == "") return;
      this.todos.unshift(this.newtodo);
        //根据完成状况排序
        this.todos.sort(sortF);
        //将对象转为JSON字符串
        ls.setItem("lists",JSON.stringify(this.todos));
        this.newtodo = {
          detail: "",
          iscompleted: false,
          deleted: false
        };
        // console.log(lsLists)
    },
    removeItem(index) {
      this.todos.splice(index, 1)
      ls.setItem("lists",JSON.stringify(this.todos));
    },
    completed(i) {
      this.todos[i].iscompleted = !this.todos[i].iscompleted;
      if(this.left===0) this.checkall=true;
      else this.checkall=false;
      this.todos.sort(sortF);
      ls.setItem("lists",JSON.stringify(this.todos));
    },
    all() {
      this.checkall=!this.checkall
      this.todos.forEach((item) => {
        return item.iscompleted=this.checkall;
      })
    }
  },
  computed: {
    left() {
      const len = this.todos.filter(function(item) {
        return item.iscompleted===false;
      }).length;
      return len;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  border: 1px solid navajowhite;
  width: 50%;
  margin: 10px auto 0;
  box-shadow: 3px 3px 5px wheat;
}
li {
  margin: 0 10px;
  font-size: 36px;
  border-bottom: 1px solid antiquewhite;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todolist >input {
  border: 2px solid deeppink;
  outline: none;
}
.content {
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
a {
  color: #42b983;
}
.active {
  text-decoration: underline;
  color: red;
}
.completed {
  text-decoration: line-through;
  color: darkgray;
}
.left {
  margin: 10px auto;
  width: 50%;
  text-align: center;

}
strong {
  color: red;
  padding-right: 10px;
}
</style>
