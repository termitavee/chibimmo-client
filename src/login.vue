<template>
<div id="index">

    <div class="pure-u-2-3" id="leftContent">
      <feed></feed>
    </div>
    <!--end side block-->

    <div class="pure-u-1-3" id="main-content">

      <log-in-form> </log-in-form>
      <div class="bottom">
        <span>Server</span>
        <input type="text" v-model="formIP">
        <a href="#" target="" v-on:click="launchWeb">Oficial web</a>
      </div>

    </div>
    <!--end main block-->
  </div>
</template>

<script>
const logInForm = require("./component/log-in-form");
const feed = require("./component/feed");
const { getRemember, setRemember, getIP } = require("./js/data/db");

const device = require("os").hostname();
const remember = getRemember() || null;
console.log(remember);

//require('./js/library/widgets.js')
const {
  getUser,
  setUser,
  getCharLaunch,
  setCharLaunch,
  setIP
} = require("./js/data/db");

module.exports = {
  props: [""],
  components: {
    "log-in-form": logInForm,
    feed: feed
  },
  data: function() {
    return {
      isLoading: true,
      isNotLogged: true,
      userData: {},
      language: "en",
      formIP: getIP()
    };
  },
  methods: {
    launchLoggedContent: function() {
      this.isNotLogged = false;
    },

    launchWeb: function() {
      shell.openExternal("https://chibimmo.tumblr.com/");
    },
    checkToken: function() {
      console.log(this.formIP);
      if (remember != null && this.formIP != null) {
        fetch("http://" + this.formIP + ":3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: JSON.stringify({
            token: remember.token,
            user: remember.user,
            remember: true,
            device
          })
        })
          .then(res => res.json())
          .then(res => {
            console.log("response");
            if (res.status == 202) {
              setUser(res.user);
              //user, token, device
              setRemember({ user: res.user._id, token: res.token, device });

              this.$router.push("/logged");
            }
          })
          .catch(error => {});
      }
    }
  },
  created: function() {
    //$root
    //TODO check language in database in case user has changed it and save in data
    //TODO check if exist token for this device and send to the server
    console.log("created");
    setCharLaunch(null);
    this.isLoading = false;

    this.checkToken();
    const that = this
    this.$root.$on("logIn", function(params) {
      console.log("vue on logIn", params);

      fetch("http://" + that.formIP + ":3000/" + params.action, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify(params.form)
      })
        .then(res => res.json())
        .then(res => {
          setIP(that.formIP);
          //TODO alert("response of server");

          console.log(res);
          if (res.status == 202) {
            if (res.action == "login") {
              setUser(res.user);
              if (res.token) setRemember(res.user._id, res.token);

              that.$router.push("/logged");
            } else {
              this.$root.$emit("signedUp");
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

          console.log(error);
          this.$root.$emit("logInError", error);
        });
    });
  }
};

console.log("login.js cargado");
</script>

<style scoped>
#index {
  width: 100%;
}
</style>