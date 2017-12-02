const svgCaptcha = require('svg-captcha');
const { ipcRenderer } = require("electron");
const { shell } = require('electron')

const logInForm = require('./component/log-in-form')
const feed = require('./component/feed')
const { getUser, setUser, getCharLaunch, setCharLaunch, getIP, setIP } = require('./js/data/db')

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
        userData: {},
        language: "en",
        formIP: getIP(), 
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

        setCharLaunch(null)
        this.isLoading = false

        this.$root.$on('logIn', function (params) {

            console.log('vue on logIn', params);

            fetch("http://" + this.formIP + ":3000/" + params.action, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: JSON.stringify(params.form)
            })
                .then(res => res.json())
                .then(res => {
                    setIP(this.formIP)
                    //TODO alert("response of server");

                    console.log(res);
                    if (res.status == 202) {
                        if ((res.action == "login")) {
                            setUser(res.user)
                            ipcRenderer.send("logIn", true)
                        } else {
                            this.$root.$emit("signedUp")
                            this.loginVisible = true;
                            this.pass = "";
                            email = "";
                            captcha = "";
                        }
                    } else {
                        this.$root.$emit("logInError", res.error);
                    }
                })
                .catch(error => {
                    //TODO marcar ip erronea
                    //net::ERR_CONNECTION_REFUSED
                    //net::ERR_ADDRESS_UNREACHABLE
                    //net::ERR_EMPTY_RESPONSE db not launched
 
                    console.log(error)
                    this.$root.$emit("logInError", error);
                });            
            

        })

    }
})


/*
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>') 
*/

console.log("index.js cargado")