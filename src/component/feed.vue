<template>
<div>
   
    <h2 id="tile" v-text="lang || 'Project Chibimmo'">Project Chibimmo</h2>

    <ul id="feed">
      <li v-for="(item, key) in itemList" :key="key">
        <feed-item :content="item" :reference="key" :formIP="formIP"/>
      </li>
      <li v-if="itemList.length==0"> No news to show</li>
    </ul>


</div>
</template>

<script>
const feedItem = require("./feed-item");
const { getIP } = require("../js/data/db");

module.exports = {
  props: ["formIP", "lang"],
  components: {
    "feed-item": feedItem
  },
  data: function() {
    return {
      title: "Project Chibimmo",
      itemList: [],
      serverIP: getIP()
    };
  },
  methods: {
    showDetails: function() {
      this.$emit("increment");
    },
    reloadTimeline: function() {}
  },
  created: function() {
    //do fetch to formIP
    //this.serverIP = getIP() "127.0.0.1",
    fetch(`http://${serverIP}:1993/news/${id}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status == 202) {
          console.log("feed content getted successfully ");
          console.log(res.found);
          this.itemList = res.found;
        } else {
          console.log("mensaje de error");
        }
      })
      .catch(error => {
        console.log("mensaje de error en la petición");
        console.log(error);
      });
  },
  mounted: function() {
    //TODO loading gif
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