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
        .menu
          router-link(to="/sign-in" v-if="!is_auth") Войти
          .header__user(v-else v-click-outside="onUserMenuOutsideClick")
            font-awesome-icon.header__user-icon(icon="fas fa-user" @click="onUserMenuClick")
            span.header__user-id(@click="onUserMenuClick") {{user_nick}}
            .header__user-menu(v-if="is_show_user_menu" @click.prevent)
              span.header__user-menu__el(@click="userMenuLinkProfile") Профиль
              span.header__user-menu__el(@click="userMenuLinkSettings") Настройки
              span.header__user-menu__el(@click="userMenuLinkLogout") Выйти
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {UserCtx} from "@/store";
// @ts-ignore
import ClickOutside from 'vue-click-outside'

@Component({
  name: "TheHeader",
  directives:{
    ClickOutside
  }
})
export default class TheHeader extends Vue {
  is_show_user_menu = false

  get is_auth(){
    return UserCtx.getters.IS_AUTH()
  }
  get user_id(){
    return UserCtx.state.user_id
  }
  get user_nick(){
    return UserCtx.state.user_nick.length > 0
        ? UserCtx.state.user_nick
        : `id ${UserCtx.state.user_id}`
  }

  onUserMenuClick(){
    this.is_show_user_menu = !this.is_show_user_menu
  }
  onUserMenuOutsideClick(){
    if(this.is_show_user_menu) this.closeUserMenu()
  }
  openUserMenu(){
    this.is_show_user_menu = true
  }
  closeUserMenu(){
    this.is_show_user_menu = false
  }

  userMenuLinkProfile(){
    this.closeUserMenu()
    this.$router.push({
      name: "Profile"
    })
  }
  userMenuLinkSettings(){
    this.closeUserMenu()
    this.$router.push({
      name: "Settings"
    })
  }
  userMenuLinkLogout(){
    this.closeUserMenu()
    UserCtx.dispatch("LOGOUT").finally(()=>this.$router.push({
      name: "Home"
    })).catch(()=>{})
  }

  onClickLogo(){
    this.$router.push({
      name: "Home"
    })
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
.header{
  &__user{
    position: relative;
  }
  &__user-icon{
    margin-right: 10px;
    cursor: pointer;
    &:hover{
      color: #eeeeee;
    }
  }
  &__user-id{
    cursor: pointer;
    &:hover{
      color: #eeeeee;
    }
  }
  &__user-menu{
    z-index: 10;
    position: absolute;
    top: calc(100% + 30px);
    display: flex;
    flex-direction: column;
    background: var(--block-background);
    padding: 10px;
    border-radius: 5px;
    gap: 5px;

    &__el{
      padding: 5px 10px;
      border: 0;
      background: var(--button-background);
      border-radius: 5px;
      color: var(--button-icon-color);
      cursor: pointer;
      font-size: 16px;
      user-select: none;
      &:hover{
        background: var(--button-hover-background);
      }
    }
  }
}

</style>