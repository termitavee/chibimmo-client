<template>
<div>
  <p v-text="title"></p>
  <div id="flags">
    <img src="./img/en.png" alt="EN" @click="en" v-bind:class="{selected: language == 'en'}">
    <img src="./img/es.png" alt="ES" @click="es" v-bind:class="{selected: language == 'es'}">
  </div>
</div>
</template>

<script>
module.exports = {
  props: ["change", "language"],
  data: function() {
    return { title: "Language:" };
  },
  methods: {
    en: function() {
      this.current = "en";
      this.title = "Language";
      this.change("en");
    },
    es: function() {
      this.current = "es";
      this.title = "Idioma";
      this.change("es");
    }
  },

  mounted: function() {
    //TODO mark current from this.language
  }
};
</script>

<style scoped>
p {
  letter-spacing: 0em;
}
img{
  padding: 1px
}
.selected{
  border: 1px solid red;

}
#flags {
  margin-left: 0.8em;
  word-spacing: 1em;
}
</style>