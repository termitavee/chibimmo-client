<template>
  <ul>
    <li vfor="item in characters">
      <span v-text="character">
        <!--hidden stats, show on click-->
      </span>
    </li>
    <li>
      <a @click="createNewCharacter" v-text="newCharacter"></a>
    </li>
  </ul>
</template>

<script>

const character = require('./component/character')
module.exports = {
    props:[characters],
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