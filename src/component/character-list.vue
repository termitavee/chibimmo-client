<template>
  <ul>
    <li vfor="character in characters">
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
module.exports = {
    props:[],
    data: function () {
      return {
        characters : [],

      }
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