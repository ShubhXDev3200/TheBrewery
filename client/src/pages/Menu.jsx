import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Filter, Coffee, IceCream, Utensils, Loader2 } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import { API_URL } from '../services/api';

const Menu = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Coffee', 'Tea', 'Mocktails', 'Smoothies', 'Shakes', 'Pasta', 'Snacks'];

    useEffect(() => {
        const fetchMenu = async () => {
            // Fallback data — used if API is unreachable
            const dummyData = [
                // Coffee
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
                { _id: '14', name: 'Espresso with Orange Juice', price: 180, category: 'Coffee', description: 'Refreshing blend of citrus and bold espresso.', image: 'https://coffeelounge.delonghi.com/wp-content/uploads/2024/04/Recidpe-PDP_Iced-orange-coffee.png' },
                { _id: '15', name: 'Espresso with Cranberry Juice', price: 180, category: 'Coffee', description: 'Tart cranberry paired with intense espresso.', image: 'https://cdn.shopify.com/s/files/1/0589/1640/5315/files/20251207051354-pomegranate-20espresso-20smash-202-min.png?v=1765084437&width=1600&height=900' },
                { _id: '16', name: 'Fizz B with Espresso', price: 180, category: 'Coffee', description: 'Bubbly fizz combined with our signature espresso.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalwYOjOEwEbM2zPxVE9-S3JWHcdxWLVq_jg&s' },
                { _id: '17', name: 'Redbull with Espresso', price: 210, category: 'Coffee', description: 'Ultimate energy kick combining Redbull and espresso.', image: 'https://cdn.uengage.io/uploads/18085/image-637554-1758266061.jpeg' },
                { _id: '18', name: 'Tonic Water with Espresso', price: 180, category: 'Coffee', description: 'Crisp tonic water with a shot of espresso.', image: 'https://res.cloudinary.com/htt8g4cd/image/upload/w_1920,c_limit,f_auto,q_auto/wp/07_23_espresso_tonic_hero_stocksy_4062559_1920x1280' },
                // Tea
                { _id: '19', name: 'Indian Tea', price: 50, category: 'Tea', description: 'Classic spiced masala chai.', image: 'https://www.rippletea.com/cdn/shop/files/freepik__a-contemporary-cozy-indian-tea-setup-showing-a-ste__52320.jpg?v=1762456643&width=360' },
                { _id: '20', name: 'Green Tea', price: 60, category: 'Tea', description: 'Pure and detoxifying green tea.', image: 'https://www.vahdam.com/cdn/shop/articles/Green_Tea_Header_copy_0e698fae-5d3a-467e-b502-6e0800ea7eb2.jpg?v=1774525547&width=2048' },
                { _id: '21', name: 'Lemon Tea', price: 60, category: 'Tea', description: 'Refreshing tea with a zesty lemon twist.', image: 'https://static.toiimg.com/thumb/57788072.cms?imgsize=208156&width=800&height=800' },
                // Mocktails
                { _id: '22', name: 'Green Apple Cooler', price: 140, category: 'Mocktails', description: 'Crisp and refreshing green apple flavored cooler.', image: 'https://images.news18.com/ibnkhabar/uploads/2021/06/green-apple-cooler.jpg?im=FitAndFill,width=1200,height=675' },
                { _id: '23', name: 'Hibiscus Cooler', price: 140, category: 'Mocktails', description: 'Floral and vibrant hibiscus infused drink.', image: 'https://www.downtoearth.org/sites/default/files/styles/max_650x650/public/uploads/recipes/Hibiscus.JPG?itok=v1dznyYj' },
                { _id: '24', name: 'Watermelon Mojito', price: 140, category: 'Mocktails', description: 'Sweet watermelon with mint and lime.', image: 'https://allthehealthythings.com/wp-content/uploads/2020/07/Watermelon-Mojito-Mocktail-8-scaled.jpg' },
                { _id: '25', name: 'Grenadine Cooler', price: 140, category: 'Mocktails', description: 'Classic sweet and tart pomegranate flavored cooler.', image: 'https://cdn.shopify.com/s/files/1/0823/2357/0996/files/gg.jpg?v=1713439058' },
                { _id: '26', name: 'Blue Curaçao Mojito', price: 140, category: 'Mocktails', description: 'Stunning blue mojito with citrus notes.', image: 'https://agratefulmeal.com/wp-content/uploads/2023/02/blue-mojito-curacao-cocktail-featured.jpg' },
                { _id: '27', name: 'Mint Mojito', price: 140, category: 'Mocktails', description: 'Classic refreshing mint and lime mojito.', image: 'https://libationchronicles.com/wp-content/uploads/2025/04/Mojito-2.jpg' },
                { _id: '28', name: 'Blueberry Mojito', price: 140, category: 'Mocktails', description: 'Bursting with fresh blueberry flavor.', image: 'https://www.acouplecooks.com/wp-content/uploads/2021/08/Blueberry-Mojito-003.jpg' },
                { _id: '29', name: 'Kala Khatta Mojito', price: 140, category: 'Mocktails', description: 'Tangy and spicy Indian summer favorite.', image: 'https://belistasteofhome.com/wp-content/uploads/2023/08/unnamed-1.jpg' },
                { _id: '30', name: 'Tropical Layers Kiwi', price: 160, category: 'Mocktails', description: 'Exotic layered drink with fresh kiwi.', image: 'https://static.wixstatic.com/media/bb6094_126b6bfac634404c9298f0ea064df5a0~mv2.webp' },
                { _id: '31', name: 'Mango Berry Bliss', price: 170, category: 'Mocktails', description: 'Sweet mango paired with mixed berries.', image: 'https://thirstytales.com/wp-content/uploads/2025/01/Berry-Bliss-Mocktail-Recipe.jpg' },
                { _id: '32', name: 'Sun-Kissed Sip', price: 160, category: 'Mocktails', description: 'Bright and citrusy summer refreshment.', image: 'https://imbibemagazine.com/wp-content/uploads/2024/07/dotdotdotsouthend-crdt-ashleybrown-1024x1002.jpg' },
                { _id: '33', name: 'Yuzu', price: 190, category: 'Mocktails', description: 'Sophisticated Japanese citrus cooler.', image: 'https://streetsmartnutrition.com/wp-content/uploads/2025/07/Yuzu-Mojito-07.jpg' },
                // Smoothies
                { _id: '34', name: 'Kiwi Smoothie', price: 180, category: 'Smoothies', description: 'Refreshing blend of fresh kiwis.', image: 'https://thesuburbansoapbox.com/wp-content/uploads/2019/01/Kiwi-Spinach-Smoothie-5.jpg' },
                { _id: '35', name: 'Mango Smoothie', price: 180, category: 'Smoothies', description: 'Creamy and sweet tropical mango blend.', image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/04/Mango-Smoothie-Recipe.jpg' },
                { _id: '36', name: 'Blueberry Smoothie', price: 180, category: 'Smoothies', description: 'Antioxidant-rich blueberry goodness.', image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/03/Blueberry-Smoothie-main.jpg' },
                { _id: '37', name: 'Strawberry Smoothie', price: 180, category: 'Smoothies', description: 'Classic strawberry delight.', image: 'https://gimmedelicious.com/wp-content/uploads/2024/08/Strawberry-Banana-Smoothie-SQ.jpg' },
                { _id: '38', name: 'Strawberry Smoothie Bowl', price: 320, category: 'Smoothies', description: 'A refreshing strawberry blend crowned with fresh fruits and nutrition-rich dry fruits.', image: 'https://naturallieplantbased.com/wp-content/uploads/2023/01/IMG_4265_11zon.jpg' },
                { _id: '39', name: 'Mango Smoothie Bowl', price: 320, category: 'Smoothies', description: 'A refreshing mango bowl loaded with the goodness of fresh fruits and nutrient-rich dry fruits.', image: 'https://theallnaturalvegan.com/wp-content/uploads/2025/06/mango-smoothie-bowl-featured-image.jpg' },
                // Shakes
                { _id: '40', name: 'Oreo Shake', price: 220, category: 'Shakes', description: 'Thick shake with crushed Oreo cookies.', image: 'https://www.whiskaffair.com/wp-content/uploads/2020/07/Oreo-Milkshake-2-3.jpg' },
                { _id: '41', name: 'Brownie Shake', price: 220, category: 'Shakes', description: 'Indulgent shake blended with warm brownies.', image: 'https://cookilicious.com/wp-content/uploads/2025/01/Brownie-Milkshake-Recipe-20-scaled.jpg' },
                { _id: '42', name: 'Chocolate Shake', price: 220, category: 'Shakes', description: 'Classic rich chocolate shake.', image: 'https://jordanseasyentertaining.com/wp-content/uploads/2015/06/chocolate-peanut-butter-milkshake-recipe.jpg' },
                { _id: '43', name: 'Kitkat Shake', price: 220, category: 'Shakes', description: 'Crunchy Kitkat pieces in a creamy shake.', image: 'https://darkdelight.in/cdn/shop/files/77d93b30c4b1f05c6285f707f133fe6b.jpg?v=1753365477' },
                { _id: '44', name: 'Biscoff Shake', price: 290, category: 'Shakes', description: 'Caramelized Lotus Biscoff flavor.', image: 'https://entirelyelizabeth.com/wp-content/uploads/2022/11/IMG_3926-2.jpg' },
                { _id: '45', name: 'Tender Coconut Shake', price: 250, category: 'Shakes', description: 'Fresh and creamy tender coconut blend.', image: 'https://i.pinimg.com/474x/04/21/98/042198298bbd634dbcf3529848d4a1ab.jpg' },
                { _id: '46', name: 'Pina Colada', price: 260, category: 'Shakes', description: 'Tropical pineapple and coconut shake.', image: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-07-pina-colada%2Fpina-colada-177' },
                // Pasta
                { _id: '47', name: 'White Sauce Pasta', price: 350, category: 'Pasta', description: 'Creamy, Italian pasta toasted in a rich, velvety white sauce with fresh herbs and vegetables.', image: 'https://www.funfoodfrolic.com/wp-content/uploads/2020/03/White-Sauce-Pasta-2.jpg' },
                { _id: '48', name: 'Blush Pasta', price: 350, category: 'Pasta', description: 'A velvety mix of cream and tomato sauce creating the signature pink pasta delight.', image: 'https://www.tasteofhome.com/wp-content/uploads/2025/01/Blushing-Penne-Pasta_EXPS_TOHD24_34895_SuzanNajjar_10.jpg' },
                { _id: '49', name: 'Pesto Pasta', price: 370, category: 'Pasta', description: 'Creamy basil pesto blended with pasta and herbs for a refreshing gourmet delight.', image: 'https://www.splashoftaste.com/wp-content/uploads/2026/02/Pesto-Pasta-22.jpg' },
                { _id: '50', name: 'Tangy Twist Pasta', price: 350, category: 'Pasta', description: 'Spicy, tangy, and vibrant - pasta with a perfect balance of heat and zest.', image: 'https://sinfullyspicy.com/wp-content/uploads/2022/06/2-1.jpg' },
                { _id: '51', name: 'Garlic Flavoured Spaghetti', price: 280, category: 'Pasta', description: 'Spaghetti tossed in fragrant olive oil infused with roasted garlic and herbs.', image: 'https://cravinghomecooked.com/wp-content/uploads/2022/12/creamy-garlic-butter-spaghetti-1-17.jpg' },
                { _id: '52', name: 'Pesto Spaghetti', price: 320, category: 'Pasta', description: 'Tender spaghetti coated in a velvety basil pesto and cream sauce, blended with parmesan.', image: 'https://thesageapron.com/wp-content/uploads/2023/06/Spagetti-al-Pesto-5.jpg' },
                // Snacks
                { _id: '53', name: 'Garden Fresh Rock & Roll', price: 190, category: 'Snacks', description: 'Onion, tomato, aloo tikki, lettuce, sweet corn.', image: 'https://content.jdmagicbox.com/comp/nashik/r2/0253px253.x253.190204171632.h6r2/catalogue/rock-n-roll-panchavati-nashik-fast-food-1mmwylqtqh.jpg' },
                { _id: '54', name: 'Smoky Paneer Rock & Roll', price: 210, category: 'Snacks', description: 'Paneer, capsicum, onion.', image: 'https://t3.ftcdn.net/jpg/15/86/80/16/360_F_1586801641_vdjFbf71WMHA29nEVWYE492Eadrt0Xka.jpg' },
                { _id: '55', name: 'Mexican Nachos', price: 260, category: 'Snacks', description: 'Cheese Crunch and loaded with Mexican flavor in every bite.', image: 'https://honestcooking.com/wp-content/uploads/2026/04/crunchy-mexican-salad-cheese-nacho-chips-recipe-hc-2026.jpg' },
                { _id: '56', name: 'Zesty Cheese Nachos', price: 240, category: 'Snacks', description: 'Crunchy Nachos layered with garden fresh veggie and café-style flavors.', image: 'https://brandsitesplatform-res.cloudinary.com/image/fetch/w_auto:100,c_scale,q_auto:eco,f_auto,fl_lossy,dpr_auto,e_sharpen:85/https://assets.brandplatform.generalmills.com%2F-%2Fmedia%2Fproject%2Fgmi%2Foldelpaso%2Foldelpaso-uk%2Foepp%2Farticles%2Fold-el-paso-steak-nachos-1400x500-article-banner-uk.png%3Frev%3Dc578f71bbd9d4a5ca2c89f24ad3d1687' },
                { _id: '57', name: 'Plain Maggi', price: 130, category: 'Snacks', description: 'Classic comfort Maggi.', image: 'https://cdn.zeptonow.com/production/tr:w-640,ar-2400-2400,pr-true,f-auto,q-40/cms/product_variant/bda5d838-4eda-4990-9032-9fc5d5cc284a.jpeg' },
                { _id: '58', name: 'Vegetable Maggi', price: 150, category: 'Snacks', description: 'Maggi with onion, capsicum, and tomato.', image: 'https://www.jcookingodyssey.com/wp-content/uploads/2026/02/masala-maggi-noodles.jpg' },
                { _id: '59', name: 'Vegetable Cheese Maggi', price: 170, category: 'Snacks', description: 'Cheesy Maggi with mixed veggies and processed cheese.', image: 'https://www.whiskaffair.com/wp-content/uploads/2018/01/Cheese-Maggi-2-3-2.jpg' },
                { _id: '60', name: 'Garlic Flavour Maggi', price: 170, category: 'Snacks', description: 'Maggi infused with bold garlic flavor.', image: 'https://myborosil.com/cdn/shop/articles/23.png?v=1768825451' },
            ];

            try {
                const res = await axios.get(`${API_URL}/menu`);
                const data = res.data?.data || res.data;
                if (Array.isArray(data) && data.length > 0) {
                    setItems(data);
                    setFilteredItems(data);
                } else {
                    // API returned empty — use fallback
                    setItems(dummyData);
                    setFilteredItems(dummyData);
                }
            } catch (err) {
                console.error('Error fetching menu, using fallback data:', err);
                setItems(dummyData);
                setFilteredItems(dummyData);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);




    useEffect(() => {
        let result = items;
        if (activeCategory !== 'All') {
            result = result.filter(item => item.category === activeCategory);
        }
        if (searchQuery) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredItems(result);
    }, [activeCategory, searchQuery, items]);

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-dark-dark transition-colors duration-500">
            {/* Immersive Header */}
            <section className="pt-40 pb-20 bg-dark-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
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
                {/* Filters & Search - Modern Layout */}
                <div className="flex flex-col lg:flex-row gap-10 mb-20 items-center justify-between">
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ${activeCategory === cat
                                    ? 'bg-primary text-white shadow-2xl shadow-primary/30 -translate-y-1'
                                    : 'bg-white dark:bg-dark text-dark-light dark:text-cream-dark hover:bg-cream-light dark:hover:bg-dark-light border border-black/5 dark:border-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-dark-light/50 group-focus-within:text-accent transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search your masterpiece..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 rounded-2xl bg-dark border border-white/5 focus:ring-2 focus:ring-accent/30 outline-none transition-all shadow-sm focus:shadow-xl text-cream-light font-light text-lg"
                        />
                    </div>
                </div>

                {/* Menu Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="animate-spin text-accent mb-4" size={48} />
                        <p className="text-dark-light dark:text-cream-dark">Brewing your menu...</p>
                    </div>
                ) : (
                    <motion.div
                        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.04 } }
                        }}
                    >
                        {filteredItems.map((item) => (
                            <MenuCard key={item._id} item={item} />
                        ))}
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
