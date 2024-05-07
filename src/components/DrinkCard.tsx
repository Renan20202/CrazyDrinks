import type { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"
import { motion } from 'framer-motion';

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg sm:max-w-xs"
        >
            <div className="overflow-hidden">
                <motion.img
                    src={drink.strDrinkThumb}
                    alt={`Imagen de ${drink.strDrink}`}
                    className="hover:scale-125 transition-transform hover:rotate-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="p-5">
                <motion.h2
                    className="text-xl sm:text-2xl truncate font-black"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    {drink.strDrink}
                </motion.h2>
                <motion.button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 mt-3 sm:mt-5 w-full p-2 sm:p-3 font-bold text-white text-lg"
                    onClick={() => selectRecipe(drink.idDrink)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    See recipe
                </motion.button>
            </div>
        </motion.div>
    )
}
