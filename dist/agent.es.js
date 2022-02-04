let ws = null;
const hook = {}, once = {};
function handle(e) {
  try {
    const data = JSON.parse(e.data);
    const k = data["#"], v = data[":"];
    for (const f of hook[k])
      f(v, k);
    for (const f of once[k])
      f(v, k);
    delete once[k];
  } catch {
  }
}
function connect(url) {
  ws = new WebSocket(url);
  ws.json = (d) => ws.send(JSON.stringify(d));
  ws.onmessage = handle;
  ws.onerror = ws.onclose = () => {
    ws = null;
  };
}
const client = () => ws;
function put(k, v) {
  ws.json({ _: "put", "#": k, ":": v });
}
function on(k, f) {
  if (!hook[k])
    hook[k] = new Set();
  hook[k].add(f);
  ws.json({ _: "on", "#": k });
}
const get = (k) => new Promise((r) => {
  if (!once[k])
    once[k] = new Set();
  once[k].add(r);
  ws.json({ _: "get", "#": k });
});
export { client, connect, get, on, put };
