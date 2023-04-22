const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  const categoriesData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoriesData);
} catch (err) {
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
 try {
  const categoryByPk = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
 });
 if (!categoryByPk) {
  res.status(404).json({ message: "Category not found!" });
  return;
 }
 res.status(200).json(categoryByPk);
 } catch (err) {
  res.status(500),json(err)
 }
});

router.post('/', async (req, res) => {
try {
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
} catch (err) {
  res.status(500),json(err);
}
});


router.put('/:id', async (req, res) => {
  try{
    const updateCategoryById = await Category.update(req.params.id, req.body, {
      where: {
        id: category_name
      },
    });
    if (!updateCategoryById[0]) {
      res.status(404).json( { message: "Category Id not found" });
      return;
    }
    res.status(200).json({ message: "Category Id has been updated! "});
  } catch (err) {
    res.status(500),json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const deleteCategoryById = await Category.destroy(req.params.id, {
      where: {
        id: category_name
      },
    });
    if (!deleteCategoryById) {
      res.status(404).json({ message: "Category Id not found "});
      return;
    }
    res.status(200).json({ message: "Category Id has been deleted! "});
  } catch (err) {
    res.status(500),json(err);
  }
});

module.exports = router;
