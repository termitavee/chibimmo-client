<template>
<div>
<ul>
  <h3>List of characters created</h3>
    <li vfor="item in characters">
      <span v-text="character">
        <!--hidden stats, show on click-->
      </span>
    </li>
    <li>
      <a @click="createNewCharacter" v-text="newCharacter"></a>
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
      return {}
    },
    methods: {
      createNewCharacter : function(){
        this.$emit('increment')
      },
      showDetails : function(){
        this.$emit('increment')
      }
    }
}
</script>

<style scoped>

</style>