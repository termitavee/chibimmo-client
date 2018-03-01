<template>
<div id="index" >
  <div id="mainContent" ></div>
  <top-bar :fileText="fileText" :character="character" />
  <chat id="chat" :user="user" :formIP="formIP" :fileText="fileText" :text="fileText.chat" />
</div>
</template>

<script>
import io from "socket.io-client";

import chat from "./component/game/chat";
import topBar from "./component/game/top-bar";
import {
  getUser,
  getIP,
  getLang,
  getCharLaunch,
  setCharLaunch
} from "./js/data/db";
import { game as prePhaser } from "./js/phaserUtil";
/*
formulas de daño 
fis
mag
mix

    game.camera.shake(0.05, 500);

game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);

*/
const langFiles = {
  es: require("./js/data/lang/es.json").game,
  en: require("./js/data/lang/en.json").game
};

module.exports = {
  data: function() {
    return {
      windowRef: require("electron").remote.getCurrentWindow(),
      user: {},
      character: {},
      language: "en",
      formIP: "127.0.0.1",
      fileText: {},
      server: {},
      game: {},
      map: {},
      player: {},
      layer: {},
      characters: {},
      charactersColisionGroup: {},
      enemyColisionGroup: {},
      mapColisionGroup: {},
      hasControl: true
    };
  },
  components: {
    chat,
    "top-bar": topBar
  },
  methods: {
    loadKeyMap: (self, add = true) => {
      if (add) {
        //TODO Add key listener configuration

        self.cursors = self.game.input.keyboard.createCursorKeys();
      } else {
        //TODO remove key configuration
      }
    },
    addmonster: function(monster) {
      const { _id, sprite, stadistics, map, position } = monster;

      //TODO movement

      //save reference
    },

    editCharacter: function(character) {
      // get character visual parameters, print it and save reference
      const { _id, equipment, map, position } = character;
      const found = this.characters.filter((character, index, list) => {
        return player_id == id;
      }, true);

      //TODO edit found
    },

    deleteCharacter: function(character) {
      const { _id, equipment, map, position } = character;
      const found = this.characters.filter((character, index, list) => {
        return player_id == id;
      }, true);

      //TODO remove found
    },

    addMiniMap: function() {
      //TODO IDK
    },

    hitPlayer: function(body1, body2) {
      //1 self, 2 the other
      //something?
      console.log("touched someone");
      console.log(body2);
    },

    hitEnemy: function(body1, body2) {
      console.log("touched an enemy");
      console.log(body2);
      //1 self, 2 the other
      //move back and low life as de formula
    },

    hitMap: function(sprite, tile) {
      console.log("touched a tile");
      console.log(tile);
      //1 self, 2 the other
      //move back and low life as de formula
    },
    changeFocus: function() {
      if (this.hasControl) {
        //TODO TODO
        // wasd self.game.input.keyboard.on('key',function(){}) --> once, for attack
        //keyA this.input.keyboard.addKey(Phaser.input.keyboard.KeyCodes.A)
        //if keyA.isDown --> for loop
        self.cursors = { left: false, right: false, up: false, down: false };
      } else {
        self.cursors = self.game.input.keyboard.createCursorKeys();
        //TODO add self.game.input.on('pointerdown',function(){}) for attack
      }
    }
  },
  created: function() {
    this.formIP = getIP();
    this.server = io(`http://${this.formIP}:1993/game`);
    this.fileText = langFiles[getLang()];
    this.text = langFiles[getLang()].main;
    console.log("game.vue created");
    console.log(this);
  },
  mounted: function() {
    this.user = getUser();
    this.character = getCharLaunch();

    let self = this;
/*     const config = {
      type: Phaser.AUTO,
      width: "100",
      height: "100",
      scene: {
        preload,
        create,
        update
      },
      physics: {}
    };
    this.game = new Phaser.Game(config); */
     this.game = new Phaser.Game(
      "100",
      "100",
      Phaser.AUTO,
      "mainContent",
      { preload, create, update },
      true,
      false
    );

    function preload() {
      prePhaser.preload(self);
    }

    function create() {
      prePhaser.create(self);

      console.log(self.player);
    }
    function update() {
      prePhaser.update(self);
    }

    //sockets communication
    this.server.on("connect", function() {
      console.log("connected");
      //this.server.emit("startGame", this.user._id);
    });

    this.server.on("updateGame", function(newContent) {
      console.log("new content recived");
      console.log(newContent);
    });

    this.server.on("updatePlayer", function(newContent) {
      console.log("new player position");
      console.log(newContent);
    });

    this.server.on("alert", function(newContent) {
      console.log("new important content recived");
      console.log(newContent);
    });

    this.server.on("disconnect", function() {
      console.log("disconected");
    });

    //childs communication

    this.$root.$on("launchChar", function() {
      //TODO make visible character
    });

    this.$root.$on("launchInv", function() {
      //TODO make visible inventory
    });

    this.$root.$on("launchFriendList", function() {
      //TODO make visible friend list
    });

    this.$root.$on("launchMessages", function() {
      //TODO make visible private messages
    });

    this.$root.$on("launchPets", function() {
      //TODO make visible owned pets
    });

    this.$root.$on("launchExit", function() {
      dialog.showMessageBox(
        {
          type: "warning",
          buttons: [this.text.yes, this.text.no],
          title: this.text.title,
          message: this.text.exit
        },
        answer => {
          if (answer == 0) {
            this.$router.go(-1);
          }
        }
      );
    });

    this.$root.$on("launchClose", function() {
      dialog.showMessageBox(
        {
          type: "warning",
          buttons: [this.text.yes, this.text.no],
          title: this.text.title,
          message: this.text.close
        },
        answer => {
          if (answer == 0) {
            this.windowRef.close();
          }
        }
      );
    });

    //TODO prepare server sendData
    //this.game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    //itgame.time.events.remove(timer);
    //TODO to let chat use all the keyboard, on focus and blur on the textchat
    //
    //TODO @keyup.esc open menu
    //esto pero con el focus de la caja de
    /*  $("#game").mouseenter(function () {
       game.input.enabled = true;
     });
 
     $("#game").mouseleave(function () {
       game.input.enabled = false;
 
     }); */
    setCharLaunch(undefined);
  }
};
</script>

<style scoped>
#index {
  width: 100%;
  height: 100%;
}

#chat {
  position: absolute;
  left: 0px;
  bottom: 0px;
  border: 1px solid rgb(0, 0, 0);
  /*   height: 360px;
  width: 270px; */
  height: 50%;
  width: 20%;
}

/* #topContent {
} */

#mainContent {
  background-color: lightgrey;
  position: absolute;
  width: 100%;
  height: 100%;
}

#referenceDiv {
  position: relative;
}
</style>