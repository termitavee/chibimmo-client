//main js file of the game
/*
formulas de daño 
fis
mag
mix
*/
const { io } = require('socket.io-client')
const chat = require('./component/chat')

const { getUser, getCharLaunch, setCharLaunch } = require('./js/data/db')
let moving = 0;
const indexApp = new Vue({
  el: '#index',
  components: {
    'chat': chat
  },
  data: {
    user: {},
    character: {},
    language: "en",
    game: {},
    map: {},
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
      //All items
      //All maps
      //this.game.load.tilemap('myWorld', './img/map/world 1.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.tilemap('myWorld', './img/map/world 1 - small.json', null, Phaser.Tilemap.TILED_JSON);

      //All map sprites

      this.game.load.image('town_forest_tiles', './img/map/spriteset/town_forest_tiles.png');
      this.game.load.image('wood_tileset', './img/map/spriteset/wood_tileset.png');


    },
    create: function (phaser) {
      console.log(this.game)

      this.map = this.game.add.tilemap('myWorld')

      this.map.addTilesetImage('wood_tileset', 'wood_tileset')
      this.map.addTilesetImage('town_forest_tiles', 'town_forest_tiles')

      const background = this.map.createLayer('background');
      const foreground = this.map.createLayer('foreground');
      const details = this.map.createLayer('details');

      background.resizeWorld();
      foreground.resizeWorld();
      details.resizeWorld();
      this.cursors = this.game.input.keyboard.createCursorKeys();

      //Add user
      //TODO get character personalization
      const { } = this.character

      this.player = this.game.add.sprite(3200, 3200, 'body0')
      this.player.hair = this.player.addChild(this.game.make.sprite(0, 0, 'hair0'))

      this.player.animations.add('down', Phaser.Animation.generateFrameNames('', 1, 11, ''), 18, true, true)
      this.player.animations.add('left', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
      this.player.animations.add('right', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
      this.player.animations.add('up', Phaser.Animation.generateFrameNames('', 24, 34, ''), 18, true, true)
      this.player.hair.animations.add('down', Phaser.Animation.generateFrameNames('', 1, 11, ''), 18, true, true)
      this.player.hair.animations.add('left', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
      this.player.hair.animations.add('right', Phaser.Animation.generateFrameNames('', 12, 23, ''), 18, true, true)
      this.player.hair.animations.add('up', Phaser.Animation.generateFrameNames('', 24, 34, ''), 18, true, true)

      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

      this.player.body.setSize(22, 18);
      this.game.camera.follow(this.player);
      this.player.body.collideWorldBounds = true;
      this.player.anchor.setTo(.5, .5)

      console.log(this.player.play)
      console.log(this.animations)

      //this.map.addTilesetImage('wood_tileset','wood_tileset')
    },
    update: function (phaser) {
      //TODO control movement and user actions
      moving = 0
      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -100;
        this.player.scale.setTo(-1, 1);
        moving = 1
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 100;
        this.player.scale.setTo(1, 1);

        moving = 2
      } else {
        this.player.body.velocity.x = 0;
        
      }

      if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -100;
        moving = 3
      } else if (this.cursors.down.isDown) {
        this.player.body.velocity.y = 100;
        moving = 4
      } else {
        this.player.body.velocity.y = 0;
      }
      switch (moving) {
        case 0:

          this.player.animations.stop()
          break

        case 1:

          this.player.play('right');
          break

        case 2:

          this.player.play('left');
          break

        case 3:

          this.player.play('up');
          break

        case 4:

          this.player.play('down');
          break
      }

      //TODO send data to server
    },
    addCharacter: function (character) {
      //TODO get character visual parameters, print it and save reference

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
    console.log(this)
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
  }
})

console.log("logged.js cargado")