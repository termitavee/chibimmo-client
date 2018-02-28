<template>
<div id="top-bar">
  <div id="stats" >
      <player-stats :text="fileText.stats" :stats="player.stadistics"/>
  </div>
  <div id="menu" >
    <game-menu :fileText="fileText" :text="fileText.menu" :player="player"/>
  </div>
  
</div>
</template>

<script>
import gameMenu from "./game-menu";
import playerStats from "./game-player-stats";
module.exports = {

  props: ["fileText", "player"],
  components: {
    "game-menu": gameMenu,
    "player-stats": playerStats
  },
  data: function() {
    return {
      showMenu: false,
      lifeBar: 0,
      magicBar: 0,
      staminaBar: 0
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

  mounted: function() {
    //TODO props {max, current}
    //life", "magic", "stamina
    this.lifeBar = document.getElementById("life").style.width = "100%";
    this.magicBar = document.getElementById("magic").style.width = "90%";
    this.staminaBar = document.getElementById("stamina").style.width = "20%";
  },
  watch: {
    life: (curernt, previous) => {
      console.log("Prop changed: ", curernt, " | was: ", previous);
      //  document.getElementsByTagId('life')
    },
    magic: (curernt, previous) => {
      console.log("Prop changed: ", curernt, " | was: ", previous);
    },
    stamina: (curernt, previous) => {
      console.log("Prop changed: ", curernt, " | was: ", previous);
    }
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
  width: 50%;
}
#menu {
  top: 1%;
  right: 1%;
  position: absolute;
  width: 50%;
  text-align: right;
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