//main js file of the game
/*
formulas de daño 

fis


mag


mix


*/
const { io } = require('socket.io-client')
const chat = require('./component/chat')

const { getUser, getCharLaunch } = require('./js/data/db')
console.log(getUser)
console.log(getCharLaunch)
//TODO EJEMPLO
let dUser = {
  _id: 'root',
    pass: 'root',
      token: { },
  email: 'termitavee@gmail.com',
    characters:
  [{
    _id: 'fdsafdsa',
    userID: 'root',
    type: 'sol',
        stadistics: {},
    started: new Date(),
    equipment: '' },
    {
      _id: 'rewrewwq',
      userID: 'root',
      type: 'mag',
      stadistics: {},
      started: new Date(),
        equipment: '' },
      { _id: 'third',
        userID: 'root',
        type: 'rog',
        stadistics: {},
        started: new Date(),
        equipment: '' } ],
  started: new Date(),
   login: 0,
   friendList: [] }
 

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
      //All items
      //All maps
      this.game.load.tilemap('world1', './img/map/world1.json', null, Phaser.Tilemap.TILED_JSON);
      //All map sprites
      this.game.load.image('town_forest_tiles', './img/map/spriteset/town_forest_tiles.png');
      this.game.load.image('wood_tileset', './img/map/spriteset/wood_tileset.png');

    },
    create: function (phaser) {
      this.map = this.game.add.tilemap('world1')
      const background = this.map.createLayer('background');
      const foreground = this.map.createLayer('foreground');
      const details = this.map.createLayer('details');
      //layer.resizeWorld();
      //this.map.addTilesetImage('wood_tileset','wood_tileset')
    },
    update: function (phaser) {
      //TODO control movement and user actions
    },
    method: function () {

    },
  },
  mounted() { 
    console.log('onMounted')
    this.user = getUser()
    this.character = getCharLaunch()
    
    let self = this
    console.log(this)
    this.game = new Phaser.Game(500, 600, Phaser.AUTO, "mainContent", { preload, create, update }, true, false);
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