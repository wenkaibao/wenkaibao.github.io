d3.select("#btnOutBound")
  .on("click", function() {  
      d3.select("#outBoundEntropy-chart").style("display", "inline");
      d3.select("#inBoundEntropy-chart").style("display", "none");
      d3.select("#outBoundStopsEntropy-chart").style("display", "none");
      d3.select("#inBoundStopsEntropy-chart").style("display", "none");
      d3.select("#carriersEntropy-chart").style("display", "none");

      d3.select("#apPie-chart").style("display", "inline");

      d3.select("#totalItin-chart").style("display", "inline");

      d3.select("#losPie-chart").style("display", "inline");

      d3.select("#outBoundUnique-chart").style("display", "inline");
      d3.select("#inBoundUnique-chart").style("display", "none");
      d3.select("#outBoundStopsUnique-chart").style("display", "none");
      d3.select("#inBoundStopsUnique-chart").style("display", "none");
      d3.select("#carriersUnique-chart").style("display", "none");
      dc.redrawAll();
    });

d3.select("#btnInBound")
  .on("click", function() {  
      d3.select("#outBoundEntropy-chart").style("display", "none");
      d3.select("#inBoundEntropy-chart").style("display", "inline");
      d3.select("#outBoundStopsEntropy-chart").style("display", "none");
      d3.select("#inBoundStopsEntropy-chart").style("display", "none");
      d3.select("#carriersEntropy-chart").style("display", "none");

      d3.select("#apPie-chart").style("display", "inline");

      d3.select("#totalItin-chart").style("display", "inline");

      d3.select("#losPie-chart").style("display", "inline");

      d3.select("#outBoundUnique-chart").style("display", "none");
      d3.select("#inBoundUnique-chart").style("display", "inline");
      d3.select("#outBoundStopsUnique-chart").style("display", "none");
      d3.select("#inBoundStopsUnique-chart").style("display", "none");
      d3.select("#carriersUnique-chart").style("display", "none");
      // dc.renderAll();
    });

d3.select("#btnOutBoundStops")
  .on("click", function() {  
      d3.select("#outBoundEntropy-chart").style("display", "none");
      d3.select("#inBoundEntropy-chart").style("display", "none");
      d3.select("#outBoundStopsEntropy-chart").style("display", "inline");
      d3.select("#inBoundStopsEntropy-chart").style("display", "none");
      d3.select("#carriersEntropy-chart").style("display", "none");

      d3.select("#apPie-chart").style("display", "inline");

      d3.select("#totalItin-chart").style("display", "inline");

      d3.select("#losPie-chart").style("display", "inline");

      d3.select("#outBoundUnique-chart").style("display", "none");
      d3.select("#inBoundUnique-chart").style("display", "none");
      d3.select("#outBoundStopsUnique-chart").style("display", "inline");
      d3.select("#inBoundStopsUnique-chart").style("display", "none");
      d3.select("#carriersUnique-chart").style("display", "none");
      // dc.renderAll();
    });

d3.select("#btnInBoundStops")
  .on("click", function() {  
      d3.select("#outBoundEntropy-chart").style("display", "none");
      d3.select("#inBoundEntropy-chart").style("display", "none");
      d3.select("#outBoundStopsEntropy-chart").style("display", "none");
      d3.select("#inBoundStopsEntropy-chart").style("display", "inline");
      d3.select("#carriersEntropy-chart").style("display", "none");

      d3.select("#apPie-chart").style("display", "inline");

      d3.select("#totalItin-chart").style("display", "inline");

      d3.select("#losPie-chart").style("display", "inline");

      d3.select("#outBoundUnique-chart").style("display", "none");
      d3.select("#inBoundUnique-chart").style("display", "none");
      d3.select("#outBoundStopsUnique-chart").style("display", "none");
      d3.select("#inBoundStopsUnique-chart").style("display", "inline");
      d3.select("#carriersUnique-chart").style("display", "none");
      // dc.renderAll();
    });

d3.select("#btnCarriers")
  .on("click", function() {  
      d3.select("#outBoundEntropy-chart").style("display", "none");
      d3.select("#inBoundEntropy-chart").style("display", "none");
      d3.select("#outBoundStopsEntropy-chart").style("display", "none");
      d3.select("#inBoundStopsEntropy-chart").style("display", "none");
      d3.select("#carriersEntropy-chart").style("display", "inline");

      d3.select("#apPie-chart").style("display", "inline");

      d3.select("#totalItin-chart").style("display", "inline");

      d3.select("#losPie-chart").style("display", "inline");

      d3.select("#outBoundUnique-chart").style("display", "none");
      d3.select("#inBoundUnique-chart").style("display", "none");
      d3.select("#outBoundStopsUnique-chart").style("display", "none");
      d3.select("#inBoundStopsUnique-chart").style("display", "none");
      d3.select("#carriersUnique-chart").style("display", "inline");
      // dc.renderAll();
    });