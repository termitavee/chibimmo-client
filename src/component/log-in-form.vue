<template>
<div id="formContent">
    <a v-text="loginVisible?comText.logIn.changeSignIn:comText.logIn.changeSignUp" @click="toggleLogin" class="pure-button" >Log in</a>
    
    <p>
      <span v-text="comText.logIn.nick">User name</span><br>
      <input type="text" v-model="form.user" @input="$v.form.user.$touch()"  v-bind:class="{error: $v.form.user.$error && !loginVisible, valid: $v.form.user.$dirty && !$v.form.user.$invalid && !loginVisible}"><br>
      <span class="error-msg" v-if="$v.form.user.$error && !loginVisible"> Name too short.</span>
    </p>
    <p>
      <span v-text="comText.logIn.pass">Pasword</span><br>
      <input type="password" v-model="form.pass" @input="$v.form.pass.$touch()"  v-bind:class="{error: $v.form.pass.$error && !loginVisible, valid: $v.form.pass.$dirty && !$v.form.pass.$invalid && !loginVisible}"><br>
      <span class="error-msg" v-if="$v.form.pass.$error && !loginVisible"> Password too insecure.</span>
    </p>

    <div v-show="!loginVisible">
      <p>
        <span v-text="comText.logIn.confirm">Repeat pasword</span><br>
        <input type="password" v-model="form.pass2" @input="$v.form.pass2.$touch()"  v-bind:class="{error: $v.form.pass2.$error, valid: $v.form.pass2.$dirty && !$v.form.pass2.$invalid}"><br>
        <span class="error-msg" v-if="$v.form.pass2.$error">Passwords do not match.</span>
      </p>
      <p>
        <span v-text="comText.logIn.email">Email</span><br>
        <input type="email" v-model="form.email" @input="$v.form.email.$touch()"  v-bind:class="{error: $v.form.email.$error, valid: $v.form.email.$dirty && !$v.form.email.$invalid}"><br>
        <span class="error-msg" v-if="$v.form.email.$error">Not a valid Email.</span>
      </p>
        <p>
          <span v-text="comText.logIn.captcha">Enter captcha below</span><br>
          <span v-html="captcha.data"></span><br>
          <input type="text" v-model="form.catcha" @keyup.enter="submit">
      </p>
    </div>
    <div v-show="loginVisible">
      <p>
        <input type="checkbox" v-model="form.remember">
        <span v-text="comText.logIn.remember">Remember?</span>
      </p>
        
    </div>
   
  <a v-text="comText.logIn.submit" @click="submit" class="pure-button" >Submit</a>
    
</div><!--end login block-->

</template>

<script>
const svgCaptcha = require("svg-captcha");
const {
  required,
  minLength,
  maxLength,
  requiredUnless,
  sameAs,
  ipAddress,
  url,
  or,
  email
} = require("vuelidate/lib/validators");

const { setUser } = require("../js/data/db");
//TODO captcha
module.exports = {
  name: "formContent",
  props: ["comText"],
  data: function() {
    return {
      loginButton: "Change to Sign Up",
      loginVisible: true,
      form: {
        user: "termitavee",
        pass: "termitavee",
        pass2: "",
        email: "",
        captcha: "",
        text: {},
        remember: false
      },
      captcha: svgCaptcha.create(),
      submitButton: "Submit"
    };
  },
  validations: {
    form: {
      user: {
        required,
        minLength: minLength(4)
      },
      pass: {
        required,
        minLength: minLength(6)
      },
      pass2: {
        required: requiredUnless("loginVisible"),
        sameAsPassword: sameAs("pass")
      },
      email: {
        email,
        required: requiredUnless("loginVisible"),
        minLength: minLength(4)
      },
      captcha: {
        required: requiredUnless("loginVisible"),
        minLength: minLength(4),
        maxLength: maxLength(4)
      }
    }
  },
  methods: {
    toggleLogin: function() {
      this.loginButton = this.loginVisible
        ? this.comText.logIn.changeSignUp
        : this.comText.logIn.changeSignIn;

      this.loginVisible = !this.loginVisible;
    },
    submit: function() {
      const { form, formIP } = this.$v;
      if (
        !form.user.$invalid &&
        !form.pass.$invalid &&
        (this.loginVisible || (!form.pass2.$invalid && !form.email.$invalid))
      ) {
        //TODO some kind of loading
        const action = this.loginVisible ? "LogIn" : "SignUp";
        console.log(action);
        //http://127.0.0.1:1993
        //termitavee.ddns.net
        this.$root.$emit("logIn", { action, form: this.form });
      } else {
        this.captcha = svgCaptcha.create();
        //TODO mark wrong parts
      }
    }
  },
  created() {
    console.log(this);
    this.text = this.comText.logIn;
    this.loginButton = this.comText.logIn.changeSignIn;
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
.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline-color: #f99;
}

.valid {
  border-color: #5a5;
  background: #efe;
}

.valid:focus {
  outline-color: #8e8;
}

.center {
  text-align: center;
}

.error-msg {
  color: red;
  font-size: small;
}
</style>