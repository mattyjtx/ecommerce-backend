const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('./routes', categoryRoutes);
router.use('./routes', productRoutes);
router.use('./routes', tagRoutes);


router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;