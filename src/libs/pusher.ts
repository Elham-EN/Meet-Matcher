// HOT Module reoloading is not going to be capable of closing down a pusher
// connection, as we make code changes in the module, otherwise you will hit
// 100 connection very quick with two client app that user connected to.
// When hot module reloading does kick in, it doesn't spawn up a new instance
// of pusher.

import PusherServer from "pusher";
import PusherClient from "pusher-js";

declare global {
  var pusherServerInstance: PusherServer | undefined;
  var pusherClientInstance: PusherClient | undefined;
}

if (!global.pusherServerInstance) {
  global.pusherServerInstance = new PusherServer({
    appId: process.env.PUSHER_APP_I!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap4",
    useTLS: true,
  });
}

if (!global.pusherClientInstance) {
  global.pusherClientInstance = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    { cluster: "ap4" }
  );
}

export const pusherServer = global.pusherServerInstance;

export const pusherClient = global.pusherClientInstance;
