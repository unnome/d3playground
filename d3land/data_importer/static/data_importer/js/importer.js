const objCsv = {
  size: 0,
  dataFile: [],
  columns: [],
};

function makeTable(input) {
  // from the objCsv.dataFile information, we
  // represent it as a table in html in the data_table
  // div.
  // we guess the table theads from the objCsv.columns information.
  const target = document.querySelector('#data_table');
  const table = document.createElement('table');
  // make table theads
  objCsv.columns.forEach(col => {
    thead = document.createElement('th');
    text = document.createTextNode(col);
    thead.appendChild(text);
    table.appendChild(thead);
  });
  // populate table
  objCsv.dataFile.forEach(line => {         // for each line in the data...
    tr = document.createElement('tr');     // ... create a line in the table.
    elementsInLine = line.split(',');
    elementsInLine.forEach(element => {               // for each element in the row...
      td = document.createElement('td');   // ... create a cell in that row
      text = document.createTextNode(element);
      td.appendChild(text);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  target.appendChild(table);
}

function parseData(input) {
  const csvData = [];
  const lineBreak = input.split('\n');
  // determine columns
  objCsv.columns = lineBreak[0].split(',');
  lineBreak.shift(); // remove column line before determining datapoint
  objCsv.dataFile = lineBreak;
  lineBreak.forEach((res) => {
    csvData.push(res.split(','));
  });
  makeTable(csvData);
}

function uploadFile(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.readAsBinaryString(input.files[0]);
    reader.onload = function (e) {
      objCsv.size = e.total;
      const rawDataFile = e.target.result;
      parseData(rawDataFile);
    };
  }
}
