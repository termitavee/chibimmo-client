/*
//main js file of menu
//TODO tomar idioma de la base de datos, si hay, si no, por defecto inglés
//TODO tomar token si hay
*/
const svgCaptcha = require('svg-captcha');
const {ipcRenderer} = require("electron");
//import svgCaptcha  from'./component/log-in-form'
//import {ipcRenderer} from './component/log-in-form'

const logInForm = require('./component/log-in-form')
const characterList = require( './component/character-list')
const character = require( './component/character')
//import logInForm from './component/log-in-form'
//import characterList from './component/character-list'
//import character from './component/character'

console.log('logInForm')
console.log(logInForm)
const indexApp = new Vue({
    el: '#index',
    components:{
        'log-in-form': logInForm,
        'character-list': characterList,
        'character': character
    },
    data: {
        title: "Project Chibimmo",
        content: "<p>Content</p>",    
        isNotLogged: true,
        userName:"Player",
        userData:{},
        language:"en",
        
    },
    methods: {       
        updateContent : function(){
            /*Update the information shown */
        },
        
        launchLoggedContent : function(){
            /*get data from this. userData */
            /*Update the information shown */
            this.isNotLogged=false
            
        },
        
        createNewCharacter: function(){
            /*toggle new window to create character */
            ipcRenderer.send("launchEditor")
        },
        
        saveNewCharacter: function(){
            /*toggle new window to create character */
            ipcRenderer.send("hideEditor")
            
        },
        
        launchGame: function(){
            /*toggle new windo to play game, hide this */
            ipcRenderer.send("LaunchGame")
            
        }
    }
})

indexApp.$on('logIn', function(params) {
    
    console.log('vue on logIn', params);
    //TODO reload window?
    ipcRenderer.send("LogIn")

})


indexApp.$on('createNewCharacter', function(params) {
    
    console.log('vue on createNewCharacter', params);
    this.createNewCharacter()
})

/*
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>') 
*/

console.log("index.js cargado")