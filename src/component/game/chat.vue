<template>
<div id="chat">

  <ul id="chat-List" >
    <li v-for="(item, key) in messages" :key="key">{{item.user+": "+item.content}}</li>
  </ul>

    <!-- @focus="writting" v-on:blur="stopped" -->
  <input id="chat-input"  type="text" v-model="sendMessage" ref="textBox" v-on:click="writting" @keyup.enter="send" maxlength="35"/>
  <span id="chat-send" class="pure-button" @click="send" v-text="text.send"/>


</div>
</template>

<script>
//TODO implementar pestañas para chat locales
import io from "socket.io-client";
//, { transports: ['websocket'] }
let that = null;
module.exports = {
  props: ["user", "serverIP", "serverIP", "text"],
  data: function() {
    return {
      messages: [],
      sendMessage: "",
      socket: io(`http://${this.serverIP}:1993/chat`),
      sendButton: "Send"
    };
  },
  methods: {
    send: function() {
      //TODO give control back
      const message = this.sendMessage;
      if (message.trim() != 0 && message.length < 35) {
        console.log(
          "send message " + this.sendMessage + " by " + this.user._id
        );
        this.socket.emit("message", {
          user: this.user._id,
          content: this.sendMessage
        });
        this.messages.push({ user: this.user._id, content: this.sendMessage });
        this.sendMessage = "";
      } else {
        //TODO lose focus on input
        this.$refs.textBox.blur();
      }
    },
    writting: function(){
      //TODO if focused
      console.log(this.$refs.textBox)
    }
  },
  mounted: function() {
    
    this.messages.push({ user: "System", content: this.text.welcome });
    that = this;

    //socket functionality
    this.socket.on("connect", function() {
      console.log("connected");
    });

    this.socket.on("newMessage", function(message) {
      console.log("message recived");
      console.log(message);
      that.messages.push({ user: message.user, content: message.content });
    });

    this.socket.on("disconnect", function() {
      console.log("disconected");
    });
    this.$root.$on("focusChat", function() {
      document.getElementsByTagName("input")[0].focus();
    });
    document.getElementsByTagName("input")[0].onblur = function() {
      that.blurInput();
    };

    document.getElementsByTagName("input")[0].onfocus = function() {
      that.writting();
    };
  }
};
</script>

<style scoped>
* {
  font-size: 0.9em;
}
ul {
  padding: 5px;
  height: 75%;
}
#chat {
  background-color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0em;
  height: 50%;
  padding-bottom: 40px;
}
#chat-List {
  overflow: auto;
  height: 100%;
  margin: 0;
}

#chat-input {
  height: 1em;
  position: absolute;
  left: 0;
  width: calc(100% - 6em);
  padding: 5px;
}

#chat-send {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 5em;
  height: 2em;
  padding: 7px 3px;
  margin-bottom: 5px;
}
</style>