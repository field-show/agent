let ws = null;
function handle(e) {
  try {
    const data = JSON.parse(e.data);
    console.log(data);
  } catch {
  }
}
function connect(url) {
  ws = new WebSocket(url);
  ws.json = (d) => ws.send(JSON.stringify(d));
  ws.onmessage = handle;
}
const client = () => ws;
export { client, connect };
