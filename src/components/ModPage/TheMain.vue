<template lang="pug">
  div
    .mod_tags
      span.mod__tag(v-for="tag in tags" :key="tag.id") {{tag.name}}
    hr
    .mod__images
      .mod_images_btn_left(v-if="isScrollImages" @click="scrollImagesLeft")
        font-awesome-icon(icon="fa-solid fa-chevron-left")
      .mod_images_btn_right(v-if="isScrollImages" @click="scrollImagesRight")
        font-awesome-icon(icon="fa-solid fa-chevron-right")
      .mod__images_scroll.scroll_hide(ref="images")
        img.mod__image(v-for="(image,i) in images" :key="i" :src="image")
    hr
    .mod__readme.mark-down(ref="readme")
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {IMod} from "@/store/objects/mods/IMod";
import MarkDown from "markdown-it";
import {ModsCtx} from "@/store";

@Component({
  name: "TheMain"
})
export default class TheMain extends Vue {

  md!: MarkDown
  imagesScrollInterval: number = 0
  isScrollImages = false

  get tags(){
    return ModsCtx.state.tags
  }
  get images(){
    return ModsCtx.state.images
  }
  get readme(){
    return ModsCtx.state.readme
  }

  mounted(){
    ModsCtx.dispatch("getTags")
    ModsCtx.dispatch("getImages")
    ModsCtx.dispatch("getReadme")
    this.md = new MarkDown({})
    setTimeout(()=>{
      this.markDownRender()
      this.checkScrollImages()
    },100)
  }

  destroyed(){
    if(this.imagesScrollInterval) clearInterval(this.imagesScrollInterval)
  }

  checkScrollImages(){
    let el = this.$refs.images as Element
    if(!el) {
      this.isScrollImages = false
      return
    }
    this.isScrollImages = el.scrollWidth > el.clientWidth
  }

  scrollImagesLeft(){
    let el = this.$refs.images as Element
    let scrollOnStart = el.scrollLeft
    let scrollOnEnd = scrollOnStart - 300
    if(scrollOnEnd<0) scrollOnEnd = 0
    if(this.imagesScrollInterval)
      clearInterval(this.imagesScrollInterval)

    this.imagesScrollInterval = setInterval(()=>{
      el.scrollLeft-=10
      if(el.scrollLeft<=scrollOnEnd){
        clearInterval(this.imagesScrollInterval)
        this.imagesScrollInterval = 0
      }
    },5)
  }

  scrollImagesRight(){
    let el = this.$refs.images as Element
    let scrollOnStart = el.scrollLeft
    let scrollOnEnd = scrollOnStart + 300
    if(scrollOnEnd>el.scrollWidth) scrollOnEnd = el.scrollWidth
    if(this.imagesScrollInterval)
      clearInterval(this.imagesScrollInterval)

    this.imagesScrollInterval = setInterval(()=>{
      el.scrollLeft+=10
      if(el.scrollLeft>=scrollOnEnd){
        clearInterval(this.imagesScrollInterval)
        this.imagesScrollInterval = 0
      }
    },5)
  }

  @Watch("readme")
  markDownRender(){
    (this.$refs.readme as Element).innerHTML = this.md.render(this.readme)
  }
}
</script>

<style lang="scss" scoped>
.mod_tags{
  display: flex;
  gap: 5px;
}
.mod__tag{
  background: var(--button-background);
  padding: 2px 4px;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
  color: var(--text-color);
  border: 2px solid var(--block-border);
  &:hover{
    background: var(--button-hover-background);
  }
}
.mod__images{
  position: relative;
  user-select: none;
}
.mod__images_scroll{
  display: flex;
  overflow-x: auto;
}
.mod__image{
  height: 150px;
  width: 150px;
  flex-shrink: 0;
  overflow: hidden;
  margin-right: 10px;
  border-radius: 10px;
  border: 2px solid var(--block-border);
  object-fit: cover;
  &:last-child{
    margin-right: 0;
  }
}
.mod_images_btn_left{
  position: absolute;
  color: white;
  font-size: 24px;
  top: 10px;
  bottom: 10px;
  left: 0;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  &:hover{
    background: #fff4;
  }
}
.mod_images_btn_right{
  position: absolute;
  color: white;
  font-size: 24px;
  top: 10px;
  bottom: 10px;
  right: 0;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
  &:hover{
    background: #fff4;
  }
}
.mod__readme{
  color: var(--text-color)
}
</style>