const db = require('../db/database');

const checkIsAdmin = async (req, res) => {
  const email = req.params.email;

  const query = { email: email };
  const user = await await db.getDb().collection('users').findOne(query);
  let isAdmin = false;

  if (user?.role === 'admin') {
    isAdmin = true;
  }
  res.json({ admin: isAdmin });
};

const createUser = async (req, res) => {
  const user = req.body;
  const result = await db.getDb().collection('users').insertOne(user);
  res.json(result);
};

const updateOrInsertUser = async (req, res) => {
  const user = req.body;
  const filter = { email: user.email };
  const options = { upsert: true };
  const updateDoc = { $set: user };
  const result = await db
    .getDb()
    .collection('users')
    .updateOne(filter, updateDoc, options);
  res.json(result);
};

const makeAdmin = async (req, res) => {
  const user = req.body;
  const filter = { email: user.email };
  const updateDoc = { $set: { role: 'admin' } };
  const result = await db
    .getDb()
    .collection('users')
    .updateOne(filter, updateDoc);
  res.json(result);
};
module.exports = { checkIsAdmin, createUser, updateOrInsertUser, makeAdmin };
