<template>
<div id="top-bar">
  <div id="stats" >
      <player-stats :text="fileText.stats" :stats="character.stadistics"/>
  </div>
  <div id="menu" >
    <game-menu :fileText="fileText" :text="fileText.menu" :character="character"/>
  </div>
  
</div>
</template>

<script>
import gameMenu from "./menu";
import playerStats from "./player-stats";
module.exports = {

  props: ["fileText", "character"],
  components: {
    "game-menu": gameMenu,
    "player-stats": playerStats
  },
  data: function() {
    return {
      showMenu: false
    };
  },
  methods: {
    updateLife() {},
    updateMagic() {},
    updateStamina() {},
    exit: function() {
      this.$root.$emit("exit");
    },
    close: function() {
      this.$root.$emit("close");
    }
  },

  created: function() {console.log('this top bar' )
  console.log(this)}, 

  mounted: function() {
    //TODO props {max, current}
    //life", "magic", "stamina

  },
  watch: {
  }
};
</script>

<style scoped>
/* set fixed style, position, total width color */
/*container*/

#stats {
  top: 1%;
  left: 1%;
  position: absolute;
  /* width: 50%; */
}
#menu {
  top: 1%;
  right: 1%;
  position: absolute;
  /* width: 50%;
  text-align: right; */
}
.bar {
  margin-top: 5px;
  height: 10px;
  width: 200px;
  position: relative;
  border-radius: 25px;
  border: 2px solid #444;
  /* background-color: #333; */
  background: linear-gradient(#222, #444);
}
.stat {
  transition: 2s;
  height: 10px;
  border-radius: 25px;
}
#life {
  background: linear-gradient(#f22, #f77);
}
#magic {
  background: linear-gradient(#22f, #77f);
}
#stamina {
  background: linear-gradient(#2f2, #7f7);
}
</style>