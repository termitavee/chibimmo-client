<template>
<div id='menu-root'>
<ul id='menu-list' v-on:mouseover="showMenu = !showMenu">
  <li > <span @click="toogleMenu()" v-text="text.title"></span></li>
  <li v-for="(item, key) in text" v-if="key!=0" :key="key" >
    <span @click="menuAction(key)" v-text="item"></span>
  </li>
 <!--  <li v-show="showMenu"> <span @click="menuAction(0)" v-text="text.character"></span></li>
  <li v-show="showMenu"> <span @click="menuAction(1)" v-text="text.inventory"></span></li>
  <li v-show="showMenu"> <span @click="menuAction(2)" v-text="text.friends"></span></li>
  <li v-show="showMenu"> <span @click="menuAction(3)" v-text="text.map"></span></li>
  <li v-show="showMenu"> <span @click="menuAction(3)" v-text="text.messages"></span></li>
  <li v-show="showMenu"> <span @click="menuAction(4)" v-text="text.pets"></span></li>
  <li v-show="showMenu"> <span @click="menuAction(5)" v-text="text.exit"></span></li>
  <li v-show="showMenu"> <span @click="menuAction(6)" v-text="text.close"></span></li> -->
</ul>
</div>
</template>

<script>
//TODO windowRef?
module.exports = {
  props: ["fileText", "text", "player"],
  data: function() {
    return {
      showMenu: false,
      actions: [
        "launchChar",
        "launchInv",
        "launchFriendList",
        "launchMessages",
        "launchPets",
        "launchExit",
        "launchClose"
      ]
    };
  },
  methods: {
    toogleMenu: function() {
      //TODO delete
      console.log("click 0");
      console.log(this);
      this.showMenu = !this.showMenu;
    },
    menuAction: function(id) {
      this.$root.$emit(this.action[id]);
    }
  },
  created: function() {
    console.log("game - menu - this.text");
    console.log(this.text);
  },
  mounted: function() {}
};
//TODO add style
</script>

<style scoped>
#menu-root {
  letter-spacing: 0em;
}
span {
  cursor: pointer;
}
</style>