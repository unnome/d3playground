const objCsv = {
  size: 0,
  dataFile: [],
  columns: [],
};

// function makeTable(input) {
//   // from the objCsv.dataFile information, we
//   // represent it as a table in html in the data_table
//   // div.
//   // we guess the table theads from the objCsv.columns information.
//   const target = document.querySelector('#data_table');
//   const table = document.createElement('table');
//   // make table theads
//   objCsv.columns.forEach(col => {
//     thead = document.createElement('th');
//     text = document.createTextNode(col);
//     thead.appendChild(text);
//     table.appendChild(thead);
//   });
//   // populate table
//   objCsv.dataFile.forEach(line => {         // for each line in the data...
//     tr = document.createElement('tr');     // ... create a line in the table.
//     elementsInLine = line.split(',');
//     elementsInLine.forEach(element => {               // for each element in the row...
//       td = document.createElement('td');   // ... create a cell in that row
//       text = document.createTextNode(element);
//       td.appendChild(text);
//       tr.appendChild(td);
//     });
//     table.appendChild(tr);
//   });
// 
//   target.appendChild(table);
// }

function parseData(input) {
  const csvData = [];
  const lineBreak = input.split('\n');
  // determine columns
  objCsv.columns = lineBreak[0].split(',');
  lineBreak.shift(); // remove column line before determining datapoint
  lineBreak.pop(); // shift creates an empty element in the last position. pop removes it.
  // determine dataset size
  objCsv.size = lineBreak.length;
  objCsv.dataFile = lineBreak;
  lineBreak.forEach((res) => {
    csvData.push(res.split(','));
  });
  //makeTable(csvData);
}

function uploadFile(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.readAsBinaryString(input.files[0]);
    reader.onload = function (e) {
      // objCsv.size = e.total;
      const rawDataFile = e.target.result;
      parseData(rawDataFile); // this function fills the features of objCsv
      plotIt(objCsv.dataFile);
    };
  }
}

function determineColor(input){
  var color = '';
  switch(input) {
    case "Iris-setosa":
      color =  "green";
    case "Iris-versicolor":
      color =  "red";
    case "Iris-virginica":
      color =  "blue";
    default:
      color =  "black";
  }
  return color;
}

function plotIt(input) {
  var width = 800;
  var height = 600;

  var xScale = d3.scaleLinear()
    .domain([0, 7])
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([0, 4])
    .range([0, height]);

  var shape = d3.arc({
    innerRadius: 0,
    outerRadius: 8,
    startAngle: 0,
  });

  var svg = d3
    .select('#svg')
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#eee")
  ;

  svg
    .selectAll("circle")
    .data(input)
    .enter()
    .append("circle")
    .attr("fill", "black")
    .attr("stroke", "white")
    .attr("opacity", 0.5)
    .attr("id", function(d) {
      row = d.split(',');
      type = row[0];
      return type;
    })
    .attr("cx", function(d) {
      row = d.split(',');
      value = row[3];
      return xScale(value) ;
    })
    .attr("cy", function(d) {
      row = d.split(',');
      value = row[4];
      return yScale(value) ;
    })
    .attr("r", function(d) {
      row = d.split(',');
      type = row[2];
      return type;
    })
    .attr("fill", "white")
    .attr("stroke-width", function(d) {
      row = d.split(',');
      return row[1];
    }) 
    .attr("stroke", function(d) {
      row = d.split(',');
      type = row[5];
      switch (type) {
      case "Iris-setosa":
        return "red";
      case "Iris-versicolor":
        return "blue";
      case "Iris-virginica":
        return  "green";
      default:
        return  "black";
      }
    })
    .on("mouseenter", function () {
      d3.select(this)
        .transition()
        .duration(500)
        .attr("r", 50);
    })

    .on("mouseleave", function () {
      d3.select(this)
        .transition()
        .duration(500)
        .attr("r",objCsv.dataFile[this.id].split(',')[2]);
    });
}
