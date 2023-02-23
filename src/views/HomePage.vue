<template lang="pug">
  .page_home
    c-row(cols="3")
      c-col
        c-window.card-box
          .card
            h2 Что такое Logic World Hub?
            p LWH это централизованный информационный хаб для разработок от комьюнити Logic World
      c-col
        c-window.card-box
          .card
            h2 Тут вы найдёте:
            ul(style="padding-left: 20px")
              li Популярные и завоевавшие сердца модификации
              li Новые разработки и эксперименты
              li Большие и сложные постройки
              li А если мучает одиночество, то найдутся и сервера
      c-col
        c-window.card-box
          .card
            h2 Авторизуйся так как тебе удобно
            p Для вашего удобства вы можете создать или войти в свой аккаунт используя множество способов авторизации.
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import CRow from "@/components/UI/CRow.vue";
import CCol from "@/components/UI/CCol.vue";
import CWindow from "@/components/UI/CWindow.vue";

@Component({
  name: "HomePage",
  components: {CWindow, CCol, CRow}
})
export default class HomePage extends Vue {

}
</script>

<style lang="scss" scoped>
.card-box {
  height: 100%;
}
.card {
  color: var(--text-color);

  &>h2 {
    margin-bottom: 10px;
  }
}
</style>