const fs = require('fs');

module.exports = function (req, res) {
  const sessionId = Date.now();
  const { category_id, collection_id } = req.body;

  const cursor = Buffer.from(JSON.stringify({
    category_id,
    collection_id,
    offset: 0,
  })).toString('base64');
  const session = {
    id: sessionId,
    game_type: 'gender',
    cursor,
  };
  fs.writeFileSync(__dirname + '/.session', JSON.stringify(session));

  return res.status(201).json({
    ok: true,
    session,
  });
};
