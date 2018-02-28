<template>
<div id="index" >
  <div id="mainContent" />
  <character-bar :fileText="fileText" :player="player" ></character-bar>
  <chat id="chat" :user="user" :formIP="formIP" :fileText="fileText" :text="fileText.chat" />
  <div id="referenceDiv"></div>
</div>
</template>

<script>
import io from "socket.io-client";
import { preload, create, update } from "./js/phaserUtil.js";
import { getLang, getCharLaunch } from "./js/data/db.js";
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
import chat from "./component/game/chat";
import characterBar from "./component/game/top-bar";
import { getUser, getIP, getCharLaunch, setCharLaunch } from "./js/data/db";
import { game as prePhaser } from "./js/phaserUtil";

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
      layer: {},
      player: {},
      characters: {},
      charactersColisionGroup: {},
      enemyColisionGroup: {},
      mapColisionGroup: {},
      cursors: {}
    };
  },
  components: {
    chat,
    "character-bar": characterBar
  },
  methods: {
    createCharacter: function(character) {
      const {
        bodyColor,
        hair,
        hairColor,
        equipment,
        map,
        position,
        direction
      } = character;
      //const newPlayer = this.game.add.sprite(position.x * 32 + 16, position.y * 32 + 16, `body${bodyColor}`)
      const newPlayer = characters.create(
        position.x * 32 + 16,
        position.y * 32 + 16,
        `body${bodyColor}`
      );
      newPlayer.hair = this.player.addChild(
        this.game.make.sprite(0, 0, `hair${hair}`)
      );
      newPlayer.clothes = this.player.addChild(
        this.game.make.sprite(0, 0, `clothes${hair}`)
      );
      newPlayer.hair.tint = hairColor;
      newPlayer.anchor.setTo(0.5, 0.5);
      newPlayer.frame = this.parseDirection(direction);
      // movement
      newPlayer.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      newPlayer.animations.add(
        "lat",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      newPlayer.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );
      newPlayer.hair.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      newPlayer.hair.animations.add(
        "lat",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      newPlayer.hair.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );

      //make it solid
      this.game.physics.p2.enable(newPlayer, true); //TODO,false,true
      //newPlayer.body.clearShapes()
      newPlayer.body.addRectangle(15, 20);

      //make it colide
      newPlayer.body.setCollisionGroup(this.charactersColisionGroup);
      newPlayer.body.collides([
        this.charactersColisionGroup,
        playerCollisionGroup
      ]);

      return newPlayer;
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
        return character._id == id;
      }, true);

      //TODO edit found
    },

    deleteCharacter: function(character) {
      const { _id, equipment, map, position } = character;
      const found = this.characters.filter((character, index, list) => {
        return character._id == id;
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
    }
  },
  created: function() {
    this.formIP = getIP();
    this.server = io(`http://${formIP}:1993/game`);
    const lang = getLang();
    console.log(lang);
    this.fileText = langFiles[getLang()];
    this.text = langFiles[getLang()].main;
  },
  mounted: function() {
    console.log("onMounted");
    this.user = getUser();
    this.character = getCharLaunch();

    let self = this;

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