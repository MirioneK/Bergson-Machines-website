export const RECAPTCHA_SITE_KEY = "6Le19ZQsAAAAABmH-gsyeWgVfHir2Op8EQ6GNjYO";

export async function getRecaptchaToken(action = "submit") {
  if (typeof window === "undefined" || !window.grecaptcha) {
    throw new Error(
      "Brak reCAPTCHA w przeglądarce. Odśwież stronę lub spróbuj później."
    );
  }

  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action })
        .then((token) => {
          if (!token) {
            reject(
              new Error(
                "Nie udało się pobrać tokenu reCAPTCHA. Spróbuj ponownie."
              )
            );
          } else {
            resolve(token);
          }
        })
        .catch(() =>
          reject(
            new Error(
              "Błąd reCAPTCHA. Twoja wiadomość nie została wysłana."
            )
          )
        );
    });
  });
}
