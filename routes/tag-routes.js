const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    results = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });
    res.status(200).json(results);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    results = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });
    if (results === null) {
      res.status(404).json({message: 'Not found!'});
    } else {
    res.status(200).json(results);
    };
  } catch(err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const result = await Tag.create({
      tag_name: req.body.tag_name
    });

    if (result instanceof Tag) {
      res.status(200).json(result);
    } else {
      res.status(500).json({error: 'Something went wrong'});
    }
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const result = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(result + ' tags updated');
  } catch(err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    result = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(result + ' tags deleted');
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;
