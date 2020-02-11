    var x = d3.scaleBand().domain([0,100]).range([0,100]).padding(.5);
    function onlyUnique(value, index, self)
        { 
            return self.indexOf(value) === index;
        }

    var duration = 5000, delay = 3, speed = 500;
    var t = d3.transition().duration(duration).ease(d3.easeLinear);
    var bg = $(".icon").css('background-image');
    var width_waffle,original_g,original_text, original, yScale_o, width_o_all, height_o_all, width_o, height_o,square, color;
    var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip");

    function width_waffle_set(){
        if(w<640){
            width_waffle = w * .96;
        }else{
            width_waffle = w * .5;
        }
    }
    width_waffle_set()
    

    $(".waffle").css("width",width_waffle);

    function width_icon_debute(){
        if(w<640){
            // width_icon = 20;
            // height_icon = 20;
            width_icon = w * 0.06;
            height_icon = width_icon;

            $(".icon").css({"width":width_icon, "height":height_icon})
            margin_icon = w * 0.02;
            margin_icon_row = 15;
        }
        else if(w>=640 && w<1500){
            width_icon = 25;
            height_icon = 25;
            $(".icon").css({"width":width_icon, "height":height_icon})
            margin_icon = 10;
            margin_icon_row = 20;
        }
        else{
            width_icon = 35;
            height_icon = 35;
            $(".icon").css({"width":width_icon, "height":height_icon})
            margin_icon = 10;
            margin_icon_row = 20;
        }
    }
    width_icon_debute()
    column = Math.floor(width_waffle/(width_icon + margin_icon));
       
    
    var icon = d3.select(".waffle").selectAll("div.icon");


    d3.csv("data/data.csv",function(error,data){

        function icon_debute(){

            width_icon_debute()
            width_waffle_set()
            var height_waffle_all = Math.ceil(174/column)  * (height_icon + margin_icon*1.5);
            $(".waffle").css("width",width_waffle);
            $(".waffle").css("height",height_waffle_all);
            if(w<640){
                $(".waffle").css("margin-top", 0);
            }else{
                $(".waffle").css("margin-top", h*.4 - height_waffle_all/2);
            }
            
            

            $(".waffle text").css("display","none");

            icon = d3.select(".waffle").selectAll("div.icon").data(data, function(d) { return d.id; });

            icon.exit().remove();

            icon = icon.enter()
                    .append("div")
                    .attr("class","icon")
                    .merge(icon)
                    .style("left", function(d,i){
                        return (i % column) * (width_icon+margin_icon) + "px";
                    })
                    .style("top", function(d,i){
                        return Math.floor(i/column) * (height_icon+margin_icon*1.5) + "px";
                    })
                    .style("margin",0);

            d3.selectAll(".icon").attr("id",function(d,i){return "plot"+i;})
            $(".icon").css({"width":width_icon, "height":width_icon, "opacity":1})

            d3.selectAll("div.icon")
                .style('background-image',"url(img/plot.png)");

            if(w>640){
                d3.selectAll("div.icon")
                .on("mouseover", mouseoverFunc_icon)
                .on("mousemove", mousemoveFunc_icon)
                .on("mouseout", mouseoutFunc_icon)
            }else{
                d3.selectAll("div.icon")
                .on("click", mouseoverFunc_icon)
                .on("mousemove", mousemoveFunc_icon)



            }
           

            for(var i=0; i<data.length; i++){
                if(data[i].zhong == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/zhong.png)");
                }
                if(data[i].banhuifa == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/banhuifa.png)");
                }
                if(data[i].huifa == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/huifa.png)");
                }
                if(data[i].else == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/else.png)");
                }
            }
            
        }

        function icon_big(){
            $(".waffle").fadeOut(speed);
            $("#icon_big1").fadeOut(speed);
            $("#icon_big0").fadeIn(speed);
        }

        function icon_big1(){
            $("#icon_big0").fadeOut(speed);
            $("#icon_big2").fadeOut(speed);
            $("#icon_big1").fadeIn(speed);
        }

        function icon_big2(){
            $("#icon_big1").fadeOut(speed);
            $("#icon_big2").fadeIn(speed);

            if($(".waffle").attr("opacity") == 1){
                $(".waffle").fadeOut(speed);
            }
            
        }

        var data_city = data.sort(function(a,b){ return b.city_amount - a.city_amount; })
        function icon_city(){

            var data_city = data.sort(function(a,b){ return b.city_amount - a.city_amount; })

            $(".label_industry").fadeOut(speed);
            $(".label_topten").fadeOut(speed);
            $(".label_city").fadeIn(speed);

            width_waffle_set()
            var height_waffle_all = h * .9;
            $(".waffle").css("width",width_waffle);
            $(".waffle").css("height",height_waffle_all);// $(".waffle").css("height",h);
            $(".waffle").css("margin-top", h * .05);

            if(w<640){
                width_icon = width_waffle/21 - margin_icon;
                $(".waffle_fix").css("top", 30)
                $(".waffle").css("margin-top", 0);
            }else{
                width_icon = h/26 - margin_icon;
                $(".waffle").css("margin-top", h*.4 - height_waffle_all/2);
            }

            
            var height_waffle_city = h;

            var yScale_plot = d3.scaleBand()
                .domain(data_city.map(function(d){ return d.city; }))
                .range([0, height_waffle_all]).padding(.3);
            
            icon = d3.select(".waffle").selectAll("div.icon").data(data_city, function(d) { return d.id; });

            icon.exit().remove();

            icon = icon.enter()
                .append("div").attr("class","icon")
                .merge(icon)
                .attr("id",function(d,i){return "plot"+i;})
                .transition()
                .duration(speed)
                .style("left", function(d,i){ return d.city_index * (width_icon+margin_icon/2)+ 70 + "px";})
                .style("top", function(d){return yScale_plot(d.city) + "px"})

                
            $(".icon").css({"width":width_icon, "height":width_icon, "background-image":"url(img/plot.png)"})

            for(var i=0; i<data_city.length; i++){
                if(data_city[i].zhong == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/zhong.png)");
                }
                if(data_city[i].banhuifa == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/banhuifa.png)");
                }
                if(data_city[i].huifa == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/huifa.png)");
                }
                if(data_city[i].else == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/else.png)");
                }
            }

            // row title
            var city_list = data.map(function(d){return d.city;});
            var city_unique = city_list.filter( onlyUnique );

            d3.select(".waffle").selectAll("text.label_city").data(city_unique)
                .enter()
                .append("text")
                .attr("class","label_city")
                .style("left", "3px")
                .style("top", function(d){ return yScale_plot(d)  + "px"})
                .text(function(d){ return d; })

            
        }

        var top10_title = [{name:"天津", row:0},
            {name:"重庆", row:3},
            {name:"上海", row:5},
            {name:"南京", row:7},
            {name:"太原", row:9},
            {name:"武汉", row:11},
            {name:"广州", row:13},
            {name:"石家庄", row:14},
            {name:"杭州", row:15},
            {name:"成都", row:16}]

        function icon_wuhan(){

            $(".label_city").fadeOut(speed);
            $(".label_industry").fadeOut(speed);
            $(".label_topten").fadeIn(speed);

            if(w<640){
                width_icon = width_waffle/12 - margin_icon;
                $(".waffle_fix").css("top", 30)
                $(".waffle").css("margin-top", 0);
            }else{
                width_icon = h/26 - margin_icon;
                $(".waffle").css("margin-top", h*.4 - height_waffle_all/2);
            }

            var city_top10 = data_city.filter(function(d){
                return d.city_amount >=9;
            })

            icon = d3.select(".waffle").selectAll("div.icon").data(city_top10, function(d) { return d.id; });

            icon.exit().remove();

            icon = icon.enter()
                .append("div").attr("class","icon")
                .merge(icon)
                .transition()
                .duration(speed)
                .style("left", function(d,i){ return d.topten_index * (width_icon+margin_icon*.7)+ 70 + "px";})
                .style("top", function(d){ return d.topten_row * (width_icon+margin_icon*1.5) + "px"})

            $(".icon").css({"width":width_icon, "height":width_icon})

             d3.select(".waffle").selectAll("text.label_topten").data(top10_title)
                .enter()
                .append("text")
                .attr("class","label_topten")
                .style("left", "10px")
                .style("top", function(d){ return d.row * (width_icon+margin_icon*1.5)-5 + "px"})
                .text(function(d){ return d.name; })
        }

        var industry_title = [{name:"化工", row:0},
            {name:"其他", row:4},
            {name:"钢铁", row:6},
            {name:"未知", row:7},
            {name:"机械制造", row:8},
            {name:"制药", row:9},
            {name:"冶炼", row:10},
            {name:"电镀", row:11},
            {name:"制气", row:12}]

        var industry_title_m = [{name:"化工", row:0},
            {name:"其他", row:5},
            {name:"钢铁", row:8},
            {name:"未知", row:10},
            {name:"机械制造", row:12},
            {name:"制药", row:14},
            {name:"冶炼", row:15},
            {name:"电镀", row:16},
            {name:"制气", row:17}]

        function icon_industry(){

            $(".label_city").fadeOut(speed);
            $(".label_topten").fadeOut(speed);
            $(".label_industry").fadeIn(speed);
            if(w<640){ 
                // $(".waffle_fix").css("top", h * .1); 
                width_icon = width_waffle/15 - margin_icon;
            }
            
            
            var data_industry = data.sort(function(a,b){ return b.industry_amount - a.industry_amount; })
            var height_waffle_all = 13 * ( width_icon + margin_icon*2 )

            var yScale_plot = d3.scaleBand()
                .domain(data_industry.map(function(d){ return d.industry_simple; }))
                .range([0, height_waffle_all]).padding(.8);

            icon = d3.select(".waffle").selectAll("div.icon").data(data_industry, function(d) { return d.id; });

            icon.exit().remove();

            icon = icon.enter()
                .append("div").attr("class","icon")
                .merge(icon)
                .attr("id",function(d,i){return "plot"+i;})
                .transition()
                .duration(speed)
                .style("left", function(d,i){ return d.industry_index_m * (width_icon+margin_icon/2) + 70 + "px";})
                .style("top", function(d){ return d.industry_row_m * (width_icon+margin_icon*2) + "px"})
                .style("left", function(d){
                    if(w<640){ return d.industry_index_m * (width_icon+margin_icon/2) + 70 + "px"; }
                    else { return d.industry_index * (width_icon+margin_icon/2) + 70 + "px"; }
                })
                .style("top", function(d){
                    if(w<640){ return d.industry_row_m * (width_icon+margin_icon*2) + "px"; }
                    else { return d.industry_row * (width_icon+margin_icon*2) + "px"; }
                })
                .style("opacity",1)

            

            $(".icon").css({"width":width_icon, "height":width_icon, "background-image":"url(img/plot.png)"})

            for(var i=0; i<data_industry.length; i++){
                if(data_industry[i].zhong == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/zhong.png)");
                }
                if(data_industry[i].banhuifa == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/banhuifa.png)");
                }
                if(data_industry[i].huifa == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/huifa.png)");
                }
                if(data_industry[i].else == "T"){
                    var bg = $("#plot"+i).css('background-image');
                    $("#plot"+i).css('background-image', bg + ",url(img/else.png)");
                }
            }

            $(".waffle").css("height",height_waffle_all);
            if(w>640){
                $(".waffle").css("margin-top", h*.4 - height_waffle_all/2);
            }
            

            d3.select(".waffle").selectAll("text.label_industry")
                .data(function(){
                    if(w<640){
                        return industry_title_m;
                    }else{
                        return industry_title;
                    }
                })
                .enter()
                .append("text")
                .attr("class","label_industry")
                .style("left", "3px")
                .style("top", function(d){ return d.row * (width_icon+margin_icon*2) + "px"})
                .text(function(d){ return d.name; })

        }

        icon_debute()
        $(window).scroll(function(){

            var windowTop = $(window).scrollTop();
            tooltip.style("display", "none"); 

             if(windowTop < front1 && section[0]==0){

                $(".waffle_container").removeClass("waffle_fix");
                icon_debute()
                changeSection(0)
            }
            //174
            if(windowTop >= front1 && windowTop < front2 && section[1]==0){

                $(".waffle_container").addClass("waffle_fix");
                $(".waffle").fadeIn(speed);
                $(".icon_big").fadeOut(speed);
                icon_debute()
                changeSection(1)
            }
            //total
            if(windowTop >= front2 && windowTop < front3 && section[2]==0){
                icon_big()
                changeSection(2)
            }
            //zhong
            if(windowTop >= front3 && windowTop < front4 && section[3]==0){
                icon_big1()
                changeSection(3)
            }
            //other half
            if(windowTop >= front4 && windowTop < front5 && section[4]==0){
                icon_big2()
                $(".waffle").fadeOut(speed);
                changeSection(4)
            }
            //city
            if(windowTop >= front5 && windowTop < front6 && section[5]==0){
                d3.selectAll(".icon").style("opacity",1)
                $(".waffle_container").addClass("waffle_fix");
                $(".waffle").fadeIn(speed);
                $(".icon_big").fadeOut(speed);

                $(".hand_waffle").fadeIn(1000);
                setTimeout(function(){$(".hand_waffle").fadeOut(1000);},2000)

                icon_city()
                changeSection(5)
            }
            //wuhan
            if(windowTop >= front6 && windowTop < front7 && section[6]==0){ //武汉
                $(".waffle_container").addClass("waffle_fix");
                if(w<640){
                    icon_wuhan()
                }else{
                    icon_city()
                }
                
                d3.selectAll(".icon").style("opacity",function(d){
                    if(d.city == "武汉"){ return 1;} else { return .2; }
                })
                changeSection(6)
            }

            if(windowTop >= front7 && windowTop < front8 && section[7]==0){ //重庆、天津
                $(".waffle_container").addClass("waffle_fix");
                if(w<640){
                    icon_wuhan()
                }else{
                    icon_city()
                }

                d3.selectAll(".icon").style("opacity",function(d){
                    if(d.city == "重庆" || d.city == "天津"){ return 1;} else { return .2; }
                })
                changeSection(7)
            }

            if(windowTop >= front8 && windowTop < front9 && section[8]==0){ //数据空白
                $(".waffle_container").addClass("waffle_fix");
                d3.selectAll(".icon").style("opacity",function(d){
                    if(d.city == "上海" || d.city == "石家庄" || d.city == "太原"){ return 1;} else { return .2; }
                })
                if(w<640){
                    icon_wuhan()
                }else{
                    icon_city()
                }
                changeSection(8)
            }

            if(windowTop >= front9 && windowTop < front10 && section[9]==0){ //industry
                $(".waffle_container").addClass("waffle_fix");
                icon_industry();
                $(".waffle").fadeIn(speed);
                changeSection(9)
            }

            if(windowTop >= 0 && windowTop < front10){
                $(".waffle_container").css("display","block");
            }else{
                $(".waffle_container").css("display","none");
            }

            if(windowTop >= front10 && windowTop < front_sankey && section[10]==0){ //industry gone
                $(".waffle_container").addClass("waffle_fix");
                $(".waffle_container").css("display","none");
                $(".waffle").fadeOut(speed);
                changeSection(10)
            }

            if(windowTop >= front_sankey && windowTop < front_originals && section[11]==0){ //hand_sankey
                $(".hand_sankey").fadeIn(1000);
                setTimeout(function(){$(".hand_sankey").fadeOut(1000);},2000)
                changeSection(11)
            }

            if(windowTop >= front_originals && windowTop < (front_originals + w) && section[12]==0){ //hand_originals
                $(".hand_originals").fadeIn(1000);
                setTimeout(function(){$(".hand_originals").fadeOut(1000);},2000)
                changeSection(12)
            }
        })
    })


    
    // MULTIPLES
    width_o_all = 1300;
    height_o_all = 800;
    square = 10;
    var width_each, height_each;
    if(w<640){
        width_each = w/8; height_each = 280;
    }else{
        width_each = 80; height_each = 250;
    }
    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    width_o = width_o_all - margin.left - margin.right;
    height_o = height_o_all - margin.top - margin.bottom;


    d3.csv("data/data.csv",function(error, data){

        if (error) throw error;

           
            var orginal_data_city = d3.nest().key(function(d){ return d.city;})
                .entries(data)
                .sort(function(a,b){ return b.values.length - a.values.length; })

            var color = d3.scaleOrdinal(["#cccccc","#844d40","#c8a17e","#cccccc","#d77e45","#e5d2b1","#cccccc","#cccccc","#cccccc","#cccccc","#b1d0e5","#b1d0e5","#9bc695","#7ea9bc","#7ea9bc","#f6f9c0"])
                .domain(["电镀","钢铁","化工","机械制造","其他","未知","冶炼","制气","制药","工业用地","公共设施","公共设施综合","绿地","商住用地","商住综合","学校"])

            //small multiple bars

            var svg = d3.select("#originals").selectAll("svg")
                    .data(orginal_data_city) 
                    .enter().append("svg")
                    .attr("width", width_each)
                    .attr("height", function(d,i){
                        if(w<640){
                            return height_each/(Math.floor(i/7)+1);
                        }else{
                            return height_each;
                        }
                        
                    })
                    .each(multiple);

            if(w<640){
                width_multiple = w * .95;
            }else{
                width_multiple = w * .8; 
            }
            var column_multiple = Math.floor(width_multiple/width_each);
            var height_multiple_all = (Math.ceil(26/column_multiple) - 0.5)  * height_each;
            if(w<640){
                height_multiple_all = height_each * 2.3;
            }

            $("#originals").css("width",width_each * column_multiple);
            $("#originals").css("height",height_multiple_all);

            function multiple(city){

                var localsvg = d3.select(this); 

                var local_g_industry = localsvg.append("g").attr("class","industry")
                    .attr("transform", "translate(" + margin.left + ",20)")

                var local_g_future = localsvg.append("g").attr("class","future")
                    .attr("transform", "translate(" + (margin.left + 20) + ",20)")

                var plot_i = local_g_industry.selectAll("rect")
                    .data(function(d){ return d.values.sort(function(a,b){ return a.industry_rank - b.industry_rank;}); })
                    .enter()
                    .append("rect")
                    .attr("width", square)
                    .attr("height", square)
                    .attr("x",0)
                    .attr("y", function(d,i){ return i * square; })
                    .attr("class", function(d){ return "plot" + d.id; })
                    .attr("stroke","#ffffff").attr("stroke-width",".5px").attr("cursor","pointer")
                    .style("fill", function(d){
                        // return color(d.industry_simple);
                        return "#7c4f43";
                    })
                    .on("mouseover", mouseoverFunc)
                    .on("mousemove", mousemoveFunc)
                    .on("mouseout", mouseoutFunc)



                var plot_f = local_g_future.selectAll("rect")
                    .data(function(d){ return d.values.sort(function(a,b){ return a.future_use_rank - b.future_use_rank;}); })
                    .enter()
                    .append("rect")
                    .attr("width", square)
                    .attr("height", square)
                    .attr("x",0)
                    .attr("y", function(d,i){ return i * square; })
                    .attr("class", function(d){ return "plot" + d.id; })
                    .attr("stroke","#ffffff").attr("stroke-width",".5px").attr("cursor","pointer")
                    .style("fill", function(d){
                        // return color(d.future_use_simple);
                            if(d.future_use_simple == "商住用地" || d.future_use_simple == "商住综合"){
                                return "#7ea9bc";
                            }if(d.future_use_simple == "未知" ){
                                return "#c8ccce";
                            }else{
                                return "#e2d2b5";
                            }
                    })
                    .on("mouseover", mouseoverFunc)
                    .on("mousemove", mousemoveFunc)
                    .on("mouseout", mouseoutFunc)


                localsvg.append("text")
                    .attr("class", "label")
                    .attr("x", 25)
                    .attr("y", 15)
                    .style("text-anchor", "middle")
                    .text(function(d) {
                        return d.key;
                    })
                    .attr("font-size",function(d){
                        if(d.key == "乌鲁木齐"){ return "12.5px"; } else { return "14px"; }
                    })
            } 
    })

    // d3.select("body").on("mouseover", mouseoutFunc)
    //icon
    function mouseoverFunc_icon(d) {
        // $("this").css({"border": "#634a43 2px solid"})

        tooltip.style("display", null) 
            .html("<p>" + d.plot + "（" + d.city + "）</br>"
                +"污染物：" + d.pollution_simple + "</br>"
                +"原行业：" + d.industry_simple
                );
    }
    function mouseoutFunc_icon() {console.log("out")
            tooltip.style("display", "none");  
    }
    function mousemoveFunc_icon(d) {
        tooltip
            .style("top", (d3.event.pageY + 10) + "px" )
            .style("left", function(){
                if (window.innerWidth - d3.event.pageX<125) {
                  return (d3.event.pageX - 125) + "px";
                }else{
                    return (d3.event.pageX + 10) + "px";
                }
            })
    }

    //multiples
    function mouseoverFunc(d) {
        // d3.selectAll("#originals rect").attr("opacity", .5).attr("stroke","none");
        var thisClass = d3.select(this).attr("class");
        d3.selectAll("." + thisClass).attr("opacity", 1).attr("stroke-width","1.5px").attr("stroke","#333333").attr("width",square * 1.5).attr("height",square * 1.5)
        tooltip.style("display", null) 
            .html("<p>" + d.plot + "</br>"
                + d.industry + "<span class='arrow'>&rarr;</span>" + d.future_use 
                );
    }
    
    function mouseoutFunc() {
            d3.selectAll("#originals rect").attr("opacity", 1).attr("stroke-width",".5px").attr("stroke","#ffffff").attr("width",square).attr("height",square)
            tooltip.style("display", "none");  
    }
    
    function mousemoveFunc(d) {
        tooltip
            .style("top", (d3.event.pageY + 10) + "px" )
            .style("left", function(){
                if (window.innerWidth - d3.event.pageX<125) {
                  return (d3.event.pageX - 125) + "px";
                }else{
                    return (d3.event.pageX + 10) + "px";
                }
            })
        
    }


    //node
    function mouseoverFunc_node(d) {
        tooltip.style("display", null)
        tooltip.html(
                    "<p>"+d.name
                    + d.value
                    +"块"     
            );

        var thisClass = d3.select(this).attr("class");
        $("." + thisClass).addClass("focused")
    }
    function mouseoutFunc_node() {
        tooltip.style("display", "none");  
    }
    function mousemoveFunc_node(d) {
        tooltip
            .style("top", (d3.event.pageY + 10) + "px" )
            .style("left", function(){
                if (window.innerWidth - d3.event.pageX<125) {
                  return (d3.event.pageX - 125) + "px";
                }else{
                    return (d3.event.pageX + 10) + "px";
                }
            })
    }

    //link
    function mouseoverFunc_link(d) {
        tooltip.style("display", null)
        tooltip.html(
                "<p><b>污染场地：</b>"
                + d.value
                +"块"     
            );
        /*if((d.source.name !== "未知") &&(d.target.name !== "未知")&&(d.target.name !== "其他")&&(d.target.name !== "其他")){
            tooltip.html(
               
                    "<p><b>" + d.value + "</b>"
                    +"个" + d.source.name 
                    +"将被开发为" + d.target.name       
            );
        }
        else if((d.source.name == "未知") || (d.source.name == "其他")){console.log("sourceNA")
            tooltip.html(
                    "<p><b>" + d.value + "</b>"
                    +"个污染地块"
                    +"将被开发为" + d.target.name       
            );
        }
        else if(d.target.name == "未知"){
            tooltip.html(
                    "<p><b>" + d.value + "</b>"
                    +"个" + d.source.name 
                    +"规划未知"
            );
        }*/

    }

    function mouseoutFunc_link() {
        tooltip.style("display", "none");  
    }
    function mousemoveFunc_link(d) {
        tooltip
            .style("top", (d3.event.pageY + 10) + "px" )
            .style("left", function(){
                if (window.innerWidth - d3.event.pageX<125) {
                  return (d3.event.pageX - 125) + "px";
                }else{
                    return (d3.event.pageX + 10) + "px";
                }
            })
    }

    if(w<640){
        d3.select(".waffle").on("mouseover", mouseoutFunc_icon)
    }

