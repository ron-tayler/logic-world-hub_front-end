<template lang="pug">
  div
    div
      h1 Страница списка сохранений
      button(@click="saveDesign") Save Design
      button(@click="exportHtml") Export HTML
      button(@click="fpjsTest") Test Fingerprint
    div(style="height: 500px")
      EmailEditor(
        ref="emailEditor"
        editorId="editor-test"
        :minHeight="'500px'"
        @load="editorLoaded"
        @ready="editorReady")
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
// @ts-ignore
import { EmailEditor } from 'vue-email-editor';
import axios from "axios";

@Component({
  name: "WorldListPage",
  components: {
    EmailEditor
  }
})
export default class WorldListPage extends Vue {
  editorLoaded(){
    console.log('editorLoaded');
  }
  editorReady(){
    console.log('editorReady');
  }
  saveDesign(){
    (this.$refs.emailEditor as EmailEditor).editor.saveDesign((design) => {
      console.log('saveDesign', design);
    });
  }
  exportHtml(){
    (this.$refs.emailEditor as EmailEditor).editor.exportHtml((data) => {
      console.log('exportHtml', data);
      //axios.post(`http://localhost:3000/api/v1/test/send-email`,{html:data.html})
    });
  }
  fpjsTest(){
    this.$fpjs?.getVisitorData({
      extendedResult: true
    }).then(result=> console.log(result))
  }
}
</script>

<style lang="scss" scoped>

</style>

<style>
#editor-test{
  height: 500px;
}
</style>