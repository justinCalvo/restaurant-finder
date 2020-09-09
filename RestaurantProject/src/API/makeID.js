export const uniqueID = function() {
  let id = '',
    temp,
    char;

  let length = Math.floor(Math.random() * (10 - 6) + 6);

  while (id.length < length) {
    temp = Math.round(Math.random());
    if (temp < 1) {
      char = Math.floor(Math.random() * (91 - 65) + 65);
      id += String.fromCharCode(char);
    } else {
      char = Math.floor(Math.random() * (123 - 97) + 97);
      id += String.fromCharCode(char);
    }
  }
  return id;
};
