<template lang="pug">
  .c-window
    .c-window__header(v-if="isShowHeader")
      slot(name="header")
        h1 {{header}}
    .c-window__tabs(v-if="isTabs")
      .c-window__tab(v-for="(tab,i) in tabs" @click="activeTab=i" :class="{active:i===activeTab}" :key="tab.name") {{tab.header}}
    .c-window__body
      slot(:name="current_slot")
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component({
  name: "CWindow"
})
export default class CWindow extends Vue {
  @Prop({default: ""})
  header!: string

  @Prop({default:()=>[]})
  tabs!: {name: string, header: string}[]

  activeTab = 0

  get isShowHeader(){
    return this.$slots['header'] || this.header.length > 0
  }

  get isTabs(){
    return this.tabs.length > 0
  }

  get current_slot(){
    return this.isTabs ? this.tabs[this.activeTab].name :"default"
  }
}
</script>

<style lang="scss" scoped>
.c-window{
  padding: 10px;
  border-radius: 5px;
  background: var(--block-background);

  &__header {
    color: var(--text-color);
    margin-bottom: 10px;
  }
  &__body {
    padding: 10px;
    border: 2px solid var(--block-border);
    border-radius: 5px;
    background: var(--block-body-background);
    width: 100%;
    height: 100%;
  }
  &__tabs{
    padding: {
      left: 10px;
      right: 10px;
    };
    display: flex;
    margin-bottom: -2px;
  }
  &__tab {
    color: var(--text-color);
    padding: 5px 10px;
    user-select: none;
    cursor: pointer;
    font-size: 18px;
    height: 30px;

    &.active {
      padding: 3px 8px;
      border: {
        top-right-radius: 5px;
        top-left-radius: 5px;
        top: 2px;
        left: 2px;
        right: 2px;
        bottom: 0;
        style: solid;
        color: var(--block-border);
      }
      background: var(--block-body-background);
    }
  }
}
</style>