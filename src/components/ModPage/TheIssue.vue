<template lang="pug">
  div
    .issue__header
      .issue_info
        .issue__type
          font-awesome-icon(:icon="typeIcon")
        h3.issue__name {{issue.name}}
      .issue__controls
        button.issue__control(v-tooltip="'Редактировать'")
          font-awesome-icon(icon="fa-solid fa-pen")
        button.issue__control(v-tooltip="'Пожаловаться'")
          font-awesome-icon(icon="fa-solid fa-ban")
        button.issue__control(v-tooltip="'Подписаться'")
          font-awesome-icon(icon="fa-solid fa-bell")
    hr
    .issue__posts
      the-post(v-for="post in posts" :key="post.id" :post="post")
    hr
    .issue__new_post
      .issue__new_post__text_area_box
        textarea(v-model="text" placeholder="Сообщение")
      .issue__new_post__button_box
        a.issue__new_post__md_help(href="https://www.markdownguide.org/basic-syntax/" target="_blank")
          font-awesome-icon(icon="fa-brands fa-markdown")
          span  Поддерживает MarkDown
        button.issue__new_post__button(@click="sendPost") Отправить
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {ModsCtx} from "@/store";
import {EnumIssueType} from "@/store/schemes/EnumIssueType";
import ThePost from "@/components/ModPage/TheIssue/ThePost.vue";

@Component({
  name: "TheIssue",
  components: {ThePost}
})
export default class TheIssue extends Vue {
  text = ""

  get typeIcon(){
    if(!this.issue) return "fa-solid fa-notdef"
    switch (this.issue.type) {
      case EnumIssueType.GENERAL: return "fa-solid fa-comments"
      case EnumIssueType.BUGS: return "fa-solid fa-bug"
      case EnumIssueType.ANNOUNCEMENTS: return "fa-solid fa-bullhorn"
      case EnumIssueType.IDEAS: return "fa-solid fa-lightbulb"
      default: return "fa-solid fa-notdef"
    }
  }
  get issue(){
    return ModsCtx.state.issue
  }
  get posts(){
    return ModsCtx.state.issuePosts
  }
  get issueDate(){
    return this.issue?.createDate.toLocaleString() ?? ""
  }

  sendPost(){
    ModsCtx.dispatch("sendPost",this.text)
    .then(()=>{this.text = ""})
  }

  mounted(){
    const issue_id = this.$route.params?.issue_id ?? "0"
    ModsCtx.dispatch("getIssue",Number(issue_id))
      .catch(()=>{
        this.$router.replace("/NotFound")
      })
  }
}
</script>

<style lang="sass" scoped>
.issue__header
  display: flex
  justify-content: space-between
  align-items: center
.issue_info
  display: flex
  align-items: center
  gap: 10px
  color: var(--text-color)
.issue__type
  background: var(--block-background)
  padding: 5px
  border-radius: 5px
.issue__controls
  display: flex
  gap: 5px
.issue__control
  background: var(--button-background)
  color: var(--text-color)
  border: 0
  border-radius: 5px
  width: 30px
  height: 30px
  cursor: pointer
  &:hover
    background: var(--button-hover-background)
.issue__posts
  display: flex
  flex-direction: column
  gap: 10px
.issue__new_post
  display: flex
  flex-direction: column
  gap: 5px
.issue__new_post__text_area_box
  display: flex
.issue__new_post__text_area_box>textarea
  width: 100%
  min-height: 100px
  height: 100px
  resize: vertical
  background: var(--block-input-background)
  border-radius: 5px
  border: 2px solid var(--block-border)
  padding: 5px
  font-size: 14px
  &:focus
    outline: unset
.issue__new_post__button_box
  display: flex
  justify-content: space-between
  align-items: center
.issue__new_post__md_help
  color: var(--text-link-second-color)
  cursor: pointer
  text-decoration: none
  &:hover
    color: var(--text-link-second-hover-color)
    text-decoration: underline
.issue__new_post__button
  background: var(--button-background)
  color: var(--text-color)
  font-weight: bold
  border: 2px solid var(--block-border)
  border-radius: 5px
  padding: 5px 10px
  cursor: pointer
  &:hover
    background: var(--button-hover-background)
</style>