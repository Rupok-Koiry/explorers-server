const express = require('express');
const db = require('../db/database');
const router = express.Router();
const {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  getAllBlogForAdmin,
  getBestSpots,
} = require('../controllers/travelController');

router.route('/').get(getAllBlog).post(createBlog);
router.route('/admin').get(getAllBlogForAdmin);
router.route('/best-spots').get(getBestSpots);
router.route('/:blogId').get(getBlog).patch(updateBlog).delete(deleteBlog);

module.exports = router;
