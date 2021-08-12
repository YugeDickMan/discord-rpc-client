<template>
  <div>
    <h1>Discord RPC</h1>
    <UI></UI>
  </div>
</template>

<script>
import UI from "../components/RPC UI.vue";

export default {
  components: { UI }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
body {
  background-color: #535c68;
}
h1 {
  text-align: center;
  font-family: "Lato", sans-serif;
  color: white;
}
</style>
