<template>
<div id="top-bar">
  <div id="stats" >
    <div id="lifeBar" class='bar'>
      <div id="life" class="stat">

      </div>
    </div>
    <div id="magicBar" class='bar'>
      <div id="magic" class="stat" >

      </div>
    </div>
    <div id="staminaBar" class='bar'>
      <div id="stamina" class="stat" >

      </div>
    </div>
  </div>
  <div id="menu" >
    <span>Menu</span>
    <ul>
<!--       <li @click="getElementById('life').style.width = '100%'">item1</li>
      <li @click="getElementById('magic').style.width = '0%'">item1</li>
      <li @click="getElementById('stamina').style.width = '100%'">item1</li> -->
    </ul>
  </div>
  
</div>
</template>

<script>
module.exports = {
  props: ["life", "magic", "stamina"],
  data: function() {
    return {
      showMenu: false,
      lifeBar: 0,
      magicBar: 0,
      staminaBar: 0
    };
  },
  methods: {
    toogleMenu: function() {
      this.showMenu = !this.showMenu;
    },
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
    this.lifeBar = document.getElementById('life').style.width = '100%'
    this.magicBar = document.getElementById('magic').style.width = '90%'
    this.staminaBar = document.getElementById('stamina').style.width = '20%'
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
#top-bar {
  position: absolute;
  left: 1%;
  top: 1%;
  right: 1%;
}
#stats {
  text-align: left;
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
  height: 20px;
  width: 500px;
  position: relative;
  border-radius: 25px;
  border: 2px solid #444;
  /* background-color: #333; */
  background: linear-gradient(#222, #444);
}
.stat {
  transition: 2s;
  height: 20px;
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