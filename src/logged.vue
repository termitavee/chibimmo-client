<template>
<div id="index">
        
  <div class="pure-u-2-3" id="leftContent">
      <feed></feed>
  </div><!--end side block-->
  
  <div class="pure-u-1-3" id="main-content">
      
      <h2 v-text="user._id">Player</h2><a @click="exitLog" class="pure-button" href="#" v-text="logOut"></a>

      <character-list :characters="user.characters"/>
      
  </div>
</div>
</template>

<script>
const { ipcRenderer, remote } = require("electron");
const { dialog } = remote;

const feed = require("./component/feed");
const characterList = require("./component/character-list");
const character = require("./component/character");
const { getUser, setCharLaunch, getCharLaunch, getIP } = require("./js/data/db");
//TODO check getCharLaunch for created user
//require('./js/library/widgets.js')
module.exports = {
  props: [],
  data: function() {
    return {
      user: getUser(),
      language: "en",
      logOut: "log Out"
    };
  },
  components: {
    feed: feed,
    "character-list": characterList,
    character: character
  },
  methods: {
    exitLog: function() {
      //ipcRenderer.send("logIn", false);
      this.$router.push("/login");
    },

    launchLoggedContent: function() {
      /*get data from this. userData */
      /*Update the information shown */
      this.isNotLogged = false;
    }
  },
  created: function() {
    const addCharacter = getCharLaunch()
    if(addCharacter){
      this.user.characters.push(addCharacter)
      //to avoid fails
      setCharLaunch(undefined)
    }

    this.$root.$on("openCharacterEditor", function() {
      console.log("logged.js on openCharacterEditor");
      //ipcRenderer.send("launchEditor");

      this.$router.push("/newCharacter");
    });

    this.$root.$on("launchGame", function(character) {
      console.log("logged.js on launchGame for ", character);
      if (character != null) {
        setCharLaunch(character);
        this.$router.push("/game");
        ipcRenderer.send("fullScreen", true);
      } else console.log("Something strange in launchGame");
    });

    this.$root.$on("remove", function(param) {
      console.log("remove on logged", param);
      const { id, pos } = param;

      //const charName = this.character._id;
      dialog.showMessageBox(
        {
          type: "warning",
          buttons: ["Cancel", "Delete", "Cancel"],
          title: "chibimmo ask you",
          message: 'Are you shure you want to delete "' + id + '"?'
        },
        answer => {
          if (answer == 1) {
            const serverIP = getIP();
            const dataSend = JSON.stringify({ user: this.user._id, name: id });
            console.log("Fetch data");
            console.log(serverIP);
            console.log(dataSend);
            fetch("http://" + serverIP + ":3000/deletecharacter", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: dataSend
            })
              .then(res => res.json())
              .then(res => {
                console.log(res);
                if (res.status == 202) {
                  console.log("mensaje de borrado con éxito, refrescar ");

                  this.user.characters.splice(pos, 1);
                  setCharLaunch(this.user);

                  //TODO borrar pos de la lista
                } else {
                  console.log("mensaje de error");
                }
              })
              .catch(error => {
                console.log("mensaje de error en la petición");
                console.log(error);
              });
          }
          console.log("User response=" + answer);
        }
      );
    });
  }
};

console.log("logged.js cargado");
</script>

<style scoped>
#index {
  width: 100%;
}
</style>