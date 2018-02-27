<template>
<div id="index" >
  <div id="mainContent" v-on:click="dummyF"/>
  <character-bar></character-bar>
  <chat id="chat" :user="user" :serverIP="serverIP" />
  <div id="referenceDiv"></div>
</div>
</template>

<script>
//queckes todo delete
import io from "socket.io-client";
import { preload, create, update } from "./js/phaserUtil.js";
/*
formulas de daño 
fis
mag
mix

    game.camera.shake(0.05, 500);

game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);



*/
const chat = require("./component/chat");
const characterBar = require("./component/character-bar");
const {
  getUser,
  getIP,
  getCharLaunch,
  setCharLaunch
} = require("./js/data/db");
const serverIP = getIP();
module.exports = {
  props: [""],
  data: function() {
    return {
      user: {},
      character: {},
      language: "en",
      serverIP,
      server: io(`http://${serverIP}:1993/game`),
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
    chat: chat,
    "character-bar": characterBar
  },
  methods: {
    dummyF: function(param) {
      console.log(param);
    },
    preload: function(phaser) {
      //All skin
      this.game.load.atlasJSONHash(
        "body0",
        "./img/sprites/body/0/base.png",
        "./img/sprites/body/0/base.json"
      );
      this.game.load.atlasJSONHash(
        "body1",
        "./img/sprites/body/1/base.png",
        "./img/sprites/body/1/base.json"
      );
      this.game.load.atlasJSONHash(
        "body2",
        "./img/sprites/body/2/base.png",
        "./img/sprites/body/2/base.json"
      );
      this.game.load.atlasJSONHash(
        "body3",
        "./img/sprites/body/3/base.png",
        "./img/sprites/body/3/base.json"
      );
      this.game.load.atlasJSONHash(
        "body4",
        "./img/sprites/body/4/base.png",
        "./img/sprites/body/4/base.json"
      );
      this.game.load.atlasJSONHash(
        "body5",
        "./img/sprites/body/5/base.png",
        "./img/sprites/body/5/base.json"
      );
      this.game.load.atlasJSONHash(
        "body6",
        "./img/sprites/body/6/base.png",
        "./img/sprites/body/6/base.json"
      );
      //All hair
      this.game.load.atlasJSONHash(
        "hair0",
        "./img/sprites/hair/0.png",
        "./img/sprites/hair/0.json"
      );
      this.game.load.atlasJSONHash(
        "hair1",
        "./img/sprites/hair/1.png",
        "./img/sprites/hair/1.json"
      );
      //All clothes
      this.game.load.atlasJSONHash(
        "clothes0",
        "./img/sprites/body/0/clothes.png",
        "./img/sprites/body/0/clothes.json"
      );
      //All items

      //All maps
      this.game.load.tilemap(
        "myWorld",
        "./img/map/world 1 - small.json",
        null,
        Phaser.Tilemap.TILED_JSON
      );

      //All map sprites

      this.game.load.image(
        "town_forest_tiles",
        "./img/map/spriteset/town_forest_tiles.png"
      );
      this.game.load.image(
        "wood_tileset",
        "./img/map/spriteset/wood_tileset.png"
      );
    },
    create: function(phaser) {
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.map = this.game.add.tilemap("myWorld");

      this.map.addTilesetImage("wood_tileset", "wood_tileset");
      this.map.addTilesetImage("town_forest_tiles", "town_forest_tiles");
      this.layer.background = this.map.createLayer("background");
      this.layer.foreground = this.map.createLayer("foreground");

      //TODO this.game.world.scale.setTo(2, 2);

      this.layer.background.resizeWorld();
      this.layer.foreground.resizeWorld();

      //this.map.setCollision([189, 190, 191, 192, 205, 206, 207, 208, 221, 222, 223, 224, 237, 238, 239, 240, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 277, 278, 279, 279, 280, 281, 282, 283, 284, 285, 286], true, this.layer.foreground)
      //, true, this.layer.foreground
      this.map.setCollisionBetween(189, 192, true, this.layer.foreground);
      this.map.setCollisionBetween(205, 208, true, this.layer.foreground);
      this.map.setCollisionBetween(221, 224, true, this.layer.foreground);
      this.map.setCollisionBetween(237, 240, true, this.layer.foreground);
      this.map.setCollisionBetween(253, 263, true, this.layer.foreground);
      this.map.setCollisionBetween(277, 286, true, this.layer.foreground);
      //setTileIndexCallback
      //setTileLocationCallback

      //const levelData = this.game.cache.getPhysicsData("town_forest_tiles");
      //console.log(levelData);
      //this.game.load.physics('level', 'assets/level.json');
      //this.game.physics.p2.convertTilemap(this.map, this.layer.foreground);
      //this.layer.foreground.debug = true; //TODO delete

      //this.game.physics.p2.restitution = 0.5;

      //Add user
      //TODO get character personalization this.player = this.createCharacter(this.character)
      //["_id", "userID", "type", "orientation", "stadistics", "map", "position", "started", "equipment", "achievements", "hair", "hairColor", "bodyColor"]
      const {
        position,
        equipment,
        hair,
        hairColor,
        bodyColor
      } = this.character;
      console.log("========== game.js - create() - this.character ==========");
      console.log(this.character);
      // posicion x*32+16
      this.player = this.game.add.sprite(3216, 3664, "body0");
      this.player.hair = this.player.addChild(
        this.game.make.sprite(0, 0, "hair0")
      );
      this.player.anchor.setTo(0.5, 0.5);

      //TODO get position 0,1,2,3 up, left right down
      this.player.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      this.player.animations.add(
        "lat",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      this.player.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );
      this.player.hair.animations.add(
        "down",
        Phaser.Animation.generateFrameNames("", 1, 11, ""),
        18,
        true,
        true
      );
      this.player.hair.animations.add(
        "lat",
        Phaser.Animation.generateFrameNames("", 12, 23, ""),
        18,
        true,
        true
      );
      this.player.hair.animations.add(
        "up",
        Phaser.Animation.generateFrameNames("", 24, 34, ""),
        18,
        true,
        true
      );

      //TODO this.player.scale.set(2);
      //physics related
      this.game.physics.p2.enable(this.player, true); //,false,true
      this.player.body.clearShapes();
      this.player.body.addRectangle(15, 20);
      this.player.body.fixedRotation = true;
      this.player.body.collideWorldBounds = true;
      //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
      //.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

      this.game.camera.follow(this.player);
      //TODO all key listener, wasd, esc, enter
      this.cursors = this.game.input.keyboard.createCursorKeys();
      //this.wasd = { up: game.input.keyboard.addKey(Phaser.Keyboard.W), down: game.input.keyboard.addKey(Phaser.Keyboard.S), left: game.input.keyboard.addKey(Phaser.Keyboard.A), right: game.input.keyboard.addKey(Phaser.Keyboard.D), };

      //TODO When the game loses focus set InputManager.enabled (game.input) to false, and switch it back when it gets focus again.

      //prepare colisiohn with other players
      //characters = game.add.group();
      /*var panda = pandas.create(game.world.randomX, game.world.randomY, 'panda');
        panda.body.setRectangle(40, 40); */
      this.charactersColisionGroup = this.game.physics.p2.createCollisionGroup();
      this.charactersColisionGroup.enableBody = true;
      this.charactersColisionGroup.physicsBodyType = Phaser.Physics.P2JS;
      //prepare colisiohn with enemies
      //this.enemyColisionGroup = this.game.physics.p2.createCollisionGroup();
      //this.enemyColisionGroup.enableBody = true;
      //this.enemyColisionGroup.physicsBodyType = Phaser.Physics.P2JS;
      // this.mapColisionGroup = game.physics.p2.createCollisionGroup();
      this.player.body.collides(
        this.charactersColisionGroup,
        this.hitplayer,
        this
      );
      //this.player.body.collides(enemyColisionGroup, hitenemy, this);
      //this.player.body.collides(mapColisionGroup, hitmap, this);
    },
    update: function(phaser) {
      //TODO control movement and user actions
      let moving = 0;

      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -1000;
        this.player.scale.setTo(-1, 1);
        moving = 1;
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 1000;
        this.player.scale.set(1);
        moving = 1;
      } else {
        this.player.body.velocity.x = 0;
      }

      if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -1000;
        moving = 2;
      } else if (this.cursors.down.isDown) {
        this.player.body.velocity.y = 1000;
        moving = 3;
      } else {
        this.player.body.velocity.y = 0;
      }

      switch (moving) {
        case 0:
          this.player.animations.stop();
          break;
        case 1:
          this.player.play("lat");
          break;
        case 2:
          this.player.play("up");
          break;
        case 3:
          this.player.play("down");
          break;
      }

      //TODO this.socket.emit("moveUSer", {user: this.user, });
      /*send user, movement+ifthis.player.scale.x negative=left, action and coordenates */

      //TODO hits for other elemenst like enmies
    },
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
      self.preload(this);
    }

    function create() {
      self.create(this);
    }
    function update() {
      self.update(this);
    }

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