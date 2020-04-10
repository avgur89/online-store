const { Router } = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
  const courses = await Course.getAll();

  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses,
  });
});

router.get('/:id', async (req, res) => {
  const course = await Course.getCourseById(req.params.id);

  res.render('course', {
    layout: 'empty',
    title: `Course ${course.title}`,
    course,
  });
});

router.get('/:id/edit', async (req, res) => {
  const course = await Course.getCourseById(req.params.id);

  if (!req.query.allow) {
    return res.redirect('/');
  }

  res.render('edit-course', {
    title: `Edit ${course.title}`,
    course,
  });
});

router.post('/edit', async (req, res) => {
  await Course.update(req.body);
  res.redirect('/courses');
});

module.exports = router;
