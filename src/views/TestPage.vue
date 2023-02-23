<template lang="pug">
  .page_test
    .window
      .window__header
        h1 Страница для тестов
      .window__body
        button(@click="sendRequest") Отправить запрос
        button(@click="setStorageHello") Set Hello
        button(@click="setStorageWorld") Set World
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import axios from "axios";

@Component({
  name: "TestPage"
})
export default class TestPage extends Vue {
  axios_test = axios.create({})

  mounted(){
    this.axios_test.interceptors.request.use(
        (config)=>{
          console.log("Request onFulfilled",config)
          return new Promise((resolve, reject) => {
            setTimeout(()=>resolve(config),2000)
          })
        },
        (err)=>{console.log("Request onRejected",err)}
    )
    this.axios_test.interceptors.response.use(
        (res)=>{console.log("Response onFulfilled",res)},
        (err)=>{console.log("Response onRejected",err)}
    )
    window.addEventListener("storage",event=>{
      console.log(event)
    })
  }

  sendRequest(){
    this.axios_test.get("http://localhost:3000/api/v1/test/http-status")
  }

  setStorageHello(){
    localStorage.setItem("test_data","Hello")
  }
  setStorageWorld(){
    localStorage.setItem("test_data","World")
  }
}
</script>

<style lang="scss" scoped>
.window{
  padding: 10px;
  border-radius: 5px;
  background: var(--block-background);

  &__header {
    color: var(--text-color)
  }
  &__body {
    margin-top: -2px;
    padding: 10px;
    border: 2px solid var(--block-border);
    border-radius: 5px;
    background: var(--block-body-background);
  }
}
</style>