<template>
<div id="index" class="pure-1-1">

    <div id="main-content">

      <log-in-form :comText="fileText.component"> </log-in-form>
      <div class="bottom">
        <span v-text="text.server">Server</span><br>
        <input type="text" v-model="formIP"><br>
        <a href="#" target="" v-on:click="launchWeb">Oficial web</a>
      </div>

    </div>
    <div>
<language-selector id="languageBox" :change="changeLang" :language="fileText.component.lang"/>

    </div>
    <!--end main block-->
  </div>
</template>

<script>
const logInForm = require("./component/log-in-form");
const languageSelector = require("./component/language");
const feed = require("./component/feed");
const enText = require("./js/data/lang/en.json");
const esText = require("./js/data/lang/es.json");
console.log(enText);
const {
  getRemember,
  setRemember,
  getIP,
  getLang,
  setLang
} = require("./js/data/db");

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
    feed: feed,
    "language-selector": languageSelector
  },
  data: function() {
    return {
      isLoading: true,
      isNotLogged: true,
      userData: {},
      lang: "none",
      fileText: enText,
      text: enText.windows.logIn,
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
    doLogin: function(params, action = login) {
      console.log("do login");
      console.log(params);
      console.log(action);
      fetch(`http://${this.formIP}:1993/${action}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify(params)
      })
        .then(res => res.json())
        .then(res => {
          setIP(this.formIP);

          this.isLoading = false;
          console.log(res);
          if (res.status == 202) {
            if (res.action == "login") {
              setUser(res.user);
              if (res.remember) setRemember(res.user._id);

              this.$router.push("/logged");
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

          this.isLoading = false;
          console.log(error);
          this.$root.$emit("logInError", error);
        });
    },
    changeLang: function(newLang) {
      if (this.lang != newLang) {
        this.lang = newLang;
        setLang(newLang);
        switch (newLang) {
          case "en":
            //JSON.parse(JSON.stringify(enText))
            this.text = enText["windows"]["logIn"]
            this.fileText = enText

            break
          case "es":
            this.text = esText["windows"]["logIn"]
            this.fileText = esText
        }
      }
    }
  },
  created: function() {
    const remember = getRemember() || false;
    console.log(remember);
    //autologin
    if (remember && this.formIP != null && window.history.length > 2) {
      console.log("should do a login");
      doLogin({ user: remember, remember: true });
    }
    //load language
    this.language = getLang() || "en";

    setCharLaunch(null);
    const that = this;
    this.$root.$on("logIn", function(params) {
      console.log("vue on logIn", params);
      that.doLogin(params.form, params.action);
    });
  },
  mounted: function() {
    this.changeLang(this.lang);
  }
};
</script>

<style scoped>
#index {
  width: 100%;
}
#main-content {
  width: 100%;
  text-align: center;

  letter-spacing: 0em;
}
#languageBox {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.bottom {
  position: absolute;
  bottom: 10px;
  left: 1px;
  right: 1px;
}
</style>