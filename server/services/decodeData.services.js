const he = require("he");

function decodeData(items) {
  return items.map((item) => {
    return Object.entries(item).reduce((acc, [key, value]) => {
      acc[key] =
        typeof value === "string" ? he.decode(value.replace("_", " ")) : value;
      return acc;
    }, {});
  });
}

module.exports = decodeData;
