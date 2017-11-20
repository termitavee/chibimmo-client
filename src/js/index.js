const svgCaptcha = require('svg-captcha');
const { ipcRenderer } = require("electron");
const { shell } = require('electron')

const logInForm = require('./component/log-in-form')
const feed = require('./component/feed')

//import logInForm from './component/log-in-form'
//import characterList from './component/character-list'
//import character from './component/character'

const indexApp = new Vue({
    el: '#index',
    components: {
        'log-in-form': logInForm,
        'feed': feed,
    },
    data: {
        isLoading: true,
        isNotLogged: true,
        userName: "Player",
        userData: {},
        language: "en",

    },
    methods: {
        updateContent: function () {
            /*Update the information shown */
        },

        launchLoggedContent: function () {
            /*get data from this. userData */
            /*Update the information shown */
            this.isNotLogged = false

        },

        launchWeb: function () {
            
            shell.openExternal('https://chibimmo.tumblr.com/')
        }


    },
    created() {
        //$root
        //TODO check language in database in case user has changed it and save in data
        //TODO check if exist token for this device and send to the server 

        this.isLoading = false
        this.$root.$on('logIn', function (params) {

            console.log('vue on logIn', params);
            
            ipcRenderer.send("logIn", true)

        })

        this.$root.$on('createNewCharacter', function (params) {

            console.log('index on createNewCharacter', params);
            this.createNewCharacter()
        })
    }
})


/*
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>') 
*/

console.log("index.js cargado")