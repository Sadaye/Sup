import nodemailer from 'nodemailer';

// Vérification basique des variables d'environnement
function ensureEmailEnv() {
	const user = process.env.EMAIL_USER;
	const pass = process.env.EMAIL_PASS;
	if (!user || !pass) {
		throw new Error('Configuration email manquante: définissez EMAIL_USER et EMAIL_PASS dans .env.local');
	}
	return { user, pass };
}

function getTransporter() {
	const { user, pass } = ensureEmailEnv();
	return nodemailer.createTransport({
		service: 'gmail',
		auth: { user, pass },
	});
}

// Interface pour les données du message
export interface ContactMessage {
	name: string;
	email: string;
	message: string;
}

// Fonction pour envoyer un email de contact
export async function sendContactEmail(contactData: ContactMessage) {
	const { name, email, message } = contactData;

	const toAddress = process.env.CONTACT_EMAIL || 'anaramoussa66@gmail.com';

	const mailOptions = {
		from: `SupIGA Contact <${process.env.EMAIL_USER}>`,
		replyTo: email,
		to: toAddress,
		subject: `Nouveau message de contact - ${name}`,
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          Nouveau message de contact depuis le site SupIGA
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Informations du contact :</h3>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="color: #1e293b; margin-top: 0;">Message :</h3>
          <p style="line-height: 1.6; color: #374151;">${(message || '').replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f1f5f9; border-radius: 8px; font-size: 14px; color: #64748b;">
          <p><strong>SupIGA - Institut Supérieur d'Informatique et de Gestion des Affaires</strong></p>
          <p>Banankabougou près de la Cour Suprême, Bamako, Mali</p>
          <p>Tél : +223 75 13 47 15 / +223 76 44 38 20</p>
        </div>
      </div>
    `,
		text: `
Nouveau message de contact depuis le site SupIGA

Nom: ${name}
Email: ${email}
Date: ${new Date().toLocaleString('fr-FR')}

Message:
${message}

---
SupIGA - Institut Supérieur d'Informatique et de Gestion des Affaires
Banankabougou près de la Cour Suprême, Bamako, Mali
Tél : +223 75 13 47 15 / +223 76 44 38 20
    `,
	};

	try {
		const transporter = getTransporter();
		await transporter.verify();
		const info = await transporter.sendMail(mailOptions);
		console.log('Email envoyé avec succès:', info.messageId);
		return { success: true, messageId: info.messageId };
	} catch (error) {
		console.error("Erreur d'envoi email:", error);
		throw error;
	}
}

// Fonction pour tester la connexion email
export async function testEmailConnection() {
	try {
		const transporter = getTransporter();
		await transporter.verify();
		console.log('Connexion email configurée avec succès');
		return true;
	} catch (error) {
		console.error('Erreur de configuration email:', error);
		return false;
	}
}
