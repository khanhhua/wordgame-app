const fs = require('fs');

module.exports = function (req, res) {
  const sessionId = Date.now();
  const { collectionId } = req.body;

  const cursor = Buffer.from(JSON.stringify({
    collectionId,
    offset: 0,
  })).toString('base64');
  const session = {
    id: sessionId,
    gameType: 'gender',
    cursor,
  };
  fs.writeFileSync(__dirname + '/.session', JSON.stringify(session));

  return res.status(201).json({
    ok: true,
    session,
  });
};
