const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product]
  });
  res.json(categoryData)
} catch (err) {
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
try {
  const category = await Category.findByPk(req.params.id, {
    // where: {
    //   id: req.params.id
    // },
    include: [Product]
  }
  );
  res.json(category)
} catch (err) {
  res.status(500).json(err)
}
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.name
    });
    res.json(newCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json(category)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const catDelete = await Category.destroy({
        where: {
          id: req.params.id
        }
      }); 
    res.json(catDelete)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
