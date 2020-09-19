const fs = require('fs');

const terms = [
  {
    id: 1,
    word: 'Hund',
    tags: 'SUB:NOM:SIN:MAS',
  },
  {
    id: 2,
    word: 'Katze',
    tags: 'SUB:NOM:SIN:FEM',
  },
  {
    id: 3,
    word: 'Buch',
    tags: 'SUB:NOM:SIN:NEU',
  }
];

module.exports = function (req, res) {
  const { cursor: raw } = req.query;
  let cursor;
  let offset = 0, nextOffset;
  let term;
  if (raw) {
    cursor = JSON.parse(Buffer.from(raw, 'base64').toString());
    offset = cursor.offset;
  } else {
    offset = 0;
    cursor = {
      collection_id: '*'
    };
  }
  nextOffset = offset + 1;
  term = terms[offset];

  res.status(200).json({
    ok: true,
    term,
    has_next: offset < terms.length - 1,
    cursor: Buffer.from(JSON.stringify({
      ...cursor,
      offset: nextOffset
    })).toString('base64'),
  });
};
