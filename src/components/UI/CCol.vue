<template lang="pug">
  div.c-col(:style="style")
    slot
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component({
  name: "CCol"
})
export default class CCol extends Vue {
  @Prop()
  cols: number = 1

  get style(){
    return `grid-column: span ${this.cols}`
  }
}
</script>

<style lang="scss" scoped>
.c-col{
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}
</style>