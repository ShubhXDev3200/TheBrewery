const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv
dotenv.config({ path: path.join(__dirname, '.env') });

// Define Menu Schema (matching your backend)
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const MenuItem = mongoose.model('MenuItem', menuSchema);

const menuData = [
  // Coffee
  { name: 'Cappuccino', price: 130, category: 'Coffee', description: 'Classic espresso with steamed milk and dense foam.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
  { name: 'Americano', price: 100, category: 'Coffee', description: 'Espresso shots topped with hot water for a rich, bold flavor.', image: 'https://myeverydaytable.com/wp-content/uploads/AmericanoHotandIced-3.jpg' },
  { name: 'Latte', price: 160, category: 'Coffee', description: 'Smooth espresso with plenty of steamed milk and a light layer of foam.', image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vanilla Latte', price: 180, category: 'Coffee', description: 'Our classic latte infused with sweet vanilla syrup.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mocha', price: 160, category: 'Coffee', description: 'A perfect blend of espresso, chocolate, and steamed milk.', image: 'https://images.unsplash.com/photo-1522992319-0365e5f11656?auto=format&fit=crop&w=800&q=80' },
  { name: 'Italian Bicerin', price: 180, category: 'Coffee', description: 'Traditional Turin drink with layers of espresso, chocolate and cream.', image: 'https://www.deliciousmagazine.co.uk/wp-content/uploads/2023/11/2023D161_ITALIANXMAS_BICERIN_2__.jpg' },
  { name: 'Irish Cappuccino', price: 180, category: 'Coffee', description: 'Cappuccino with a hint of Irish cream flavor.', image: 'https://mymocktailforest.com/wp-content/uploads/2024/03/non-alcoholic-irish-coffee-7.jpg' },
  { name: 'Caramel Cappuccino', price: 180, category: 'Coffee', description: 'Rich cappuccino drizzled with sweet caramel sauce.', image: 'https://images.unsplash.com/photo-1572286258217-40142c1c6a70?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hazelnut Cappuccino', price: 180, category: 'Coffee', description: 'Cappuccino infused with nutty hazelnut syrup.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Filter Coffee', price: 80, category: 'Coffee', description: 'Traditional South Indian style filter coffee.', image: 'https://www.agoraliarecipes.com/wp-content/uploads/2022/08/AR000232JR-Indian-Kaapi-Filter-Coffee-FTR1-ph01-Shtr_SMALL.jpg' },
  { name: 'Espresso 60ml', price: 120, category: 'Coffee', description: 'Pure, intense shot of our signature blend.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hot Chocolate', price: 140, category: 'Coffee', description: 'Rich, creamy chocolate served warm.', image: 'https://cookienameddesire.com/wp-content/uploads/2017/11/nutella-hot-chocoate.jpg' },
  { name: 'Affogato', price: 180, category: 'Coffee', description: 'Vanilla bean gelato drowned in a hot shot of espresso.', image: 'https://www.thespruceeats.com/thmb/5PcCBEaUd1U1eFxfcKKPLVnZzfA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/affogato-4776668-hero-08-40d7a68d12ba46f48eaea3c43aba715c.jpg', isPopular: true },
  { name: 'Espresso with Orange Juice', price: 180, category: 'Coffee', description: 'Refreshing blend of citrus and bold espresso.', image: 'https://coffeelounge.delonghi.com/wp-content/uploads/2024/04/Recidpe-PDP_Iced-orange-coffee.png' },
  { name: 'Espresso with Cranberry Juice', price: 180, category: 'Coffee', description: 'Tart cranberry paired with intense espresso.', image: 'https://cdn.shopify.com/s/files/1/0589/1640/5315/files/20251207051354-pomegranate-20espresso-20smash-202-min.png?v=1765084437&width=1600&height=900' },
  { name: 'Fizz B with Espresso', price: 180, category: 'Coffee', description: 'Bubbly fizz combined with our signature espresso.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalwYOjOEwEbM2zPxVE9-S3JWHcdxWLVq_jg&s' },
  { name: 'Redbull with Espresso', price: 210, category: 'Coffee', description: 'Ultimate energy kick combining Redbull and espresso.', image: 'https://cdn.uengage.io/uploads/18085/image-637554-1758266061.jpeg' },
  { name: 'Tonic Water with Espresso', price: 180, category: 'Coffee', description: 'Crisp tonic water with a shot of espresso.', image: 'https://res.cloudinary.com/htt8g4cd/image/upload/w_1920,c_limit,f_auto,q_auto/wp/07_23_espresso_tonic_hero_stocksy_4062559_1920x1280' },
  
  // Tea
  { name: 'Indian Tea', price: 50, category: 'Tea', description: 'Classic spiced masala chai.', image: 'https://www.rippletea.com/cdn/shop/files/freepik__a-contemporary-cozy-indian-tea-setup-showing-a-ste__52320.jpg?v=1762456643&width=360' },
  { name: 'Green Tea', price: 60, category: 'Tea', description: 'Pure and detoxifying green tea.', image: 'https://www.vahdam.com/cdn/shop/articles/Green_Tea_Header_copy_0e698fae-5d3a-467e-b502-6e0800ea7eb2.jpg?v=1774525547&width=2048' },
  { name: 'Lemon Tea', price: 60, category: 'Tea', description: 'Refreshing tea with a zesty lemon twist.', image: 'https://static.toiimg.com/thumb/57788072.cms?imgsize=208156&width=800&height=800' },
  
  // Mocktails
  { name: 'Green Apple Cooler', price: 140, category: 'Mocktails', description: 'Crisp and refreshing green apple flavored cooler.', image: 'https://images.news18.com/ibnkhabar/uploads/2021/06/green-apple-cooler.jpg?im=FitAndFill,width=1200,height=675' },
  { name: 'Hibiscus Cooler', price: 140, category: 'Mocktails', description: 'Floral and vibrant hibiscus infused drink.', image: 'https://www.downtoearth.org/sites/default/files/styles/max_650x650/public/uploads/recipes/Hibiscus.JPG?itok=v1dznyYj' },
  { name: 'Watermelon Mojito', price: 140, category: 'Mocktails', description: 'Sweet watermelon with mint and lime.', image: 'https://allthehealthythings.com/wp-content/uploads/2020/07/Watermelon-Mojito-Mocktail-8-scaled.jpg' },
  { name: 'Grenadine Cooler', price: 140, category: 'Mocktails', description: 'Classic sweet and tart pomegranate flavored cooler.', image: 'https://cdn.shopify.com/s/files/1/0823/2357/0996/files/gg.jpg?v=1713439058' },
  { name: 'Blue Curaçao Mojito', price: 140, category: 'Mocktails', description: 'Stunning blue mojito with citrus notes.', image: 'https://agratefulmeal.com/wp-content/uploads/2023/02/blue-mojito-curacao-cocktail-featured.jpg' },
  { name: 'Mint Mojito', price: 140, category: 'Mocktails', description: 'Classic refreshing mint and lime mojito.', image: 'https://libationchronicles.com/wp-content/uploads/2025/04/Mojito-2.jpg' },
  { name: 'Blueberry Mojito', price: 140, category: 'Mocktails', description: 'Bursting with fresh blueberry flavor.', image: 'https://www.acouplecooks.com/wp-content/uploads/2021/08/Blueberry-Mojito-003.jpg' },
  { name: 'Kala Khatta Mojito', price: 140, category: 'Mocktails', description: 'Tangy and spicy Indian summer favorite.', image: 'https://belistasteofhome.com/wp-content/uploads/2023/08/unnamed-1.jpg' },
  { name: 'Tropical Layers Kiwi', price: 160, category: 'Mocktails', description: 'Exotic layered drink with fresh kiwi.', image: 'https://static.wixstatic.com/media/bb6094_126b6bfac634404c9298f0ea064df5a0~mv2.webp' },
  { name: 'Mango Berry Bliss', price: 170, category: 'Mocktails', description: 'Sweet mango paired with mixed berries.', image: 'https://thirstytales.com/wp-content/uploads/2025/01/Berry-Bliss-Mocktail-Recipe.jpg' },
  { name: 'Sun-Kissed Sip', price: 160, category: 'Mocktails', description: 'Bright and citrusy summer refreshment.', image: 'https://imbibemagazine.com/wp-content/uploads/2024/07/dotdotdotsouthend-crdt-ashleybrown-1024x1002.jpg' },
  { name: 'Yuzu', price: 190, category: 'Mocktails', description: 'Sophisticated Japanese citrus cooler.', image: 'https://streetsmartnutrition.com/wp-content/uploads/2025/07/Yuzu-Mojito-07.jpg' },
  
  // Smoothies
  { name: 'Kiwi Smoothie', price: 180, category: 'Smoothies', description: 'Refreshing blend of fresh kiwis.', image: 'https://thesuburbansoapbox.com/wp-content/uploads/2019/01/Kiwi-Spinach-Smoothie-5.jpg' },
  { name: 'Mango Smoothie', price: 180, category: 'Smoothies', description: 'Creamy and sweet tropical mango blend.', image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/04/Mango-Smoothie-Recipe.jpg' },
  { name: 'Blueberry Smoothie', price: 180, category: 'Smoothies', description: 'Antioxidant-rich blueberry goodness.', image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/03/Blueberry-Smoothie-main.jpg' },
  { name: 'Strawberry Smoothie', price: 180, category: 'Smoothies', description: 'Classic strawberry delight.', image: 'https://gimmedelicious.com/wp-content/uploads/2024/08/Strawberry-Banana-Smoothie-SQ.jpg' },
  { name: 'Strawberry Smoothie Bowl', price: 320, category: 'Smoothies', description: 'A refreshing strawberry blend crowned with fresh fruits and nutrition-rich dry fruits.', image: 'https://naturallieplantbased.com/wp-content/uploads/2023/01/IMG_4265_11zon.jpg' },
  { name: 'Mango Smoothie Bowl', price: 320, category: 'Smoothies', description: 'A refreshing mango bowl loaded with the goodness of fresh fruits and nutrient-rich dry fruits.', image: 'https://theallnaturalvegan.com/wp-content/uploads/2025/06/mango-smoothie-bowl-featured-image.jpg' },
  
  // Shakes
  { name: 'Oreo Shake', price: 220, category: 'Shakes', description: 'Thick shake with crushed Oreo cookies.', image: 'https://www.whiskaffair.com/wp-content/uploads/2020/07/Oreo-Milkshake-2-3.jpg' },
  { name: 'Brownie Shake', price: 220, category: 'Shakes', description: 'Indulgent shake blended with warm brownies.', image: 'https://cookilicious.com/wp-content/uploads/2025/01/Brownie-Milkshake-Recipe-20-scaled.jpg' },
  { name: 'Chocolate Shake', price: 220, category: 'Shakes', description: 'Classic rich chocolate shake.', image: 'https://jordanseasyentertaining.com/wp-content/uploads/2015/06/chocolate-peanut-butter-milkshake-recipe.jpg' },
  { name: 'Kitkat Shake', price: 220, category: 'Shakes', description: 'Crunchy Kitkat pieces in a creamy shake.', image: 'https://darkdelight.in/cdn/shop/files/77d93b30c4b1f05c6285f707f133fe6b.jpg?v=1753365477' },
  { name: 'Biscoff Shake', price: 290, category: 'Shakes', description: 'Caramelized Lotus Biscoff flavor.', image: 'https://entirelyelizabeth.com/wp-content/uploads/2022/11/IMG_3926-2.jpg' },
  { name: 'Tender Coconut Shake', price: 250, category: 'Shakes', description: 'Fresh and creamy tender coconut blend.', image: 'https://i.pinimg.com/474x/04/21/98/042198298bbd634dbcf3529848d4a1ab.jpg' },
  { name: 'Pina Colada', price: 260, category: 'Shakes', description: 'Tropical pineapple and coconut shake.', image: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-07-pina-colada%2Fpina-colada-177' },
  
  // Pasta
  { name: 'White Sauce Pasta', price: 350, category: 'Pasta', description: 'Creamy, Italian pasta toasted in a rich, velvety white sauce with fresh herbs and vegetables.', image: 'https://www.funfoodfrolic.com/wp-content/uploads/2020/03/White-Sauce-Pasta-2.jpg' },
  { name: 'Blush Pasta', price: 350, category: 'Pasta', description: 'A velvety mix of cream and tomato sauce creating the signature pink pasta delight.', image: 'https://www.tasteofhome.com/wp-content/uploads/2025/01/Blushing-Penne-Pasta_EXPS_TOHD24_34895_SuzanNajjar_10.jpg' },
  { name: 'Pesto Pasta', price: 370, category: 'Pasta', description: 'Creamy basil pesto blended with pasta and herbs for a refreshing gourmet delight.', image: 'https://www.splashoftaste.com/wp-content/uploads/2026/02/Pesto-Pasta-22.jpg' },
  { name: 'Tangy Twist Pasta', price: 350, category: 'Pasta', description: 'Spicy, tangy, and vibrant - pasta with a perfect balance of heat and zest.', image: 'https://sinfullyspicy.com/wp-content/uploads/2022/06/2-1.jpg' },
  { name: 'Garlic Flavoured Spaghetti', price: 280, category: 'Pasta', description: 'Spaghetti tossed in fragrant olive oil infused with roasted garlic and herbs.', image: 'https://cravinghomecooked.com/wp-content/uploads/2022/12/creamy-garlic-butter-spaghetti-1-17.jpg' },
  { name: 'Pesto Spaghetti', price: 320, category: 'Pasta', description: 'Tender spaghetti coated in a velvety basil pesto and cream sauce, blended with parmesan.', image: 'https://thesageapron.com/wp-content/uploads/2023/06/Spagetti-al-Pesto-5.jpg' },
  
  // Snacks
  { name: 'Garden Fresh Rock & Roll', price: 190, category: 'Snacks', description: 'Onion, tomato, aloo tikki, lettuce, sweet corn.', image: 'https://content.jdmagicbox.com/comp/nashik/r2/0253px253.x253.190204171632.h6r2/catalogue/rock-n-roll-panchavati-nashik-fast-food-1mmwylqtqh.jpg' },
  { name: 'Smoky Paneer Rock & Roll', price: 210, category: 'Snacks', description: 'Paneer, capsicum, onion.', image: 'https://t3.ftcdn.net/jpg/15/86/80/16/360_F_1586801641_vdjFbf71WMHA29nEVWYE492Eadrt0Xka.jpg' },
  { name: 'Mexican Nachos', price: 260, category: 'Snacks', description: 'Cheese Crunch and loaded with Mexican flavor in every bite.', image: 'https://honestcooking.com/wp-content/uploads/2026/04/crunchy-mexican-salad-cheese-nacho-chips-recipe-hc-2026.jpg' },
  { name: 'Zesty Cheese Nachos', price: 240, category: 'Snacks', description: 'Crunchy Nachos layered with garden fresh veggie and café-style flavors.', image: 'https://brandsitesplatform-res.cloudinary.com/image/fetch/w_auto:100,c_scale,q_auto:eco,f_auto,fl_lossy,dpr_auto,e_sharpen:85/https://assets.brandplatform.generalmills.com%2F-%2Fmedia%2Fproject%2Fgmi%2Foldelpaso%2Foldelpaso-uk%2Foepp%2Farticles%2Fold-el-paso-steak-nachos-1400x500-article-banner-uk.png%3Frev%3Dc578f71bbd9d4a5ca2c89f24ad3d1687' },
  { name: 'Plain Maggi', price: 130, category: 'Snacks', description: 'Classic comfort Maggi.', image: 'https://cdn.zeptonow.com/production/tr:w-640,ar-2400-2400,pr-true,f-auto,q-40/cms/product_variant/bda5d838-4eda-4990-9032-9fc5d5cc284a.jpeg' },
  { name: 'Vegetable Maggi', price: 150, category: 'Snacks', description: 'Maggi with onion, capsicum, and tomato.', image: 'https://www.jcookingodyssey.com/wp-content/uploads/2026/02/masala-maggi-noodles.jpg' },
  { name: 'Vegetable Cheese Maggi', price: 170, category: 'Snacks', description: 'Cheesy Maggi with mixed veggies and processed cheese.', image: 'https://www.whiskaffair.com/wp-content/uploads/2018/01/Cheese-Maggi-2-3-2.jpg' },
  { name: 'Garlic Flavour Maggi', price: 170, category: 'Snacks', description: 'Maggi infused with bold garlic flavor.', image: 'https://myborosil.com/cdn/shop/articles/23.png?v=1768825451' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');
    
    // Clear existing data
    await MenuItem.deleteMany({});
    console.log('Old menu items cleared.');
    
    // Insert new data
    await MenuItem.insertMany(menuData);
    console.log('New menu items seeded successfully!');
    
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
