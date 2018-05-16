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

// These tree-shakeable functions were sourced from the
// Locutus project: https://github.com/kvz/locutus/

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
  var populateArr = {};

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

export const usort = function(inputArr, sorter) {
  var valArr = [];
  var k = '';
  var i = 0;
  var populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]];
  }

  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
    }
  }
  try {
    valArr.sort(sorter)
  } catch (e) {
    return false;
  }
  for (i = 0; i < valArr.length; i++) {
    populateArr[i] = valArr[i];
  }

  return populateArr;
};

export const shuffle = function(inputArr) {
  var valArr = [];
  var k = '';
  var i = 0;
  var populateArr = [];

  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
    }
  }

  valArr.sort(function() {
    return 0.5 - Math.random();
  })

  for (i = 0; i < valArr.length; i++) {
    populateArr[i] = valArr[i];
  }

  return populateArr;
};

export const arrayUnique = function(inputArr) {
  var key = '';
  var tmpArr2 = {};
  var val = '';

  var _arraySearch = function(needle, haystack) {
    var fkey = '';

    for (fkey in haystack) {
      if (haystack.hasOwnProperty(fkey)) {
        if ((haystack[fkey] + '') === (needle + '')) {
          return fkey;
        }
      }
    }

    return false;
  }

  for (key in inputArr) {
    if (inputArr.hasOwnProperty(key)) {
      val = inputArr[key];

      if (_arraySearch(val, tmpArr2) === false) {
        tmpArr2[key] = val;
      }
    }
  }

  return tmpArr2;
}

export const arrayWalk = function(array, funcname, userdata) {
  if (!array || typeof array !== 'object') {
    return false;
  }

  try {
    if (typeof funcname === 'function') {
      for (var key in array) {
        if (arguments.length > 2) {
          funcname(array[key], key, userdata);
        } else {
          funcname(array[key], key);
        }
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export const arrayWalkRecursive = function(array, funcname, userdata) {
  if (!array || typeof array !== 'object') {
    return false;
  }

  if (typeof funcname !== 'function') {
    return false;
  }

  for (var key in array) {
    if (Object.prototype.toString.call(array[key]) === '[object Array]') {
      var funcArgs = [array[key], funcname];

      if (arguments.length > 2) {
        funcArgs.push(userdata);
      }

      if (arrayWalkRecursive.apply(null, funcArgs) === false) {
        return false;
      }

      continue;
    }
    try {
      if (arguments.length > 2) {
        funcname(array[key], key, userdata);
      } else {
        funcname(array[key], key);
      }
    } catch (e) {
      return false;
    }
  }

  return true;
};

export const arrayPad = function(input, padSize, padValue) {
  var pad = [];
  var newArray = [];
  var newLength;
  var diff = 0;
  var i = 0;

  if (Object.prototype.toString.call(input) === '[object Array]' && !isNaN(padSize)) {
    newLength = ((padSize < 0) ? (padSize * -1) : padSize);
    diff = newLength - input.length;

    if (diff > 0) {
      for (i = 0; i < diff; i++) {
        newArray[i] = padValue;
      }
      pad = ((padSize < 0) ? newArray.concat(input) : input.concat(newArray));
    } else {
      pad = input;
    }
  }

  return pad;
};

export const arrayChangeKeyCase = function(array, cs) {
  var caseFnc;
  var key;
  var tmpArr = {};

  if (Object.prototype.toString.call(array) === '[object Array]') {
    return array;
  }

  if (array && typeof array === 'object') {
    caseFnc = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';

    for (key in array) {
      tmpArr[key[caseFnc]()] = array[key];
    }

    return tmpArr;
  }

  return false;
};

export const arrayIntersect = function(arr1) {
  var retArr = {};
  var argl = arguments.length;
  var arglm1 = argl - 1;
  var k1 = '';
  var arr = {};
  var i = 0;
  var k = '';

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < argl; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }

          continue arrs;
        }
      }

      continue arr1keys;
    }
  }

  return retArr;
};

export const arrayDiff = function(arr1) {
  var retArr = {};
  var argl = arguments.length;
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < argl; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          continue arr1keys;
        }
      }

      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

export const arrayDiffAssoc = function(arr1) {
  var retArr = {};
  var argl = arguments.length;
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < argl; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (arr[k] === arr1[k1] && k === k1) {
          continue arr1keys;
        }
      }

      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

export const arrayDiffKey = function(arr1) {
  var argl = arguments.length;
  var retArr = {};
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < argl; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (k === k1) {
          continue arr1keys;
        }
      }

      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

export const arrayDiffUassoc = function(arr1) {
  var retArr = {};
  var arglm1 = arguments.length - 1;
  var cb = arguments[arglm1];
  var arr = {};
  var i = 1;
  var k1 = '';
  var k = '';

  var $global = (typeof window !== 'undefined' ? window : global);

  cb = (typeof cb === 'string')
    ? $global[cb]
    : (Object.prototype.toString.call(cb) === '[object Array]')
      ? $global[cb[0]][cb[1]]
      : cb;

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          continue arr1keys;
        }
      }

      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

export const arrayDiffUkey = function(arr1) {
  var retArr = {};
  var arglm1 = arguments.length - 1;
  var cb = arguments[arglm1];
  var k1 = '';
  var i = 1;
  var arr = {};
  var k = '';

  var $global = (typeof window !== 'undefined' ? window : global);

  cb = (typeof cb === 'string')
    ? $global[cb]
    : (Object.prototype.toString.call(cb) === '[object Array]')
      ? $global[cb[0]][cb[1]]
      : cb;

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (cb(k, k1) === 0) {
          continue arr1keys;
        }
      }

      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

export const arrayIntersectAssoc = function(arr1) {
  var retArr = {};
  var argl = arguments.length;
  var arglm1 = argl - 1;
  var k1 = '';
  var arr = {};
  var i = 0;
  var k = '';

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < argl; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (arr[k] === arr1[k1] && k === k1) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }

          continue arrs;
        }
      }

      continue arr1keys;
    }
  }

  return retArr;
};

export const arrayIntersectKey = function(arr1) {
  var retArr = {};
  var argl = arguments.length;
  var arglm1 = argl - 1;
  var k1 = '';
  var arr = {};
  var i = 0;
  var k = '';

  arr1keys: for (k1 in arr1) {
    if (!arr1.hasOwnProperty(k1)) {
      continue;
    }

    arrs: for (i = 1; i < argl; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (!arr.hasOwnProperty(k)) {
          continue;
        }

        if (k === k1) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }

          continue arrs;
        }
      }

      continue arr1keys;
    }
  }

  return retArr;
};

export const arrayIntersectUassoc = function(arr1) {
  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = (typeof window !== 'undefined' ? window : global);

  cb = (typeof cb === 'string')
    ? $global[cb]
    : (Object.prototype.toString.call(cb) === '[object Array]')
      ? $global[cb[0]][cb[1]]
      : cb;

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < arglm1; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }

          continue arrs;
        }
      }

      continue arr1keys;
    }
  }

  return retArr;
};

export const arrayIntersectUkey = function(arr1) {
  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = (typeof window !== 'undefined' ? window : global);

  cb = (typeof cb === 'string')
    ? $global[cb]
    : (Object.prototype.toString.call(cb) === '[object Array]')
      ? $global[cb[0]][cb[1]]
      : cb;

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < arglm1; i++) {
      arr = arguments[i];

      for (k in arr) {
        if (cb(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }

          continue arrs;
        }
      }

      continue arr1keys;
    }
  }

  return retArr;
};

export const arrayKeys = function(input, searchValue, argStrict) {
  var search = typeof searchValue !== 'undefined';
  var tmpArr = [];
  var strict = !!argStrict;
  var include = true;
  var key = '';

  for (key in input) {
    if (input.hasOwnProperty(key)) {
      include = true;

      if (search) {
        if (strict && input[key] !== searchValue) {
          include = false;
        } else if (input[key] !== searchValue) {
          include = false;
        }
      }

      if (include) {
        tmpArr[tmpArr.length] = key;
      }
    }
  }

  return tmpArr;
};

export const arrayMultisort = function(arr) {
  var g;
  var i;
  var j;
  var k;
  var l;
  var sal;
  var vkey;
  var elIndex;
  var lastSorts;
  var tmpArray;
  var zlast;

  var sortFlag = [0];
  var thingsToSort = [];
  var nLastSort = [];
  var lastSort = [];
  var args = arguments;

  var flags = {
    'SORT_REGULAR': 16,
    'SORT_NUMERIC': 17,
    'SORT_STRING': 18,
    'SORT_ASC': 32,
    'SORT_DESC': 40
  };

  var sortDuplicator = function(a, b) {
    return nLastSort.shift();
  };

  var sortFunctions = [
    [
      function(a, b) {
        lastSort.push(a > b ? 1 : (a < b ? -1 : 0));
        return a > b ? 1 : (a < b ? -1 : 0);
      },
      function(a, b) {
        lastSort.push(b > a ? 1 : (b < a ? -1 : 0));
        return b > a ? 1 : (b < a ? -1 : 0);
      }
    ],
    [
      function(a, b) {
        lastSort.push(a - b);
        return a - b;
      },
      function(a, b) {
        lastSort.push(b - a);
        return b - a;
      }
    ],
    [
      function(a, b) {
        lastSort.push((a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0));
        return (a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0);
      },
      function(a, b) {
        lastSort.push((b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0));
        return (b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0);
      }
    ]
  ];

  var sortArrs = [[]];
  var sortKeys = [[]];

  if (Object.prototype.toString.call(arr) === '[object Array]') {
    sortArrs[0] = arr;
  } else if (arr && typeof arr === 'object') {
    for (i in arr) {
      if (arr.hasOwnProperty(i)) {
        sortKeys[0].push(i);
        sortArrs[0].push(arr[i]);
      }
    }
  } else {
    return false;
  }

  var arrMainLength = sortArrs[0].length;
  var sortComponents = [0, arrMainLength];

  var argl = arguments.length;

  for (j = 1; j < argl; j++) {
    if (Object.prototype.toString.call(arguments[j]) === '[object Array]') {
      sortArrs[j] = arguments[j];
      sortFlag[j] = 0;

      if (arguments[j].length !== arrMainLength) {
        return false;
      }
    } else if (arguments[j] && typeof arguments[j] === 'object') {
      sortKeys[j] = [];
      sortArrs[j] = [];
      sortFlag[j] = 0;

      for (i in arguments[j]) {
        if (arguments[j].hasOwnProperty(i)) {
          sortKeys[j].push(i);
          sortArrs[j].push(arguments[j][i]);
        }
      }

      if (sortArrs[j].length !== arrMainLength) {
        return false;
      }
    } else if (typeof arguments[j] === 'string') {
      var lFlag = sortFlag.pop();

      if (typeof flags[arguments[j]] === 'undefined' || ((((flags[arguments[j]]) >>> 4) & (lFlag >>> 4)) > 0)) {
        return false;
      }

      sortFlag.push(lFlag + flags[arguments[j]]);
    } else {
      return false;
    }
  }

  for (i = 0; i !== arrMainLength; i++) {
    thingsToSort.push(true);
  }

  for (i in sortArrs) {
    if (sortArrs.hasOwnProperty(i)) {
      lastSorts = [];
      tmpArray = [];
      elIndex = 0;
      nLastSort = [];
      lastSort = [];

      if (sortComponents.length === 0) {
        if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
          args[i] = sortArrs[i];
        } else {
          for (k in arguments[i]) {
            if (arguments[i].hasOwnProperty(k)) {
              delete arguments[i][k];
            }
          }

          sal = sortArrs[i].length;

          for (j = 0, vkey = 0; j < sal; j++) {
            vkey = sortKeys[i][j];
            args[i][vkey] = sortArrs[i][j];
          }
        }

        sortArrs.splice(i, 1);
        sortKeys.splice(i, 1);
        continue;
      }

      var sFunction = sortFunctions[(sortFlag[i] & 3)][((sortFlag[i] & 8) > 0) ? 1 : 0];

      for (l = 0; l !== sortComponents.length; l += 2) {
        tmpArray = sortArrs[i].slice(sortComponents[l], sortComponents[l + 1] + 1);
        tmpArray.sort(sFunction);
        lastSorts[l] = [].concat(lastSort);
        elIndex = sortComponents[l];

        for (g in tmpArray) {
          if (tmpArray.hasOwnProperty(g)) {
            sortArrs[i][elIndex] = tmpArray[g];
            elIndex++;
          }
        }
      }

      sFunction = sortDuplicator;

      for (j in sortArrs) {
        if (sortArrs.hasOwnProperty(j)) {
          if (sortArrs[j] === sortArrs[i]) {
            continue;
          }

          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortArrs[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
            nLastSort = [].concat(lastSorts[l]);
            tmpArray.sort(sFunction);
            elIndex = sortComponents[l];
            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortArrs[j][elIndex] = tmpArray[g];
                elIndex++;
              }
            }
          }
        }
      }

      for (j in sortKeys) {
        if (sortKeys.hasOwnProperty(j)) {
          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortKeys[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
            nLastSort = [].concat(lastSorts[l]);
            tmpArray.sort(sFunction);
            elIndex = sortComponents[l];

            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortKeys[j][elIndex] = tmpArray[g];
                elIndex++;
              }
            }
          }
        }
      }

      zlast = null;
      sortComponents = [];

      for (j in sortArrs[i]) {
        if (sortArrs[i].hasOwnProperty(j)) {
          if (!thingsToSort[j]) {
            if ((sortComponents.length & 1)) {
              sortComponents.push(j - 1);
            }

            zlast = null;
            continue;
          }

          if (!(sortComponents.length & 1)) {
            if (zlast !== null) {
              if (sortArrs[i][j] === zlast) {
                sortComponents.push(j - 1);
              } else {
                thingsToSort[j] = false;
              }
            }
            zlast = sortArrs[i][j];
          } else {
            if (sortArrs[i][j] !== zlast) {
              sortComponents.push(j - 1);
              zlast = sortArrs[i][j];
            }
          }
        }
      }

      if (sortComponents.length & 1) {
        sortComponents.push(j);
      }

      if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
        args[i] = sortArrs[i];
      } else {
        for (j in arguments[i]) {
          if (arguments[i].hasOwnProperty(j)) {
            delete arguments[i][j];
          }
        }

        sal = sortArrs[i].length;

        for (j = 0, vkey = 0; j < sal; j++) {
          vkey = sortKeys[i][j];
          args[i][vkey] = sortArrs[i][j];
        }
      }

      sortArrs.splice(i, 1);
      sortKeys.splice(i, 1);
    }
  }

  return true;
};

export const arrayFill = function(startIndex, num, mixedVal) {
  var key;
  var tmpArr = {};

  if (!isNaN(startIndex) && !isNaN(num)) {
    for (key = 0; key < num; key++) {
      tmpArr[(key + startIndex)] = mixedVal;
    }
  }

  return tmpArr;
};

export const arrayFillKeys = function(keys, value) {
  var retObj = {};
  var key = '';

  for (key in keys) {
    retObj[keys[key]] = value;
  }

  return retObj;
};

export const arrayRand = function(array, num) {
  var keys = Object.keys(array);

  if (typeof num === 'undefined' || num === null) {
    num = 1;
  } else {
    num = +num;
  }

  if (isNaN(num) || num < 1 || num > keys.length) {
    return null;
  }

  for (var i = keys.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = keys[j];
    keys[j] = keys[i];
    keys[i] = tmp;
  }

  return num === 1 ? keys[0] : keys.slice(0, num);
};

export const arrayChunk = function(input, size, preserveKeys) {
  var x;
  var p = '';
  var i = 0;
  var c = -1;
  var l = input.length || 0;
  var n = [];

  if (size < 1) {
    return null;
  }

  if (Object.prototype.toString.call(input) === '[object Array]') {
    if (preserveKeys) {
      while (i < l) {
        (x = i % size)
          ? n[c][i] = input[i]
          : n[++c] = {}; n[c][i] = input[i]
        i++;
      }
    } else {
      while (i < l) {
        (x = i % size)
          ? n[c][x] = input[i]
          : n[++c] = [input[i]]
        i++;
      }
    }
  } else {
    if (preserveKeys) {
      for (p in input) {
        if (input.hasOwnProperty(p)) {
          (x = i % size)
            ? n[c][p] = input[p]
            : n[++c] = {}; n[c][p] = input[p]
          i++;
        }
      }
    } else {
      for (p in input) {
        if (input.hasOwnProperty(p)) {
          (x = i % size)
            ? n[c][x] = input[p]
            : n[++c] = [input[p]]
          i++;
        }
      }
    }
  }

  return n;
};

export const arrayCountValues = function(array) {
  var tmpArr = {};
  var key = '';
  var t = '';

  var _getType = function (obj) {
    var t = typeof obj;
    t = t.toLowerCase();

    if (t === 'object') {
      t = 'array';
    }

    return t;
  }

  var _countValue = function (tmpArr, value) {
    if (typeof value === 'number') {
      if (Math.floor(value) !== value) {
        return;
      }
    } else if (typeof value !== 'string') {
      return;
    }

    if (value in tmpArr && tmpArr.hasOwnProperty(value)) {
      ++tmpArr[value];
    } else {
      tmpArr[value] = 1;
    }
  }

  t = _getType(array);

  if (t === 'array') {
    for (key in array) {
      if (array.hasOwnProperty(key)) {
        _countValue.call(this, tmpArr, array[key]);
      }
    }
  }

  return tmpArr;
};

export const arrayFlip = function(trans) {
  var key;
  var tmpArr = {};

  for (key in trans) {
    if (!trans.hasOwnProperty(key)) {
      continue;
    }

    tmpArr[trans[key]] = key;
  }

  return tmpArr;
};

export const arrayMerge = function() {
  var args = Array.prototype.slice.call(arguments);
  var argl = args.length;
  var arg;
  var retObj = {};
  var k = '';
  var argil = 0;
  var j = 0;
  var i = 0;
  var ct = 0;
  var toStr = Object.prototype.toString;
  var retArr = true;

  for (i = 0; i < argl; i++) {
    if (toStr.call(args[i]) !== '[object Array]') {
      retArr = false;
      break;
    }
  }

  if (retArr) {
    retArr = [];

    for (i = 0; i < argl; i++) {
      retArr = retArr.concat(args[i]);
    }

    return retArr;
  }

  for (i = 0, ct = 0; i < argl; i++) {
    arg = args[i];

    if (toStr.call(arg) === '[object Array]') {
      for (j = 0, argil = arg.length; j < argil; j++) {
        retObj[ct++] = arg[j];
      }
    } else {
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          if (parseInt(k, 10) + '' === k) {
            retObj[ct++] = arg[k];
          } else {
            retObj[k] = arg[k];
          }
        }
      }
    }
  }

  return retObj;
};

export const arrayMergeRecursive = function(arr1, arr2) {
  var idx = '';

  if (arr1 && Object.prototype.toString.call(arr1) === '[object Array]' && arr2 && Object.prototype.toString.call(arr2) === '[object Array]') {
    for (idx in arr2) {
      arr1.push(arr2[idx]);
    }
  } else if ((arr1 && (arr1 instanceof Object)) && (arr2 && (arr2 instanceof Object))) {
    for (idx in arr2) {
      if (idx in arr1) {
        if (typeof arr1[idx] === 'object' && typeof arr2 === 'object') {
          arr1[idx] = arrayMerge(arr1[idx], arr2[idx]);
        } else {
          arr1[idx] = arr2[idx];
        }
      } else {
        arr1[idx] = arr2[idx];
      }
    }
  }

  return arr1;
};

export const arrayProduct = function(input) {
  var idx = 0;
  var product = 1;
  var il = 0;

  if (Object.prototype.toString.call(input) !== '[object Array]') {
    return null;
  }

  il = input.length;

  while (idx < il) {
    product *= (!isNaN(input[idx]) ? input[idx] : 0);
    idx++;
  }

  return product;
};

export const arrayReplace = function(arr) {
  var retObj = {};
  var i = 0;
  var p = '';
  var argl = arguments.length;

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to array_replace()');
  }

  for (p in arr) {
    retObj[p] = arr[p];
  }

  for (i = 1; i < argl; i++) {
    for (p in arguments[i]) {
      retObj[p] = arguments[i][p];
    }
  }

  return retObj;
};

export const arrayReplaceRecursive = function(arr) {
  var i = 0;
  var p = '';
  var argl = arguments.length;
  var retObj;

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to array_replace_recursive()');
  }

  if (Object.prototype.toString.call(arr) === '[object Array]') {
    retObj = [];

    for (p in arr) {
      retObj.push(arr[p]);
    }
  } else {
    retObj = {};

    for (p in arr) {
      retObj[p] = arr[p];
    }
  }

  for (i = 1; i < argl; i++) {
    for (p in arguments[i]) {
      if (retObj[p] && typeof retObj[p] === 'object') {
        retObj[p] = arrayReplaceRecursive(retObj[p], arguments[i][p]);
      } else {
        retObj[p] = arguments[i][p];
      }
    }
  }

  return retObj;
};

export const array_reverse = function(array, preserveKeys) {
  var isArray = Object.prototype.toString.call(array) === '[object Array]';
  var tmpArr = preserveKeys ? {} : [];
  var key;

  if (isArray && !preserveKeys) {
    return array.slice(0).reverse();
  }

  if (preserveKeys) {
    var keys = [];

    for (key in array) {
      keys.push(key);
    }

    var i = keys.length;

    while (i--) {
      key = keys[i];
      tmpArr[key] = array[key];
    }
  } else {
    for (key in array) {
      tmpArr.unshift(array[key]);
    }
  }

   return tmpArr;
};

export const arraySearch = function(needle, haystack, argStrict) {
  var strict = !!argStrict;
  var key = '';

  if (typeof needle === 'object' && needle.exec) {
    if (!strict) {
      var flags = 'i' + (needle.global ? 'g' : '') + (needle.multiline ? 'm' : '') + (needle.sticky ? 'y' : '');
      needle = new RegExp(needle.source, flags);
    }

    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        if (needle.test(haystack[key])) {
          return key;
        }
      }
    }

    return false;
  }

  for (key in haystack) {
    if (haystack.hasOwnProperty(key)) {
      if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
        return key;
      }
    }
  }

  return false;
};

export const arrayShift = function(inputArr) {
  var _checkToUpIndices = function (arr, ct, key) {
    if (arr[ct] !== undefined) {
      var tmp = ct;
      ct += 1;

      if (ct === key) {
        ct += 1;
      }

      ct = _checkToUpIndices(arr, ct, key);
      arr[ct] = arr[tmp];
      delete arr[tmp];
    }

    return ct;
  }

  if (inputArr.length === 0) {
    return null;
  }

  if (inputArr.length > 0) {
    return inputArr.shift();
  }
};

export const arraySum = function(array) {
  var key;
  var sum = 0;

  if (typeof array !== 'object') {
    return null;
  }

  for (key in array) {
    if (!isNaN(parseFloat(array[key]))) {
      sum += parseFloat(array[key]);
    }
  }

  return sum;
};
