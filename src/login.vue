<template>
<div id="index" class="pure-1-1">

    <div id="main-content">

      <log-in-form :comText="fileText.component" :text="fileText.component.logIn"> </log-in-form>
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
import logInForm from "./component/log-in-form";
import languageSelector from "./component/language";
import feed from "./component/feed";
const langFiles = {
  es: require("./js/data/lang/es.json"),
  en: require("./js/data/lang/en.json")
};

import {
  getUser,
  setUser,
  getRemember,
  setRemember,
  setIP,
  getIP,
  getLang,
  setLang,
  getCharLaunch,
  setCharLaunch
} from "./js/data/db";
import { loadLanguage } from "./js//utils";

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
      fileText: langFiles.en,
      text: langFiles.en.windows.logIn,
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
          if (res.status == 202) {
            if (res.action == "login") {
              setUser(res.user);
              if (res.remember) setRemember(res.user._id);

              this.$router.push("/logged");
            } else {
              this.$root.$emit("signedUp");
            }
          } else {
            console.error("not logged");
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
        this.text = angFiles[newLang]["windows"]["logIn"];
        this.fileText = langFiles[newLang];
      }
    }
  },
  created: function() {
    const remember = getRemember() || false;
    //autologin
    if (remember && this.formIP != null && window.history.length > 2) {
      doLogin({ user: remember, remember: true });
    }
    //load language
    loadLanguage(this, getLang, langFiles, "logIn");

    setCharLaunch(null);
    const that = this;
    this.$root.$on("logIn", function(params) {
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