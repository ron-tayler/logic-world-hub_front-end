<template lang="pug">
  .issue__post
    .post__header
      .post__info
        .post__avatar
          img(:src="post.author.avatar")
        .post__nick {{post.author.nick}}
        .post__date {{post.createDate.toLocaleString()}}
      .post__buttons
        button.post__button(v-tooltip="'Пожаловаться'")
          font-awesome-icon(icon="fa-solid fa-ban")
        button.post__button(v-tooltip="'Ответить'")
          font-awesome-icon(icon="fa-solid fa-reply")
    .post__body
      .mark-down(ref="post_text")
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {IIssuePost} from "@/store/schemes/Mod";
import MarkDown from "markdown-it";

@Component({
  name: "ThePost"
})
export default class ThePost extends Vue {
  @Prop()
  post!: IIssuePost
  md!: MarkDown

  get text(){
    return this.post.text
  }

  created(){
    this.md = new MarkDown({})
  }
  mounted(){
    this.renderMarkdown()
  }

  @Watch("text")
  renderMarkdown(){
    (this.$refs.post_text as Element).innerHTML = this.md.render(this.text)
  }
}
</script>

<style lang="sass" scoped>
.issue__post
  background: var(--list-items-background)
  padding: 5px
  border: 2px solid var(--block-border)
  border-radius: 5px
  color: var(--text-color)
.post__header
  border-bottom: 2px solid gray
  display: flex
  justify-content: space-between
  padding-bottom: 5px
.post__info
  display: flex
  gap: 5px
  align-items: center
.post__avatar
  width: 30px
  height: 30px
  border-radius: 30px
  border: 2px solid var(--block-border)
  overflow: hidden
.post__nick
  color: var(--text-link-color)
  cursor: pointer
  &:hover
    color: var(--text-link-hover-color)
    text-decoration: underline
.post__buttons
  display: flex
  gap: 5px
.post__button
  background: var(--button-background)
  color: var(--text-color)
  border: 0
  border-radius: 5px
  width: 30px
  height: 30px
  cursor: pointer
  &:hover
    background: var(--button-hover-background)
.post__body
  padding-top: 5px
</style>