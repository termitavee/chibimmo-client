<template>

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
  
</template>

<script>
module.exports = {
  props: ["text", "stats"],
  components: {  },
  data: function() {
    return {
      showMenu: false,
      lifeBar: {},
      magicBar: {},
      staminaBar: {},
      lifeStat: {},
      magicStat: {},
      staminaStat: {}
    };
  },
  methods: {
  },

  mounted: function() {
    
    import {life,magic,hability} from this.stats.variable
    import {life as maxLife, magic as maxMagic,hability as maxHability}  from this.stats.constant

    this.lifeStat= { current:life, max:maxLife },
    this.magicStat= { urrent:magic, max:maxMagic },
    this.staminaStat= { current:hability, max:maxHability},

    this.lifeBar = document.getElementById("life").style.width 
    this.magicBar = document.getElementById("magic").style.width 
    this.staminaBar = document.getElementById("stamina").style.width 

    this.lifeBar  = life/maxLife*100;
    this.magicBar  = magic/maxMagic*100;
    this.staminaBar  = hability/maxHability*100;
  },
  watch: {
    stats: (curernt, previous) => {
      console.log(`Prop changed:  ${curernt},  | was: ", ${previous}`);
    },
  }
};
</script>

<style scoped>
#stats {
  top: 1%;
  left: 1%;
  position: absolute;
  width: 50%;
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