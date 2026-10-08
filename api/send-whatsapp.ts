import type { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, company, message } = req.body;

  const whatsappBody = `
    Nuevo formulario CRM:
    Nombre: ${firstName} ${lastName}
    Email: ${email}
    Teléfono: ${phone}
    Empresa: ${company}
    Mensaje: ${message}
  `;

  try {
    await client.messages.create({
      body: whatsappBody,
      from: 'whatsapp:+14155238886', // Twilio Sandbox WhatsApp number
      to: 'whatsapp:+573023278057', // Your WhatsApp number in E.164 format
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send WhatsApp message' });
  }
}

// Astro settings:

// import type { APIRoute } from 'astro';
// import twilio from 'twilio';

// const accountSid = import.meta.env.TWILIO_ACCOUNT_SID!;
// const authToken = import.meta.env.TWILIO_AUTH_TOKEN!;
// const client = twilio(accountSid, authToken);

// export const prerender = false;

// export const POST: APIRoute = async ({ request }) => {
//   try {
//     const { firstName, lastName, email, phone, company, message } = await request.json();

//     const whatsappBody = `
//       Nuevo formulario CRM:
//       Nombre: ${firstName} ${lastName}
//       Email: ${email}
//       Teléfono: ${phone}
//       Empresa: ${company}
//       Mensaje: ${message}
//     `;

//     await client.messages.create({
//       body: whatsappBody,
//       from: 'whatsapp:+14155238886', // Número de sandbox de Twilio
//       to: 'whatsapp:+573023278057', // Tu número en formato E.164
//     });

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error enviando WhatsApp:', error);
//     return new Response(JSON.stringify({ error: 'Failed to send WhatsApp message' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// };
