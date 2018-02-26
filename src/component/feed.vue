<template>
<div>
   
    <h2 id="tile" v-text="title">Project Chibimmo</h2>
    <div id="feed">
        <!-- <p v-html="content"></p> -->
         <a class="twitter-timeline" href="https://twitter.com/chibimmo?ref_src=twsrc%5Etfw"></a>  
    </div>

</div>
</template>

<script>
/**TODO on finish loading twitter (?) id="twitter-widget-0"
 * TODO require.resolve() + eval
 * do this https://stackoverflow.com/questions/45925354/open-iframe-link-in-the-browser-using-electron
 */
module.exports = {
  props: ["formIP"],
  data: function() {
    return {
      title: "Project Chibimmo",
      load: 0,
      twCode: ""
    };
  },
  methods: {
    
    showDetails: function() {
      this.$emit("increment");
    },
    reloadTimeline: function() {
      //[4]
      console.log(document.getElementsByTagName("script")[4]);
      const head = document.getElementsByTagName("head")[0];
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "./js/library/widgets.js";
      //head.appendChild(script);
    }
  },
  created: function() {
    
    
  },
  mounted: function() {
    require("../js/library/widgets.js");
    //this.reloadTimeline()
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