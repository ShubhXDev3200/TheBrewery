const Razorpay = require('razorpay');
require('dotenv').config();

const getRazorpay = () => new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function test() {
    try {
        const amount = Math.round(200 * 100);
        const options = {
            amount,
            currency: 'INR',
            receipt: `rcpt_${Date.now().toString().slice(-6)}_${Math.floor(Math.random() * 1000)}`,
            notes: {
                userId: '665a398b1b22596ab0b33630',
            },
        };
        const razorpay = getRazorpay();
        const order = await razorpay.orders.create(options);
        console.log('Success:', order);
    } catch(err) {
        console.error('Error:', err);
    }
}
test();
