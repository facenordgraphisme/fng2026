'use client'

import { useActionState } from 'react'
import { sendContactEmail } from '@/app/actions/contact'

const initialState = {
  success: false,
  error: '',
  message: '',
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState)

  if (state.success) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center p-12 bg-white dark:bg-[#1a1a1a] shadow-sm rounded-3xl h-full transition-colors duration-300">
        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">Message envoyé !</h3>
        <p className="text-center text-[#666666] dark:text-[#a1a1aa] leading-relaxed">
          {state.message} Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-6" action={formAction}>
      {state.error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/50">
          {state.error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-2">Nom / Entreprise</label>
        <input type="text" id="name" name="name" disabled={isPending} className="w-full bg-[#f4f7f9] dark:bg-[#2a2a2a] border-none rounded-xl py-4 px-5 text-[#1a1a1a] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#239ea0] transition-all disabled:opacity-50" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-2">Email</label>
        <input type="email" id="email" name="email" disabled={isPending} className="w-full bg-[#f4f7f9] dark:bg-[#2a2a2a] border-none rounded-xl py-4 px-5 text-[#1a1a1a] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#239ea0] transition-all disabled:opacity-50" required />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-[#1a1a1a] dark:text-[#e5e5e5] mb-2">Message</label>
        <textarea id="message" name="message" rows={5} disabled={isPending} className="w-full bg-[#f4f7f9] dark:bg-[#2a2a2a] border-none rounded-xl py-4 px-5 text-[#1a1a1a] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#239ea0] transition-all resize-none disabled:opacity-50" required></textarea>
      </div>
      <button type="submit" disabled={isPending} className="w-full mt-4 bg-[#239ea0] hover:bg-[#1c8486] text-white font-bold py-4 rounded-md transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#239ea0] focus:ring-offset-2 dark:focus:ring-offset-[#1a1a1a]">
        {isPending ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  )
}
