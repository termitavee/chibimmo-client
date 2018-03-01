<template>
<div>
   
    <h2 id="title" v-text="text.title">Project Chibimmo</h2>

    <ul id="feed">
      <li v-for="(item, key) in itemList" :key="key">
        <feed-item :content="item" :reference="key" :formIP="formIP"/>
      </li>
      <li id="last" v-if="itemList.length==0" v-text="text.none"> No news to show</li>
    </ul>


</div>
</template>

<script>
import feedItem from "./feed-item"
import { getIP } from "../js/data/db"

module.exports = {
  props: ["comText", "text", "formIP"],
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
    const self = this;
    fetch(`http://${this.formIP}:1993/news/`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 202) {
          console.log("feed content getted successfully ");

          console.log(res.found);
          this.itemList = res.found;

          console.log(this.itemList.length);
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
ul {
  padding-left: 0;
  overflow-y: auto;
  height: 422px;
}

#feed {
  overflow-y: auto;
  top: 5%;
  bottom: 0;
  width: 63%;
  height: 102%;
}
#title {
  text-align: center;
  padding: 10px 20% 15px 20%;
}
#last {
  text-align: center;
}
/* #feed {
  overflow-y: auto;
  position: absolute;
  top: 5%;
  bottom: 0;
  width: 63%;
  height: 102%;
}
#title {
  background-color: white;
  position: absolute;
  z-index: 1;
  padding: 10px 20% 15px 20%;
} */
</style>