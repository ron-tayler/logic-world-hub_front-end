<template lang="pug">
  .page_login
    c-window(:tabs="tabs")
      template(v-slot:login)
        .login_window__error(v-if="error.length>0") {{error}}
        c-row(:cols="3")
          c-col.login_window__label-box
            span.login_window__label E-mail
          c-col(:cols="2")
            input(placeholder="user@example.com" type="email" v-model="email").login_window__input
        c-row(:cols="3")
          c-col.login_window__label-box
            span.login_window__label Пароль
          c-col(:cols="2")
            input(:placeholder="reg_isShowPass?'password':'******'" :type="reg_isShowPass ? 'text' : 'password'" v-model="password").login_window__input
        c-row(:cols="3")
          c-col(:cols="2")
            div
              c-button(@click="reg_isShowPass = !reg_isShowPass" style="float: right")
                font-awesome-icon(icon="fa-solid fa-eye-slash" v-if="reg_isShowPass")
                font-awesome-icon(icon="fa-solid fa-eye" v-if="!reg_isShowPass")
          c-col
            c-button(@click="onClickSignIn" :disabled="is_send" :class="{is_load: is_send}")
              font-awesome-icon(icon="fa-solid fa-spinner" spin-pulse v-if="is_send")
              span(v-else) Войти
      template(v-slot:reg)
        .login_window__error(v-if="error.length>0") {{error}}
        c-row(:cols="3")
          c-col.login_window__label-box
            span.login_window__label Nick
          c-col(:cols="2")
            input(placeholder="John Doe" name="name" type="text" v-model="reg_nick").login_window__input
        c-row(:cols="3")
          c-col.login_window__label-box
            span.login_window__label E-mail
          c-col(:cols="2")
            input(placeholder="user@example.com" name="email" type="email" v-model="reg_email").login_window__input
        c-row(:cols="3")
          c-col.login_window__label-box
            span.login_window__label Пароль
          c-col(:cols="2")
            input(:placeholder="reg_isShowPass?'password':'******'" name="new-password" :type="reg_isShowPass ? 'text' : 'password'" v-model="reg_pass1").login_window__input
        c-row(:cols="3" v-if="!reg_isShowPass")
          c-col.login_window__label-box
            span.login_window__label Повтор пароля
          c-col(:cols="2")
            input(placeholder="******" name="new-password" type="password" v-model="reg_pass2").login_window__input
        c-row(:cols="3")
          c-col(:cols="2")
            div
              c-button(@click="reg_isShowPass = !reg_isShowPass" style="float: right")
                font-awesome-icon(icon="fa-solid fa-eye-slash" v-if="reg_isShowPass")
                font-awesome-icon(icon="fa-solid fa-eye" v-if="!reg_isShowPass")
          c-col
            c-button(@click="onClickSignUp" :disabled="reg_is_send" :class="{is_load: reg_is_send}")
              font-awesome-icon(icon="fa-solid fa-spinner" spin-pulse v-if="is_send")
              span(v-else) Создать
      template(v-slot:social)
        span Тут будет вход через соц. сети
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import CRow from "@/components/UI/CRow.vue";
import CCol from "@/components/UI/CCol.vue";
import {UserCtx} from "@/store";
import {AxiosError} from "axios";
import CWindow from "@/components/UI/CWindow.vue";
import CButton from "@/components/UI/CButton.vue";

@Component({
  name: "LoginPage",
  components: {CButton, CWindow, CCol, CRow}
})
export default class LoginPage extends Vue {
  email: string = ""
  password: string = ""
  is_send = false
  error: string = ""
  error_interval: number = 0

  reg_email: string = ""
  reg_nick: string = ""
  reg_pass1: string = ""
  reg_pass2: string = ""
  reg_isShowPass = false
  reg_is_send = false

  tabs = [{
    name: "login",
    header: "Войти"
  },{
    name: "reg",
    header: "Создать аккаунт"
  },{
    name: "social",
    header: "Соц. сети"
  }]

  async onClickSignIn(){
    this.is_send = true
    const fid = await this.$fpjs?.getVisitorData()
    UserCtx.dispatch("AUTH_BY_EMAIL_AND_PASS",{
      email: this.email,
      password: this.password,
      fid: fid?.visitorId ?? ""
    })
        .then(()=> {
          UserCtx.dispatch("GET_USER_INFO")
          this.$router.back()
        },err => this.handleError(err))
        .finally(() => {
          this.is_send = false
        })
  }

  async onClickSignUp(){
    if(this.reg_nick.length == 0){
      this.handleError("Nick не может быть пустым");
      return void 0;
    }
    if(this.reg_email.length == 0){
      this.handleError("Email не может быть пустым");
      return void 0;
    }
    if(this.reg_pass1.length == 0){
      this.handleError("Пароли не может быть пустым");
      return void 0;
    }
    if(!this.reg_isShowPass && this.reg_pass1 != this.reg_pass2){
      this.handleError("Пароли не совпадают");
      return void 0;
    }
    this.reg_is_send = true
    const fid = await this.$fpjs?.getVisitorData()
    UserCtx.dispatch("SIGN_UP",{
      nick: this.reg_nick,
      email: this.reg_email,
      password: this.reg_pass1,
      fid: fid?.visitorId ?? ""
    })
        .then(()=> {
          UserCtx.dispatch("GET_USER_INFO")
          this.$router.back()
        },err => this.handleError(err))
        .finally(() => {
          this.reg_is_send = false
        })
  }

  handleError(err: any){
    if(err instanceof AxiosError){
      this.showError(err.message)
    }else if(err instanceof Error){
      this.showError(err.message)
    }else if(typeof err == "string"){
      this.showError(err.toString())
    }else{
      console.log(err)
      this.showError("Ошибка отправки")
    }
  }

  showError(error: string){
    this.hideError()
    this.error = error
    this.error_interval = setInterval(()=>this.hideError(),3000)
  }
  hideError(){
    this.error = ""
    if(this.error_interval > 0){
      clearTimeout(this.error_interval)
      this.error_interval = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .page_login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login_window {
    padding: 10px;
    border-radius: 5px;
    background: var(--block-background);

    &__error {
      color: white;
      background: #ff0017;
      border: 2px solid var(--block-border);
      border-radius: 5px;
      padding: 5px;
    }
    &__header {
      color: var(--text-color)
    }
    &__body {
      margin-top: -2px;
      padding: 10px;
      border: 2px solid var(--block-border);
      border-radius: 5px;
      background: var(--block-body-background);
    }
    &__label-box {
      display: flex;
      justify-content: center;
    }
    &__label {
      display: inline-block;
      color: var(--text-color);
    }
    &__input {
      margin-top: 5px;
      margin-bottom: 5px;
      border: 2px solid var(--block-border);
      border-radius: 5px;
      padding: 4px 8px;
      color: var(--text-invert-color);
    }
    &__button{
      padding: 5px 10px;
      border: 0;
      background: var(--button-background);
      border-radius: 5px;
      color: var(--button-icon-color);
      cursor: pointer;
      font-size: 16px;
      &:hover{
        background: var(--button-hover-background);
      }
      &.is_load{
        background: var(--button-hover-background);
        cursor: unset;
      }
    }
  }
</style>