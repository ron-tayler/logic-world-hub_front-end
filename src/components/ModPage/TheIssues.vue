<template lang="pug">
  div
    .issues__control
      .issues__control_left
        button.btn_create_issue(@click="onClickCreateIssue") Создать обсуждение
      .issues__filters
        button.issues__filter(:class="{active:filterSelect===-1}" @click="selectFilter(-1)") Все
        button.issues__filter(
          v-for="filter in filters"
          :key="filter"
          :class="{active:filterSelect===filter}"
          @click="selectFilter(filter)"
          ) {{getStringTypeByType(filter)}}
    hr
    .issues__list--empty(v-if="issues.length===0")
      span Список пуст
    table.issues__list(v-else)
      tr.issue(v-for="issue in issues" :key="issue.id")
        td.issue__info
          .issue__header(@click="onClickIssueHeader(issue.id)") {{issue.name}}
          .issue__create_info
            span Созданно
            span.issue__creator__nick(
              @click="onClickUserNick(issue.author.id)"
              ) {{issue.author.nick}}
            span.issue__last_post__date {{getStringDateTimeByDate(issue.createDate)}}
        td.issue__type {{getStringTypeByType(issue.type)}}
        td.issue__posts_info
          .issue__message_count
            font-awesome-icon(icon="fa-solid fa-comments")
            span {{" "+issue.posts}}
          .issue__last_post
            span Последний
            span.issue__last_post__author(
              @click="onClickUserNick(issue.last_post_author.id)"
              ) {{issue.last_post_author.nick}}
            span {{getStringDateTimeByDate(issue.last_post_createDate)}}
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IMod} from "@/store/objects/mods/IMod";
import {EnumIModIssueType} from "@/store/objects/mods/EnumIModIssueType";
import {IModIssue} from "@/store/objects/mods/IModIssue";
import {ModsCtx} from "@/store";
import {EnumIssueType} from "@/store/schemes/EnumIssueType";

@Component({
  name: "TheIssues"
})
export default class TheIssues extends Vue {
  filterSelect = -1

  get filters(){
    return [
      EnumIssueType.GENERAL,
      EnumIssueType.BUGS,
      EnumIssueType.ANNOUNCEMENTS,
      EnumIssueType.IDEAS,
    ]
  }

  get issues(){
    return ModsCtx.state.issues.filter(issue=>this.filterSelect==-1||issue.type==this.filterSelect)
  }

  mounted(){
    ModsCtx.dispatch("getIssues")
  }

  selectFilter(filter: number){
    this.filterSelect = filter
  }

  getStringDateTimeByDate(date: Date){
    return date.toLocaleString()
  }

  getStringTypeByType(type: EnumIssueType){
    switch(type){
      case EnumIssueType.GENERAL: return "General"
      case EnumIssueType.BUGS: return "Баги"
      case EnumIssueType.ANNOUNCEMENTS: return "Анонсы"
      case EnumIssueType.IDEAS: return "Идеи и предложения"
      default: return "---"
    }
  }

  getLatsPost(issue: IModIssue){
    return issue.posts.slice().reverse()[0]
  }

  onClickIssueHeader(issue_id: number){
    this.$router.push({
      name: "Mod__Issue",
      params:{issue_id: issue_id.toString()}
    })
  }
  onClickUserNick(user_id: number){
    this.$router.push({
      name: "User",
      params:{
        user_id: user_id.toString()
      }
    })
  }

  onClickCreateIssue(){
    this.$router.push({
      name: "Mod__Issue__Create"
    })
  }
}
</script>

<style lang="sass" scoped>
.mod__hr
  margin-top: 5px
  margin-bottom: 5px
  border-color: var(--hr-color)
.issues__control
  color: var(--text-color)
.issues__list--empty
  display: flex
  justify-content: center
  align-items: center
  color: var(--text-color)
  height: 40px
.issues__list
  width: 100%
  color: var(--text-color)
  border-collapse: separate
  border-spacing: 0 5px
  td
    background: var(--list-items-background)
    padding: 5px
    text-align: center
    border:
      top: 2px solid var(--block-border)
      bottom: 2px solid var(--block-border)
      left: 1px solid gray
    &.issue__info
      text-align: left
    &.issue__posts_info
      text-align: right
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
.issue__create_info>span
  margin-right: 5px
.issue__header
  color: var(--text-link-color)
  font-weight: bold
  cursor: pointer
  &:hover
    color: var(--text-link-hover-color)
    text-decoration: underline
.issue__creator__nick
  color: var(--text-link-color)
  cursor: pointer
  &:hover
    color: var(--text-link-hover-color)
    text-decoration: underline
.issue__last_post>span
  margin-right: 5px
.issue__last_post__author
  color: var(--text-link-color)
  cursor: pointer
  &:hover
    color: var(--text-link-hover-color)
    text-decoration: underline
.issues__control
  display: flex
  justify-content: space-between
.btn_create_issue
  color: var(--text-color)
  background: var(--button-background)
  padding: 5px 10px
  border: 2px solid var(--block-border)
  border-radius: 5px
  cursor: pointer
  &:hover
    background: var(--button-hover-background)
.issues__filters
  display: flex
  align-items: center
  gap: 5px
.issues__filter
  color: var(--text-color)
  background: transparent
  padding: 2px 4px
  border-radius: 5px
  border: 2px solid var(--block-border)
  cursor: pointer
  &:hover
    background: var(--button-hover-background)
  &.active
    background: var(--button-background)
</style>