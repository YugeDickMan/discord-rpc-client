const Router = require("express").Router();
const { json } = require("body-parser");
const RPC = require("discord-rpc");
const consola = require("consola");

const client = new RPC.Client({
  transport: "ipc"
});

function doneRes(res) {
  consola.success({
    message: "Successfully set custom status!",
    badge: true
  });
  return res.status(200).send("Success!");
}
function errorRes(res, error) {
  consola.error({
    message: error,
    badge: true
  });
  return res.status(500).send("Error!");
}

Router.post("/change-rpc-status", json(), async (req, res) => {
  const RPCDetails = req.body;
  RPCDetails.buttons = [];
  if (RPCDetails.label1 && RPCDetails.url1)
    RPCDetails.buttons.push({
      label: RPCDetails.label1,
      url: RPCDetails.url1
    });
  if (RPCDetails.label2 && RPCDetails.url2)
    RPCDetails.buttons.push({
      label: RPCDetails.label2,
      url: RPCDetails.url2
    });
  if (RPCDetails.buttons.length === 0) delete RPCDetails.buttons;
  try {
    await client.login({
      clientId: RPCDetails.clientId
    });
    await client.setActivity(RPCDetails);
  } catch (error) {
    return errorRes(res, error);
  }
  return doneRes(res);
});

Router.post("/stopRPC", async (req, res) => {
  try {
    await client.clearActivity();
  } catch (error) {
    return errorRes(res, error);
  }
  consola.success({
    message: "Successfully stopped RPC!",
    badge: true
  });
  return res.status(200).send("Success!");
});

module.exports = Router;
