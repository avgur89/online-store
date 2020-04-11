const { Router } = require('express');
const router = Router();
const Course = require('../models/course');

function mapCartItems(cart) {
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    id: c.courseId.id,
    count: c.count,
  }));
}

function computePrice(courses) {
  return courses.reduce((total, course) => {
    return (total += course.price * course.count);
  }, 0);
}

router.get('/', async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId').execPopulate();

    const courses = mapCartItems(user.cart);

    res.render('cart', {
      title: 'Cart',
      isCart: true,
      courses,
      price: computePrice(courses),
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', async (req, res) => {
  try {
    const course = await Course.findById(req.body.id);

    await req.user.addToCart(course);
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    await req.user.removeFromCart(req.params.id);

    const user = await req.user.populate('cart.items.courseId').execPopulate();
    const courses = mapCartItems(user.cart);
    const cart = {
      courses,
      price: computePrice(courses),
    };

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
