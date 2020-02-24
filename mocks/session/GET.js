const fs = require('fs');

module.exports = function (req, res) {
  const raw = fs.readFileSync(__dirname + '/.session').toString();
  if (!raw) {
    return res.json({
      ok: true,
      session: null,
    });
  }

  const session = JSON.parse(raw);
  if (session && session.id) {
    return res.json({
      ok: true,
      session,
    });
  }

  return res.json({
    ok: true,
    session: null,
  });
};
