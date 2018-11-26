// starts a capture session with createSession
var pcap = require('pcap'),
    tcp_tracker = new pcap.TCPTracker(),
    pcap_session = pcap.createSession('en0', "ip proto \\tcp");

const dns = require('dns');

//
tcp_tracker.on('session', function (session) {
  console.log("Start of session between " + session.src_name + " and " + session.dst_name);
  session.on('end', function (session) {
      console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
  });
});

// starts listening for packets and decodes it into a Javascript object
pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
    var ip = packet.payload.payload.daddr.toString()
    console.log(ip);
    dns.reverse(ip,  function(err, hostnames){
            if(err){
                console.log(err);
                return;
            }
        console.log('reverse for ' + ip + ': ' + JSON.stringify(hostnames));
      });
});
