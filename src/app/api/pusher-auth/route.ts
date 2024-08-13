/**
 * As with private channels a HTTP Request is made to a configurable authorization
 * URL to determine if the current user has permissions to access the channel.
 *
 * Pusher Channels will only allow a connection to subscribe to a private channel or
 * presence channel if the connection provides an authorization token signed by your
 * server. This lets you restrict access.
 */

import { auth } from "@/auth";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth(); // get current user session
    // if current user session does not exist, then response 401
    if (!session?.user?.id) {
      return new Response("Unauthorised", { status: 401 });
    }
    const body = await request.formData();
    const socketId = body.get("socket_id") as string;
    const channel = body.get("channel_name") as string;
    // Sending back to pusher server to authorize this channel
    const data = { user_id: session.user.id };
    // This authenticates every user. Don't do this in production!
    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
    return NextResponse.json(authResponse);
  } catch (error) {}
}
