import emailjs from '@emailjs/browser';

interface EmailParams {
  to_name: string;
  to_email: string;
  subject: string;
  message: string;
  [key: string]: any;
}

export const sendEmailNotification = async (params: EmailParams) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS is not configured. Skipping email notification.");
    return false;
  }

  try {
    const response = await emailjs.send(serviceId, templateId, params as Record<string, unknown>, publicKey);
    console.log('Email sent successfully!', response.status, response.text);
    return true;
  } catch (err) {
    console.error('Failed to send email.', err);
    return false;
  }
};
