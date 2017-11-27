<template>
<div id="top-bar">
  <div id="lifeBar">
    <div id="life">

    </div>
  </div>
  <div id="magicBar">
    <div id="magic">

    </div>
  </div>
  <div id="staminaBar">
    <div id="stamina">

    </div>
  </div>
 
</div>
</template>

<script>
module.exports = {
  props: ["life", "magic", "stamina"],
  data: function() {
    return {

    };
  },
  methods: {
    send: function() {}
  },

  mounted: function() {
    //TODO props {max, current}
  }
};
</script>

<style scoped>

</style>