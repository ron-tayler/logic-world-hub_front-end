<template lang="pug">
  div
    .mod__change_list.mark-down(ref="change_list")
</template>

<script lang="ts">
import {Vue, Component, Watch, Prop} from 'vue-property-decorator'
import MarkDown from "markdown-it";
import {IMod} from "@/store/objects/mods/IMod";
import {ModsCtx} from "@/store";

@Component({
  name: "TheChangeList"
})
export default class TheChangeList extends Vue {
  md!: MarkDown

  get change_log(){
    return ModsCtx.state.change_log
  }

  mounted(){
    ModsCtx.dispatch("getChangeLog")
    this.md = new MarkDown({})
    setTimeout(()=>{
      this.markDownRender()
    },100)
  }

  @Watch("change_log")
  markDownRender(){
    (this.$refs.change_list as Element).innerHTML = this.md.render(this.change_log)
  }
}
</script>

<style lang="scss" scoped>
.mod__change_list{
  color: var(--text-color)
}
</style>