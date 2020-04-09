const express = require('express');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addCourseRoutes = require('./routes/addCourse');

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
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addCourseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
