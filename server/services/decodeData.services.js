const he = require("he");

function decodeData(items) {
  if (Array.isArray(items)) {
    return items.map(item => {
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
  } else if (typeof items === "object" && items !== null) {
    return Object.entries(items).reduce((acc, [key, value]) => {
      if (typeof value === "string") {
        const decodedValue = he.decode(value.replace(/_/g, " "));
        acc[key] = decodedValue;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  } else {
    return items;
  }
}

module.exports = decodeData;
