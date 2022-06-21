import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const clientId = '802413454918-lb2hv5g0imlr66tocavemgaj8pbo6bn1.apps.googleusercontent.com';
const clientSecret = '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';
const refreshToken = '1//04vkbRRWOCoJlCgYIARAAGAQSNwF-L9IrUlWlws_hRZUWbGPQDzlpTFfKssHYYZmo4etQ1pnRZDJ5tKxC1MpzUK0qtfdshFCbeG8';
const acessToken = 'ya29.A0ARrdaM8TZMU9fvbiWcDolDKawoGAgBeC0y6pAKAoPxgKprjJ9LVqN0uxkqS5wqvhFybEZabO161keIPbyGOjN3t8mhet0G0pHWiGObKKwmzg9b1h8bGi2EEm7M-zwNQUWmnccrNiUobfovmypUMM13Rd-YHwYUNnWUtBVEFTQVRBU0ZRRl91NjFWR1FoajVRQjgyUjZod0lWc2loSV9EQQ0163';

const mailing = (mailTo, subject, title, text) => {

   const oauth2Client = new OAuth2(
      clientId, clientSecret, "https://developers.google.com/oauthplayground",
   );
   console.log(mailTo, subject, title, text)
   oauth2Client.setCredentials({
      refresh_token: refreshToken,
   });

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         type: "OAuth2",
         user: "thomas.deneuville@3wa.io",
         clientId: clientId,
         clientSecret: clientSecret,
         refreshToken: refreshToken,
         accessToken: acessToken,
      }
   })

   const mailOptions = {
      from: 'BeerShop',
      to: mailTo,
      subject: subject,
      text: '',
      html: "<b>" + title + "</b><p>" + text + "<p>",
   }

   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.log("raté ==>");
         return console.log(error);
      } else {
         console.log("Réussi");

      }
   })
}

export default mailing;