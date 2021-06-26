import * as os from "os";

const config = {
  // listenIp: "103.237.144.205",
  listenIp: "192.168.1.26",
  listenPort: 3017,
  sslCrt: "./ssl/cert.pem",
  sslKey: "./ssl/key.pem",

  mediasoup: {
    // Worker settings
    numWorkers: 10 || Object.keys(os.cpus()).length,
    worker: {
      rtcMinPort: 10000,
      rtcMaxPort: 10100,
      logLevel: "warn",
      logTags: [
        "info",
        "ice",
        "dtls",
        "rtp",
        "srtp",
        "rtcp",
        'rtx',
        'bwe',
        'score',
        'simulcast',
        'svc'
      ],
    },
    // Router settings
    router: {
      mediaCodecs: [
        {
          kind: "audio",
          mimeType: "audio/opus",
          clockRate: 48000,
          channels: 2,
        },
        {
          kind: "video",
          mimeType: "video/VP8",
          clockRate: 90000,
          parameters: {
            "x-google-start-bitrate": 1000,
          },
        },
      ],
    },
    // WebRtcTransport settings
    webRtcTransport: {
      listenIps: [
        {
          // ip: "103.237.144.205",
          // announcedIp: "103.237.144.205", // replace by public IP address
          ip: "192.168.1.26",
          announcedIp: "192.168.1.26", // replace by public IP address
        },
      ],
      maxIncomingBitrate: 150000,
      initialAvailableOutgoingBitrate: 150000
    },
  },
};

export { config };
