const { ipcRenderer, remote } = require("electron");
const { dialog } = remote

const feed = require('./component/feed')
const characterList = require('./component/character-list')
const character = require('./component/character')
const { getUser, setCharLaunch, getIP } = require('./js/data/db')

const indexApp = new Vue({
  el: '#index',
  components: {
    'feed': feed,
    'character-list': characterList,
    'character': character,
  },
  data: {
    user: getUser(),
    language: "en",
    logOut: "log Out",

  },
  methods: {

    exitLog: function () {
      ipcRenderer.send("logIn", false)
    },

    launchLoggedContent: function () {
      /*get data from this. userData */
      /*Update the information shown */
      this.isNotLogged = false

    },

    createNewCharacter: function () {
      /*toggle new window to create character */
      ipcRenderer.send("launchEditor")
    },

    saveNewCharacter: function () {
      /*toggle new window to create character */
      ipcRenderer.send("hideEditor")

    },

  },
  created() {
    //TODO check language in database in case user has changed it and save in data

    this.$root.$on('openCharacterEditor', function () {
      console.log('logged.js on openCharacterEditor');
      ipcRenderer.send("launchEditor")
    })

    this.$root.$on('launchGame', function (character) {
      console.log('logged.js on launchGame for ', character);
      if (character != null) {
        setCharLaunch(character)
        ipcRenderer.send("launchGame")
      } else
        console.log('Something strange in launchGame')

    })

    this.$root.$on("remove", function (param) {
      console.log("remove on logged", param);
      const {id, pos} = param

      //const charName = this.character._id;
      dialog.showMessageBox(
        {
          type: "warning",
          buttons: ["Cancel", "Delete", "Cancel"],
          title: "chibimmo ask you",
          message: "Are you shure you want to delete \"" + id + "\"?"
        },
        (answer) => {
          if (answer == 1) {
            const serverIP = getIP()
            const dataSend = JSON.stringify({ user: this.user._id, name: id })
            console.log('Fetch data')
            console.log(serverIP)
            console.log(dataSend)
            fetch("http://" + serverIP + ":3000/deletecharacter", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: dataSend
            })
              .then(res => res.json())
              .then(res => {
                console.log(res);
                if (res.status == 202) {
                  console.log('mensaje de borrado con éxito, refrescar ')

                  this.user.characters.splice(pos, 1)
                  setCharLaunch(this.user)

                  //TODO borrar pos de la lista 
                } else {
                  console.log('mensaje de error')
                }
              })
              .catch(error => {

                console.log('mensaje de error en la petición')
                console.log(error)

              });
          }
          console.log('User response=' + answer);
        }
      );

    });

  }
})

console.log("logged.js cargado")