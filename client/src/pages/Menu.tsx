import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import { API_URL } from '../services/api';
import { MenuItem } from '../types';

const DUMMY_DATA: MenuItem[] = [
    { _id: '1', name: 'Cappuccino', price: 130, category: 'Coffee', description: 'Classic espresso with steamed milk and dense foam.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
    { _id: '2', name: 'Americano', price: 100, category: 'Coffee', description: 'Espresso shots topped with hot water for a rich, bold flavor.', image: 'https://myeverydaytable.com/wp-content/uploads/AmericanoHotandIced-3.jpg' },
    { _id: '3', name: 'Latte', price: 160, category: 'Coffee', description: 'Smooth espresso with plenty of steamed milk and a light layer of foam.', image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=80' },
    { _id: '4', name: 'Vanilla Latte', price: 180, category: 'Coffee', description: 'Our classic latte infused with sweet vanilla syrup.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80' },
    { _id: '5', name: 'Mocha', price: 160, category: 'Coffee', description: 'A perfect blend of espresso, chocolate, and steamed milk.', image: 'https://images.unsplash.com/photo-1522992319-0365e5f11656?auto=format&fit=crop&w=800&q=80' },
    { _id: '6', name: 'Italian Bicerin', price: 180, category: 'Coffee', description: 'Traditional Turin drink with layers of espresso, chocolate and cream.', image: 'https://www.deliciousmagazine.co.uk/wp-content/uploads/2023/11/2023D161_ITALIANXMAS_BICERIN_2__.jpg' },
    { _id: '7', name: 'Irish Cappuccino', price: 180, category: 'Coffee', description: 'Cappuccino with a hint of Irish cream flavor.', image: 'https://mymocktailforest.com/wp-content/uploads/2024/03/non-alcoholic-irish-coffee-7.jpg' },
    { _id: '8', name: 'Caramel Cappuccino', price: 180, category: 'Coffee', description: 'Rich cappuccino drizzled with sweet caramel sauce.', image: 'https://images.unsplash.com/photo-1572286258217-40142c1c6a70?auto=format&fit=crop&w=800&q=80' },
    { _id: '9', name: 'Hazelnut Cappuccino', price: 180, category: 'Coffee', description: 'Cappuccino infused with nutty hazelnut syrup.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80' },
    { _id: '10', name: 'Filter Coffee', price: 80, category: 'Coffee', description: 'Traditional South Indian style filter coffee.', image: 'https://www.agoraliarecipes.com/wp-content/uploads/2022/08/AR000232JR-Indian-Kaapi-Filter-Coffee-FTR1-ph01-Shtr_SMALL.jpg' },
    { _id: '11', name: 'Espresso 60ml', price: 120, category: 'Coffee', description: 'Pure, intense shot of our signature blend.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80' },
    { _id: '12', name: 'Hot Chocolate', price: 140, category: 'Coffee', description: 'Rich, creamy chocolate served warm.', image: 'https://cookienameddesire.com/wp-content/uploads/2017/11/nutella-hot-chocoate.jpg' },
    { _id: '13', name: 'Affogato', price: 180, category: 'Coffee', description: 'Vanilla bean gelato drowned in a hot shot of espresso.', image: 'https://www.thespruceeats.com/thmb/5PcCBEaUd1U1eFxfcKKPLVnZzfA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/affogato-4776668-hero-08-40d7a68d12ba46f48eaea3c43aba715c.jpg', isPopular: true },
    { _id: '19', name: 'Indian Tea', price: 50, category: 'Tea', description: 'Classic spiced masala chai.', image: 'https://www.rippletea.com/cdn/shop/files/freepik__a-contemporary-cozy-indian-tea-setup-showing-a-ste__52320.jpg?v=1762456643&width=360' },
    { _id: '20', name: 'Green Tea', price: 60, category: 'Tea', description: 'Pure and detoxifying green tea.', image: 'https://www.vahdam.com/cdn/shop/articles/Green_Tea_Header_copy_0e698fae-5d3a-467e-b502-6e0800ea7eb2.jpg?v=1774525547&width=2048' },
    { _id: '21', name: 'Lemon Tea', price: 60, category: 'Tea', description: 'Refreshing tea with a zesty lemon twist.', image: 'https://static.toiimg.com/thumb/57788072.cms?imgsize=208156&width=800&height=800' },
    { _id: '22', name: 'Green Apple Cooler', price: 140, category: 'Mocktails', description: 'Crisp and refreshing green apple flavored cooler.', image: 'https://images.news18.com/ibnkhabar/uploads/2021/06/green-apple-cooler.jpg?im=FitAndFill,width=1200,height=675' },
    { _id: '23', name: 'Hibiscus Cooler', price: 140, category: 'Mocktails', description: 'Floral and vibrant hibiscus infused drink.', image: 'https://www.downtoearth.org/sites/default/files/styles/max_650x650/public/uploads/recipes/Hibiscus.JPG?itok=v1dznyYj' },
    { _id: '24', name: 'Watermelon Mojito', price: 140, category: 'Mocktails', description: 'Sweet watermelon with mint and lime.', image: 'https://allthehealthythings.com/wp-content/uploads/2020/07/Watermelon-Mojito-Mocktail-8-scaled.jpg' },
    { _id: '34', name: 'Kiwi Smoothie', price: 180, category: 'Smoothies', description: 'Refreshing blend of fresh kiwis.', image: 'https://thesuburbansoapbox.com/wp-content/uploads/2019/01/Kiwi-Spinach-Smoothie-5.jpg' },
    { _id: '35', name: 'Mango Smoothie', price: 180, category: 'Smoothies', description: 'Creamy and sweet tropical mango blend.', image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/04/Mango-Smoothie-Recipe.jpg' },
    { _id: '36', name: 'Blueberry Smoothie', price: 180, category: 'Smoothies', description: 'Antioxidant-rich blueberry goodness.', image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/03/Blueberry-Smoothie-main.jpg' },
    { _id: '40', name: 'Oreo Shake', price: 220, category: 'Shakes', description: 'Thick shake with crushed Oreo cookies.', image: 'https://www.whiskaffair.com/wp-content/uploads/2020/07/Oreo-Milkshake-2-3.jpg' },
    { _id: '41', name: 'Brownie Shake', price: 220, category: 'Shakes', description: 'Indulgent shake blended with warm brownies.', image: 'https://cookilicious.com/wp-content/uploads/2025/01/Brownie-Milkshake-Recipe-20-scaled.jpg' },
    { _id: '42', name: 'Chocolate Shake', price: 220, category: 'Shakes', description: 'Classic rich chocolate shake.', image: 'https://jordanseasyentertaining.com/wp-content/uploads/2015/06/chocolate-peanut-butter-milkshake-recipe.jpg' },
    { _id: '47', name: 'White Sauce Pasta', price: 350, category: 'Pasta', description: 'Creamy, Italian pasta toasted in a rich, velvety white sauce with fresh herbs and vegetables.', image: 'https://www.funfoodfrolic.com/wp-content/uploads/2020/03/White-Sauce-Pasta-2.jpg' },
    { _id: '48', name: 'Blush Pasta', price: 350, category: 'Pasta', description: 'A velvety mix of cream and tomato sauce creating the signature pink pasta delight.', image: 'https://www.tasteofhome.com/wp-content/uploads/2025/01/Blushing-Penne-Pasta_EXPS_TOHD24_34895_SuzanNajjar_10.jpg' },
    { _id: '53', name: 'Garden Fresh Rock & Roll', price: 190, category: 'Snacks', description: 'Onion, tomato, aloo tikki, lettuce, sweet corn.', image: 'https://content.jdmagicbox.com/comp/nashik/r2/0253px253.x253.190204171632.h6r2/catalogue/rock-n-roll-panchavati-nashik-fast-food-1mmwylqtqh.jpg' },
    { _id: '55', name: 'Mexican Nachos', price: 260, category: 'Snacks', description: 'Cheese Crunch and loaded with Mexican flavor in every bite.', image: 'https://honestcooking.com/wp-content/uploads/2026/04/crunchy-mexican-salad-cheese-nacho-chips-recipe-hc-2026.jpg' },
    { _id: '57', name: 'Plain Maggi', price: 130, category: 'Snacks', description: 'Classic comfort Maggi.', image: 'https://cdn.zeptonow.com/production/tr:w-640,ar-2400-2400,pr-true,f-auto,q-40/cms/product_variant/bda5d838-4eda-4990-9032-9fc5d5cc284a.jpeg' },
];

const Menu: React.FC = () => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const categories: string[] = ['All', 'Coffee', 'Tea', 'Mocktails', 'Smoothies', 'Shakes', 'Pasta', 'Snacks'];

    useEffect(() => {
        const fetchMenu = async (): Promise<void> => {
            try {
                const res = await axios.get(`${API_URL}/menu`);
                const data: MenuItem[] = res.data?.data || res.data;
                if (Array.isArray(data) && data.length > 0) {
                    setItems(data);
                    setFilteredItems(data);
                } else {
                    setItems(DUMMY_DATA);
                    setFilteredItems(DUMMY_DATA);
                }
            } catch {
                setItems(DUMMY_DATA);
                setFilteredItems(DUMMY_DATA);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        let result = items;
        if (activeCategory !== 'All') result = result.filter((item) => item.category === activeCategory);
        if (searchQuery) result = result.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredItems(result);
    }, [activeCategory, searchQuery, items]);

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-dark-dark transition-colors duration-500">
            <section className="pt-40 pb-20 bg-dark-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 text-white leading-tight">
                            The <span className="text-accent italic font-light">Curated</span> Menu
                        </h1>
                        <p className="text-cream-dark/60 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                            A masterpiece in every cup. Discover our selection of artisanal blends and sophisticated delicacies.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-10 mb-20 items-center justify-between">
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ${activeCategory === cat ? 'bg-primary text-white shadow-2xl shadow-primary/30 -translate-y-1' : 'bg-white dark:bg-dark text-dark-light dark:text-cream-dark hover:bg-cream-light dark:hover:bg-dark-light border border-black/5 dark:border-white/5'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-dark-light/50 group-focus-within:text-accent transition-colors" size={20} />
                        <input type="text" placeholder="Search your masterpiece..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-16 pr-8 py-5 rounded-2xl bg-dark border border-white/5 focus:ring-2 focus:ring-accent/30 outline-none transition-all shadow-sm focus:shadow-xl text-cream-light font-light text-lg" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="animate-spin text-accent mb-4" size={48} />
                        <p className="text-dark-light dark:text-cream-dark">Brewing your menu...</p>
                    </div>
                ) : (
                    <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}>
                        {filteredItems.map((item) => <MenuCard key={item._id} item={item} />)}
                    </motion.div>
                )}

                {!loading && filteredItems.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-xl text-dark-light">No items found matching your selection.</p>
                        <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="mt-4 text-accent hover:underline font-bold">Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
