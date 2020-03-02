module.exports = (req, res) => {
  res.json({
    ok: true,
    collection: {
      id: 9001,
      name: req.body['name'],
    },
  });
};
