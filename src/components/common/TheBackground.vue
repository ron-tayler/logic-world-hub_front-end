<template lang="pug">
  div#background
    .v-panorama(ref="panorama")
    .background__blur
</template>

<script lang="ts">
// @ts-ignore
import {Viewer, ImagePanorama} from "@/lib/panolens.js";
import {Vue, Component, Watch} from 'vue-property-decorator'

const images = [
  '/src/assets/background/background (1).jpg',
  '/src/assets/background/background (2).jpg',
  '/src/assets/background/background (3).jpg',
  '/src/assets/background/background (4).jpg',
  '/src/assets/background/background (5).jpg',
  '/src/assets/background/background (6).jpg',
  '/src/assets/background/background (7).jpg',
  '/src/assets/background/background (8).jpg',
  '/src/assets/background/background (9).jpg',
]

@Component({
  name: "TheBackground",
})
export default class TheBackground extends Vue {
  timer: number = 0
  image_number: number = 0
  viewer: Viewer = null
  panoramas: Map<number,ImagePanorama> = new Map()
  interval = 30*1000
  rotateSpeed = 0.3

  @Watch('image_number')
  setPanorama(){
    this.viewer.setPanorama(this.panoramas.get(this.image_number))
  }

  mounted(){
    this.viewer = new Viewer({
      container: this.$refs.panorama,
      cameraFov: 90,
      controlBar: false,
      autoRotate: true,
      autoRotateSpeed: this.rotateSpeed,
      autoRotateActivationDuration: 1
    });
    this.viewer.disableControl()

    images.forEach((image,index)=>{
      const panorama = new ImagePanorama(image)
      this.panoramas.set(index,panorama)
      this.viewer.add(panorama)
    })

    this.setPanorama()

    this.timer = setInterval(()=>{
      this.image_number++
      if(this.image_number >= images.length)
        this.image_number = 0
    },this.interval)
  }

  destroyed(){
    clearInterval(this.timer)
    this.panoramas.forEach(panorama=>{
      panorama.dispose()
      this.viewer.remove(panorama)
    })
    this.viewer.destroy()
  }
}
</script>

<style lang="scss" scoped>
#background{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  border: 0;
  z-index: -1;
}
.v-panorama{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.background__blur{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
}
</style>