//this.$emit('increment')
export const characterList = Vue.component('character-list', {
    template: require('./templates/log-in-form.html'),
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
  })