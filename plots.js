var outBoundEntropyChart = dc.barChart("#outBoundEntropy-chart");
var inBoundEntropyChart = dc.barChart("#inBoundEntropy-chart");
var outBoundStopsEntropyChart = dc.barChart("#outBoundStopsEntropy-chart");
var inBoundStopsEntropyChart = dc.barChart("#inBoundStopsEntropy-chart");
var carriersEntropyChart = dc.barChart("#carriersEntropy-chart");
           
var totalItinChart = dc.barChart("#totalItin-chart");

var outBoundUniqueChart = dc.barChart("#outBoundUnique-chart");
var inBoundUniqueChart = dc.barChart("#inBoundUnique-chart");
var outBoundStopsUniqueChart = dc.barChart("#outBoundStopsUnique-chart");
var inBoundStopsUniqueChart = dc.barChart("#inBoundStopsUnique-chart");
var carriersUniqueChart = dc.barChart("#carriersUnique-chart");

var advancedPurchaseRow = dc.rowChart("#apRow-chart");

var lengthOfStayRow = dc.rowChart("#losRow-chart");

function decimal2(x) {  //a function to round numbers to 2 decimal places, for creating the bins
  return Math.round((x+.00001)*10) / 10;  
}

function decimal3(x) {  //a function to round numbers to 3 decimal places, for creating the bins
  return Math.round((x+.00001)*100) / 100;  
}

d3.csv("data_for_analysis_20140707.csv", function(error, data) {
  var ndx = crossfilter(data);
  data.forEach(function(d) {
    d.market = d.market;
    d.entropy_ob = + d.entropy_ob;
    d.entropy_ib = + d.entropy_ib;
    d.entropy_ob_stops = + d.entropy_ob_stops;
    d.entropy_ib_stops = + d.entropy_ib_stops;
    d.entropy_carriers = + d.entropy_carriers;

    d.total_itin_nbr = + d.total_itin_nbr;

    d.unique_ob = + d.unique_ob;
    d.unique_ib = + d.unique_ib;
    d.unique_ob_stops = + d.unique_ob_stops;
    d.unique_ib_stops = + d.unique_ib_stops;

    d.ap_2 = d.ap_2;
    d.los_2 = d.los_2;
  });

  var entropyByOb = ndx.dimension(function (d) {return d.entropy_ob; })
  var entropyByObGroup = entropyByOb.group(decimal2);

  var entropyByIb = ndx.dimension(function (d) {return d.entropy_ib; })
  var entropyByIbGroup = entropyByIb.group(decimal2);

  var entropyByObStops = ndx.dimension(function (d) {return d.entropy_ob_stops; })
  var entropyByObStopsGroup = entropyByObStops.group(decimal3);

  var entropyByIbStops = ndx.dimension(function (d) {return d.entropy_ib_stops; })
  var entropyByIbStopsGroup = entropyByIbStops.group(decimal3);

  var entropyByCarriers = ndx.dimension(function (d) {return d.entropy_carriers; })
  var entropyByCarriersGroup = entropyByCarriers.group(decimal2);

  var totalItin = ndx.dimension(function (d) {return d.total_itin_nbr; })
  var totalItinGroup = totalItin.group();

  var uniqueByOb = ndx.dimension(function (d) {return d.unique_ob; })
  var uniqueByObGroup = uniqueByOb.group();

  var uniqueByIb = ndx.dimension(function (d) {return d.unique_ib; })
  var uniqueByIbGroup = uniqueByIb.group();

  var uniqueByObStops = ndx.dimension(function (d) {return d.unique_ob_stops; })
  var uniqueByObStopsGroup = uniqueByObStops.group();

  var uniqueByIbStops = ndx.dimension(function (d) {return d.unique_ib_stops; })
  var uniqueByIbStopsGroup = uniqueByIbStops.group();

  var uniqueByCarriers = ndx.dimension(function (d) {return d.unique_carriers; })
  var uniqueByCarriersGroup = uniqueByCarriers.group();

  var advancedPurchaseDim = ndx.dimension(function (d) {return d.ap_2;})
  var advancedPurchaseDimGroup = advancedPurchaseDim.group();

  var lengthOfStayDim = ndx.dimension(function (d) {return d.los_2;})
  var lengthOfStayDimGroup = lengthOfStayDim.group();

  //to decide the xlim of the histogram
  var minObEntropy = entropyByOb.bottom(1)[0].entropy_ob;
  var maxObEntropy = entropyByOb.top(1)[0].entropy_ob;

  var minIbEntropy = entropyByIb.bottom(1)[0].entropy_ib;
  var maxIbEntropy = entropyByIb.top(1)[0].entropy_ib;

  var minObStopsEntropy = entropyByObStops.bottom(1)[0].entropy_ob_stops;
  var maxObStopsEntropy = entropyByObStops.top(1)[0].entropy_ob_stops;

  var minIbStopsEntropy = entropyByIbStops.bottom(1)[0].entropy_ib_stops;
  var maxIbStopsEntropy = entropyByIbStops.top(1)[0].entropy_ib_stops;

  var minCarriersEntropy = entropyByCarriers.bottom(1)[0].entropy_carriers;
  var maxCarriersEntropy = entropyByCarriers.top(1)[0].entropy_carriers;

  var minTotal = totalItin.bottom(1)[0].total_itin_nbr;
  var maxTotal = totalItin.top(1)[0].total_itin_nbr;

  var minUniqueOb = uniqueByOb.bottom(1)[0].unique_ob;
  var maxUniqueOb = uniqueByOb.top(1)[0].unique_ob;

  var minUniqueIb = uniqueByIb.bottom(1)[0].unique_ib;
  var maxUniqueIb = uniqueByIb.top(1)[0].unique_ib;

  var minUniqueObStops = uniqueByObStops.bottom(1)[0].unique_ob_stops;
  var maxUniqueObStops = uniqueByObStops.top(1)[0].unique_ob_stops;

  var minUniqueIbStops = uniqueByIbStops.bottom(1)[0].unique_ib_stops;
  var maxUniqueIbStops = uniqueByIbStops.top(1)[0].unique_ib_stops;

  var minUniqueCarriers = uniqueByCarriers.bottom(1)[0].unique_carriers;
  var maxUniqueCarriers = uniqueByCarriers.top(1)[0].unique_carriers;

  //just to see where the highest bin is in the histogram of total itin number
  //because the bar at 300 is too high
  var maxHeight = totalItinGroup.top(1)[0].value; //the bottom only applies to dimension
  var maxHeightPosition = totalItinGroup.top(1)[0].key;
  console.info("the highest frequency is " +  maxHeight + ", at entropy of " + maxHeightPosition);

  outBoundEntropyChart.width(500)
         .height(180)
         .dimension(entropyByOb)
         .group(entropyByObGroup)
         .transitionDuration(500)
         .gap(103)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minObEntropy, maxObEntropy+0.1]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  inBoundEntropyChart.width(500)
         .height(180)
         .dimension(entropyByIb)
         .group(entropyByIbGroup)
         .transitionDuration(500)
         .gap(100)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minIbEntropy, maxIbEntropy+0.1]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  outBoundStopsEntropyChart.width(500)
         .height(180)
         .dimension(entropyByObStops)
         .group(entropyByObStopsGroup)
         .transitionDuration(500)
         .gap(2040)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minObStopsEntropy, maxObStopsEntropy+0.1]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  inBoundStopsEntropyChart.width(500)
         .height(180)
         .dimension(entropyByIbStops)
         .group(entropyByIbStopsGroup)
         .transitionDuration(500)
         .gap(2035)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minIbStopsEntropy, maxIbStopsEntropy+0.1]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  carriersEntropyChart.width(500)
         .height(180)
         .dimension(entropyByCarriers)
         .group(entropyByCarriersGroup)
         .transitionDuration(500)
         .gap(200)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minCarriersEntropy, maxCarriersEntropy+0.1]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  totalItinChart.width(500)
         .height(180)
         .dimension(totalItin)
         .group(totalItinGroup)
         .transitionDuration(500)
         .gap(15)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minTotal, maxTotal+5]))
         // .y(d3.scale.linear().domain([0, Math.floor(maxHeight/5)])) ////if you want the dominant bar at 300 to be smaller
         .elasticY(true)
         .xAxisLabel("")
         .yAxisLabel("");

  outBoundUniqueChart.width(500)
         .height(180)
         .dimension(uniqueByOb)
         .group(uniqueByObGroup)
         .transitionDuration(500)
         .gap(1)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minUniqueOb, maxUniqueOb+5]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  inBoundUniqueChart.width(500)
         .height(180)
         .dimension(uniqueByIb)
         .group(uniqueByIbGroup)
         .transitionDuration(500)
         .gap(1)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minUniqueIb, maxUniqueIb+5]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  outBoundStopsUniqueChart.width(500)
         .height(180)
         .dimension(uniqueByObStops)
         .group(uniqueByObStopsGroup)
         .transitionDuration(500)
         .gap(1)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minUniqueObStops, maxUniqueObStops+5]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  inBoundStopsUniqueChart.width(500)
         .height(180)
         .dimension(uniqueByIbStops)
         .group(uniqueByIbStopsGroup)
         .transitionDuration(500)
         .gap(1)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minUniqueIbStops, maxUniqueIbStops+5]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  carriersUniqueChart.width(500)
         .height(180)
         .dimension(uniqueByCarriers)
         .group(uniqueByCarriersGroup)
         .transitionDuration(500)
         .gap(1)   //control the gaps between bars. Weird things happen when bars touch each other
         .x(d3.scale.linear().domain([minUniqueCarriers, maxUniqueCarriers+5]))
         .elasticY(true)  //y axis dynamically adjust its ylim
         .xAxisLabel("")
         .yAxisLabel("");

  // advancedPurchasePie.width(200)
  //                    .height(200)    
  //                    .transitionDuration(500)
  //                    .radius(100)
  //                    .innerRadius(20)
  //                    .dimension(advancedPurchaseDim)
  //                    .group(advancedPurchaseDimGroup)
  //                    .colors(d3.scale.category20());

  // lengthOfStayPie.width(200)
  //                    .height(200)    
  //                    .transitionDuration(500)
  //                    .radius(100)
  //                    .innerRadius(20)
  //                    .dimension(lengthOfStayDim)
  //                    // .renderLabel(false)
  //                    .group(lengthOfStayDimGroup)
  //                    .colors(d3.scale.category20c());

  advancedPurchaseRow.width(260).height(300)
              .dimension(advancedPurchaseDim)
              .group(advancedPurchaseDimGroup)
              .colors('#D50F25') //the colors used in row charts are from the google logo hex values
              .labelOffsetY(26)
              .elasticX(true)
              .ordering(function(d){ if(d.key == "[0,14] days") return 1;
                                  else if(d.key == "[15,31] days") return 2;
                                  else if(d.key == "[32,62] days") return 3;
                                  else if(d.key == "[63,92] days") return 4;
                                  else if(d.key == "[93,192] days") return 5;})
              .xAxis().ticks(4);

  lengthOfStayRow.width(260).height(300)
            .dimension(lengthOfStayDim)
            .group(lengthOfStayDimGroup)
            .colors('#EEB211') 
            .labelOffsetY(26)
            .elasticX(true)
            .ordering(function(d){ if(d.key == "[0,1] days") return 1;
                                else if(d.key == "[2,3] days") return 2;
                                else if(d.key == "[4,7] days") return 3;
                                else if(d.key == "[8,14] days") return 4;
                                else if(d.key == "[15,16] days") return 5;})
            .xAxis().ticks(4);

  dc.dataCount(".dc-data-count")
              .dimension(ndx)
              .group(ndx.groupAll());

  marketDim = ndx.dimension(function (d) {return d.market});
  marketDimGroup = marketDim.group();
  dc.rowChart("#top10-chart").width(300).height(500)
              .dimension(marketDim)
              .group(marketDimGroup)
              .data(function (group) {return group.top(10)})
              .colors('#009925') 
              .labelOffsetY(26)
              .elasticX(true);


  dc.renderAll();  //this is essential, w/o this the plot won't show up in the page

});


//BELOW EXAMPLES ARE USED FOR LEARNING BY DOING             
// var hitslineChart  = dc.lineChart("#ob-chart");

// d3.csv("data_for_vis.csv", function(error, data) {
//   var ndx = crossfilter(data);
//   data.forEach(function(d) {
//     d.entropy_ob = + d.entropy_ob;
//   });
//   console.info(data[0]);
//   var entropyDim = ndx.dimension(function(d) {return d.entropy_ob;});
//   var values = entropyDim.group().reduceCount(function(d) {return d.entropy_ob;});
//   console.info("the value is " + values.top(1)[0].value);
//   var minEntropy = entropyDim.bottom(1)[0].entropy_ob;
//   var maxEntropy = entropyDim.top(1)[0].entropy_ob;

//   hitslineChart
//     .width(500).height(200)
//     .dimension(entropyDim)
//     .group(values)
//     .x(d3.scale.linear().domain([minEntropy,maxEntropy]))
//     .yAxisLabel("Hits per day");

//   dc.renderAll();

// });

                
// var hitslineChart  = dc.lineChart("#ob-chart");

// d3.csv("toy_data.csv", function(error, data) {
//   var ndx = crossfilter(data);
//   var parseDate = d3.time.format("%m/%d/%Y").parse;
//   data.forEach(function(d) {
//     d.date = Date.parse(d.date);
//     d.http_404 = + d.http_404;
//     d.http_200 = + d.http_200;
//     d.http_302 = + d.http_302;
//     d.total= d.http_404+d.http_200+d.http_302;
//   });
//   console.info(data[0]);
//   var dateDim = ndx.dimension(function(d) {return d.date;});
//   var hits = dateDim.group().reduceSum(function(d) {return d.total;});
//   console.info("the value is " + hits.top(1)[0].value);
//   var minDate = dateDim.bottom(1)[0].date;
//   var maxDate = dateDim.top(1)[0].date;

//   hitslineChart
//     .width(500).height(200)
//     .dimension(dateDim)
//     .group(hits)
//     .x(d3.time.scale().domain([minDate,maxDate]))
//     .yAxisLabel("Hits per day");

//   dc.renderAll();

// });