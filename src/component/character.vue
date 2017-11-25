<template>
<div>
  <span v-text="character._id" v-on:click="showDetails=!showDetails"/>
  <span v-text="start" v-on:click="launchGame" />
  
  <div v-if="showDetails">
    <span v-text="formatBodyColor()"></span>
    <span v-text="formatType()"></span>
    <br>
    <span v-text="remove" v-on:click="removeCharacter" />
    <span v-text="edit" v-on:click="editCharacter" />
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
      remove: "delete",
      edit: "Edit"
    };
  },
  methods: {
    toogleShow: function() {
      this.$emit("increment");
    },
    editCharacter: function() {
      //TODO open editor just edit colors and hair
      this.$root.$emit("openCharacterEditor", character);
    },
    removeCharacter: function() {
      this.$root.$emit("remove", character._id);
    },
    launchGame: function() {
      //TODO launch game
      console.log("character.vue will launch game");
      this.$root.$emit("launchGame", this.character);
    },
    rerender: function() {
      this.$root.$emit("refresh");
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
    },
    formatBodyColor: function() {
      console.log(this.character)
      switch (this.character.bodyColor) {
        case "0":
          return "default";
        case "1":
          return "brown";
        case "2":
          return "light";
        case "3":
          return "dark";
        case "4":
          return "red";
        case "5":
          return "blue";
        case "6":
          return "green";
      }
    }
  }
};
</script>

<style scoped>

</style>