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
 * TODO require.resolve() + eval
 * do this https://stackoverflow.com/questions/45925354/open-iframe-link-in-the-browser-using-electron
 */
module.exports = {
  props: [],
  data: function() {
    return {
      title: "Project Chibimmo",
      load: 0,
      twCode: ""
    };
  },
  methods: {
    createNewCharacter: function() {
      this.$emit("increment");
    },
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
    //clean prevouous
    let twScriptTag = document.getElementsByTagName("script")[4];
    console.log(twScriptTag);
    if (twScriptTag.src.includes("twitter"))
      twScriptTag.parentElement.removeChild(twScriptTag);

    let content = document.getElementById("twitter-widget-0");
    console.log(content);
    if (content) content.parentElement.removeChild(content);
    console.log(document.getElementById("twitter-widget-0"));

    let twSandBox = document.getElementById("rufous-sandbox");
    console.log(twSandBox);
    if (twSandBox) twSandBox.parentElement.removeChild(twSandBox);
    console.log(document.getElementById("rufous-sandbox"));
    eval(require("../js/library/widgets.js"))
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