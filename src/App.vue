<template lang="pug">
  #app(theme="logicWorld")
    the-background
    the-app-version
    #header-box
      the-header
    #page-box
      .container.scroll_hide.page_container(ref="page_scroll" @scroll="onPageScroll")
        router-view#page
    #page-scroll-top(v-if="isPageScroll")
      button(@click="scrollToTop")
        font-awesome-icon(icon="fa-solid fa-angles-up")
    //#footer-box
      the-footer
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
import TheBackground from "@/components/common/TheBackground.vue";
import "@/assets/style/scroll.scss"
import "@/assets/style/color-var.scss"
import "@/assets/style/markdown.scss"
import TheAppVersion from "@/components/common/TheAppVersion.vue";

@Component({
  name: "App",
  components:{
    TheAppVersion,
    TheBackground,
    TheHeader,
    TheFooter
  }
})
export default class App extends Vue {
  isPageScroll = false
  scrollTopInterval = 0

  onPageScroll(){
    const pageScrollEl = this.$refs.page_scroll as Element
    this. isPageScroll = pageScrollEl.scrollTop > 0
  }

  scrollToTop(){
    if(this.scrollTopInterval) {
      clearInterval(this.scrollTopInterval)
      this.scrollTopInterval = 0
    }
    const pageScrollEl = this.$refs.page_scroll as Element
    let speed = 5
    this.scrollTopInterval = setInterval(()=>{
      pageScrollEl.scrollTop -= speed
      if(pageScrollEl.scrollTop-speed*4 <=0){
        speed /= 2
        if(speed < 5) speed = 5
      }else{
        speed *= 2
      }
      if(pageScrollEl.scrollTop <= 0){
        clearInterval(this.scrollTopInterval)
        this.scrollTopInterval = 0
      }
    },20)
  }

  destroyed(){
    if(this.scrollTopInterval) {
      clearInterval(this.scrollTopInterval)
      this.scrollTopInterval = 0
    }
  }
}
</script>

<style lang="scss">
body{
  font-family: Arial, sans-serif;
}
*{
  margin: 0;
  padding: 0;
}
div{
  box-sizing: border-box;
}
hr{
  margin: {
    top: 5px;
    bottom: 5px;
  };
}
#app{}
#header-box{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
}
#page-box{
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
}
#footer-box{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
}
#page-scroll-top{
  position: absolute;
  right: 20px;
  bottom: 20px;
  button{
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: var(--button-background);
    color: var(--text-color);
    border: 2px solid var(--block-border);
    &:hover{
      background: var(--button-hover-background);
    }
  }
}
#page{
  margin-top: 10px;
  margin-bottom: 10px;
}
.page_container{
  overflow-x: hidden;
  overflow-y: scroll;
}
.container{
  padding-left: 15px;
  padding-right: 15px;
}
@media (max-width: 399px) {
  .container{
    max-width: 300px;
  }
}
@media (min-width: 400px) and (max-width: 599px) {
  .container{
    width: 400px;
  }
}
@media (min-width: 600px) and (max-width: 899px) {
  .container{
    width: 600px;
  }
}
@media (min-width: 900px) and (max-width: 1199px) {
  .container{
    width: 900px;
  }
}
@media (min-width: 1200px) {
  .container{
    width: 1200px;
  }
}
</style>