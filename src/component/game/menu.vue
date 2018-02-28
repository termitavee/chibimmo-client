<template>
<div id='menu-root'>
<ul id='menu-list' on:mouseover="showMenu = !showMenu">
  <li > <spam @click="this.toogleMenu" v-text="text.title" href="#"/> </li>
  <li v-show="showMenu"> <spam @click="menuAction(0)" v-text="text.Character"></li>
  <li v-show="showMenu"> <spam @click="menuAction(1)" v-text="text.inventory"></li>
  <li v-show="showMenu"> <spam @click="menuAction(2)" v-text="text.friends"></li>
  <li v-show="showMenu"> <spam @click="menuAction(3)" v-text="text.map"></li>
  <li v-show="showMenu"> <spam @click="menuAction(3)" v-text="text.messages"></li>
  <li v-show="showMenu"> <spam @click="menuAction(4)" v-text="text.pets"></li>
  <li v-show="showMenu"> <spam @click="menuAction(5)" v-text="text.exit"></li>
  <li v-show="showMenu"> <spam @click="menuAction(6)" v-text="text.close"></li>
</ul>

</div>
</template>

<script>
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
      ],
      windowRef
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

  mounted: function() {}
};
//TODO add style
</script>

<style scoped>
#menu-root {
  letter-spacing: 0em;
}
span{
  cursor: pointer;
}
</style>