<template>
<div id="chat">

  <ul id="chat-List" >
    <li v-for="(item, key) in messages" :key="key">{{item.user+": "+item.content}}</li>
  </ul>

  <div id="chat-mesage" >
    <input type="text" v-model="sendMessage"  @keyup.enter="send" maxlength="35"/>
    <span @click="send" v-text="sendButton"/>
  </div>

</div>
</template>

<script>
import io from "socket.io-client";
//, { transports: ['websocket'] }
let that = null
module.exports = {
  props: ["user"],
  data: function() {
    return {
      messages: [{ user: "System", content: "Welcome to the chat" }],
      sendMessage: "",
      socket: io("http://127.0.0.1:3000/chat"),
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
        this.socket.emit("message", {user: this.user._id, content: this.sendMessage});
        this.messages.push({ user: this.user._id, content: this.sendMessage });
        this.sendMessage = "";
      }else{
        //TODO lose focus on input
document.getElementsByTagName('input')[0].blur()
      }
    }
  },

  mounted: function() {
    that = this
    this.socket.on("connect", function() {
      console.log("connected");
    });

    this.socket.on("newMessage", function(message) {
      console.log("message recived");
      console.log(message);
      //TODO TypeError: Cannot read property 'push' of undefined

      that.messages.push({ user: message.user, content: message.content });
    });

    this.socket.on("disconnect", function() {
      console.log("disconected");
    });
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 5px;
  height: 85%;
}
#chat{
  background-color: rgba(255, 255, 255, 0.4);
}
</style>