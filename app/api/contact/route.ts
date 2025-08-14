import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, message } = body;

		// Validation des champs
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: 'Tous les champs sont requis' },
				{ status: 400 }
			);
		}

		// Validation de l'email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Adresse email invalide' },
				{ status: 400 }
			);
		}

		// Envoi de l'email
		await sendContactEmail({ name, email, message });

		return NextResponse.json(
			{
				success: true,
				message:
					'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('Erreur lors du traitement du formulaire de contact:', error);
		const errMsg =
			typeof error?.message === 'string'
				? error.message
				: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.";
		return NextResponse.json({ error: errMsg }, { status: 500 });
	}
}
