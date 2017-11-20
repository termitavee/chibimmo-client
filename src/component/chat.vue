<template>
<div>
  <div>received messages</div>
  <div>
    send box
    send button
  </div>
</div>
</template>

<script>
import io from 'socket.io-client';

module.exports = {
  props: ["user"],
  data: function() {
    return {
      messages: [{ user: "System", message: "Welcome to the chat" }]
    };
  },
  methods: {
    send: function() {
      this.$emit("increment");
    },
    $mounted: function() {
      console.log("mounted function");
    }
  },

  $mounted: function() {
    console.log("mounted param");

  }
};
</script>

<style scoped>

</style>