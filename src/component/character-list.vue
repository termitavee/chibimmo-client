<template>
<div>
  <h3 v-text="text.title">List of characters created</h3>
  <ul>
    <li class="characterItem" v-for="(item, key) in characters" :key="key">
        <character :character="item" :reference="key" :comText="comText" :text="comText.character"/>
    </li>
    <li>
      <a @click="createNewCharacter" v-text="text.new" class="pure-button">Create new</a>
    </li>
  </ul>
</div>
</template>

<script>
import character from "../component/character";
import { setCharLaunch } from "../js/data/db";

module.exports = {
  props: ["characters", "comText", "text"],
  components: {
    character: character
  },
  data: function() {
    return {};
  },
  methods: {
    createNewCharacter: function() {
      setCharLaunch(null);
      this.$root.$emit("openCharacterEditor");
    }
  }
};
</script>

<style scoped>
ul {
  padding-left: 0;
  overflow-y: auto;
  height: 422px;
}

.characterItem {
  margin-bottom: 10px;
}
</style>