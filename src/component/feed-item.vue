<template>
<div>
<div id="image">
  <span v-text="item.image"></span>
</div>
<div id="content" >
  <h3 v-text="item.title" v-on:click="showDetails =! showDetails"></h3>
  <div id="details" v-if="showDetails">
    <span v-text="item.content"></span>
    <span v-text="item.author"></span>
  </div>
</div>
</div>
</template>
<script>
module.exports = {
  props: ["item", "reference", "formIP"],
  data: function() {
    return {
      showDetails: false,
    };
  },
  methods: {
    edit : ()=>{
      //TODO do something to edit
    },
    remove : ()=>{
      //TODO do something to delete
    }
  },
  created: function() {
  },
  mounted: function() {}
};
</script>

<style scoped>

</style>