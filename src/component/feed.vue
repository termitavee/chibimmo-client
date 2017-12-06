<template>
<div>
   
    <h2 id="tile"v-text="title">Project Chibimmo</h2>
    <div id="feed">
        <!-- <p v-html="content"></p> -->
        <a class="twitter-timeline" href="https://twitter.com/chibimmo?ref_src=twsrc%5Etfw"></a> 
    </div>

</div>
</template>

<script>
/**TODO on finish loading twitter (?) id="twitter-widget-0"
 * do this https://stackoverflow.com/questions/45925354/open-iframe-link-in-the-browser-using-electron
 */
module.exports = {
  props: [],
  data: function() {
    return {
      title: "Project Chibimmo",
      content: "<p>Content goes here</p>"
    };
  },
  methods: {
    createNewCharacter: function() {
      this.$emit("increment");
    },
    showDetails: function() {
      this.$emit("increment");
    }
  }
};
</script>

<style scoped>
#feed {
  overflow-y: scroll;
  position: absolute;
  top: 5%;
  bottom: 0;
  width: 63%;
  height: 102%;
}
#tile {
  background-color: white;
  position: absolute;
  z-index: 1;
  padding: 10px 20% 15px 20%;

}
</style>