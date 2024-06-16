const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/movie');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    seedDatabase();
}).catch(err => console.log(err));

const seedMovies = [
    {
        title: 'Inception',
        description: 'A mind-bending thriller by Christopher Nolan.',
        releaseYear: 2010,
        genre: 'Sci-Fi',
        watched: false,
        rating: 5,
        review: 'Amazing movie!',
        imageUrl: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7825626_p_v8_ae.jpg'
    },
    {
        title: 'The Shawshank Redemption',
        description: 'A story of hope and friendship.',
        releaseYear: 1994,
        genre: 'Drama',
        watched: true,
        rating: 5,
        review: 'A timeless classic.',
        imageUrl: 'https://assets.gadgets360cdn.com/pricee/assets/product/202204/The_Shawshank_Redemption_1994_1649616960.jpg'
    },
    // Add two more movies
];

async function seedDatabase() {
    try {
        await Movie.deleteMany({});
        await Movie.insertMany(seedMovies);
        console.log('Database seeded!');
        mongoose.connection.close();
    } catch (err) {
        console.log(err);
        mongoose.connection.close();
    }
}
