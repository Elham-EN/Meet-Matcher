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
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap4",
    // to communicate securely across a network
    useTLS: true,
  });
}

if (!global.pusherClientInstance) {
  global.pusherClientInstance = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
      // Create this endpoint in the route handler using server side action , so
      // that pusher client can authorize users.
      channelAuthorization: { endpoint: "/api/pusher-auth", transport: "ajax" },
      cluster: "ap4",
    }
  );
}

export const pusherServer = global.pusherServerInstance;

export const pusherClient = global.pusherClientInstance;
