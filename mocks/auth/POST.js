module.exports = function (req, res) {
  const iat = Date.now() / 1000;
  res.send({
    ok: true,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbSIsImlhdCI6MTU3ODU3MTY5OSwiZXhwIjoxNTc4NTg2MDk5fQ.6itWRW7lBlx434UcOXOzPaeZkBIH_iZFYQHcvJvkDLA",
    profile: {
      at_hash: "_uG8Jzg5d8_0Of-ZPC2c8g",
      aud: "976856176051-ietkcknpua13udt2tucm8sbecik7h5rt.apps.googleusercontent.com",
      azp: "976856176051-ietkcknpua13udt2tucm8sbecik7h5rt.apps.googleusercontent.com",
      email: "wuhanisncov19@gmail.com",
      email_verified: true,
      exp: iat + 3600,
      family_name: "Hua",
      given_name: "Khanh",
      iat: iat,
      iss: "https://accounts.google.com",
      locale: "en",
      name: "Khanh Hua",
      picture: "https://i.picsum.photos/id/961/96/96.jpg",
      sub: "116417983517015620829"
    },
    defaultCollection: {
      id: 9000,
    }
  });
};
