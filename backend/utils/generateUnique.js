const generateNumber = (type, char) => {
  var characters;
  if (type === 'integer') {
    var characters = '0123456789';
  } else if (type === 'alphanumeric') {
    var characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  } else {
    return false;
  }
  var result = '';
  var charactersLength = characters.length;

  for (var i = 0; i < char; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = generateNumber;
