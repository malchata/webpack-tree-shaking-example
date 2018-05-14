export const simpleSort = function(arr, key, order = "asc") {
  if (Array.isArray(arr) === true) {
    return arr.sort((a, b) => {
      if (order === "asc") {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key].localeCompare(a[key]);
      }
    });
  }

  return false;
};

export const uasort = function(inputArr, sorter) {
  var valArr = [];
  var k = "";
  var i = 0;
  var populateArr = {};

  if (typeof sorter === "string") {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === "[object Array]") {
    sorter = this[sorter[0]][sorter[1]];
  }

  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
    }
  }

  valArr.sort((a, b) => {
    return sorter(a[1], b[1]);
  })

  for (i = 0; i < valArr.length; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return populateArr;
};

export const uksort = function(inputArr, sorter) {
  var tmpArr = {};
  var keys = [];
  var i = 0;
  var k = "";

  if (typeof sorter === "string") {
    sorter = this.window[sorter];
  }

  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }

  try {
    if (sorter) {
      keys.sort(sorter);
    } else {
      keys.sort();
    }
  } catch (e) {
    return false;
  }

  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmpArr[k] = inputArr[k];
  }

  for (i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i];
    }
  }

  return populateArr;
};
