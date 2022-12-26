<template lang="pug">
  div
    table.versions_table
      thead
        tr
          th Версия
          th Версия игры
          th Дата релиза
          th Кол-во скачиваний
          th Скачать
      tbody
        tr(v-for="version in versions" :key="version.id")
          td {{version.version}}
          td {{version.game_version}}
          td {{releaseDate(version.releaseDate)}}
          td {{version.downloads}}
          td
            button.download_button Скачать
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {IMod} from "@/store/objects/mods/IMod";
import {ModsCtx} from "@/store";

@Component({
  name: "TheVersions"
})
export default class TheVersions extends Vue {

  get versions(){
    return ModsCtx.state.versions.slice().reverse()
  }

  releaseDate(date: Date){
    return date.toLocaleDateString()
  }
}
</script>

<style lang="sass" scoped>
.versions_table
  color: var(--text-color)
  border-collapse: separate
  border-spacing: 0 5px
  width: 100%
  th
    border-bottom: 2px solid white
    padding-bottom: 5px
  td
    background: var(--list-items-background)
    padding: 5px
    text-align: center
    border:
      top: 2px solid var(--block-border)
      bottom: 2px solid var(--block-border)
    &:first-child
      border-top-left-radius: 5px
      border-bottom-left-radius: 5px
      border-left: 2px solid var(--block-border)
    &:last-child
      border-top-right-radius: 5px
      border-bottom-right-radius: 5px
      border-right: 2px solid var(--block-border)
  tr:hover
    td
      background: var(--list-items-hover-background)
.download_button
  background: var(--button-background)
  color: var(--button-icon-color)
  padding: 5px 10px
  border-radius: 5px
  border: 0
  font-size: 16px
  cursor: pointer
  &:hover
    background: var(--button-hover-background)
</style>