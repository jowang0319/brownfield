
	d3.csv("data/data.csv", function(error, data) {
		if (error) throw error;

		//根据浏览器定位

		geolocation.getCurrentPosition(
			function(r) { //定位结果对象会传递给r变量

				if (this.getStatus() == BMAP_STATUS_SUCCESS) { //通过Geolocation类的getStatus()可以判断是否成功定位。
					var pt = r.point;
					myGeo.getLocation(pt, function(rs) {
						var addComp = rs.addressComponents;
						/*alert(addComp.province +
							addComp.city
							// + addComp.district + addComp.street + addComp.streetNumber
						);*/
						var province = addComp.province;
						autofilter(province, data)

					});

					function autofilter(province, data) {
						map.centerAndZoom(province, 10);
						var adds = data.filter(function(d) {
							return d.province == province
						});
						var index = 0;

						bdGEO(adds, index);
					}
				} else {
					//关于状态码
					//BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。
					//BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
					//BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。
					//BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
					//BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。
					//BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。
					//BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
					//BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)
					//BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)
					switch (this.getStatus()) {
						case 2:
							alert('位置结果未知 获取位置失败.');
							break;
						case 3:
							alert('导航结果未知 获取位置失败..');
							break;
						case 4:
							alert('非法密钥 获取位置失败.');
							break;
						case 5:
							alert('对不起,非法请求位置  获取位置失败.');
							break;
						case 6:
							alert('对不起,当前 没有权限 获取位置失败.');
							break;
						case 7:
							alert('对不起,服务不可用 获取位置失败.');
							break;
						case 8:
							alert('对不起,请求超时 获取位置失败.');
							break;

					}
				}

			}, {
				enableHighAccuracy: true
			}
		)



		//下拉菜单
		var menu = d3.select("#menu select").on("change", filter);

		function filter() {

			var Selection = menu.property("value");
			map.centerAndZoom(Selection, 10);

			var adds = data.filter(function(d) {
				return d.city == Selection
			});
			var index = 0;
			bdGEO(adds, index);
		}
		filter();

		function bdGEO(adds, index) {
			var add = adds[index].plot;
			var rename = adds[index].plot_rename;
			var industry = adds[index].industry;
			var future_use = adds[index].future_use;
			geocodeSearch(index, add, rename, industry, adds, future_use);
		}

		function geocodeSearch(index, add, rename, industry, adds, future_use) {
			myGeo.getPoint(add, function(point) {
				if (point) {
					// document.getElementById("result").innerHTML += index + "、" + add + ":" + point.lng + "," + point.lat + "</br>";
					var address = new BMap.Point(point.lng, point.lat);
					var label = new BMap.Label(
						rename
						+ "<br> 工业类型：" + industry
						+ "<br> 规划用途：" + future_use, {offset: new BMap.Size(20, -10)}
						)
					label.setStyle({ color : "#ffffff", fontSize : "12px" , padding: "5px", backgroundColor:"rgba(89, 87, 87, 0.8)", border:"none"})
					addMarker(address, label);
				}
				else{
						// alert('位置结果未知 获取位置失败.'+add);
						// console.log(add)
							// document.getElementById("result").innerHTML += index + "、" + add+" ,无法解析"+"<br>";
				}
			}, "北京市");
			
			if (index < adds.length) {
				index++;
				setTimeout(bdGEO, 200, adds, index);
				// bdGEO(adds,index)
			}

		}
		// 编写自定义标注
		
		function addMarker(point, label) {
			// var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
			var myIcon = new BMap.Icon("img/locate.png", new BMap.Size(56,76));

			var marker = new BMap.Marker(point,{icon:myIcon});
			map.addOverlay(marker);
			marker.setLabel(label);
			label.hide();

			marker.addEventListener("click", click);
			marker.addEventListener("mouseover", show);
			marker.addEventListener("mouseout", hide);

			function click(){
				$("label").css("display","none")
				show()
				console.log(this)
			}

			function hide() {console.log("hide")
				label.hide();
			}

			function show() {console.log("show")
				label.show();
			}
		}

	})
	var geolocation = new BMap.Geolocation();
	var myGeo = new BMap.Geocoder();