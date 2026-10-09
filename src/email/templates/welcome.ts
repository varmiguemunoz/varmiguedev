import type { WelcomeEmailInput } from '@/interfaces/email';
import { escapeHtml } from '../html.ts';
import { CAL_LINK } from '@/components/ops/data';

function subject(input: WelcomeEmailInput): string {
  const first = input.name.split(/\s+/)[0] || input.name;
  return `Got your message, ${first}`;
}

function html(input: WelcomeEmailInput): string {
  const first = escapeHtml(input.name.split(/\s+/)[0] || input.name);
  const message = escapeHtml(input.message);

  const C = {
    paper: '#EEF1F4',
    white: '#FFFFFF',
    ink: '#0E1A2B',
    slate: '#3B4A5E',
    line: '#D5DBE3',
    amber: '#F2A93B',
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="color-scheme" content="light" />
        <meta name="x-apple-disable-message-reformatting" />
        <title>${subject(input)}</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: ${C.paper};
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
          color: ${C.slate};
        "
      >
        <span
          style="
            display: none;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
          "
        >
          I got your message and will reply personally within 24 hours.
        </span>

        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: ${C.paper};
          "
        >
          <tr>
            <td align="center" style="padding: 40px 16px;">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="width: 100%; max-width: 560px;"
              >
                <!-- Header -->
                <tr>
                  <td style="padding: 0 4px 24px;">
                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tr>
                        <td
                          width="28"
                          height="28"
                          align="center"
                          valign="middle"
                          style="
                            background-color: ${C.ink};
                            border-radius: 6px;
                          "
                        >
                          <span
                            style="
                              display: inline-block;
                              width: 8px;
                              height: 8px;
                              border-radius: 4px;
                              background-color: ${C.amber};
                            "
                          ></span>
                        </td>

                        <td
                          style="
                            padding-left: 10px;
                            font-size: 16px;
                            line-height: 28px;
                            font-weight: 600;
                            color: ${C.ink};
                            letter-spacing: -0.01em;
                          "
                        >
                          varmiguemunoz
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td
                    style="
                      padding: 40px 36px;
                      background-color: ${C.white};
                      border-radius: 16px;
                    "
                  >
                    <h1
                      style="
                        margin: 0 0 20px;
                        font-size: 28px;
                        line-height: 32px;
                        font-weight: 600;
                        letter-spacing: -0.02em;
                        color: ${C.ink};
                      "
                    >
                      Got it, ${first}. Talk soon.
                    </h1>

                    <p
                      style="
                        margin: 0 0 16px;
                        font-size: 16px;
                        line-height: 26px;
                        color: ${C.slate};
                      "
                    >
                      Thanks for reaching out. Your message is in my inbox
                      and I will reply personally within
                      <strong style="color: ${C.ink};">24 hours</strong>,
                      usually sooner, with a direct read on whether it is a fit.
                    </p>

                    <p
                      style="
                        margin: 28px 0 8px;
                        font-size: 13px;
                        line-height: 20px;
                        font-weight: 600;
                        color: ${C.slate};
                      "
                    >
                      What you sent
                    </p>

                    <div
                      style="
                        margin: 0 0 28px;
                        padding: 16px 18px;
                        background-color: ${C.paper};
                        border-radius: 12px;
                        border-top: 2px solid ${C.amber};
                        font-size: 15px;
                        line-height: 24px;
                        color: ${C.ink};
                        white-space: pre-wrap;
                        overflow-wrap: anywhere;
                      "
                    >${message}</div>

                    <p
                      style="
                        margin: 0 0 20px;
                        font-size: 16px;
                        line-height: 26px;
                        color: ${C.slate};
                      "
                    >
                      Prefer to talk it through sooner?
                    </p>

                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tr>
                        <td
                          style="
                            background-color: ${C.amber};
                            border-radius: 12px;
                          "
                        >
                          <a
                            href="${CAL_LINK}"
                            target="_blank"
                            style="
                              display: inline-block;
                              padding: 14px 22px;
                              font-size: 15px;
                              line-height: 20px;
                              font-weight: 600;
                              color: ${C.ink};
                              text-decoration: none;
                            "
                          >
                            Book a 30-minute call &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Signature -->
                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        width: 100%;
                        margin-top: 36px;
                        border-top: 1px solid ${C.line};
                      "
                    >
                      <tr>
                        <td
                          style="
                            padding-top: 20px;
                            font-size: 15px;
                            line-height: 24px;
                            color: ${C.ink};
                          "
                        >
                          <strong>Miguel Angel Muñoz</strong>
                          <br />
                          <span style="color: ${C.slate};">
                            AI Integration Engineer
                          </span>
                          <br />
                          <a
                            href="https://www.varmiguemunoz.com"
                            style="
                              color: ${C.ink};
                              text-decoration: underline;
                            "
                          >
                            varmiguemunoz.com
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding: 20px 8px 0;
                      font-size: 12px;
                      line-height: 18px;
                      color: ${C.slate};
                      text-align: center;
                    "
                  >
                    You are receiving this because you contacted me
                    through varmiguemunoz.com.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim();
}

function text(input: WelcomeEmailInput): string {
  const first = input.name.split(/\s+/)[0] || input.name;

  return `
Hi ${first},

Thanks for reaching out. Your message is in my inbox and I will reply personally within 24 hours, usually sooner, with a direct read on whether it is a fit.

What you sent:
${input.message}

Want to talk sooner? Book a 30-minute call: ${CAL_LINK}

Miguel Angel Muñoz
AI Integration Engineer
https://www.varmiguemunoz.com

You are receiving this because you contacted me through varmiguemunoz.com.
  `.trim();
}

const welcomeTemplate = { subject, html, text };

export default welcomeTemplate;
