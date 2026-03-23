require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

app.use(express.json());

// CORS – w razie gdyby front był na innej subdomenie
const corsOptions = {
  origin: [
    "http://bergsonmachines.pl",
    "https://bergsonmachines.pl",
    "http://www.bergsonmachines.pl",
    "https://www.bergsonmachines.pl",
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Pomocniczo – prosta funkcja do escapowania HTML
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

app.post("/api/contact", async (req, res) => {
  const { name, email, message, phone, company, model, recaptchaToken } = req.body;

  // 1. Sprawdź obecność tokenu
  if (!recaptchaToken) {
    return res.status(400).json({ ok: false, error: "Brak tokenu reCAPTCHA." });
  }

  // 2. Zweryfikuj token w Google
  try {
    const params = new URLSearchParams();
    params.append("secret", RECAPTCHA_SECRET);
    params.append("response", recaptchaToken);
    params.append("remoteip", req.ip || "");

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );

    const recaptchaData = await verifyRes.json();

    if (
      !recaptchaData.success ||
      recaptchaData.score < 0.5 ||
      recaptchaData.action !== "contact_form_submit"
    ) {
      console.error("reCAPTCHA verification failed:", recaptchaData);
      return res
        .status(400)
        .json({ ok: false, error: "Weryfikacja reCAPTCHA nie powiodła się." });
    }
  } catch (err) {
    console.error("Error verifying reCAPTCHA:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Błąd serwera przy weryfikacji reCAPTCHA." });
  }

  // wymagane pola: imię, telefon, wiadomość
  if (!name || !phone || !message) {
    return res
      .status(400)
      .json({ ok: false, error: "Brak wymaganych pól formularza." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const sentAt = new Date();
    const sentAtPl = sentAt.toLocaleString("pl-PL", {
      timeZone: "Europe/Warsaw",
    });

    const safeCompany = company || "-";
    const safePhone = phone || "-";
    const safeModel = model || "Nie wskazano";
    const phoneHref = phone ? String(phone).replace(/\s+/g, "") : "";
    const contactTarget = process.env.CONTACT_TARGET || process.env.SMTP_USER;

    const textBody = `Nowe zapytanie z formularza kontaktowego Bergson Machines

Źródło: formularz kontaktowy na stronie bergsonmachines.pl

DANE KONTAKTOWE
----------------
Imię i nazwisko: ${name}
Firma: ${safeCompany}
Telefon: ${safePhone}
E-mail: ${email}
Interesujący model: ${safeModel}

TREŚĆ WIADOMOŚCI
----------------
${message}

---
Data wysłania: ${sentAt.toISOString()}
Czas lokalny: ${sentAtPl}
Strefa czasowa: Europe/Warsaw
`;

    const htmlBody = `
      <div style="
        margin:0;
        padding:32px 16px;
        background:#1c1c24;
        font-family:Arial, Helvetica, sans-serif;
        color:#f5f5f5;
      ">
        <div style="
          max-width:680px;
          margin:0 auto;
          background:#23232d;
          border:1px solid #343444;
          border-radius:20px;
          overflow:hidden;
          box-shadow:0 18px 50px rgba(0,0,0,0.35);
        ">
          <div style="
            padding:22px 24px 18px 24px;
            background:
              linear-gradient(180deg, rgba(242,101,34,0.16) 0%, rgba(242,101,34,0.04) 100%);
            border-bottom:1px solid #343444;
          ">
            <div style="
              display:inline-block;
              padding:7px 12px;
              border-radius:999px;
              background:rgba(242,101,34,0.14);
              border:1px solid rgba(242,101,34,0.28);
              color:#f26522;
              font-size:11px;
              font-weight:700;
              letter-spacing:0.12em;
              text-transform:uppercase;
              margin-bottom:14px;
            ">
              Formularz kontaktowy
            </div>

            <h1 style="
              margin:0;
              font-size:24px;
              line-height:1.15;
              color:#f5f5f5;
              font-weight:800;
            ">
              Nowe zapytanie ze strony Bergson Machines
            </h1>

            <p style="
              margin:12px 0 0 0;
              font-size:14px;
              line-height:1.7;
              color:#cfcfd6;
            ">
              Otrzymano nowe zapytanie z formularza kontaktowego na stronie
              <span style="color:#ffffff; font-weight:700;">bergsonmachines.pl</span>.
            </p>
          </div>

          <div style="padding:24px;">
            <div style="
              margin-bottom:18px;
              padding:16px 18px;
              background:#2d2d3a;
              border:1px solid #343444;
              border-radius:14px;
            ">
              <div style="
                color:#f26522;
                font-size:12px;
                font-weight:700;
                letter-spacing:0.08em;
                text-transform:uppercase;
                margin-bottom:10px;
              ">
                Dane kontaktowe
              </div>

              <table style="width:100%; border-collapse:collapse;">
                <tbody>
                  <tr>
                    <td style="padding:7px 0; width:180px; color:#bdbdc7; font-weight:600; vertical-align:top;">
                      Imię i nazwisko
                    </td>
                    <td style="padding:7px 0; color:#ffffff;">
                      ${escapeHtml(name)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0; color:#bdbdc7; font-weight:600; vertical-align:top;">
                      Firma
                    </td>
                    <td style="padding:7px 0; color:#ffffff;">
                      ${escapeHtml(safeCompany)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0; color:#bdbdc7; font-weight:600; vertical-align:top;">
                      Telefon
                    </td>
                    <td style="padding:7px 0; color:#ffffff;">
                      ${
                        phoneHref
                          ? `<a href="tel:${escapeHtml(phoneHref)}" style="color:#ffffff; text-decoration:none;">${escapeHtml(safePhone)}</a>`
                          : escapeHtml(safePhone)
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0; color:#bdbdc7; font-weight:600; vertical-align:top;">
                      E-mail
                    </td>
                    <td style="padding:7px 0; color:#ffffff;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#ffffff; text-decoration:none;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0; color:#bdbdc7; font-weight:600; vertical-align:top;">
                      Interesujący model
                    </td>
                    <td style="padding:7px 0; color:#ffffff;">
                      ${escapeHtml(safeModel)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="
              margin-bottom:18px;
              padding:16px 18px;
              background:#2d2d3a;
              border:1px solid #343444;
              border-radius:14px;
            ">
              <div style="
                color:#f26522;
                font-size:12px;
                font-weight:700;
                letter-spacing:0.08em;
                text-transform:uppercase;
                margin-bottom:10px;
              ">
                Treść wiadomości
              </div>

              <div style="
                color:#f5f5f5;
                font-size:14px;
                line-height:1.75;
                white-space:pre-wrap;
                word-break:break-word;
              ">
                ${escapeHtml(message)}
              </div>
            </div>

            <div style="
              display:flex;
              flex-wrap:wrap;
              gap:10px;
              margin:0 0 18px 0;
            ">
              <a href="mailto:${escapeHtml(email)}" style="
                display:inline-block;
                background:#f26522;
                color:#ffffff;
                text-decoration:none;
                padding:12px 18px;
                border-radius:10px;
                font-size:13px;
                font-weight:700;
              ">
                Odpowiedz na e-mail
              </a>

              ${
                phoneHref
                  ? `<a href="tel:${escapeHtml(phoneHref)}" style="
                      display:inline-block;
                      background:transparent;
                      color:#f5f5f5;
                      text-decoration:none;
                      padding:12px 18px;
                      border-radius:10px;
                      font-size:13px;
                      font-weight:700;
                      border:1px solid #4a4a5c;
                    ">
                      Zadzwoń
                    </a>`
                  : ""
              }
            </div>

            <div style="
              padding-top:14px;
              border-top:1px solid #343444;
              font-size:12px;
              line-height:1.7;
              color:#9d9daa;
            ">
              <div>
                Data wysłania:
                <span style="color:#f5f5f5;">${escapeHtml(sentAtPl)}</span>
              </div>
              <div>
                Źródło:
                <span style="color:#f5f5f5;">formularz kontaktowy · bergsonmachines.pl</span>
              </div>
            </div>
          </div>

          <div style="
            padding:14px 24px 18px 24px;
            background:#1f1f28;
            border-top:1px solid #343444;
            color:#8d8d99;
            font-size:11px;
            line-height:1.6;
          ">
            Wiadomość wygenerowana automatycznie z formularza kontaktowego
            <span style="color:#f5f5f5; font-weight:700;">Bergson Machines</span>.
            Odpowiedź zostanie skierowana na adres:
            <span style="color:#f5f5f5;">${escapeHtml(email)}</span>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Formularz kontaktowy Bergson Machines" <${process.env.SMTP_USER}>`,
      to: contactTarget,
      replyTo: email,
      subject: `Bergson Machines – nowe zapytanie z formularza${model ? ` (${model})` : ""}`,
      text: textBody,
      html: htmlBody,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Błąd wysyłki maila:", err.message);
    return res
      .status(500)
      .json({ ok: false, error: "Nie udało się wysłać wiadomości." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});