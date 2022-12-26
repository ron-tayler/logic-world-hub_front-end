<template lang="pug">
  div.page_notfound_box
    div.notfound_block
      h1 Страница не найдена l0l
      h2 404
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({
  name: "NotFoundPage"
})
export default class NotFoundPage extends Vue {

}
</script>

<style lang="scss" scoped>
.page_notfound_box{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.notfound_block{
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>