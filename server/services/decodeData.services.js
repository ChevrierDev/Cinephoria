const he = require("he");

function decodeData(items) {
  return items.map((item) => {
    return Object.entries(item).reduce((acc, [key, value]) => {
      if (typeof value === "string") {
        const decodedValue = he.decode(value.replace(/_/g, " "));
        acc[key] = decodedValue;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  });
}

module.exports = decodeData;
