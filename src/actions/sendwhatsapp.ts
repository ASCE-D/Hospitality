"use server"

import util from "util"
import twilio from "twilio"


export async function sendMessage() {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);
        const createMessage = util.promisify(client.messages.create);
    
        const message = await createMessage({
            body: 'Your appointment is coming up on July 21 at 3PM',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+919929840831'
        });
    
        console.log(message);
      } catch (error) {
        console.error('Error sending WhatsApp message:', error);
      }
    }
  