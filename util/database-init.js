
const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');
const MustacheStyle = require('../models/MustacheStyle');

async function insertBlogPosts() {
  // Database URI
  const MONGODB_URI = 'mongodb+srv://databaseUser:databaseUser@cluster0.kuylelu.mongodb.net/FinalProject?retryWrites=true&w=majority&appName=Cluster0';

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');


    // Define blog post data
    const blogPosts = [
      {
        title: "why i grew a mustache",
        imageURL: "images/cutting-mustache.jpg",
        summary: "If you can grow a mustache, you should give it a try.",
        content: "You'll never know what you look like with a mustache if you don't try. I grew a mustache just to try it, and I love the way I look!"
      },
      {
        title: "in the country",
        imageURL: "images/in-the-country.jpg",
        summary: "When you need shelter.",
        content: "Living in the country can be tough. Growing a mustache makes you tougher. What's more, a mustache like this can help provide a shelter for your family."
      },
      {
        title: "the mustache brothers",
        imageURL: "images/mustache-brothers.jpg",
        summary: "Two brothers with mustaches",
        content: "If you are having difficulty connecting with your brother, ask them to grow a mustache with you. Mustaches can bring families together."
      }
    ];

    const mustacheStyles = [
        { "title": "The Stoic", "imageURL": "images/mustache1.jpg", "description": "Experience the mustache the way it was meant to be experienced: simple." },
        { "title": "The Actor", "imageURL": "images/mustache2.jpg", "description": "Land your next big role with this mustache-beard combo." },
        { "title": "The Long Nose Hair", "imageURL": "images/mustache3.jpg", "description": "Wow, what an amazing mustache! Is it growing out of your nose?" },
        { "title": "The Happy Man", "imageURL": "images/mustache4.jpg", "description": "Hide an awkward smile behind an amazing mustache." },
        { "title": "The Flavor Saver", "imageURL": "images/mustache5.jpg", "description": "Miss the taste of last night's pizza?" },
        { "title": "The Patch", "imageURL": "images/mustache6.jpg", "description": "Doesn't connect to the rest of the beard, but that's ok." },
        { "title": "The Father", "imageURL": "images/mustache7.jpg", "description": "Real dads grow responsible mustaches." },
        { "title": "The Umbrella", "imageURL": "images/mustache8.jpg", "description": "Build a shelter under this magnificient mustache." },
        { "title": "Got Milk?", "imageURL": "images/mustache9.jpg", "description": "Nice mustache! Wait, is that chocolate milk?" }
      ];
      
      

    // Insert the blog post data
    const blogResult = await BlogPost.insertMany(blogPosts);
    console.log('Blog posts inserted:', blogResult);

    const mustacheResult = await MustacheStyle.insertMany(mustacheStyles);
    console.log('Blog posts inserted:', mustacheResult);

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');

  } catch (error) {
    console.error('Failed to insert blog posts:', error);
  }
}

insertBlogPosts();
