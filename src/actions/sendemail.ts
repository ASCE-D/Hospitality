"use server"
import { EmailTemplate } from '@/components/emailtemplate';
import { Resend } from 'resend';

const key = process.env.RESEND_API_KEY

const resend = new Resend(key);


export async function sendresendemail(){
    console.log("here")
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['ashispandey138c@gmail.com'],
        subject: 'Hello world',
        // react: EmailTemplate({ firstName: 'John' }),
        text:"hello"
      });
    console.log("mailsend")
      if (error) {
        console.error("Couldnt send email", error)
      }
    
      return data
}