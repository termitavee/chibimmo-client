const { ipcRenderer } = require("electron");
//import svgCaptcha  from'./component/log-in-form'
//import {ipcRenderer} from './component/log-in-form'

const feed = require('./component/feed')
const characterList = require('./component/character-list')
const character = require('./component/character')
//import logInForm from './component/log-in-form'
//import characterList from './component/character-list'
//import character from './component/character'
const { getUser, setCharLaunch } = require('./js/data/db')

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

        updateContent: function () {
            /*Update the information shown */
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

        this.$root.$on('openCharacterEditor', function (character) {
            console.log('logged.js on openCharacterEditor', character);
            if (character != null) {
                //TODO save data in db
                
            }
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

        this.$root.$on("remove", function (id) {
            console.log("remove on logged", id);
        });

    }
})

console.log("logged.js cargado")