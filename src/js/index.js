/*
//main js file of menu
//TODO tomar idioma de la base de datos, si hay, si no, por defecto inglés
//TODO tomar token si hay
*/
//const svgCaptcha = require('svg-captcha');
//const {ipcRenderer} = require("electron");
import svgCaptcha  from'./component/log-in-form'
import {ipcRenderer} from './component/log-in-form'

//const logInForm = require('../component/log-in-form')
//const characterList = require( './component/character-list')
//const character = require( './component/character')
import logInForm from './component/log-in-form'
import characterList from './component/character-list'
import character from './component/character'


//create components for content, form (each label?), character list,  
//put them in a file on component folder, also template can require to external html

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
        loginButton: "Change to Sign Up",
        loginVisible: true,
        form: {
            user:"",
            pass:"",
            email:"",
            captcha: "",
        },
        captcha: svgCaptcha.create(),
        submitButton:"Submit",
        isNotLogged: true,
        userName:"Player",
        userData:{},
        newCharacter:"Create new",
        language:"en",
        
    },
    methods: {
        /*Change LogIn form and Sign up form*/
        toggleLogin : function() {
            
            this.loginButton = this.loginVisible ? "Change to LogIn" : "Change to Sign Up"
            
            this.loginVisible = !this.loginVisible
            
        },
        /*Send to the main process the form data*/
        submit : function(){
            const {user, pass, email, captcha} = this.form
            let validUser = false
            let messageUser = ""
            
            let validPass = false
            let messagePass = ""
            
            let validEmail = false
            let messageEmail = ""
            
            let validCaptcha = false
            
            const symbPatt = /\W/g;
            const digitPatt = /\d/g;
            const emailPatt = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/i;
            
            //check user
            if(user.length <4){
                validUser = false
                messageUser = "name too hort"
            }else{
                
                validUser = true
            }
            
            //check pass
            if(pass.length <6){
                validPass = false
                messagePass = "password too hort"
            }else{
                validPass = true
                
                if(!digitPatt.test(pass))
                messagePass = "May use numbers"
                
                if(!symbPatt.test(pass))
                messagePass = messagePass.length!=0? messagePass+" and symbols": "May use symbols"
                
            }
            if(!this.loginVisible){
                if(emailPatt.test(email)){
                    validEmail = true
                }else{
                    validEmail = false
                    messageEmail = "There is something strange here"
                }
                
                if(captcha== this.captcha.text)
                validCaptcha = true
            }else{
                validEmail = true
                validCaptcha = true
            }
            
            //some testing
            console.log("validUser="+validUser)
            console.log("validPass="+validPass)
            console.log("validEmail="+validEmail)
            console.log("validCaptcha="+validCaptcha)
            console.log("messageUser="+messageUser)
            console.log("messagePass="+messagePass)
            console.log("messageEmail="+messageEmail)
            
            
            if(validUser && validPass /*&& validEmail && validCaptcha*/){
                //TODO some kind of loading
                
                const action = this.loginVisible? "LogIn":"SignUp"
                
                fetch('http://127.0.0.1:3000/'+action,
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: JSON.stringify(this.form)
                }).then(res=>res.json())
                .then((res) => {
                    console.log(res)
                    //TODO if signed up correctly, take user info, save intouserName
                    //this.launchLoggedContent()
                    //TODO if loged in correctli change to info screen
                })
                .catch((error)=>{
                    //if bad use?
                    console.log('Request failed', error);
                    this.captcha = svgCaptcha.create()
                    
                })      
            }else{
                this.captcha = svgCaptcha.create()
                //TODO mark wrong parts
            }
            
            //this.launchLoggedContent()
            
            console.log("\"done\" submit")
        },
        
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
            
            /**
            * mainWindow.on('close', event=>{
                event.preventDefault(); //this prevents it from closing. The `closed` event will not fire now
                mainWindow.hide();
            })
            */
        },
        
        saveNewCharacter: function(){
            /*toggle new window to create character */
            ipcRenderer.send("hideEditor")
            
        },
        
        launchGame: function(){
            /*toggle new windo to play game, hide this */
            ipcRenderer.send("LaunchGame")
            
        }
    },
    components:{
        
    }
})

indexApp.$on('submit', function(params) {
    
    console.log('vue on submit', params);
    this.submit()
})


indexApp.$on('createNewCharacter', function(params) {
    
    console.log('vue on createNewCharacter', params);
    this.createNewCharacter()
})

/*
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>') 
*/

console.log("js cargado")