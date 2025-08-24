# 🚀 Personal Website - varmiguemunoz

**Know more** about me with this website 🤖


### DOCS

**SEND TO WHATSAPP**

```
 // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const form = e.currentTarget;
  //     const formData = new FormData(form);
  //     const payload = Object.fromEntries(formData.entries());

  //     const response = await fetch('/api/send-whatsapp', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) alert('Failed to send WhatsApp message');

  //     form.reset();
  //     alert('Message sent successfully 🛸');
  //   } catch (error) {
  //     console.log(error);
  //     alert('Failed to send WhatsApp message error 500');
  //     throw error;
  //   }
  // };

```

**SEND TO MAILCHIMP**

```
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Debug: Log request details
    console.log('Request method:', request.method);
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));

    // Check if request has a body
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Try to get the body using different methods
    let body;
    let bodyText = '';

    try {
      // Method 1: Try request.json() first
      body = await request.json();
      console.log('Successfully parsed with request.json()');
    } catch (jsonError) {
      console.log('request.json() failed, trying alternative method');

      try {
        // Method 2: Clone and read as text, then parse
        const clonedRequest = request.clone();
        bodyText = await clonedRequest.text();
        console.log('Raw request body:', bodyText);

        if (!bodyText || bodyText.trim() === '') {
          return new Response(JSON.stringify({ error: 'Request body is empty' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        body = JSON.parse(bodyText);
        console.log('Successfully parsed with JSON.parse()');
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return new Response(
          JSON.stringify({
            error: 'Invalid JSON in request body',
            details: parseError instanceof Error ? parseError.message : 'Unknown error',
            receivedBody: bodyText,
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    console.log('Parsed body:', body);

    const { firstName, lastName, email, phone, company, message, consent } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!consent) {
      return new Response(JSON.stringify({ error: 'Consentimiento requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const MAILCHIMP_API_KEY = '3515a800906df95344ccb517113c807c-us5';
    const AUDIENCE_ID = '1334ce84c1';

    if (!MAILCHIMP_API_KEY || !AUDIENCE_ID) {
      return new Response(JSON.stringify({ error: 'Configuración de Mailchimp no encontrada' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const DATACENTER = MAILCHIMP_API_KEY.split('-')[1];

    if (!DATACENTER) {
      return new Response(JSON.stringify({ error: 'API Key de Mailchimp inválida' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Prepare merge fields for Mailchimp
    const mergeFields: Record<string, string> = {};

    if (firstName) mergeFields.FNAME = firstName;
    if (lastName) mergeFields.LNAME = lastName;
    if (phone) mergeFields.PHONE = phone;
    if (company) mergeFields.COMPANY = company;
    if (message) mergeFields.MESSAGE = message;

    console.log('Sending to Mailchimp:', { email, mergeFields });

    const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: mergeFields,
      }),
    });

    const data = await response.json();

    if (response.status >= 400) {
      return new Response(JSON.stringify({ error: data.detail || 'Error al suscribirse' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Suscrito con éxito 🎉' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

```