const { Router } = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', (req, res) => {
  res.render('add-course', {
    title: 'Add course',
    isAddCourse: true,
  });
});

router.post('/', async (req, res) => {
  const { title, price, imgUrl } = req.body;
  const course = new Course({
    title,
    price,
    imgUrl,
    userId: req.user._id,
  });

  try {
    await course.save();
    res.redirect('/courses');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
