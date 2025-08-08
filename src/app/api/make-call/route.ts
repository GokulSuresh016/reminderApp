import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req: NextRequest) {
  const { to, twiml } = await req.json();

  try {
    const call = await client.calls.create({
      twiml: twiml || "<Response><Say>This is your reminder call from your calendar event.</Say></Response>",
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });
    return NextResponse.json({ success: true, sid: call.sid });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}