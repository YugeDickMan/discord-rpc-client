<template>
  <div id="background">
    <div id="rpc-ui">
      <div class="float-left">
        <h3>Main Details</h3>
        <h4>Client ID</h4>
        <input ref="clientId" name="clientId" required />
        <h4>Details</h4>
        <input ref="details" name="details" />
        <h4>State</h4>
        <input ref="state" name="state" />
      </div>

      <div class="float-left">
        <h3>Optional Details</h3>
        <h4>Large Image Key</h4>
        <input ref="largeImageKey" name="largeImageKey" />
        <h4>Large Image Text</h4>
        <input ref="largeImageText" name="largeImageText" />
        <h4>Small Image Key</h4>
        <input ref="smallImageKey" name="smallImageKey" />
        <h4>Small Image Text</h4>
        <input ref="smallImageText" name="smallImageText" />
      </div>

      <div class="float-right">
        <h3>Buttons</h3>
        <h4>Button 1 Label</h4>
        <input ref="label1" name="label1" />
        <h4>Button 1 URL</h4>
        <input ref="url1" name="url1" />
        <h4>Button 2 Label</h4>
        <input ref="label2" name="label2" />
        <h4>Button 2 URL</h4>
        <input ref="url2" name="url2" />
      </div>

      <div class="bottom">
        <button @click="submit">Start RPC</button>
        <button @click="stopRPC">Stop RPC</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UI",
  methods: {
    submit() {
      const RPCDetails = {};
      for (const props in this.$refs) {
        if (this.$refs[props].value.length === 0) continue;
        RPCDetails[this.$refs[props].name] = this.$refs[props].value;
      }
      if (!RPCDetails.clientId) {
        return alert("Please input a client ID before starting the RPC!");
      }
      fetch("/rpc/change-rpc-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(RPCDetails)
      }).then(data => {
        if (data.status === 200) {
          return alert("Successfully set custom status!");
        } else {
          return alert(
            "An error has occured! Please check the server's console."
          );
        }
      });
    },
    stopRPC() {
      fetch("/rpc/stopRPC", {
        method: "POST"
      }).then(data => {
        if (data.status === 200) {
          return alert("Successfully stopped RPC!");
        } else {
          return alert(
            "An error has occured! Please check the server's console."
          );
        }
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

#background {
  background-color: white;
  width: fit-content;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  padding-top: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: relative;
}

#rpc-ui {
  background-color: #242b2e;
  border-radius: 0px 0px 5px 5px;
  padding: 20px;
  width: 460px;
  height: 370px;
  padding: 3px 16px;
}

button {
  background-color: #1c8d73;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 10px;
}

button:hover {
  color: white;
  background: #18725d;
}

h3 {
  font-family: "Lato", sans-serif;
  color: #9a9aa5;
  margin-bottom: 0px;
}

h4 {
  font-family: "Lato", sans-serif;
  color: #9a9aa5;
  margin-bottom: 0px;
}

input {
  color: #9a9aa5;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid #9a9aa5;
  padding: 2px;
  display: block;
}

.float-left {
  margin-left: 5px;
  float: left;
}

.float-right {
  float: right;
}

.bottom {
  text-align: center;
  margin-bottom: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
