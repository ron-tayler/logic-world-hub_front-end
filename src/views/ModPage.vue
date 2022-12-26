<template lang="pug">
  .page_mod
    .mod__window
      .mod__window__header
        h1 {{mod.name}}
        span {{mod.description}}
      .mod__window__cols
        .mod__window_left
          .mod__window_tabs
            .mod__window_tab(v-for="tab in tabs" :key="tab" :class="{active:tab===selectTabIndex}" @click="selectTab(tab)") {{getTabName(tab)}}
          .mod__window_main_body
            router-view(:mod="mod")
        .mod__window_right
          .mod__window_second_body
            .mod__avatar_box
              img.mod__avatar(:src="mod.avatar")
            .mod__buttons
              button.mod__button(v-tooltip="'GitHub'")
                font-awesome-icon(icon="fa-brands fa-github")
              button.mod__button(v-tooltip="'Документация'")
                font-awesome-icon(icon="fa-solid fa-book")
              button.mod__button(v-tooltip="'Коллекция'")
                font-awesome-icon(icon="fa-solid fa-list")
              button.mod__button(v-tooltip="'Подписаться'")
                font-awesome-icon(icon="fa-solid fa-bell")
              button.mod__button(v-tooltip="'В избранное'")
                font-awesome-icon(icon="fa-solid fa-bookmark")
              button.mod__button(v-tooltip="'Добавить в набор'")
                font-awesome-icon(icon="fa-solid fa-indent")
              button.mod__button(v-tooltip="'Поделиться'")
                font-awesome-icon(icon="fa-solid fa-share")
            .mod__info
              span Создано: {{createDate}}
              span Просмотров: {{mod.views}}
              span Скачиваний: {{mod.downloads}}
              span Добавили в избранное: {{mod.favorites}}
              span Подписчики: {{mod.subscribers}}
            .mod__versions
              .mod__versions__header
                h2 Скачать
                button.mod__versions__other(@click="onClickOtherVersions") Другие
              .mod__versions__list
                .mod__version(v-for="version in versions" :key="version.id")
                  .mod__version__download
                    button.mod__version__button
                      font-awesome-icon(icon="fa-solid fa-download")
                  .mod__version__info
                    .mod__version__versions
                      span Версия {{version.version}} / {{version.game_version}}
                    .mod__version__date
                      span {{fixVersionDate(version.releaseDate)}}
            .mod__authors
              .mod__author(v-for="author in authors")
                .mod__author__avatar
                  img(:src="author.avatar")
                .mod__author__info
                  .mod__author__nick {{author.nick}}
                  .mod__author__role {{author.type}}
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {ModsCtx} from "@/store";
import VBlock from "@/components/common/VBlock.vue";
import {IMod} from "@/store/objects/mods/IMod";
import TheMain from "@/components/ModPage/TheMain.vue";
import TheChangeList from "@/components/ModPage/TheChangeList.vue";
import TheVersions from "@/components/ModPage/TheVersions.vue";
import TheIssues from "@/components/ModPage/TheIssues.vue";

export enum EnumTabs {
  MAIN = 0,
  CHANGE_LIST = 1,
  VERSIONS = 2,
  ISSUES = 3,
  METRICS = 4
}

@Component({
  name: "ModPage",
  components: {TheIssues, TheVersions, TheChangeList, TheMain, VBlock},
  beforeRouteUpdate(to, form, next){
    const id = Number(to.params.id)
    ModsCtx.dispatch("getMod",id).then(()=> {
      next()
      ModsCtx.dispatch("getVersions")
      ModsCtx.dispatch("getAuthors")
    },()=>next("NotFound"))
  },
  beforeRouteEnter(to, form, next){
    const id = Number(to.params.id)
    ModsCtx.dispatch("getMod",id).then(()=> {
      next()
      ModsCtx.dispatch("getVersions")
      ModsCtx.dispatch("getAuthors")
    },()=>next("NotFound"))
  }
})
export default class ModPage extends Vue {
  get selectTabIndex(): EnumTabs{
    return this.$route.meta?.tab ?? 0
  }

  get tabs(){
    return [
      EnumTabs.MAIN,
      EnumTabs.CHANGE_LIST,
      EnumTabs.VERSIONS,
      EnumTabs.ISSUES,
      EnumTabs.METRICS
    ]
  }

  get url_id(): number{
    return Number(this.$route.params.id)
  }
  get mod(){
    return ModsCtx.state.mod
  }
  get createDate(): string{
    return this.mod?.createDate.toLocaleDateString() ?? '---'
  }
  get versions(){
    return ModsCtx.state.versions.slice().reverse().slice(0,2) ?? []
  }
  get authors(){
    return ModsCtx.state.authors
  }

  getTabName(tab: EnumTabs){
    switch (tab) {
      case EnumTabs.MAIN: return "Главная"
      case EnumTabs.CHANGE_LIST: return "Список изменений"
      case EnumTabs.VERSIONS: return "Версии"
      case EnumTabs.ISSUES: return "Обсуждения"
      case EnumTabs.METRICS: return "Метрики"
    }
  }

  onClickOtherVersions(){
    this.selectTab(EnumTabs.VERSIONS)
  }

  selectTab(tab: EnumTabs){
    if(tab == EnumTabs.MAIN) this.$router.push({name: "Mod"})
    if(tab == EnumTabs.CHANGE_LIST) this.$router.push({name: "Mod__ChangeList"})
    if(tab == EnumTabs.VERSIONS) this.$router.push({name: "Mod__Versions"})
    if(tab == EnumTabs.ISSUES) this.$router.push({name: "Mod__Issues"})
    if(tab == EnumTabs.METRICS) this.$router.push({name: "Mod__Metrics"})
  }

  fixVersionDate(date: Date){
    return date.toLocaleDateString()
  }

  mounted(){}
  destroyed(){}

}
</script>

<style lang="scss" scoped>
.page_mod {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.mod__window{
  padding: 10px;
  border-radius: 5px;
  background: var(--block-background);
  width: 100%;
  &__header{
    color: var(--text-color)
  }
  &__cols{
    display: flex;
    gap: 10px;
  }
  &_left{
    min-width: 0;
    flex-grow: 1;
  }
  &_right{
    flex-shrink: 0;
    width: min-content;
  }
  &_tabs{
    padding: {
      top: 10px;
      left: 10px;
      right: 10px;
    };
    display: flex;
  }
  &_tab{
    color: var(--text-color);
    padding: 5px 10px;
    user-select: none;
    cursor: pointer;
    font-size: 18px;
    height: 30px;
    &.active{
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
  &_main_body{
    margin-top: -2px;
    padding: 10px;
    border: 2px solid var(--block-border);
    border-radius: 5px;
    background: var(--block-body-background);
  }
  &_second_body{
    margin-top: 38px;
    padding: 10px;
    border: 2px solid var(--block-border);
    border-radius: 5px;
    background: var(--block-body-background);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
.mod__hr{
  margin-top: 5px;
  margin-bottom: 5px;
  border-color: var(--hr-color);
}
.mod__avatar_box{
  height: 280px;
  width: 280px;
  border: 2px solid var(--block-border);
  border-radius: 5px;
  overflow: hidden;
}
.mod__avatar{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mod__buttons{
  display: flex;
  background: var(--block-background);
  padding: 5px;
  border-radius: 5px;
  width: max-content;
}
.mod__button{
  flex-shrink: 0;
  border-radius: 10px;
  width: 30px;
  height: 30px;
  border: 0;
  background: var(--button-background);
  color: var(--button-icon-color);
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
  &:last-child{
    margin-right: 0;
  }
  &:hover{
    background: var(--button-hover-background);
  }
}
.mod__info{
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: var(--block-background);
  padding: 5px;
  border-radius: 5px;
  color: var(--text-color)
}
.mod__versions{
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--block-background);
  padding: 5px;
  border-radius: 5px;
  color: var(--text-color)
}
.mod__versions__header{
  display: flex;
  justify-content: space-between;
}
.mod__versions__other{
  padding: 5px 10px;
  border: 0;
  background: var(--button-background);
  border-radius: 5px;
  color: var(--button-icon-color);
  cursor: pointer;
  font-size: 16px;
  &:hover{
    background: var(--button-hover-background);
  }
}
.mod__versions__list{
  display: flex;
  flex-direction: column;
}
.mod__version{
  display: flex;
  gap: 10px;
  padding: 5px 0;

  &__download{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__button{
    width: 30px;
    height: 30px;
    border: 0;
    background: var(--button-background);
    border-radius: 5px;
    color: var(--button-icon-color);
    cursor: pointer;
    &:hover{
      background: var(--button-hover-background);
    }
  }
  &__info{
    display: flex;
    flex-direction: column;
  }
  &__versions{

  }
  &__date{

  }
}

.mod__authors{
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--block-background);
  padding: 5px;
  border-radius: 5px;
  color: var(--text-color)
}
.mod__author{
  display: flex;
  gap: 10px;
  padding: 5px 5px;
  border-radius: 10px;
  cursor: pointer;
  &:hover{
    background: var(--block-body-background);
  }
  &__avatar{
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 40px;
      width: 40px;
      border-radius: 100px;
    }
  }
  &__info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__nick{
    font-size: 22px;
  }
  &__role{

  }
}

</style>