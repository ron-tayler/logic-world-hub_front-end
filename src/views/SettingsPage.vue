<template lang="pug">
  .page_settings
    c-window(header="Настройки" :tabs="tabs")
      template(v-slot:sessions)
        c-row(:cols="2")
          c-col
            h2.sessions_header Это устройство
            hr
            div.session(v-if="current_session")
              div.session__icon
              div.session__info
                div.session__device {{current_session.name.length>0 ? current_session.name : current_session.device}}
                div.session__app-name {{current_session.os}} {{current_session.userAgent}}
                div.session__location {{current_session.ip}} {{getLocalDate(current_session.create_date)}}
            div.sessions_leave_all
              c-button(@click="logoutAllOtherSessions") Завершить все другие сеансы
          c-col
            h2.sessions_header Активные сеансы
            hr
            div.sessions--empty(v-if="other_sessions.length===0") Нет других активных сессий
            div.session(v-for="session in other_sessions" :key="session.uuid")
              div.session__icon
              div.session__info
                div.session__device {{session.name.length>0 ? session.name : session.device}}
                div.session__app-name {{session.os}} {{session.userAgent}}
                div.session__location {{session.ip}} {{getLocalDate(session.create_date)}}
              div.session__ctrl
                button(@click="logoutSession(session.uuid)") X
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {UserCtx} from "@/store";
import api from "@/api";
import CWindow from "@/components/UI/CWindow.vue";
import CRow from "@/components/UI/CRow.vue";
import CCol from "@/components/UI/CCol.vue";
import CButton from "@/components/UI/CButton.vue";

@Component({
  name: "SettingsPage",
  components:{
    CButton,
    CCol,
    CRow,
    CWindow
  }
})
export default class SettingsPage extends Vue {
  get tabs(){
    return [{name:"sessions",header:"Сеансы"},{name:"auths",header:"Авторизация"}]
  }

  get other_sessions(){
    return UserCtx.state.sessions.filter(session=>session.uuid!=api.session_uuid)
  }

  get current_session(){
    return UserCtx.state.sessions.find(session=>session.uuid==api.session_uuid)
  }

  getLocalDate(date: string){
    return new Date(date).toLocaleString()
  }

  mounted(){
    UserCtx.dispatch("LOAD_SESSIONS")
  }

  logoutSession(uuid: string){
    UserCtx.dispatch("SESSION_LOGOUT",uuid)
  }

  logoutAllOtherSessions(){
    alert("Work")
  }
}
</script>

<style lang="scss" scoped>
.sessions_header{
  color: var(--text-color);
}
.sessions--empty {
  text-align: center;
  color: var(--text-color);
}
.session {
  border: 2px solid var(--block-border);
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  padding: 5px;
  gap: 10px;

  &__icon {
    border: 2px solid var(--block-border);
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    color: var(--text-color);
  }
}
.sessions_leave_all{
  margin-top: 10px;
}
</style>