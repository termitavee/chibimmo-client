<template>
<div id="index">
        
  <div class="pure-u-2-3" id="leftContent">
      <feed :comText="fileText.component" :text="fileText.component.feed" :formIP="formIP"></feed>
  </div><!--end side block-->
  
  <div class="pure-u-1-3" id="main-content">
      
      <h2 v-text="user._id || text.user"></h2><a @click="exitLog" class="pure-button" href="#" v-text="text.logOut"></a>

      <character-list :characters="user.characters" :comText="fileText.component" :text="fileText.component.characterList"/>
      
  </div>
</div>
</template>
<script>
//TODO add popup to lang
import { ipcRenderer, remote } from "electron";

import feed from "./component/feed";
import characterList from "./component/character-list";
import character from "./component/character";
import { loadLanguage, getLanguage } from "./js/utils";
import enText from "./js/data/lang/en.json";
import esText from "./js/data/lang/es.json";
import {
  getUser,
  setCharLaunch,
  getCharLaunch,
  getIP,
  getLang
} from "./js/data/db";

//require('./js/library/widgets.js')
module.exports = {
  props: [],
  data: function() {
    return {
      user: getUser(),
      language: "en",
      formIP: "127.0.0.1",
      fileText: enText,
      text: enText.windows.logged,
      popup: false
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
    const addCharacter = getCharLaunch();
    this.formIP = getIP();
    //if has created a new character
    if (addCharacter) {
      this.user.characters.push(addCharacter);
      setCharLaunch(undefined);
    }
    //load language
    loadLanguage(this, getLang, { es: esText, en: enText }, "logged");

    //children comunication
    const self = this;
    this.$root.$on("openCharacterEditor", function() {
      this.$router.push("/editor");
    });

    this.$root.$on("launchGame", function(character) {
      if (character != null) {
        setCharLaunch(character);
        this.$router.push("/game");
        ipcRenderer.send("fullScreen", true);
      } else console.log("Something strange in launchGame");
    });

    this.$root.$on("remove", function(param) {
      const { id, pos } = param;
      if (!self.popup) {
        self.popup = true;
        remote.dialog.showMessageBox(
          {
            type: "warning",
            buttons: ["Cancel", "Delete", "Cancel"],
            title: "chibimmo ask you",
            message: `Are you shure you want to delete "${id}"?`
          },
          answer => {
            self.popup = false;
            if (answer == 1) {
              fetch(`http://${self.formIP}:1993/character/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              })
                .then(res => res.json())
                .then(res => {
                  console.log(res);
                  if (res.status == 202) {
                    console.log("personaje de borrado con éxito, refrescar ");

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
            } else {
              console.log(param);
            }
          }
        );
      }
      //const charName = this.character._id;
    });
  }
};
</script>

<style scoped>
#index {
  width: 100%;
}
</style>