let ws = null

function handle (e) {
  try {
    const data = JSON.parse(e.data)
    console.log(data)
  } catch {}
}

export function connect (url) {
  ws = new WebSocket(url)
  ws.json = d => ws.send(JSON.stringify(d))
  ws.onmessage = handle
}

export const client = () => ws
