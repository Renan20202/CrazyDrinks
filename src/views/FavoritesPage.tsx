import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"
import { motion } from 'framer-motion';

export default function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="text-6xl font-extrabold mb-10 text-white"
      >
        Favorites
      </motion.h1>

      {hasFavorites ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {favorites.map((drink) => (
            <motion.div
              key={drink.idDrink}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <DrinkCard drink={drink} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
          className="my-10 text-2xl"
        >
         Favorites:
        </motion.p>
      )}
    </motion.div>
  )
}
