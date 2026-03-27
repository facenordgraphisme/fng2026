'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: "Tous les champs sont requis." }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Site Facenord <contact@facenordgraphisme.fr>',
      to: 'contact@facenordgraphisme.fr',
      subject: `Nouveau message de ${name} via le site`,
      replyTo: email,
      text: `Vous avez reçu un nouveau message de ${name} (${email}) :\n\n${message}`,
    })

    if (error) {
      console.error('Erreur Resend:', error);
      return { success: false, error: error.message }
    }

    return { 
      success: true, 
      error: '', 
      message: "Votre message a été envoyé avec succès !" 
    }
  } catch (error) {
    console.error('Erreur Serveur:', error);
    return { success: false, error: "Une erreur est survenue lors de l'envoi du message." }
  }
}
