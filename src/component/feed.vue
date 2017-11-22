<template>
<div>
   
    <h2 id="tile"v-text="title">Project Chibimmo</h2>
    <div id="feed">
        <!-- <p v-html="content"></p> -->
        <a class="twitter-timeline" href="https://twitter.com/chibimmo?ref_src=twsrc%5Etfw"></a> 
    </div>
        <!--TODOs
        -scroll in content block
        add <a class="twitter-timeline" href="https://twitter.com/chibimmo?ref_src=twsrc%5Etfw">Tweets by chibimmo</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    -->
</div>
</template>

<script>
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
/*   padding-left: 20%;
  padding-right: 20%;
  padding-top: 10px;
  padding-bottom: 15px; */
}
</style>