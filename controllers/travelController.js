const { ObjectID } = require('bson');
const db = require('../db/database');

const createBlog = async (req, res) => {
  await db.getDb().collection('blog').insertOne(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Blog created successfully',
  });
};
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  await db
    .getDb()
    .collection('blog')
    .deleteOne({ _id: ObjectID(blogId) });
  res.json({
    status: 'success',
    message: 'Blog deleted successfully',
  });
};
const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  await db
    .getDb()
    .collection('blog')
    .updateOne(
      { _id: ObjectID(blogId) },
      {
        $set: req.body,
      }
    );
  res.status(201).json({
    status: 'success',
    message: 'Blog updated successfully',
  });
};
const getBlog = async (req, res) => {
  const { blogId } = req.params;
  const response = await db
    .getDb()
    .collection('blog')
    .findOne({ _id: ObjectID(blogId) });
  res.json({
    status: 'success',
    data: response,
  });
};
const getAllBlog = async (req, res) => {
  const page = +req.query._page || 1;
  const limit = +req.query._limit || 99;
  const skip = (page - 1) * limit;
  const response = await db
    .getDb()
    .collection('blog')
    .find({ approve: { $eq: true } })
    .toArray();
  const response2 = await db
    .getDb()
    .collection('blog')
    .find({ approve: { $eq: true } })
    .skip(skip)
    .limit(limit)
    .toArray();
  res.json({
    status: 'success',
    total: response.length,
    data: response2,
  });
};
const getAllBlogForAdmin = async (req, res) => {
  const response = await db.getDb().collection('blog').find().toArray();

  res.json({
    status: 'success',
    data: response,
  });
};
const getBestSpots = async (req, res) => {
  const response = await db
    .getDb()
    .collection('blog')
    .find()
    .sort({ ratingsAverage: -1 })
    .limit(5)
    .toArray();

  res.json({
    status: 'success',
    data: response,
  });
};
module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  getAllBlogForAdmin,
  getBestSpots,
};
