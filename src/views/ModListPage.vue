<template lang="pug">
  .page_mods
    v-block
      h1 Список модов
      .list_controls
        button Популярные
        button Самые скачиваемые
        button Самые новые
        button Недавно обновлённые
        button Тренды
      .mod_list
        .mod(v-for="mod in mods" :key="mod.id")
          .mob__image
            img(:src="mod.avatar")
          .mod__center
            router-link.mod__name(:to="'/mod/'+mod.id") {{mod.name}}
            .mod__description {{mod.description}}
          .mod__actions
            button.mod__action_btn
              font-awesome-icon(icon="fa-solid fa-star")
            button.mod__action_btn
              font-awesome-icon(icon="fa-solid fa-download")
            button.mod__action_btn
              font-awesome-icon(icon="fa-solid fa-indent")
            button.mod__action_btn
              font-awesome-icon(icon="fa-solid fa-share")
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import VBlock from "@/components/common/VBlock.vue";
import {ModsCtx} from "@/store";

@Component({
  name: "ModListPage",
  components: {VBlock}
})
export default class ModListPage extends Vue {
  get mods(){
    return ModsCtx.state.mods.values()
  }

  created(){
    ModsCtx.dispatch("getMods")
  }
}
</script>

<style lang="scss" scoped>
.page_mods{}
.list_controls{
  margin-bottom: 10px;
  display: flex;
  gap: 5px;
}
.mod{
  display: grid;
  grid-template-columns: 100px 1fr min-content;
  background: #e0e0e0;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  gap: 10px;

  &:last-child{
    margin-bottom: unset;
  }
}
.mob__image img{
  height: 100px;
  width: 100px;
  object-fit: cover;
}
.mod__name{
  font-size: 22px;
  text-decoration: none;
  color: #A04040;
  font-weight: bold;
  &:hover{
    text-decoration: underline;
  }
}
.mod__actions{
  display: flex;
  gap: 5px;
}
.mod__action_btn{
  border-radius: 5px;
  border: 0;
  background: #a0a0a0;
  width: 30px;
  height: 30px;
  color: white;
  cursor: pointer;
  &:hover{
    background: #808080;

  }
}
</style>