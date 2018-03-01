<template>

  <div id="stats" >
    <div id="lifeBar" class='bar'>
      <div id="life" ref="life" class="stat" v-bind:class="{ width: lifeStat }">

      </div>
    </div>
    <div id="magicBar" class='bar'>
      <div id="magic" ref="magic" class="stat" v-bind:class="{ width: magicStat }">

      </div>
    </div>
    <div id="staminaBar" class='bar'>
      <div id="stamina" ref="stamina" class="stat" v-bind:class="{ width: staminaStat }">

      </div>
    </div>
  </div>
  
</template>

<script>
module.exports = {
  props: ["text", "stats"],
  components: {},
  data: function() {
    return {
      showMenu: false,
      lifeStat: "0%",
      magicStat: "0%",
      staminaStat: "0%"
    };
  },
  methods: {},
  mounted: function() {
    console.log("this player stats");
    console.log(this);
    const { variable, constant } = this.stats;
/* 
    this.lifeStat = `${variable.life / constant.life * 100}%`;
    this.magicStat = `${variable.magic / constant.magic * 100}%`;
    this.staminaStat = `${variable.hability / constant.hability * 100}%`; */

    this.lifeStat = `${variable.life / constant.life * 100}%`;
    this.magicStat = `${variable.magic / constant.magic * 100}%`;
    this.staminaStat = `${variable.hability / constant.hability * 100}%`;
  },
  watch: {
    stats: (curernt, previous) => {
      console.log(`Prop changed:  ${curernt},  | was: ", ${previous}`);
      const { variable, constant } = current;
      this.lifeStat = `${variable.life / constant.life * 100}%`;
      this.magicStat = `${variable.magic / constant.magic * 100}%`;
      this.staminaStat = `${variable.hability / constant.hability * 100}%`;
    }
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