<template>
<div id="formContent">
    <a v-text="loginButton" @click="toggleLogin" class="pure-button" >Log in</a>
    
    <div v-show="!loginVisible">
        <p>
            <span>User name</span><br>
            <input type="text" v-model="form.user">
        </p>
        <p>
            <span>Pasword</span><br>
            <input type="password" v-model="form.pass">
        </p>
        <p>
            <span>Repeat pasword</span><br>
            <input type="password" v-model="form.pass2">
        </p>
        <p>
            <span>Email</span><br>
            <input type="email" v-model="form.email">
        </p>
        <p>
            <span>Enter captcha below</span>
            <span v-html="captcha.data"></span>
            
            <input type="text" v-model="form.catcha" @keyup.enter="submit">
        </p>
    </div>
    
    <div v-show="loginVisible">
        <p>
            <span>User name</span><br>
            <input type="text" v-model="form.user">
        </p>
        <p>
            <span>Pasword</span><br>
            <input type="password" v-model="form.pass" @keyup.enter="submit">
        </p>
        <p>
            <input type="checkbox" v-model="form.remember">
            <span>Remember?</span>

        </p>
        
    </div>
    <a v-text="submitButton" @click="submit" class="pure-button" >Submit</a>
    
</div><!--end login block-->

</template>

<script>
const svgCaptcha = require("svg-captcha");
const { setUser } = require("../js/data/db");

module.exports = {
  name: "formContent",
  props: [],
  data: function() {
    return {
      loginButton: "Change to Sign Up",
      loginVisible: true,
      form: {
        user: "",
        pass: "",
        pass2: "",
        email: "",
        captcha: "",
        remember: false
      },
      captcha: svgCaptcha.create(),
      submitButton: "Submit"
    };
  },
  methods: {
    toggleLogin: function() {
      this.loginButton = this.loginVisible
        ? "Change to LogIn"
        : "Change to Sign Up";

      this.loginVisible = !this.loginVisible;
    },
    submit: function() {
      const { user, pass, pass2, email, captcha } = this.form;
      let validUser = false;
      let messageUser = "";

      let validPass = false;
      let messagePass = "";

      let validPass2 = false;
      let messagePass2 = "";

      let validEmail = false;
      let messageEmail = "";

      let validCaptcha = false;

      const symbPatt = /\W/g;
      const digitPatt = /\d/g;
      const emailPatt = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/i;

      //check user
      if (user.length < 4) {
        validUser = false;
        messageUser = "name too hort";
      } else {
        validUser = true;
      }

      //check pass
      if (pass.length < 6) {
        validPass = false;
        messagePass = "password too hort";
      } else {
        if (pass != pass2) {
          validPass2 = false;
          messagePass2 = "password don't match";
        } else validPass = true;

        if (!digitPatt.test(pass)) messagePass = "May use numbers";

        if (!symbPatt.test(pass))
          messagePass =
            messagePass.length != 0
              ? messagePass + " and symbols"
              : "May use symbols";
      }
      if (!this.loginVisible) {
        if (emailPatt.test(email)) {
          validEmail = true;
        } else {
          validEmail = false;
          messageEmail = "There is something strange here";
        }

        if (captcha == this.captcha.text) validCaptcha = true;
      } else {
        validEmail = true;
        validCaptcha = true;
      }

      //TODO some testing
      console.log("validUser=" + validUser);
      console.log("validPass=" + validPass);
      console.log("validPass2=" + validPass2);
      console.log("validEmail=" + validEmail);
      console.log("validCaptcha=" + validCaptcha);
      console.log("messageUser=" + messageUser);
      console.log("messagePass=" + messagePass);
      console.log("messageEmail=" + messageEmail);
      validUser = true;
      validPass = true;
      validPass2 = true;
      validEmail = true;
      validCaptcha = true;
      if (validUser && validPass && validPass2 && validEmail && validCaptcha) {
        //TODO some kind of loading
        const action = this.loginVisible ? "LogIn" : "SignUp";
        console.log(action);
        //http://127.0.0.1:3000
        //termitavee.ddns.net
        this.$root.$emit("logIn", { action, form: this.form });
      } else {
        this.captcha = svgCaptcha.create();
        //TODO mark wrong parts
      }
    }
  },
  created() {
    this.$root.$on("logInError", function(error) {
      switch (error) {
        case "user":
          //TODO show there is a problem with the user
          break;

        case "password":
          //TODO show there is a problem with the pass
          break;
        case "email":
          break;

        case "User exist":
          //TODO show there is a problem with the email
          break;

        case "internal error":
          //TODO server error
          break;
        default:
          //if bad use? SERVER NOT FOUND
          console.log("Request failed", error);
          this.captcha = svgCaptcha.create();
      }
    });

    this.$root.$on("signedUp", function() {
      this.loginVisible = true;
      this.pass = "";
      this.email = "";
      this.captcha = "";
    });
  }
};
</script>

<style scoped>
#formContent {
  margin-top: 15px;
}
</style>