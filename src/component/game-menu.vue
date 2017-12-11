<template>
<div id='menu-root'>
<ul>
  <li > <button @click="this.toogleMenu" href="#">Menu</button> </li>
  <li v-show="showMenu" > <button @click="exitGame" > Salir </button> </li>
  <li v-show="showMenu" > <button @click="exitFull" > Cerrar </button ></li>
  
</ul>

</div>
</template>

<script>
//TODO [Vue warn]: You may have an infinite update loop in a component render function.

const windowRef = require("electron").remote.getCurrentWindow();

module.exports = {
  props: [],
  data: function() {
    return {
      showMenu: false,
      windowRef
    };
  },
  methods: {
    toogleMenu: function() {
      console.log("click 0");
      console.log(this);
      this.showMenu = !this.showMenu;
    },
    exitGame: function() {
      console.log("click 1");
      this.$router.go(-1);
    },
    exitFull: function() {
      console.log("click 1");
      this.windowRef.close();
    }
  },

  mounted: function() {}
};
</script>

<style scoped>
#menu-root {
  letter-spacing: 0em;
}
</style>