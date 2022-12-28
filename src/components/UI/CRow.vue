<template lang="pug">
  div.c-row(:style="style")
    slot
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component({
  name: "CRow"
})
export default class CRow extends Vue {
  @Prop()
  cols: number = 12

  get style(){
    return `grid-template-columns: repeat(${this.cols},1fr);`
  }
}
</script>

<style lang="scss" scoped>
.c-row{
  display: grid;
  grid-template-columns: repeat(12,1fr);
  gap: 10px
}
</style>