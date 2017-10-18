<template>
<div>
<ul>
  <h3>List of characters created</h3>
    <li vfor="(item, key) in characters">
      <span v-text="item">
        <!--hidden stats, show on click-->
      </span>
    </li>
    <li>
      <a @click="createNewCharacter" v-text="newCharacter" class="pure-button">Create new</a>
    </li>
  </ul>
</div>
  
</template>

<script>

const character = require('../component/character')
module.exports = {
    props:['characters'],
    components:{
      'character': character,
    },
    data: function () {
      return {newCharacter: "Create new"}
    },
    methods: {
      createNewCharacter : function(){
        this.$root.$emit('openCharacterEditor')
      },
      showDetails : function(){
        this.$root.$emit('increment')
      }
    }
}
</script>

<style scoped>
ul{ 
  list-style-type: none;
}
</style>