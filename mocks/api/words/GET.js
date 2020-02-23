let index = 0;
const words = [
  {
    text: 'Hund, der',
  },
  {
    text: 'Katze, die',
  },
  {
    text: 'Buch, das',
  }
];

module.exports = function (req, res) {
  res.status(200).json({
    ok: true,
    word: words[index++ % words.length],
  });
};
