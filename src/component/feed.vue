<template>
<div>
   <h2 v-text="title">Project Chibimmo</h2>
    <div>
        <p v-html="content"></p>
    </div>
        <!--TODOs
        -scroll in content block
        add <a class="twitter-timeline" href="https://twitter.com/chibimmo?ref_src=twsrc%5Etfw">Tweets by chibimmo</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    -->
</div>
</template>

<script>
module.exports = {
    props:[],
    data: function () {
      return {
        title: "Project Chibimmo",
        content: '<p>Content goes here</p>',    
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