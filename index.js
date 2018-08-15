const hyperdb = require('hyperdb')
const swarm = require('hyperdiscovery')

const key = '8f79ab79aad2ae9330312c95479e0421b96d248e03747c53216da57dbe37c7b4'

const db = hyperdb('./test.db', key, { live: true })
db.on('ready', () => {
  const sw = swarm(db, { live: true })
  sw.on('connection', function (peer, type) {
    console.log('connected to', sw.connections.length, 'peers')
    peer.on('close', function () {
      console.log('peer disconnected')
    })
  })
})
