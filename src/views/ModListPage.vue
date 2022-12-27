<template lang="pug">
  .page_mods
    .mods_window
      .mods_window__header
        h1 Список модов
      .mods_window__tabs
        .mods_window__tab(
          v-for="(tab,i) in tabs"
          :key="i"
          :class="{active:i===selectTabIndex}"
          @click="selectTab(i)"
          ) {{tab}}
      .mods_window__body
        .mod_list--loading(v-if="is_loading")
          font-awesome-icon(icon="fa-solid fa-spinner" spin-pulse)
        .mod_list(v-else)
          .mod(v-for="mod in mods" :key="mod.id")
            .mob__image
              img(:src="mod.avatar")
            .mod__center
              router-link.mod__name(:to="'/mod/'+mod.id") {{mod.name}}
              .mod__description {{mod.description}}
            .mod__actions
              button.mod__action_btn
                font-awesome-icon(icon="fa-solid fa-star")
              button.mod__action_btn
                font-awesome-icon(icon="fa-solid fa-download")
              button.mod__action_btn
                font-awesome-icon(icon="fa-solid fa-indent")
              button.mod__action_btn
                font-awesome-icon(icon="fa-solid fa-share")
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {ModsCtx} from "@/store";

@Component({
  name: "ModListPage"
})
export default class ModListPage extends Vue {
  selectTabIndex = 0
  is_loading = false
  tabs = [
    "Самые скачиваемые",
    "Новые",
    "Недавно обновлённые",
    "Тренды",
  ]

  get mods(){
    return ModsCtx.state.mods
  }

  selectTab(tab: number){
    if(this.is_loading) return
    this.selectTabIndex = tab
    this.is_loading = true;
    (()=>{
      switch(tab){
        case 0: return ModsCtx.dispatch("getModsMostDownloads")
        case 1: return ModsCtx.dispatch("getModsNews")
        case 2: return ModsCtx.dispatch("getModsRecentlyUpdated")
        case 3: return ModsCtx.dispatch("getModsMostDownloads")
        default: return ModsCtx.dispatch("getModsMostDownloads")
      }
    })().finally(()=>{
      this.is_loading = false
    })
  }

  created(){
    ModsCtx.dispatch("getModsMostDownloads")
  }
}
</script>

<style lang="scss" scoped>
.page_mods{}
.mods_window{
  padding: 10px;
  border-radius: 5px;
  background: var(--block-background);

  &__header{
    color: var(--text-color)
  }
  &__tabs{
    padding: {
      top: 10px;
      left: 10px;
      right: 10px;
    };
    display: flex;
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
  &__body{
    margin-top: -2px;
    padding: 10px;
    border: 2px solid var(--block-border);
    border-radius: 5px;
    background: var(--block-body-background);
  }
}
.mod_list--loading{
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  font-size: 24px;
  height: 50px;
}
.mod_list{
  display: flex;
  flex-direction: column;
  gap: 10px
}
.mod{
  display: grid;
  grid-template-columns: 100px 1fr min-content;
  background: var(--list-items-background);
  border: 2px solid var(--block-border);
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
}
.mob__image{
  height: 100px;
  width: 100px;
  border: 2px solid var(--block-border);
  border-radius: 5px;
  overflow: hidden;

  img{
    height: 96px;
    width: 96px;
    object-fit: cover;
  }
}
.mod__name{
  font-size: 22px;
  text-decoration: none;
  color: var(--text-link-color);
  font-weight: bold;
  &:hover{
    color: var(--text-link-hover-color);
    text-decoration: underline;
  }
}
.mod__description{
  color: var(--text-color)
}
.mod__actions{
  display: flex;
  gap: 5px;
}
.mod__action_btn{
  border-radius: 5px;
  border: 0;
  background: var(--button-background);
  width: 30px;
  height: 30px;
  color: var(--button-icon-color);
  cursor: pointer;
  &:hover{
    background: var(--button-hover-background);
  }
}
</style>