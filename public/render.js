var svg = d3.select("body")
      .append("svg")
      .attr("width", 300)
      .attr("height", 200);

var data = [150, 230, 180, 90];

svg.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr({
    class : "bar",
    width : function(d) {return d;},
    height: "40",
    y : function(d, i) {return i*50 + 10;},
    x : "10"
   });

var index = -1;

svg.firebase( 'https://retroonfire.firebaseio.com/', 
{
    createFunc : function(newData) {
        console.log(`create ${newData.val()}`);
        // callback when data is added, maybe we want to add a text element?
        return this.append('text').text(newData.val()).attr({
          x: "15",
          y: function() {index += 1; return index*50 + 40;}
        }).attr("font-family","Verdana") .attr("font-size","35");
    },
    updateFunc : function(changedData) {
      console.log(`update $(changedData.val())`);
        // data was changed, let's change the text
        this.text(changedData.val());
    }
}
);
