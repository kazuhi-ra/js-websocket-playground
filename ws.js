const WebSocket = require('ws')

const ws = new WebSocket.Server({ port: 3000 })

// 新しいクライアントからの接続に伴うconnectionイベント
ws.on('connection', socket => {
  // クライアントへ
  socket.send('サーバー: 接続成功です')
  // クライアントから
  socket.on('message', message => {
    ws.clients.forEach(client => {
      // 接続の確認
      if (client.readyState !== WebSocket.OPEN) return

      client.send(`こちらの時刻は${Date.now()}です`)
    })
  })
  // 切断
  socket.on('close', () => console.log('I lost a client'))
})
