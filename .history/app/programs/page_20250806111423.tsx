import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Filter } from 'lucide-react';
import { formations, categories } from '../data/formations';

const Formations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFormations = formations.filter(formation => {
    const matchesCategory = selectedCategory === 'all' || formation.category === selectedCategory;
    
    const searchTermLower = searchTerm.toLowerCase()
      .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
    
    const titleLower = formation.title.toLowerCase()
      .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
    
    const descriptionLower = formation.description.toLowerCase()
      .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
    
    const categoryLower = formation.category.toLowerCase()
      .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
    
    const matchesSearch = titleLower.includes(searchTermLower) ||
                         descriptionLower.includes(searchTermLower) ||
                         categoryLower.includes(searchTermLower);
    
    return matchesCategory && matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
            NOS PROGRAMMES DE FORMATION
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez nos formations d'excellence dans quatre domaines clés pour votre réussite professionnelle
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Rechercher une formation (ex: gestion, informatique, audit...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <BookOpen className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                Toutes
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredFormations.map((formation) => (
            <motion.div
              key={formation.id}
              variants={item}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all duration-300 hover:shadow-xl"
              whileHover={{ y: -5 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-yellow-400 dark:group-hover:text-yellow-400 transition-colors">
                    {formation.title}
                  </h3>
                  <span className="text-sm font-medium text-yellow-400">
                    Licence - Master
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formation.category}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{formation.duration}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {formation.description}
                </p>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/40 rounded-lg font-medium transition-colors">
                    En savoir plus
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredFormations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              Aucune formation trouvée pour "{searchTerm}"
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Essayez avec des mots-clés comme : gestion, informatique, audit, marketing, programmation, environnement...
            </p>
          </motion.div>
        )}

        {searchTerm === '' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recherches populaires :
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Gestion', 'Informatique', 'Audit', 'Marketing', 'Programmation', 'Finance', 'RH', 'Environnement', 'Sécurité', 'Web'].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setSearchTerm(keyword)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Formations;