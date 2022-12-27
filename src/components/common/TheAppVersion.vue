<template lang="pug">
  #app_version
    .app_version__box
      .app_version__tape
        .app_version__body
          span {{version}}
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
// @ts-ignore
const app_version = import.meta.env.VITE_APP_VERSION;

@Component({
  name: "TheAppVersion"
})
export default class TheAppVersion extends Vue {
  get version(){
    return app_version
  }
}
</script>

<style lang="sass" scoped>
#app_version
  position: absolute
  top: 0
  right: 0
  z-index: 10
  height: 100px
  width: 100px
  pointer-events: none
  overflow: hidden
.app_version__box
  position: absolute
  top: 0
  right: 0
  width: 30px
  height: 30px
  display: flex
  justify-content: center
  align-items: center
  transform: rotate(45deg) translateY(30px)
.app_version__tape
  display: flex
  align-items: center
  background:
    image: url("/src/assets/warning.png")
    size: 300px 60px
    color: #8d8600
  height: 30px
  width: 300px
.app_version__body
  background: #232323f0
  color: white
  height: 20px
  width: 300px
  display: flex
  justify-content: center
  align-items: center
</style>