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

function render_card(card, node) {
	return node.text(card.text).attr({
          x: card.x,
          y: card.y
     });
}

svg.firebase( 'https://retroonfire.firebaseio.com/rooms/room1/cards', 
{
    createFunc : function(newData) {
        console.log(`create ${newData.val()}`);
        var card = newData.val();

        // callback when data is added, maybe we want to add a text element?
        return render_card(card, this.append('text').attr("font-family","Verdana").attr("font-size","35"));
    },
    updateFunc : function(changedData) {
      console.log(`update $(changedData.val())`);
        // data was changed, let's change the text
        render_card(changedData.val(), this);
    }
}
);
