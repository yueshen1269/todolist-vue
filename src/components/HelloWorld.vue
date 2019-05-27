<template>
  <div class="todolist">
    <h1 v-text="title"></h1>
    <input type="text" v-model="newtodo.detail"  autofocus autocomplete="off"
    placeholder="add new todo" @keyup.enter="addItem">
    <ul v-if="itemdata[0]">
      <li v-for="(todo, index) in itemdata" :key="todo.detail" :class="{
        completed:todo.iscompleted}" >
        <input type="checkbox" :checked="todo.iscompleted" @click="changeCompleteStatus(todo)" >
        <span>{{index+1}}</span>
        <span class="content" :class="{completed:todo.iscompleted}">{{ todo.detail}}</span>
        <input type="button" value="delete"
        @click="deleteItem(todo.detail)">
      </li>
    </ul>
    <div class="left" v-if="left"><strong>{{ left }}</strong>left</div>
    <p v-if="!left&&itemdata[0]" class="congratulation">ALL DONE!!!~</p>
  </div>
</template>

<script>
import {reqData, setData, delData, updateData} from "../api/index"
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
        iscompleted: false
      },
      itemdata: [],
      checkall: false,
    }
  },
  methods: {
    async getdata() {
      this.itemdata = await reqData();
    },
    async addItem() {
      this.itemdata = await setData(this.newtodo);
      this.$nextTick(() => {
        this.newtodo.detail = ""
      })
    },
    async deleteItem(detail) {
      const params = {detail: detail}
      this.itemdata = await delData({params: params});
    },
    async changeCompleteStatus(todo) {
      todo.iscompleted = !todo.iscompleted;
      this.itemdata = await updateData(todo)
    }
  },
  computed: {
    left() {
      return this.itemdata.filter(item => item.iscompleted===false).length;
    }
  },
  created() {
    this.getdata();
    console.log(this.itemdata, "created")
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
  padding-right: 10%;
  font-size: 36px;
  border-bottom: 1px solid antiquewhite;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
li>input:last-child {
  position: absolute;
  top: -9999em;
}
li:hover input{
  top: 10px;
  right: 5px;
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
.completed {
  text-decoration: line-through;
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
.congratulation {
  font-size: 30px;
  color: red;
  margin-top: 10px;
}
</style>
