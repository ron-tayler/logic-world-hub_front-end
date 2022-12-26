<template lang="pug">
  #header
    .container.header-container
      .left-side
        .logo(@click="onClickLogo")
          img(src="@/assets/logo_white.svg" height="40px")
          span HUB
        .menu
          router-link(to="/mods") Моды
          router-link(to="/worlds") Миры
          router-link(to="/servers") Сервера
      .right-side
        span Профиль
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({
  name: "TheHeader"
})
export default class TheHeader extends Vue {
  onClickLogo(){
    this.$router.push("/")
  }
}
</script>

<style lang="scss" scoped>
#header{
  width: 100%;
  height: 60px;
  background: #303030;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-family: Arial, sans-serif;
}
.header-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-side{
  display: flex;
  justify-content: start;
  align-items: center;
}
.logo{
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 32px;
  color: white;
  user-select: none;
  cursor: pointer;
}
.menu{
  margin-left: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  a{
    text-decoration: none;
    color: #999999;
    &:hover{
      color: #ffffff;
    }
  }
}
</style>