<template>
<div>

  <h3>List of characters created</h3>
  <ul>
    <li  v-for="(item, key) in characters" :key="key">
        <character :character="item"/>
    </li>
    <li>
      <a @click="createNewCharacter" v-text="newCharacter" class="pure-button">Create new</a>
    </li>
  </ul>
</div>
  
</template>

<script>
const character = require("../component/character");

module.exports = {
  props: ["characters"],
  components: {
    character: character
  },
  data: function() {
    return { newCharacter: "Create new" };
  },
  methods: {
    createNewCharacter: function() {
      this.$root.$emit("openCharacterEditor");
    },
    showDetails: function() {
      //TODO
    }
  },

};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>