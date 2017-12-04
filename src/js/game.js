//main js file of the game
/*
formulas de daño 
fis
mag
mix
*/
import io from "socket.io-client";
//TODO change ip
//const { io } = require('socket.io-client')
const chat = require('./component/chat')
const characterBar = require('./component/character-bar')

const { getUser, getCharLaunch, setCharLaunch } = require('./js/data/db')
let moving = 0;
const indexApp = new Vue({
  el: '#index',
  components: {
    'chat': chat,
    'character-bar': characterBar
  },
  data: {
    user: {},
    character: {},
    language: "en",
    server: io("http://127.0.0.1:3000/game"),
    game: {},
    map: {},
    layer: {},
    player: {},
    characters: {},
    cursors: {},

  },
  methods: {
    preload: function (phaser) {
      //All skin
      this.game.load.atlasJSONHash('body0', './img/sprites/body/0/base.png', './img/sprites/body/0/base.json')
      this.game.load.atlasJSONHash('body1', './img/sprites/body/1/base.png', './img/sprites/body/1/base.json')
      this.game.load.atlasJSONHash('body2', './img/sprites/body/2/base.png', './img/sprites/body/2/base.json')
      this.game.load.atlasJSONHash('body3', './img/sprites/body/3/base.png', './img/sprites/body/3/base.json')
      this.game.load.atlasJSONHash('body4', './img/sprites/body/4/base.png', './img/sprites/body/4/base.json')
      this.game.load.atlasJSONHash('body5', './img/sprites/body/5/base.png', './img/sprites/body/5/base.json')
      this.game.load.atlasJSONHash('body6', './img/sprites/body/6/base.png', './img/sprites/body/6/base.json')
      //All hair
      this.game.load.atlasJSONHash('hair0', './img/sprites/hair/0.png', './img/sprites/hair/0.json')
      this.game.load.atlasJSONHash('hair1', './img/sprites/hair/1.png', './img/sprites/hair/1.json')
      //All clothes
      this.game.load.atlasJSONHash('clothes0', './img/sprites/body/0/clothes.png', './img/sprites/body/0/clothes.json')
      //All items
      //All maps
      //this.game.load.tilemap('myWorld', './img/map/world 1.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.tilemap('myWorld', './img/map/world 1 - small.json', null, Phaser.Tilemap.TILED_JSON);

      //All map sprites

      this.game.load.image('town_forest_tiles', './img/map/spriteset/town_forest_tiles.png');
      this.game.load.image('wood_tileset', './img/map/spriteset/wood_tileset.png');


    },
    create: function (phaser) {

      this.map = this.game.add.tilemap('myWorld')

      this.map.addTilesetImage('wood_tileset', 'wood_tileset')
      this.map.addTilesetImage('town_forest_tiles', 'town_forest_tiles')
      this.layer.background = this.map.createLayer('background');
      this.layer.foreground = this.map.createLayer('foreground');
      //6,7,8,19,21, 24 ,36,37, 
      //this.map.setCollision([189, 190, 191, 192, 205, 206, 207, 208, 221, 222, 223, 224, 237, 238, 239, 240, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 277, 278, 279, 279, 280, 281, 282, 283, 284, 285, 286], true, this.layer.foreground)
      //TODO colision and characters do async
      this.map.setCollisionBetween(189, 192, true, this.layer.foreground)
      this.map.setCollisionBetween(205, 208, true, this.layer.foreground)
      this.map.setCollisionBetween(221, 224, true, this.layer.foreground)
      this.map.setCollisionBetween(237, 240, true, this.layer.foreground)
      this.map.setCollisionBetween(253, 263, true, this.layer.foreground)
      this.map.setCollisionBetween(277, 286, true, this.layer.foreground)
      //foreground.setScale(worldScale);
      //background.setScale(worldScale);
      this.layer.foreground.debug = true;

      this.layer.background.resizeWorld();
      this.layer.foreground.resizeWorld();
      this.cursors = this.game.input.keyboard.createCursorKeys();

      //Add user
      //TODO get character personalization
      const { } = this.character
      //TODO posicion x*32+16
      this.player = this.game.add.sprite(3216, 3664, 'body0')
      this.player.hair = this.player.addChild(this.game.make.sprite(0, 0, 'hair0'))

      this.player.animations.add('down', Phaser.Animation.generateFrameNames('', 1, 11, ''), 18, true, true)
      this.player.animations.add('lat', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
      this.player.animations.add('up', Phaser.Animation.generateFrameNames('', 24, 34, ''), 18, true, true)
      this.player.hair.animations.add('down', Phaser.Animation.generateFrameNames('', 1, 11, ''), 18, true, true)
      this.player.hair.animations.add('lat', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
      this.player.hair.animations.add('up', Phaser.Animation.generateFrameNames('', 24, 34, ''), 18, true, true)

      this.game.physics.enable(this.player)

      this.player.body.setSize(22, 18);
      this.game.camera.follow(this.player);
      this.player.body.collideWorldBounds = true;
      this.player.anchor.setTo(.5, .5)
      //TODO Phaser.Physics.Arcade.collide(this.player, this.layer.foreground)

    },
    update: function (phaser) {
      //TODO control movement and user actions
      this.game.physics.arcade.collide(this.player, this.layer.foreground);
      moving = 0
      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -1000;
        this.player.scale.setTo(-1, 1);
        moving = 1
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 1000;
        this.player.scale.setTo(1, 1);
        moving = 1
      } else {
        this.player.body.velocity.x = 0;

      }

      if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -1000;
        moving = 2
      } else if (this.cursors.down.isDown) {
        this.player.body.velocity.y = 1000;
        moving = 3
      } else {
        this.player.body.velocity.y = 0;
      }
      //TODO     this.socket.emit("moveUSer", this.user._id);
      //TODO @keyup.esc open menu
      switch (moving) {
        case 0:
          this.player.animations.stop()
          break
        case 1:
          this.player.play('lat');
          break
        case 2:
          this.player.play('up');
          break
        case 3:
          this.player.play('down');
          break
      }

      //TODO send data to server
    },
    addCharacter: function (character) {
      //TODO get character visual parameters, print it and save reference

      //save character
      // = character
      //create game character
      const { bodyColor, hair, hairColor, equipment, stadistics, map, position } = character
      const newPlayer = this.game.add.sprite(position.x, position.y, `body${bodyColor}`)
      newPlayer.hair = this.player.addChild(this.game.make.sprite(0, 0, `body${hair}`))
      newPlayer.hair.tint = hairColor

      //TODO movement


      //save reference
      this.characters[character._id] = newPlayer
      this.characters[character._id].stats = character
    },
    editCharacter: function (character) {
      //TODO get character visual parameters, print it and save reference

    },
    deleteCharacter: function (character) {
      //TODO get character visual parameters, print it and remove reference

    },
  },
  mounted() {
    console.log('onMounted')
    this.user = getUser()
    this.character = getCharLaunch()

    let self = this

    this.game = new Phaser.Game('100', '100', Phaser.AUTO, "mainContent", { preload, create, update }, true, false);
    function preload() {
      self.preload(this)

    }

    function create() {
      self.create(this)

    }
    function update() {
      self.update(this)
    }

    this.server.on("connect", function () {
      console.log("connected");
    });
    this.server.emit("startGame", this.user._id);

    this.server.on("updateGame", function (newContent) {
      console.log("new content recived");
      console.log(newContent);
    });

    this.server.on("alert", function (newContent) {
      console.log("new important content recived");
      console.log(newContent);
    });

    this.server.on("disconnect", function () {
      console.log("disconected");
    });

  }
})

console.log("logged.js cargado")