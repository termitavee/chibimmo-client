<template>
<div>
<ul>
  <li :click="showMenu = !showMenu"> Menu </li>
  <li v-if="showMenu" :click="exitGame"> Salir</li>
  <li v-if="showMenu" :click="exitFull"> Cerrar</li>
  
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
    exitGame: () => {
      this.$router.go(-1);
    },
    exitFull: () => {
      windowRef.close()
    }
  },

  mounted: function() {}
};
</script>

<style scoped>

</style>