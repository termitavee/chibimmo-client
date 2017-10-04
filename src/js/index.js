//main js file of menu
//TODO tomar idioma de la base de datos, si hay, si no, por defecto inglés
const indexApp = new Vue({
    el: '#index',
    data: {
        title: "Name",
        content: "<p>Content</p>",
        login: "logIn",
        signup: "SignUp",
        loginVisible: true,
        signupVisible: false,
        
    },
    methods: {
        showLogin : function() {
            
        },
        showSignup : function() {
            
        },
    }
})
console.log("js cargado")