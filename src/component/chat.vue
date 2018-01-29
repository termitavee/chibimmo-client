<template>
<div id="chat">

  <ul id="chat-List" >
    <li v-for="(item, key) in messages" :key="key">{{item.user+": "+item.content}}</li>
  </ul>

  <div id="chat-mesage" >
    <!-- @focus="writting" v-on:blur="stopped" -->
    <input type="text" v-model="sendMessage" ref="textBox" @keyup.enter="send" maxlength="35"/>
    <span @click="send" v-text="sendButton"/>
  </div>

</div>
</template>

<script>
//TODO implementar pestañas para chat locales
import io from "socket.io-client";
//, { transports: ['websocket'] }
let that = null;
module.exports = {
  props: ["user", "serverIP"],
  data: function() {
    return {
      messages: [{ user: "System", content: "Welcome to the chat" }],
      sendMessage: "",
      socket: io(`http://${this.serverIP}:3000/chat`),
      sendButton: "Send"
    };
  },
  methods: {
    send: function() {
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
        document.getElementsByTagName("input")[0].blur();
      }
    }
  },
  writting: function() {
    //TODO send event to avoid listening keyboard
    console.log("is foccused");
  },
  blurInput: function() {
    //TODO send event to constinue
    console.log("is blured");
  },
  mounted: function() {
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
      document.getElementsByTagName("input")[0].focus()
    });
    document.getElementsByTagName("input")[0].onblur = function() {
      that.blurInput()
    };

    document.getElementsByTagName("input")[0].onfocus = function() {
      that.writting()
    };
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 5px;
  height: 85%;
}
#chat {
  background-color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0em;
}
</style>