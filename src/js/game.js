//main js file of the game


/*
formulas de daño 

fis


mag


mix


*/

const { io } = require('socket.io-client')
const { getUser } = require('./js/data/db')
const chat = require('./component/chat')
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
    user: dUser,
    language: "en",
    game: '',

  },
  methods: {
    preload: function (phaser) {

    },
    create: function (phaser) {

    },
    update: function (phaser) {

    },
    method: function () {

    },
  },
  mounted() { 
    console.log('onMounted')

    let self = this
    console.log(this)
    //this.game = new Phaser.Game(500, 600, Phaser.AUTO, "mainContent", { preload, create, update }, true, false);
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