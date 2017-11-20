//main js file of the game


/*
formulas de daño 

fis


mag


mix


*/

const {io } = require('socket.io-client')

const feed = require('./component/chat')

const indexApp = new Vue({
  el: '#index',
  components: {
    'chat': chat
  },
  data: {
    user: getUser(),
    language: "en",

  },
  methods: {
  },
  created() {
    //$root
    //TODO check language in database in case user has changed it and save in data
    console.log('oncreated')

  }
})

console.log("logged.js cargado")