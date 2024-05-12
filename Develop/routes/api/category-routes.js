const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: Product
    });
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product
    });
    res.status(200).json(category)
    if (!category) {
      return res.status(404).json({ message: 'Category does not exist' })
    }

  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
    // create a new category
    const newCategory = await Category.create(req.body);
    
    return res.json(newCategory);
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
  await Category.update(
    {
      category_name: req.body.category_name
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
   // delete a category by its `id` value
  await Category.destroy({
    where: {
      id: req.params.id
    },
  });
  res.json(`You did it. You deleted your thing.`)
});

module.exports = router;
