<template>
<div>
  <span v-text="character._id" v-on:click="showDetails=!showDetails"/>
  <span v-text="start" v-on:click="launchGame" />
  
  <div v-if="showDetails">
    <span v-text="formatType()"></span>
  
    <span v-text="remove" v-on:click="removeCharacter" />
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
      this.$root.$emit('openCharacterEditor', character);
    },
    removeCharacter: function() {
      this.$root.$emit('remove', character._id);
    },
    launchGame: function() {
      //TODO launch game
      console.log('character.vue will launch game')
      this.$root.$emit("launchGame", this.character )
    },
    rerender: function() {
      this.$root.$emit('refresh');
    },
    formatType: function() {
      
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