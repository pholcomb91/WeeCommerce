const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [Product],
      include: [ProductTag],
      include: {
        all: true,
        nested: true,
      }
  });
  res.json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product],
      include: [ProductTag],
      include: {
        all: true,
        nested: true,
      }
    });
    if (!tag) {
      res.status(404).json({message: 'No Tag with that ID.'})
    }
    res.json(tag)
    } catch (err) {
      res.status(500).json(err)
    }
  });

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!tag) {
      res.status(404).json({message: 'No Tag with that ID.'})
    }
    res.json({message: "Update successful!"})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagDelete = await Tag.destroy({
        where: {
          id: req.params.id
        }
      }); 
    res.json({message: "Delete successful"})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
