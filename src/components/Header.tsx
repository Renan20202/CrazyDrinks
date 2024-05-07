import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'
import { motion } from 'framer-motion';

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'All fields are mandatory',
                error: true
            })
            return
        }
        // Search for recipes
        searchRecipes(searchFilters)
    }

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={isHome ? ' bg-black bg-header bg-center bg-cover text-white' : ' text-white'}
        >
            <div className="mx-auto container px-5 py-16 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-6xl font-extrabold mb-8"
                >
                    CrazyDrinks By Reh
                </motion.h1>

                <nav className='flex justify-start gap-4 mb-8 text-large'>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }>Start</NavLink>
                    <NavLink
                        to="/favoritos"
                        className={({ isActive }) =>
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }>Favorites</NavLink>
                </nav>

                {isHome && (
                    <motion.form
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className='md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white bg-opacity-20 mx-auto p-10 rounded-lg shadow space-y-6'
                        onSubmit={handleSubmit}
                    >
                        <div className='space-y-4'>
                            <label
                                htmlFor="ingredient"
                                className='block text-white uppercase font-extrabold text-lg '
                            >Name/Ingredients</label>

                            <input
                                id='ingredient'
                                type='text'
                                name='ingredient'
                                className='p-3 w-full rounded-lg focus:outline-none text-black'
                                placeholder='Vodka, Tequila, Ron'
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>
                        <div className='space-y-4'>
                            <label
                                htmlFor="category"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Category</label>

                            <select
                                id='category'
                                name='category'
                                className='p-3 w-full rounded-lg focus:outline-none text-black'
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Select --</option>
                                {categories.drinks.map(category => (
                                    <option
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >{category.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <motion.input
                            whileHover={{ scale: 1.1 }}
                            type='submit'
                            value='Search'
                            className='cursor-pointer bg-orange-600 hover:bg-orange-800 text-white font-extrabold w-full p-2 rounded-lg uppercase'
                        />
                    </motion.form>
                )}
            </div>
        </motion.header>
    )
}
