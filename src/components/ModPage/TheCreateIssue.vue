<template lang="pug">
  div
    c-row(cols="4")
      c-col(cols="1")
        select.issue_create__select_type(v-model="type")
          option(value="0") Общее
          option(value="1") Баги
          option(value="2") Анонс
          option(value="3") Идеи и предложения
      c-col(cols="3")
        input.issue_create__issue_name(
          placeholder="Название"
          v-model="name")
      c-col(cols="4")
        textarea.issue_create__issue_text(
          placeholder="Сообщение"
          v-model="text")
      c-col(cols="4")
        .issue_create__issue_send_box
          a.issue_create__issue_md_help(href="https://www.markdownguide.org/basic-syntax/" target="_blank")
            font-awesome-icon(icon="fa-brands fa-markdown")
            span  Поддерживает MarkDown
          button.issue_create__issue_send(@click="onClickCreateIssue") Отправить
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import CRow from "@/components/UI/CRow.vue";
import CCol from "@/components/UI/CCol.vue";
import {ModsCtx} from "@/store";

@Component({
  name: "TheCreateIssue",
  components: {CCol, CRow}
})
export default class TheCreateIssue extends Vue {
  type = "0"
  name = ""
  text = ""

  onClickCreateIssue(){
    ModsCtx.dispatch("createIssue",{
      name: this.name,
      type: Number(this.type),
      text: this.text
    }).then(()=> {
      this.type = "0"
      this.name = ""
      this.text = ""
      this.$router.push({
        name: "Mod__Issues"
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.issue_create__select_type{
  padding: 5px 5px;
  background: var(--block-input-background);
  color: var(--text-invert-color);
  font-size: 14px;
  border: 2px solid var(--block-border);
  border-radius: 5px;
  &:focus{
    outline: none;
  }
}
.issue_create__issue_name{
  padding: 5px 5px;
  background: var(--block-input-background);
  color: var(--text-invert-color);
  font-size: 14px;
  height: 18px;
  border: 2px solid var(--block-border);
  border-radius: 5px;
  &:focus{
    outline: none;
  }
}
.issue_create__issue_text_box{
  width: 100%;
}
.issue_create__issue_text{
  min-height: 100px;
  height: 100px;
  resize: vertical;
  background: var(--block-input-background);
  border-radius: 5px;
  border: 2px solid var(--block-border);
  padding: 5px;
  font-size: 14px;
  &:focus{
    outline: unset
  }
}
.issue_create__issue_send_box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.issue_create__issue_md_help{
  color: var(--text-link-second-color);
  cursor: pointer;
  text-decoration: none;
  &:hover{
    color: var(--text-link-second-hover-color);
    text-decoration: underline;
  }
}
.issue_create__issue_send{
  padding: 5px 10px;
  border: 2px solid var(--block-border);
  border-radius: 5px;
  background: var(--button-background);
  cursor: pointer;
  color: var(--text-color);
  &:hover{
    background: var(--button-hover-background);
  }
}
</style>