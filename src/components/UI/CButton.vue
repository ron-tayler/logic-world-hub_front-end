<template lang="pug">
  button.btn(v-bind="$attrs" v-on="$listeners")
    slot
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({
  name: "CButton"
})
export default class CButton extends Vue {

}
</script>

<style lang="scss" scoped>
.btn {
  padding: 5px 10px;
  border: 2px solid var(--block-border);
  background: var(--button-background);
  border-radius: 5px;
  color: var(--button-icon-color);
  cursor: pointer;
  font-size: 16px;
  user-select: none;
  &:hover{
    background: var(--button-hover-background);
  }
}
</style>