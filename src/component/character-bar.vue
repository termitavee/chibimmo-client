<template>
<div id="top-bar">
  <div id="stats">
    <!--life bar-->
    <div id="lifeBar" class='bar'>
      <div id="life" class="stat" style={{'width: '+ (props.current*100/props.max)+'%'}}>

      </div>
    </div>
    <!--magic bar-->
    <div id="magicBar" class='bar'>
      <div id="magic" class="stat" >

      </div>
    </div>
    <!--stamina bar-->
    <div id="staminaBar" class='bar'>
      <div id="stamina" class="stat" >

      </div>
    </div>
  </div>
 <div id="menu">
   <span>Menu</span>
   <ul>
     
   </ul>
 </div>
 
</div>
</template>

<script>
module.exports = {
  props: ["life", "magic", "stamina"],
  data: function() {
    return { showMenu: false };
  },
  methods: {
    toogleMenu: function() {
      this.showMenu = !this.showMenu;
    },
    currentLife() {},
    exit: function() {
      this.$root.$emit("exit");
    },
    close: function() {
      this.$root.$emit("close");
    }
  },

  mounted: function() {
    //TODO props {max, current}
    //document.getElementById(id).style.property = new style
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
.bar {
  height: 20px;
  position: relative;
  border-radius: 25px;
  /* background-color: #333; */
  background: linear-gradient(#222, #444);
}
.stat {
  transition: 2s;
}
#life {
  background: linear-gradient(#f22, #f44);
}
#magic {
  background: linear-gradient(#22f, #44f);
}
#stamina {
  background: linear-gradient(#2f2, #4f4);
}
</style>