const fs = require('fs');

const words = [
  {
    id: 1,
    text: 'Hund, der',
    gender: 'm',
  },
  {
    id: 2,
    text: 'Katze, die',
    gender: 'f',
  },
  {
    id: 3,
    text: 'Buch, das',
    gender: 'n',
  }
];

module.exports = function (req, res) {
  const { cursor: raw } = req.query;
  let cursor;
  let offset = 0, nextOffset;
  let word;
  if (raw) {
    cursor = JSON.parse(Buffer.from(raw, 'base64').toString());
    offset = cursor.offset;
  } else {
    offset = 0;
    cursor = {
      collectionId: '*'
    };
  }
  nextOffset = offset + 1;
  word = words[offset];

  res.status(200).json({
    ok: true,
    word,
    hasNext: offset < words.length - 1,
    cursor: Buffer.from(JSON.stringify({
      ...cursor,
      offset: nextOffset
    })).toString('base64'),
  });
};
