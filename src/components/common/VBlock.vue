<template lang="pug">
  .block
    slot
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({
  name: "VBlock"
})
export default class VBlock extends Vue {

}
</script>

<style lang="scss" scoped>
.block {
  background: var(--block-background);
  border-radius: 10px;
  padding: 10px;
}
</style>