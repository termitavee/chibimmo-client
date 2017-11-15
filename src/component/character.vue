<template>
<div>
  <span v-text="character._id" v-on:click="showDetails=!showDetails"/>
  <span v-text="start"/>
  
  <div v-if="showDetails">
    <span v-text="formatType()"></span>
  
    <span v-text="remove"/>
  </div>
  
</div>
</template>

<script>
module.exports = {
  props: ["character"],
  data: function() {
    return {
      showDetails: false,
      start: "start",
      remove: "delete"
    };
  },
  methods: {
    toogleShow: function() {
      this.$emit("increment");
    },
    edit: function() {
      //TODO open editor just edit colors and hair
      this.$emit("");
    },
    delete: function() {
      this.$emit("");
    },
    start: function() {
      //TODO launch game
      this.$emit("");
    },
    rerender: function() {
      //TODO something?
    },
    formatType: function() {
      //TODO something?
      switch (this.character.type) {
        case "sol":
          return "Soldier";
        case "mag":
          return "Mage";
        case "rog":
          return "Rogue";
      }
    }
  }
};
</script>

<style scoped>

</style>