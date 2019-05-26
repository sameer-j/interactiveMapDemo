const newLine = /\r?\n/;
const defaultFieldDelimiter = ';';
const delimiter = ',';

const validateJson = (json) => {
  try {
    JSON.parse(json);
  } catch (err) {
    throw Error('Parsed csv has generated an invalid json!!!\n' + err);
  }
}

const hasContent = (values) => {
  if (values.length > 0) {
    for (let i = 0; i < values.length; i++) {
      if (values[i]) {
        return true;
      }
    }
  }
  return false;
}

const trimPropertyName = (value) => {
  return value.replace(/\s/g, '');
}

const getValueFormatByType = (value) => {
  let isNumber = !isNaN(value);
  if (isNumber) {
      return Number(value);
  }
  if (value === "NULL") {
    return null;
  }
  return String(value);
}

const buildJsonResult = (headers, currentLine) => {
  let jsonObject = {};
  for (let j = 0; j < headers.length; j++) {
    let propertyName = trimPropertyName(headers[j]);

    let value = currentLine[j];
    value = getValueFormatByType(currentLine[j]);
    jsonObject[propertyName] = value;
  }
  return jsonObject;
}

const getFieldDelimiter = () => {
  if (delimiter) {
    return delimiter;
  }
  return defaultFieldDelimiter;
}


const csvToJson = (parsedCsv, filterables) => {
  let lines = parsedCsv.split(newLine);
  let fieldDelimiter = getFieldDelimiter();
  let headers = lines[0].split(fieldDelimiter);

  let jsonResult = [];
  let jsonData = {};
  let filteredResult = {};

  filterables.forEach(element => {
    filteredResult[element] = {};
  });

  for (let i = 1; i < lines.length; i++) {
    let currentLine = lines[i].split(fieldDelimiter);
    if (hasContent(currentLine)) {
      jsonData = buildJsonResult(headers, currentLine); 
      jsonResult.push(jsonData);

    }
  }
  return jsonResult;
}

const getJsonFromCsvStringified = (parsedCsv) => {
  let json = csvToJson(parsedCsv)
  let jsonStringified = JSON.stringify(json, undefined, 1);
  validateJson(jsonStringified);
  return jsonStringified;
}

const getJsonWithFilterables = (parsedCsv, filterables) => {
  let lines = parsedCsv.split(newLine);
  let fieldDelimiter = getFieldDelimiter();
  let headers = lines[0].split(fieldDelimiter);

  let jsonResult = {
    data: {},
    allIds: [],
    length: 0,
  };
  let jsonObject = {};
  let filteredResult = {};

  filterables.forEach(element => {
    filteredResult[element] = {};
  });

  for (let i = 1; i < lines.length; i++) {
    let currentLine = lines[i].split(fieldDelimiter);
    if (hasContent(currentLine)) {
      jsonObject = buildJsonResult(headers, currentLine); 
      jsonResult.data[jsonObject.id] = jsonObject;
      jsonResult.allIds.push(jsonObject.id);
      jsonResult.length += 1;
      filterables.forEach(element => {
        const key = jsonObject[element] === null ? 'others' : jsonObject[element];
        filteredResult[element][key] = filteredResult[element][key] || [];
        filteredResult[element][key].push(jsonObject['id']);
      });
    }
  }
  return {'json':jsonResult, 'filtered':filteredResult};
}

export {getJsonFromCsvStringified, getJsonWithFilterables};