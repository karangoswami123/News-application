// // // backend/server.js
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const axios = require('axios');

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// // const newsSchema = new mongoose.Schema({
// //   title: String,
// //   description: String,
// //   url: String,
// //   urlToImage: String,
// //   publishedAt: String,
// // });

// // const News = mongoose.model('News', newsSchema);

// // app.get('/api/news', async (req, res) => {
// //   const news = await News.find();
// //   res.json(news);
// // });

// // app.post('/api/news', async (req, res) => {
// //   const article = new News(req.body);
// //   await article.save();
// //   res.json(article);
// // });

// // app.delete('/api/news/:id', async (req, res) => {
// //   await News.findByIdAndDelete(req.params.id);
// //   res.json({ message: 'Article deleted' });
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = 'MONGODB_URI=mongodb+srv://karangoswami2407:MHnE1IVxO5QXwJfQ@cluster0.era0rsm.mongodb.net/'; // Replace with your actual connection string

// // Connect to MongoDB with increased timeout settings
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
//     socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
// }).then(() => {
//     console.log('MongoDB connected');
// }).catch(err => {
//     console.error('Error connecting to MongoDB:', err.message);
// });

// // Define the Article schema
// const articleSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     url: String,
//     source: String,
//     publishedAt: Date,
// });

// const Article = mongoose.model('Article', articleSchema);

// // Fetch top headlines based on category
// app.get('/api/news', async (req, res) => {
//     const category = req.query.category || 'general';
//     const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=e406f5268ff54ac0a46d8e17bb780b79`; // Replace with your actual API key

//     try {
//         const response = await axios.get(url);
//         res.json(response.data.articles);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching news', error });
//     }
// });

// // Save an article
// app.post('/api/articles', async (req, res) => {
//     const { title, description, url, source, publishedAt } = req.body;

//     try {
//         const newArticle = new Article({ title, description, url, source, publishedAt });
//         await newArticle.save();
//         res.status(201).json(newArticle);
//     } catch (error) {
//         res.status(500).json({ message: 'Error saving article', error });
//     }
// });

// // Get saved articles
// app.get('/api/articles', async (req, res) => {
//     try {
//         const articles = await Article.find();
//         res.json(articles);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching saved articles', error });
//     }
// });

// // Delete an article
// app.delete('/api/articles/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Article.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Article deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting article', error });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
});

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
});

const News = mongoose.model('News', newsSchema);

app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const article = new News(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    console.error('Error saving article:', err);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (err) {
    console.error('Error deleting article:', err);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
