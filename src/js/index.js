/*
//main js file of menu
//TODO tomar idioma de la base de datos, si hay, si no, por defecto inglés
*/

const {ipcRenderer} = require("electron");
const indexApp = new Vue({
    el: '#index',
    data: {
        title: "Project Chibimmo",
        content: "<p>Content</p>",
        loginButton: "Change to Sign Up",
        loginVisible: true,
        form: {
            user:"",
            pass:"",
            email:"",
            
        },
        submitButton:"Submit",
        isNotLogged: true,
        userName:"Player",
        characters:[],
        newCharacter:"Create new",
        
    },
    methods: {
        /*Change LogIn form and Sign up form*/
        toggleLogin : function() {
            
            this.loginButton = this.loginVisible ? "Change to LogIn" : "Change to Sign Up"
            
            this.loginVisible = !this.loginVisible
            
        },
        /*Send to the main process the form data*/
        submit : function(){
            //check user and pass valid
            
            const action = this.loginVisible? "LogIn":"SignUp"

            fetch('http://127.0.0.1/'+action,{
                method: "POST",
                body: this.form
            }).then(res=>res.json())
            .then((res) => {
                console.log(res)
                //if signed up correctly, change to login whith data 
                //if loged in correctli change to info screen
            })
            .catch((error)=>{
                //if bad use?
                console.log('Request failed', error);
                
            })
            //do fetch

            

            console.log("done submit")
        },
        updateContent : function(){
            /*Update the information shown */
        },
        
        createNewCharacter: function(){
            /*toggle new windo to create character */
        },
        launchGame: function(){
            /*toggle new windo to play game, hide this */
        }
    }
})
console.log("js cargado")