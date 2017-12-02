<template>
<div>
  <span v-text="character._id" v-on:click="showDetails=!showDetails"/>
  <span v-text="start" v-on:click="launchGame" />
  
  <div v-if="showDetails">
    <span v-text="formatBodyColor()"></span>
    <span v-text="'The '+formatOrientation()+' '+formatType()"></span>
    <br>
    <span v-text="'Location '+formatMap()"></span>
    <br>
    <span v-text="'equipment '+formatEquipment()"></span>
    <br>
    <span v-text="'created on '+formatDate()"></span>
    <br>
    <span class="remove-char" v-text="remove" v-on:click="removeCharacter" />
    <span class="edit-char" v-text="edit" v-on:click="editCharacter" />
  </div>
  
</div>
</template>

<script>

const { setUser, setCharLaunch } = require("../js/data/db");

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
      //TODO save in local storange
      setCharLaunch(this.character);
      this.$root.$emit("openCharacterEditor");
    },
    removeCharacter: function() {

       this.$root.$emit("remove", this.character._id);
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
        case "0":
          return "Soldier";
        case "1":
          return "Mage";
        case "2":
          return "Rogue";
      }
    },
    formatOrientation: function() {
      switch (this.character.orientation) {
        case "0":
          return "Offensive";
        case "1":
          return "Defensive";
        case "2":
          return "Neutral";
      }
    },
    formatMap: function() {
      console.log("print map=" + this.character.map);
      switch (this.character.map) {
        case 0:
          return "";
        case 1:
          return "default";
        case 2:
          return "";
        default:
          return "Some testing area";
      }
    },
    formatEquipment: function() {
      switch (this.character.equipment) {
        case "0":
          return "";
        case "1":
          return "";
        case "2":
          return "";
        default:
          return "Nothing";
      }
    },
    formatDate: function() {
      const started = new Date(this.character.started);

      return (
        started.getDate() +
        "/" +
        (1 + started.getMonth()) +
        "/" +
        started.getFullYear()
      );
    },
    formatBodyColor: function() {
      console.log(this.character);
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
remove-char {
  background-color: red;
}
edit-char {
}
</style>