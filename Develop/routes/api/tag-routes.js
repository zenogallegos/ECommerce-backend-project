const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: Product
    });
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product
    });
    res.status(200).json(tag)
    if (!tag) {
      return res.status(404).json({ message: 'Tag does not exist' })
    }

  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
    
    return res.json(newTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  return res.json(`Updated.`);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id
    },
  });
  res.json(`You did it. You deleted your thing.`)
});

module.exports = router;
