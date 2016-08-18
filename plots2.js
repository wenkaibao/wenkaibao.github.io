var box = dc.boxPlot("#box-plot"),
    histLength = dc.barChart("#hist-length"),
    histWeight = dc.barChart("#hist-weight");

function decimal1(x) {  //a function to round numbers to 2 decimal places, for creating the bins
  return Math.round(x);  
}

function decimal2(x) {  //a function to round numbers to 2 decimal places, for creating the bins
  return Math.round((x+.00001)*10) / 10;  
}

function decimal3(x) {  //a function to round numbers to 3 decimal places, for creating the bins
  return Math.round((x+.00001)*100) / 100;  
}

d3.csv("data.csv", function(error, data) {

  data.forEach(function(d) {
    d.weight      = + d.weight;
    d.length      = + d.length;
    d.lw_ratio    = + d.lw_ratio;
    d.breed       = d.breed;
  });

  var ndx                    = crossfilter(data),
      weightDimension        = ndx.dimension(function(d) {return d.weight;}),
      weightGroup            = weightDimension.group(decimal2),
      lengthDimension        = ndx.dimension(function(d) {return d.length;}),
      lengthGroup            = lengthDimension.group(decimal1),

      breedDimension         = ndx.dimension(function(d) {return d.breed;}),
      ratioArrayGroup        = breedDimension.group().reduce(
        function(p,v) {
          p.push(v.lw_ratio);
          return p;
        },
        function(p,v) {
          p.splice(p.indexOf(v.lw_ratio), 1);
          return p;
        },
        function() {
          return [];
        }
      );

  //to decide the xlim of the histogram
  var minLength = lengthDimension.bottom(1)[0].length,
      maxLength = lengthDimension.top(1)[0].length;
  var minWeight = weightDimension.bottom(1)[0].weight,
      maxWeight = weightDimension.top(1)[0].weight;

  box
    .width(600)
    .height(520)
    .margins({top: 10, right: 10, bottom: 50, left: 20})
    .dimension(breedDimension)
    .group(ratioArrayGroup)
    .elasticY(true)
    .colors(d3.scale.category20())
    .xAxisLabel("Breed")
    .yAxisLabel("")
    .y(d3.scale.linear().domain([0, 20]))
    .yAxisPadding(2) //default is 12, too large, cause boxes too small
    .tickFormat(d3.format(".2f"));  //this is to show numeric quantiles labels with floating numbers, instead of the default integers
    //.renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-55').attr('dy', '-1').attr('transform', "rotate(-30)");})

  histLength
    .width(450)
    .height(200)
    .dimension(lengthDimension)
    .group(lengthGroup)    
    .transitionDuration(500)
    .gap(2)   //control the gaps between bars. Weird things happen when bars touch each other
    .x(d3.scale.linear().domain([minLength, maxLength]))
    .elasticY(true)  //y axis dynamically adjust its ylim
    .xAxisLabel("Centimeter")
    .yAxisLabel("Frequency")
    .yAxis().ticks(5);

  histWeight
    .width(450)
    .height(200)
    .dimension(weightDimension)
    .group(weightGroup)
    .transitionDuration(500)
    .gap(73)   //control the gaps between bars. Weird things happen when bars touch each other
    .x(d3.scale.linear().domain([minWeight, maxWeight]))
    .elasticY(true)  //y axis dynamically adjust its ylim
    .xAxisLabel("Kilogram")
    .yAxisLabel("Frequency")
    .yAxis().ticks(5);

  dc.dataCount(".dc-data-count")
              .dimension(ndx)
              .group(ndx.groupAll());
              
  dc.renderAll();
/*
  var i=0;
  setInterval(function() {
    runDimension.filterAll();
    runDimension.filter([i++,21]);
    dc.renderAll();
  }, 2000);
*/
});