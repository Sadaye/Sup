import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">SupIGA</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" passHref legacyBehavior>
                <a className="text-gray-600 hover:text-blue-600">Connexion</a>
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Inscription</a>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Bienvenue sur SupIGA
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            La plateforme moderne pour la gestion de votre établissement d'enseignement supérieur
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Pour les Étudiants</h3>
              <p className="mt-2 text-sm text-gray-500">
                Accédez à vos cours, notes et informations importantes en un clic.
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Pour les Professeurs</h3>
              <p className="mt-2 text-sm text-gray-500">
                Gérez vos cours, évaluez vos étudiants et partagez des ressources.
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Pour l'Administration</h3>
              <p className="mt-2 text-sm text-gray-500">
                Supervisez l'ensemble de l'établissement et prenez des décisions éclairées.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}