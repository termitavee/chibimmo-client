<template>
<div>
  <span v-text="character._id" v-on:click="showDetails =! showDetails"/>
  <span v-text="text.start" v-on:click="launchGame" />
  
  <div v-if="showDetails">
    <span v-text="text.format.color[this.character.body]"></span>
    <span v-text="text.the +text.format.orientation[character.orientation]+' '+text.format.type[character.type]"></span>
    <br>
    <span v-text="text.location +text.format.map[character.map]"></span>
    <br>
    <span v-text="text.equip +text.format.equip[character.equip]"></span>
    <br>
    <span v-text="text.created +formatDate()"></span>
    <br>
    <span class="remove-char" v-text="text.delete" v-on:click="removeCharacter" />
    <span class="edit-char" v-text="text.edit" v-on:click="editCharacter" />
  </div>
  
</div>
</template>

<script>
import { setCharLaunch } from "../js/data/db"

module.exports = {
  props: ["character", "reference", "comText", "text"],
  data: function() {
    return {
      showDetails: false
    };
  },
  methods: {

    editCharacter: function() {
      //TODO save in local storange

      setCharLaunch(this.character);
      this.$root.$emit("openCharacterEditor");
    },
    removeCharacter: function() {
      this.showDetails = !this.showDetails;
      console.log({
        id: this.character._id,
        pos: this.reference
      })
      this.$root.$emit("remove", {
        id: this.character._id,
        pos: this.reference
      });
    },
    launchGame: function() {
      //TODO launch game
      console.log("character.vue will launch game");
      this.$root.$emit("launchGame", this.character);
    },
/*     formatType: function() {
      return comText.component.character.format.type[this.character.type];
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
    }, */
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
    /* formatBodyColor: function() {
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
    } */
  }
};
</script>

<style scoped>
remove-char {
  background-color: red;
}

</style>