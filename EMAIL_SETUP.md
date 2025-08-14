# Configuration Email pour SupIGA

## 🚀 Configuration Gmail SMTP

Le formulaire de contact utilise Gmail SMTP pour envoyer les emails. Voici comment le configurer :

### 1. Créer un fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :

```env
# Configuration Email Gmail SMTP
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-d-application
CONTACT_EMAIL=anaramoussa66@gmail.com
```

### 2. Configurer Gmail

#### Étape 1 : Activer l'authentification à 2 facteurs
1. Allez sur [myaccount.google.com](https://myaccount.google.com)
2. Sécurité > Authentification à 2 facteurs
3. Activez-la si ce n'est pas déjà fait

#### Étape 2 : Créer un mot de passe d'application
1. Dans les paramètres de sécurité Google
2. Mots de passe d'application
3. Sélectionnez "Autre (nom personnalisé)"
4. Nommez-le "SupIGA Contact Form"
5. Copiez le mot de passe généré (16 caractères)

#### Étape 3 : Configurer les variables
- `EMAIL_USER` : Votre adresse Gmail complète
- `EMAIL_PASS` : Le mot de passe d'application généré (pas votre mot de passe normal)
- `CONTACT_EMAIL` : L'email qui recevra les messages (déjà configuré : anaramoussa66@gmail.com)

### 3. Tester la configuration

Redémarrez votre serveur de développement :
```bash
npm run dev
```

Puis testez le formulaire de contact sur votre site.

### 4. Sécurité

⚠️ **Important** :
- Ne partagez jamais votre fichier `.env.local`
- Utilisez toujours un mot de passe d'application, jamais votre mot de passe principal
- Le fichier `.env.local` est automatiquement ignoré par Git

### 5. Fonctionnalités

✅ Email HTML professionnel avec le logo SupIGA  
✅ Validation des champs  
✅ Messages de succès/erreur  
✅ Interface utilisateur moderne  
✅ Responsive design  

### 6. Dépannage

Si les emails ne s'envoient pas :
1. Vérifiez que l'authentification à 2 facteurs est activée
2. Vérifiez que vous utilisez un mot de passe d'application
3. Vérifiez les logs dans la console du serveur
4. Testez avec un autre compte Gmail si nécessaire
