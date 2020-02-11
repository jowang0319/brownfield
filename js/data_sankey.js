    var width_sk_all;
    if(w<800){
        width_sk_all = w * .95; 
    }else{
        width_sk_all = 450;
    }
    var margin_sk = {top: 10, right: 10, bottom: 10, left: 10},
        width_sk = width_sk_all - margin_sk.left - margin_sk.right,
        height_sk = width_sk_all * 1.1 - margin_sk.top - margin_sk.bottom;

    var svg_sk = d3.select(".sankey").append("svg")
        .attr("width", width_sk + margin_sk.left + margin_sk.right)
        .attr("height", height_sk + margin_sk.top + margin_sk.bottom)
        .attr("class","sk")
        .append("g")
        .attr("transform", "translate(" + margin_sk.left + "," + margin_sk.top + ")");

    var color_sk = d3.scaleOrdinal(["#cccccc","#844d40","#c8a17e","#cccccc","#d77e45","#e5d2b1","#cccccc","#cccccc","#cccccc","#cccccc","#b1d0e5","#b1d0e5","#9bc695","#7ea9bc","#7ea9bc","#f6f9c0"])
                .domain(["电镀","钢铁","化工","机械制造","其他","未知","冶炼","制气","制药","工业用地","公共设施","公共设施综合","绿地","商住用地","商住综合","学校"])

    var sankey = d3.sankey()
        // .nodeSort(function(a,b){ return a.value - b.value; })
        .nodeWidth(25)
        .nodePadding(10)
        .size([width_sk, height_sk])

    d3.json("data/data.json", function(error, graph) {

        sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .layout(32);

        // graph.nodes.sort(function(a,b){ return b.value - a.value; })

        var link = svg_sk.append("g")
            .selectAll(".link")
            .data(graph.links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("class", function(d){
              return "link s" + d.source.name + " t" + d.target.name;
            })
            .attr("d", sankey.link())
            .style("stroke-width", function(d) { return Math.max(1, d.dy); })
            // .style("stroke",function(d) { return d.color = color_sk(d.source.name.replace(/ .*/, "")) ; })
            .style("stroke", function(d){ 
                if(d.target.name == "商住用地" || d.target.name == "商住综合"){
                    return "#6493b1";
                }else if(d.target.name == "未知"){
                    return "#c8ccce";
                }else{
                    return "#e2d2b5";
                }
            })
            .on("mouseover",mouseoverFunc_link)
            .on("mousemove", mousemoveFunc_link)
            .on("mouseout", mouseoutFunc_link)
            // .style("stroke",function(d) { return d.color = "linear-gradient(to right, " + color(d.source.name.replace(/ .*/, "")) + "," + color(d.target.name.replace(/ .*/, "")) + ")"; })
            // .sort(function(a, b) { return b.dy - a.dy; });


        var node = svg_sk.append("g")
            .selectAll(".node")
            .data(graph.nodes) 
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; })

        node.append("rect")
            .attr("height", function(d) { return d.dy; })
            .attr("width", sankey.nodeWidth())
            // .style("fill", function(d) { return d.color = color_sk(d.name.replace(/ .*/, "")); })
            .style("fill", function(d){
                if(d.name == "商住用地" || d.name == "商住综合" ){
                    return "#6493b1";
                }else if(d.name == "未知" && d.node>=9){
                    return "#c8ccce";
                }else if(d.node < 9){
                    return "#7c4f43";
                }else{
                    return "#e2d2b5";
                }
            })
            .attr("class",function(d){
                if(d.node < 9){
                    return "s" + d.name;
                }else{
                    return "t" + d.name;
                }
            })
            .on("mouseover",mouseoverFunc_node)
            .on("mousemove", mousemoveFunc_node)
            .on("mouseout", mouseoutFunc_node)



        node
            .append("text")
            .attr("x", -6)
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .style("font-size","14px")
            .attr("transform", null)
            .text(function(d) { return d.name; })
            .filter(function(d) { return d.x < width_sk / 2; })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start")
            .style("font-size", "14px")

       /* d3.select("svg.sk g").select("text.title_sankey1")
            .append("text")
            .attr("class","title_sankey1")
            .attr("x", 0)
            .attr("y", 10)
            .text("原产业")*/

    });

