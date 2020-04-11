const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addCourseRoutes = require('./routes/addCourse');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');

const app = express();

// Register and configure hbs.
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addCourseRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 3000;

async function init() {
  try {
    const url =
      'mongodb+srv://avgur:6bA5qW6Qtpn7rNA5@cluster0-udtnb.mongodb.net/shop';

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
