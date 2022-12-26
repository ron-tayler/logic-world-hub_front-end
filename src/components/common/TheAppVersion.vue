<template lang="pug">
  #app_version
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
  right: -110px
  top: -110px
  z-index: 10
  height: 300px
  width: 300px
  display: flex
  justify-content: center
  align-items: center
  pointer-events: none
.app_version__tape
  display: flex
  align-items: center
  background:
    image: url("/src/assets/warning.png")
    size: 300px 60px
    color: #8d8600
  height: 30px
  width: 300px
  color: white
  transform: rotate(45deg)
  opacity: 1
  transition: opacity 0.2s ease-in-out
  &:hover
    opacity: 0.2
.app_version__body
  background: #232323f0
  height: 20px
  width: 300px
  display: flex
  justify-content: center
  align-items: center
</style>