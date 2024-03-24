'use server';

export async function verifyCaptcha(token: string | null) {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
  
    const response = await fetch(url, {
      method: "POST",
    });
  
    const responseData = await response.json();
  
    if (responseData.success) {
      return "success!";
    } else {
      throw new Error("Failed Captcha");
    }
  }