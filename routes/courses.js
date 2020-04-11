const { Router } = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('userId');

    res.render('courses', {
      title: 'Courses',
      isCourses: true,
      courses,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    res.render('course', {
      layout: 'empty',
      title: `Course ${course.title}`,
      course,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    if (!req.query.allow) {
      return res.redirect('/');
    }

    const course = await Course.findById(req.params.id);

    res.render('edit-course', {
      title: `Edit ${course.title}`,
      course,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/edit', async (req, res) => {
  try {
    const { id } = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);

    res.redirect('/courses');
  } catch (error) {
    console.log(error);
  }
});

router.post('/remove', async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect('/courses');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
