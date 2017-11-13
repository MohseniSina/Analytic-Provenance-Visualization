;(function() {
	var oldTagPos;
	var newBoxPosX
	var newBoxPosY
	var overTopic
	var func = 0;
	var underTopic
	var topic_pointer = [0,1,2,3,4,5,6,7,8,9,10];
	var last_check_bounding = -1;
	var tagPos = 0;
	var prevMousePosX;
	var prevMousePosY;
	var prevBoxPosX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	var prevBoxPosY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	var boundingBox = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	var barchart = 0
	var strategy_windows
    var evaluation_data; 
	var grounded = 0;
	var flyIt;
	var wordList
	var wordListPos = 90
	var margin = { top: 10, right: 200, bottom: 60, left: 80 };
	var width = 1000;
	var height = 600;
	var textRoom = 400;
	var keywords_Height = 400;
	var keywords_width = 2000;
    var magicNumber = 1;
	var magicNumber_2 = 1;
	var old_magicNumber_2 = 5;
	var dataXRange = {min: 00, max: 110};
	var dataYRange = {min: 0.0, max: 60};
	var flag = 0;
    var showIt = {
		OpenDoc: "Opening document",
		Stop: "Stop reading document",
		HighlightTxt: "Highlight text",
		read: "Reading document",
		search: "Searching",
		createNote: "Create a new note",
		addNote: "Writing note",
		newConnection: "Connect two documents"
	};

	var textField;
	var singling = 0;
	var axisFont = 15;
	var topicFont = 12;
    var thickPathStroke = 8;
	var moreThickPathStroke	= 8;
    var pathStroke = 6;
	var tooltipOpacity = 1;
	var curvethread = 1;

	var addingFlag = false;
	var removingFlag = false;
	var init_chart = true;
	var usingOnePath = false;
	var timeInterval = 2;
	var evaluation = 0;

	Math.clip = function(number, min, max) {
		return Math.max(min, Math.min(number, max));
	}

	var fisheye = d3.fisheye.circular()
    .radius(500);

	var color = d3.scaleOrdinal(d3.schemeCategory10); 
	var Lightcolor = d3.scaleOrdinal(d3.schemeCategory20); 
	var thinWidth = 5;
	var thickWidth = 10;

	var openDoc = "OpenDoc";
	var linkDocs = "newConnection";
   
	var useMarkers = false;
	var zoomRect;
	var zoom 
	var xGroup;
	var makeData2 = [];
	var original_data;
	var line;
	var classInfo = [];
	var classLinks = [];
	var anotherLine = [];
	var classIDList = [];
	var classIDText = [];
	var myColor = [];
	var myLightColor = [];
	var endData = [];
    var myData;
	var topicThreads;  // Topic Threads view: 0     Interest Threads view: 1
	var pattern_ = 1;    // Icons view: 1
	var doIt = 0;    //
    var strategy_windows = []
	var array        // drop down menu
	var source3     // drop down menu
	var source2        // drop down menu
	var source4
	var source1

	// ms, s, etc...
	// var timeStep = 1 / 1000.0;
	var timeStep = 1 / 10 / 60;

	var xAxisLabelHeader = "Analysis Time (minutes)";
	var yAxisLabelHeader = "Weighted user interaction sum";

	var data;
	var chart;
	var tags;
	var wordtags;
	var chartWidth;
	var new_chartWidth1;
	var new_chartWidth2;
	var chartHeight;
	var sliderSVG;
	var sliderSVG2;
	var sliderSVG3;
	var sliderWidth2;
	var sliderHeight2;

	var sliderWidth3;
	var sliderHeight3;

	var sliderWidth;
	var sliderHeight;

     // icons initial condition,
	 var connectionInteract = ""
	 var noteInteract = "addNote"
	 var highlightInteract = "HighlightTxt"
	 var searchInteract = "search"
	 var ceartNoteInteract = ""
     var openDocInteract = ""

	var timer;

	var toggleReadInteract;

	// ----------------------------------- Define the div for the tooltip -----------------------------
	var div1 = d3.select("body").append("talkbubble")   // Tooltip u explorations
		.attr("class", "tooltip")
		.style("opacity", tooltipOpacity)
		.style("position", "absolute")
		.style("text-align", "center")
		.style("width", 100)
		.style("height", 48)
		.style("border-radius", "10% / 30%")
		.style("padding", 2)
		.style("font-size", 12)
		.style("background", "#1e90ff")
		.style("border", 3)
		.style("border-radius", 12)
		.style("pointer-events", "none");

	var div3 = d3.select("body").append("talkbubble")   // Orange tooltip for data points
		.attr("class", "tooltip")
		.style("opacity", tooltipOpacity)
		.style("position", "absolute")
		.style("text-align", "center")
		.style("width", 80)
		.style("height", 48)
		.style("border-radius", "10% / 20%")
		.style("padding", 2)
		.style("font-size", 12)
		.style("background", "#ff7f50")
		.style("border", 0)
		.style("border-radius", 8)
		.style("pointer-events", "none");

	var checkbox_datapoints
	var checkbox_fillgraph
	var checkbox_macro
	var checkbox_think
	var checkbox_icons
	var checkbox_narative
	var checkbox_search
	var checkbox_note
	var checkbox_opens
	var checkbox_Highlights
	var checkbox_Notes
	var checkbox_connections

    var dropdown_1 = d3.select("#sources_dataset")   // Drop down for dataset name
	var dropdown_2 = d3.select("#json_sources")      // Drop down for participant number
	var dropdown_3 = d3.select("#thread_type")    	 // Drop down for thread type
	var dropdown_4 = d3.select("#classNum") 		 // Drop down for number of classes
	var dropdown_5 = d3.select("#T_Method")
	var dropdown_6 = d3.select("#E_Method")

	//add combobox to select-data
	var scaleType = ["linear", "Cartesian Distortion Filter", "Fisheye Filter"];
	var currScaleType = "linear"
	var type_
	var maxY;
	
	
	
	var w_size = window,
    d_size = document,
    e_size = d_size.documentElement,
    g_size = d_size.getElementsByTagName('body')[0];
	
	d3.select(window).on('resize.updatesvg', updateWindow);


	dropdown_1.on("change", function(){topic_pointer = [0,1,2,3,4,5,6,7,8,9,10]; init(true);});   // Dataset name
	dropdown_2.on("change", function(){           // User No.
		if (source5 != "-UModel-"){topic_pointer = [0,1,2,3,4,5,6,7,8,9,10];}
		init(true);
		});  
	dropdown_3.on("change", function(){init(true);});   // Thread type
	dropdown_4.on("change", function(){topic_pointer = [0,1,2,3,4,5,6,7,8,9,10]; init(true);});   // classNum No.
	dropdown_5.on("change", function(){init(true);});
	dropdown_6.on("change", function(){init(true);});
    
	
	
	controllPanel(); 		     // Initial all checkboxes etc. etc.
	init(true);     			 //trigger json to load

	// ------------------------------------- Initialize data -------------------------------------------
	// ------------------------------------- Initialize data -------------------------------------------
	// ------------------------------------- Initialize data -------------------------------------------

	function controllPanel(){

	// ---------------------------- Draw Markers Check box ----------------------------

	checkbox_datapoints = d3.selectAll("input[name=visibility]")   // Check box for data points
		.style("margin", "0px 10px 0px " + margin.left + "px")
		.style("padding", "0px 0px")
		.attr("position", "relative")

	checkbox_datapoints.on("change", function() {
			if (this.checked) {
				for (var i = 0; i < classIDList.length; i++){           // Draw all dots again
						// Drawing line and points.
						if ((curvethread == 1) & (classInfo[i].length != 0)){
							drawDots2(anotherLine[i], i, classIDList);
							updateWidth();
						}
					}
			} else {
				chart.plotArea.selectAll(".dots").remove();   // Remove are markers in not checked --- not hide
			};
		});
	// ---------------------------- Fillgraph Checkboxe ----------------------------

	checkbox_fillgraph = d3.selectAll("input[name=fillgraph]")    			// Check box for cutting the tails
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
		//	.attr("checked", false);

	// ----------------------------  Macro/Micro Checkbox -----------------------
	checkbox_macro = d3.selectAll("input[name=macroMicro]")   		// Check box for Micro view Macro view
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			.attr("checked", true);
	// -------------------------- Think-aloud Checkbox -----------------------------
	checkbox_think = d3.selectAll("input[name=thinkAloud]")
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			//.attr("checked", true);
		checkbox_think.on("change", function(){
		//saveIt(); 
		if (this.checked){
			evaluation = 1;
			thinkaloud();
		}else{
			evaluation = 0;
			chart.plotArea.selectAll(".thinks").remove();  
		}
		});
	// -------------------------- ProvSegments Checkbox -----------------------------
	checkbox_think = d3.selectAll("input[name=ProvSegments]")
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			.attr("checked", true);
	checkbox_think.on("change", function() {
		if (this.checked) {
			barchart = 1;
			draw_strategy(strategy_windows,original_data);
		}else{
			evaluation = 0;
			chart.plotArea.selectAll(".strategy_boxes").remove(); 
			chart.plotArea.selectAll(".strategy_bars").remove();		
		}
		});

// -------------------------- Icons Checkbox -----------------------------
	checkbox_icons = d3.selectAll("input[name=patternIcons]")
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			.attr("checked", true);
		checkbox_icons.on("change", function() {
			chart.plotArea.selectAll(".pattern_icon").remove();   // Remove are m
			chart.plotArea.selectAll(".wordsBox").remove();   // Remove are markers in not checked --- not hide
			chart.plotArea.selectAll(".words").remove();   // Remove are markers in not checked --- not hide
		if (this.checked) {
			pattern_ = 1;
			if ((topicThreads == 1) | (topicThreads > 2)){
			drawIt();  //if (barchart ==0) 
			}else{
			doIt = 1
			updateInterest()
			}
		} else {
			pattern_ = 0;
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();   //if (barchart ==0) 
			}else{
			doIt = 1
			updateInterest()
			}
		};
	});

    // -------------------------- Search Checkbox -----------------------------
	checkbox_search = d3.selectAll("input[name=search]")
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			.attr("checked", true);
		checkbox_search.on("change", function() {
			chart.plotArea.selectAll(".pattern_icon").remove();   // Remove are markers in not checked --- not hide
			chart.plotArea.selectAll(".wordsBox").remove();   // Remove are markers in not checked --- not hide
			chart.plotArea.selectAll(".words").remove();   // Remove are markers in not checked --- not hide
		if (this.checked) {
			searchInteract = "search"
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		} else {
			searchInteract = ""
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		};
		//filterUpdate();
	});

    // -------------------------- Note Checkbox -----------------------------
	 checkbox_note = d3.selectAll("input[name=note]")   		// Check box
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			//.attr("checked", false);
		checkbox_note.on("change", function() {
			chart.plotArea.selectAll(".pattern_icon").remove();   // Remove are m
			chart.plotArea.selectAll(".wordsBox").remove();   // Remove are markers in not checked --- not hide
			chart.plotArea.selectAll(".words").remove();   // Remove are markers in not checked --- not hide
		if (this.checked) {
			ceartNoteInteract = "createNote"
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		} else {
			ceartNoteInteract = ""
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		};
		//filterUpdate();
	});
    // -------------------------- Open Checkbox -----------------------------
	  checkbox_opens = d3.selectAll("input[name=opens]")   		// Check box for Micro view Macro view
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			//.attr("checked", false);
		checkbox_opens.on("change", function() {
			chart.plotArea.selectAll(".pattern_icon").remove();   // Remove are m
			chart.plotArea.selectAll(".wordsBox").remove();   // Remove are markers in not checked --- not hide
			chart.plotArea.selectAll(".words").remove();   // Remove are markers in not checked --- not hide
		if (this.checked) {
			openDocInteract = "OpenDoc"
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		} else {
			openDocInteract = ""
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		};
		//filterUpdate();
	});
    // -------------------------- Highlight Checkbox -----------------------------
	checkbox_Highlights = d3.selectAll("input[name=Highlights]")   		// Check box for Micro view Macro view
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			.attr("checked", false);
		checkbox_Highlights.on("change", function() {
			chart.plotArea.selectAll(".pattern_icon").remove();   // Remove are m
			chart.plotArea.selectAll(".wordsBox").remove();   // Remove are markers in not checked --- not hide
			chart.plotArea.selectAll(".words").remove();   // Remove are markers in not checked --- not hide
		if (this.checked) {
			highlightInteract = "HighlightTxt"
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		} else {
			highlightInteract = ""
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		};
		//filterUpdate();
	});
    // -------------------------- Notes Checkbox -----------------------------
	checkbox_Notes = d3.selectAll("input[name=Notes]")   		// Check box for Micro view Macro view
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			.attr("checked", false);
		checkbox_Notes.on("change", function() {
			chart.plotArea.selectAll(".pattern_icon").remove();   // Remove are m
			chart.plotArea.selectAll(".wordsBox").remove();   // Remove are markers in not checked --- not hide
			chart.plotArea.selectAll(".words").remove();   // Remove are markers in not checked --- not hide
		if (this.checked) {
			noteInteract = "addNote"
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		} else {
			noteInteract = ""
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
		};
		//filterUpdate();
	});
    // -------------------------- Connection Checkbox -----------------------------
	checkbox_connections = d3.selectAll("input[name=connections]")   		// Check box for Micro view Macro view
			.style("margin", "0px 10px 0px " + margin.left + "px")
			.style("padding", "0px 0px")
			.attr("position", "relative")
			//.attr("checked", false);
	checkbox_connections.on("change", function() {
			chart.plotArea.selectAll(".pattern_icon").remove();   // Remove are m
			chart.plotArea.selectAll(".wordsBox").remove();   // Remove are markers in not checked --- not hide
			chart.plotArea.selectAll(".words").remove();   // Remove are markers in not checked --- not hide
			if (this.checked) {
			connectionInteract = "newConnection"
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
			} else {
			connectionInteract = ""
			if ((topicThreads == 1)| (topicThreads > 2)){
			drawIt();
			}else{
			doIt = 1
			updateInterest()
			}
			};
		});
		
	}

	function init(new_graph){

	 //   ---------------------------- Initait variables -------------------------
		
		// Reading data using dropdown menues
		source1 = dropdown_1.node().options[dropdown_1.node().selectedIndex].value;
		source2 = dropdown_2.node().options[dropdown_2.node().selectedIndex].value;
		source3 = dropdown_3.node().options[dropdown_3.node().selectedIndex].value;
		source4 = dropdown_4.node().options[dropdown_4.node().selectedIndex].value;
		source5 = dropdown_5.node().options[dropdown_5.node().selectedIndex].value;
		source6 = dropdown_6.node().options[dropdown_6.node().selectedIndex].value;
		
		array = JSON.parse("[" + source1 + "]");

		datasetNo = array[0];
		if (source3 == "topicThread") {
		topicThreads = 1;

		}
		else if((source3 == "analysistask")){  // interaction patterns
			topicThreads = 3;
			source3 = "topicThread"; //"topicInterest";
		}
		else if(source3 == "analysistask2") {  // interaction patterns
			topicThreads = 4;
			source3 = "topicThread"; //"topicInterest";
		}
		else if (source3 == "topicInterest"){   // Topic Interest
			source3 = "topicInterest";
			topicThreads = 2;
		}   

		if (source5 == "-UModel-"){
		var jsonfile = "./data/NewIDs" + source5 + "/Dataset_" + array[0] + "/ProvThreads/" + array[1] + "_" + source2 + "_" + source3 + "_" + source4 + ".json"; // .toString()	
		}else{
		var jsonfile = "./data/NewIDs" + source5 + source6 + "/Dataset_" + array[0] + "/ProvThreads/" + array[1] + "_" + source2 + "_" + source3 + "_" + source4 + ".json"; // .toString()
		}
		console.log(jsonfile);

		d3.json(jsonfile, function(error, json){

			if (error){
				console.log("Error loading json file");
				alert("Data for selected participant or configuration is not available!");
				return console.warn(error);
			}else{
				data = [];
				strategy_windows = []
				flyIt = []
				original_data = jQuery.extend(true, [], json);
				
			// ----------------------------- Creat slider/Combobox/FlagButtons only in first run ---------------------
				
				if (init_chart == 1){
					
					init_chart = false
					
					topic_pointer == [0,1,2,3,4,5,6,7,8,9,10];   // restart the topic pointers !
	
					chartWidth = width - margin.left - margin.right;
					chartHeight = height - margin.top - margin.bottom;
					sliderWidth = (width * 0.4) - margin.left - margin.right;
					sliderHeight = 90;
					sliderWidth2 = (width * 0.6) - margin.left - margin.right;
					sliderHeight2 = 90;
					sliderWidth3 = (width * 0.6) - margin.left - margin.right;
					sliderHeight3 = 90;
					new_chartWidth1 = chartWidth;
					new_chartWidth2 = chartWidth;

					make2ndSlider();
					make3rdSlider();
					
					initializeChart();
					createAxes();

					makeWordTags();
				}

				// ------------------------- Read data, Create array of threads ------------------------
				
				makeDynamicArray(topic_pointer, original_data);
				
				drawIt()				

				// ------------------------- Create Axes and etc at every redraw ------------------------
				// -----------------------------Drawing lines for each class -----------------------------------

					new_graph = false;

					if (tags != null) {
						tags.selectAll(".tag").remove();
						tags.selectAll(".wordtag").remove();
						tags.selectAll(".recttag").remove();
					}  
				
					wordTags();
					
					drawIt(); 
					chartWidth =  new_chartWidth1;
					chart.attr("width", new_chartWidth2);
					updateWindow();  
					
					if (evaluation == 1) {thinkaloud();}
					flag = 1;   // a flag to show "done with all drawings"

			}
		});
	}

	function wordTags(){

		
		if (source5 == "-UModel-"){
		var new_jsonfile = "./data/NewIDs" + source5 + "/Dataset_" + array[0] + "/EntitiesList/" + array[1] + "_" + source2 + "_ClassNum" + source4 + ".json"; 
		}else{
		var new_jsonfile = "./data/NewIDs" + source5 + source6 + "/Dataset_" + array[0] + "/EntitiesList/" + array[1] + "_" + source2 + "_ClassNum" + source4 + ".json";
		}


		var count = 0;
		var count1 = 0;
		var each_seg = []
		

		for (var kk=0; kk< source4 ;kk++){    				// source4 is Class number
				oldTagPos = chartWidth/2 - source4*50;
				prevBoxPosX[kk] = (chartWidth/2 - source4*50 ); 
				prevBoxPosY[kk] =  (1 + 10); 
		}

		for (var count_all = 0; count_all < source4; count_all++){
			boundingBox[count_all] = (oldTagPos + count_all*110);
		}

		d3.json(new_jsonfile, function(error, new_json){
			
			// Need to reformat the data
			// Making an array of objects to store more data...
			for (var i = 0; i < new_json.length; i++){
				new_json[i].keyInfo = [];
				for (var j = 0; j < new_json[i].keywords.length; j++){
					new_json[i].keyInfo.push({keyword: new_json[i].keywords[j], prevKey: null, startKey: null});
					new_json[i].keyInfo[new_json[i].keyInfo.length-1].startKey = new_json[i].keyInfo[new_json[i].keyInfo.length-1];
				}
			}

			// sort ing by category...
			for (var i = 0; i < new_json.length; i++){
				// Making the nonArrays arrays
				for (var j = 0; j < new_json[i].keywords.length; j++){
					if (!Array.isArray(new_json[i].keywords[j]))
						new_json[i].keywords[j] = [new_json[i].keywords[j], 3, 0];
				}
				//Temporarily reducing the array to ten...will need to figure out a better solution later...
				new_json[i].allKeywords = new_json[i].keywords;
				var tempTen = new_json[i].keywords.slice(0,9);
				tempTen.sort((a, b)=>{
					if (Array.isArray(a) && Array.isArray(b)){
						return a[1]-b[1];
					} else {return 0;}
				})
				new_json[i].keywords = tempTen.concat(new_json[i].keywords.slice(9, 30));				
			}

				wordtags_width = 150;
				chart.selectAll(".wordLists").remove();
				chart.selectAll(".tag").remove();
				
				wordtags = tags.selectAll("tag")
					.data(new_json).enter().append("g").attr("class", "tag");

				wordList = chart.selectAll(".wordLists")
					.data(new_json).enter().append("g").attr("class", "wordLists");		
				
				wordtags.append("rect")//.selectAll(".recttag-"+i+1)
					.attr("class", function(d,i){return "recttag recttag-"+i;})
					.attr("fill",  function(d,i){return color(topic_pointer[i]);}) //myLightColor[2*i+1];})   // color(i+1)   myColor[i] myLightColor[2 * (d.paintIt) -1 ]
					.attr("opacity", "0.6")  //.attr("fill", color(topic_pointer[singling - 2]))
					.attr("stroke", "none")
				    .attr("rx", 6)
					.attr("ry", 6)
					.attr("x", function(d,i){return (i*160);}) 
					.attr("y", function(d,i){return (1);})
					.attr("width",  function(d,i){return wordtags_width})
					.attr("height",380)
					.attr("transform", "translate( " + tagPos + ", 10)")  //+ margin.left + (width/2 - keywords_width/2 ) +
					.on("mouseover", function(){
						if (singling ==0){

							var me = d3.select(this).attr('class').split("-")[1]
							me = parseInt(me) + 1

							for (var kk=0;kk<10;kk++){
								tags.selectAll(".recttag-"+(kk).toString())
									.attr("fill",  function(d,i){return color(topic_pointer[kk]);}) //myLightColor[2*i+1];})   // color(i+1)   myColor[i] myLightColor[2 * (d.paintIt) -1 ]
									.attr("opacity", "0.6")
									.attr("stroke", "none");

							}

			chart.plotArea.selectAll(".tCurves")
				.style("stroke", "lightgrey")
				// .style("opacity", 1);
			chart.plotArea.selectAll(".t-" + me.toString())
				.style("stroke",function(d){return d.color;})   // function(d){ return myColor[d.paintIt]})
				// .style("opacity", 1.0);
				// .style("stroke-width", thickPathStroke);
				chart.plotArea.selectAll(".class-"+me.toString()).moveToFront();
					}
				})
					.on("mouseout", function(){
					if (singling ==0){
						for (var kk=0;kk<11;kk++){
						chart.plotArea.selectAll(".t-" + kk.toString())
							.style("stroke",function(d){return d.color;})   // function(d){ return myColor[d.paintIt]})
							// .style("opacity", 1.0);
							// .style("stroke-width", pathStroke);
						}
					}
				})
					.on("click", function(){
					if (singling ==0){

					var me = d3.select(this).attr('class').split("-")[1]
					me = parseInt(me) + 1

			chart.plotArea.selectAll(".tCurves")
				.style("stroke", "lightgrey")
				// .style("opacity", 1);

			chart.plotArea.selectAll(".t-" + me.toString())
				.style("stroke",function(d){return d.color;})   // function(d){ return myColor[d.paintIt]})
				// .style("opacity", 1.0);
				// .style("stroke-width", thickPathStroke);

				chart.plotArea.selectAll(".class-"+me.toString()).moveToFront();
					}
				})
					.on("mouseout", function(){
					if (singling ==0){
						for (var kk=0;kk<11;kk++){
						chart.plotArea.selectAll(".t-" + kk.toString())
							.style("stroke",function(d){return d.color;})   // function(d){ return myColor[d.paintIt]})
							// .style("opacity", 1.0);
							// .style("stroke-width", pathStroke);
						}
					}
				})
				.on("click", function(){

					var me = d3.select(this).attr('class').split("-")[1]
					me = parseInt(me) + 1

					chart.plotArea.selectAll(".class-"+me.toString()).moveToFront();

					singling = Number(me) + 1;   

					chart.selectAll(".list").remove();
					
					wordList.append("g")
						.attr("class", "list") 
						.each(function (d,i){
							if (i == singling - 2){
							for (var j = 0; j < 11; j++) {
							if (d.keywords[j]==null)
								continue;
							d3.select(this).append("text")
								.datum(function(){
									var tempp = d.keywords[j] 
									return tempp[0];
								})
								.text(function(){
									var tempp = d.keywords[j] 
									return tempp[0];
								})
								.attr("fill", color(topic_pointer[singling - 2]))
								.attr("dy", ()=> {
									var yP = j ? (2.0*j + 2.0).toString()+"em" : "2.0em";
									return yP;
								})
								.attr("x", 120)
								.attr("text-anchor", "middle")
								.attr("font-size", 22)
								.attr("class", "tspan" + j)
								.on("mouseover", (d2) => {
									var chosenWords = wordtags.selectAll("text").filter((di)=>{
										if (di.substring(0, 6) == d2.substring(0, 6)){
											return true;
										}
									});
									chosenWords.attr("fill", "yellow").attr("font-style", "oblique").attr("font-size", 30);
								})
								.on("mouseout", (d2) => {
									var chosenWords = wordtags.selectAll("text").filter((di)=>{
										if (di.substring(0, 6) == d2.substring(0, 6)){
											return true;
										}
									});
									chosenWords.attr("fill", "black").attr("font-style", "normal").attr("font-size", 18);
								});
							}}})
						.attr("transform", "translate( " + (chartWidth+25) + ", 20)");

						justClicked = 1
						for (var kk=0;kk<11;kk++){
							tags.selectAll(".recttag-"+(kk-1).toString())
								.attr("fill", "lightgrey") 
								.attr("opacity","0.5")
								.attr("stroke", "none");
						}
							tags.selectAll(".recttag-"+(singling-2).toString())
								//.attr("fill", function(d,i){return myLightColor[2*(singling) -3];})
								.attr("fill",  function(d,i){return color(topic_pointer[singling-2]);}) //myLightColor[2*i+1];})   // color(i+1)   myColor[i] myLightColor[2 * (d.paintIt) -1 ]
								.attr("opacity", "0.6")
								.attr("stroke", "none");

						timer = setTimeout(function(){
						singling = Number(me) + 1;
						drawBoxes(classInfo,me)
						hoverSegLines(true, me,1);
						clearTimeout(timer);
					}, 1);

				})
					.call(d3.drag()
				        .on("start", dragstarted)
				        .on("drag", box_dragged)
				        .on("end", dragended));

				// ------------------------------- Text word tags --------------------------------
				wordtags.append("g")
					.attr("class", function(d,i){return "wordtag wordtag-"+i;})
					.each(function (d,i) {
						// ---- Keywords from number 0 to 10 -----------
						for (var j = 0; j < 10; j++) {
						if (d.keywords[j]==null)
							continue;
						d3.select(this).append("text")
							.datum(function(){
								var tempp = d.keywords[j]
								return tempp[0];
								})
							.text(function(){
								var tempp = d.keywords[j]
								return tempp[0];
								})
							.attr("fill", "black")
							.attr("dy", ()=> {
								var yP = j ? (1.8*j + 1.8).toString()+"em" : "1.8em";
								return yP;
							})
							
							.attr("x", i * 160 + 75)
							.attr("text-anchor", "middle")
							.attr("font-size", 18)
							.attr("class", "tspan-" + j)
							.on("mouseover", (d2) => {
								var chosenWords = wordtags.selectAll("text").filter((di)=>{
									if (di.substring(0, 3) == d2.substring(0, 3)){
										return true;
									}
								});
								chosenWords.attr("fill", "yellow").attr("font-style", "oblique").attr("font-size", 20);
							})
							.on("mouseout", (d2) => {
								var chosenWords = wordtags.selectAll("text").filter((di)=>{
									if (di.substring(0, 3) == d2.substring(0, 3)){
										return true;
									}
								});
								chosenWords.attr("fill", "black").attr("font-style", "normal").attr("font-size", 18);
								wordtags.selectAll(".tspan2").attr("fill", "none")
							});
					}
					// ---- Keywords from number 11 to end -----------
					for (var j = 10; j < 20; j++) {
						if (d.keywords[j]==null)
							continue;
						d3.select(this).append("text")
								.datum(function(){
								var tempp = d.keywords[j]
								return tempp[0];
								})
							.text(function(){
								var tempp = d.keywords[j]
								return tempp[0];
								})
							.attr("fill", "none")
							.attr("dy", ()=> {
								var yP = 10 ? (1.8*10 + 1.8).toString()+"em" : "1.8em";
								return yP;
							})
							.attr("x", i * 110 + 50)
							.attr("text-anchor", "middle")
							.attr("font-size", 18)
							.attr("class", "tspan2")
							.on("mouseover", (d2) => {
								var chosenWords = wordtags.selectAll("text").filter((di)=>{
									if (di.substring(0, 3) == d2.substring(0, 3)){
										return true;
									}
								});
								chosenWords.attr("fill", "yellow").attr("font-style", "oblique").attr("font-size", 20);
							})
							.on("mouseout", (d2) => {
								var chosenWords = wordtags.selectAll("text").filter((di)=>{
									if (di.substring(0, 3) == d2.substring(0, 3)){
										return true;
									}
								});
								chosenWords.attr("fill", "none").attr("font-style", "normal").attr("font-size", 18);
							});
					}
					})
					.attr("transform", "translate( " + tagPos + ", 10)") 
					.on("mouseover", function(){
					if (singling ==0){

					var me = d3.select(this).attr('class').split("-")[1]
					me = parseInt(me) + 1

			chart.plotArea.selectAll(".tCurves")
				.style("stroke", "lightgrey")
				// .style("opacity", 1);

			chart.plotArea.selectAll(".t-" + me.toString())
				.style("stroke",function(d){return d.color;})   // function(d){ return myColor[d.paintIt]})
				// .style("opacity", 1.0);

				chart.plotArea.selectAll(".class-"+me.toString()).moveToFront();
					}
				})
					.on("mouseout", function(){
					if (singling ==0){
						for (var kk=0;kk<11;kk++){
						chart.plotArea.selectAll(".t-" + kk.toString())
							.style("stroke",function(d){return d.color;})   // function(d){ return myColor[d.paintIt]})
							// .style("opacity", 1.0);
							// .style("stroke-width", pathStroke);
						}
					}
				})
					.on("click", function(){

					var me = d3.select(this).attr('class').split("-")[1]
					me = parseInt(me) + 1

				chart.plotArea.selectAll(".class-"+me.toString()).moveToFront();
				// Only move links to front if related to clicked class
				chart.plotArea.selectAll(".links").filter(function(d){
				if (d.source.classNum == me)
						return this;
				}).moveToFront();

				singling = Number(me) + 1;         // Thread number = "id" + 1


					justClicked = 1
					for (var kk=0;kk<11;kk++){
						tags.selectAll(".recttag-"+(kk-1).toString())
							.attr("fill", "lightgrey")
							.attr("opacity","0.5")
							.attr("stroke", "none");
					}
						tags.selectAll(".recttag-"+(singling-2).toString())
							//.attr("fill", function(d,i){return myLightColor[2*(singling) -3];})
							.attr("fill",  function(d,i){return color(topic_pointer[singling-2]);}) //myLightColor[2*i+1];})   // color(i+1)   myColor[i] myLightColor[2 * (d.paintIt) -1 ]
							.attr("opacity", "0.6")
							.attr("stroke", "none");

					timer = setTimeout(function(){
					singling = Number(me) + 1;
					drawBoxes(classInfo,me)
					hoverSegLines(true, me,1);
					clearTimeout(timer);
				}, 1);

				});
					
		});

			updateWidth();

	}

	function draw_strategy(strategy_windows, original_data){

		chart.plotArea.selectAll(".strategy_boxes").remove(); 
		chart.plotArea.selectAll(".strategy_bars").remove(); 
		
		var len = strategy_windows.length;
		
		strategy_boxes = chart.plotArea.selectAll("strategy_boxes")
					.data(strategy_windows).enter().append("g").attr("class", "strategy_boxes");

			strategy_boxes.append("rect")
					.attr("class", "strategy_boxes")
					.attr("fill",  function(d,i){if (d[2] > 0) { return "blue";}else{return "red";}}) 
					.style("fill-opacity", function(d,i){if (i % 2 > 0) { return "0.2";}else{return "0.05"}})
					.attr("stroke", "black")
					//.style("stroke-dasharray", ("10	, 10"))
				    .attr("rx", 2)
					.attr("ry", 2)
					.attr("x", function(d){ return chart.xScale(d[0] * timeStep);}  )
					.attr("y", function(d){ 10; })  
					.attr("width",  function(d){ return chart.xScale(Math.abs(d[1] - d[0]) * timeStep)})  
					.attr("height", function(d){ return 10});  
			chart.plotArea.selectAll(".strategy_boxes").moveToBack();

	}

	function makeArray(data){

    classInfo = [];
	classLinks = [];
	anotherLine = [];
	classIDList = [];
	endData = [];
    maxY = 0 ;

		classIDList.length=0;

				// If array size one with one object
				for (var i = 0; i < data.length; i++){
					if (data[i].ClassNum.length == null){
						data[i].ClassNum = [data[i].ClassNum];
					}


					data[i].classID = [];
					// Trying to get a list of class nums...
					for (var k = 0; k < data[i].ClassNum.length; k++){
						data[i].classID.push(data[i].ClassNum[k]);
						if (classIDList.length == 0) {
							classIDList.push(data[i].classID[k]);
						} else if (classIDList.filter(function(d) {return d == data[i].classID[k];}).length == 0){
							classIDList.push(data[i].classID[k]);
						} else {
						}
					}
				}

				classIDList.sort(function(a, b) {
				return a - b;
				});
				for (var i = 0; i < classIDList[0]; i++){
					classIDList.unshift(i);
				}

				// Sorting the class arrays by time. json
				data.sort(function(a, b) {
					return a.Time - b.Time;
				});

				// If class numbers were larger than classNum array, then push missing (removed!) classes
				if (classIDList.length < Math.max.apply(null, classIDList) + 1){
					for (var cc = 0; cc < Math.max.apply(null, classIDList) + 1; cc++){
						   if (classIDList[cc] != 0) {classIDList.push(cc) }
					}
				}

				dataXRange.min = 0; 
				dataXRange.max = (data[data.length - 2].Time + 1000) * timeStep;  // (data[data.length - 1].Time - data[0].Time) * timeStep * 1.10;

				// -------------------------- Initializing classInfo array. -----------------------------
				for (var i = 0; i < classIDList.length; i++){
					classInfo.push([]);
					anotherLine.push([]);
					myColor.push([]);
				}

				for (var i = 0; i < 2*classIDList.length; i++){
					myLightColor.push(Lightcolor(i));
				}

				// ---------------------------- Putting data in classInfo array! ---------------------------
				for (var i = 0; i < data.length; i++){
					var y = 0.0001;
					var prevY = 0;
					var timeBefore = 0;
					var beingRead = false;
					var currClass = data[i].ClassNum[0];

					// Making sure the array of arrays is properly initialized
					if (classInfo[data[i].ClassNum[0]] == null){
						console.log('Array does not include this class.', data[i].ClassNum[0], classInfo[data[i].ClassNum[0]]);
						return;
					}

					      //  ---------------------- Not a Link -------------------------

					if (data[i].InteractionType != linkDocs){  					// If that data is not a link.
						y = data[i].stepHeight;   						// Getting the interaction y-value.
						 
						    //  ------------------------ First DATA Point -------------------------
							//  ---------------------- All other data points -------------------------

							y = data[i].stepHeight;  // This is using the previous class interaction type as the jump base.
							y_temp = classInfo[currClass][classInfo[currClass].length-1].yPos;

							if (y < 0){	y = y  * magicNumber;}   // Interest Threads
							y = y_temp + y  		// new y
							if (y < 0){y = 0.001}    // No negative threads
							if (y > maxY){maxY = y;}   //Update max Yaxis value

							timeBefore = classInfo[currClass][classInfo[currClass].length-1].Time;
							prevY = classInfo[currClass][classInfo[currClass].length-1].yPos;
						
						// -------------- Pushing all other into classInfo array.
						last_point = data[i].Time;
						var ind = classInfo[currClass].push({
							Time : data[i].Time,
							yPos : y,
							InteractionType: data[i].InteractionType,
							prevTime: timeBefore,
							yPrev : prevY,
							classNum : data[i].ClassNum[0],
							DocNum : data[i].DocNum,
							tags : data[i].tags,
							stepHeight: data[i].stepHeight,
							myColor1: data[i].ClassNum[0]

						});
						anotherLine[currClass].push();             // push to curvy lines
					} else {
						//  --------------------------  IS A LINK -------------------------
						// Finding out which class is higher in value.
						var classNum_ = new Array(2);
						classNum_[0] = classInfo[data[i].ClassNum[0]].length >= 1 ? classInfo[data[i].ClassNum[0]][classInfo[data[i].ClassNum[0]].length-1] : null;
						classNum_[1] = classInfo[data[i].ClassNum[1]].length >= 1 ? classInfo[data[i].ClassNum[1]][classInfo[data[i].ClassNum[1]].length-1] : null;
						var greaterClassNum = ((classNum[0] != null ? classNum[0].yPos : 0)  > (classNum[1] != null ? classNum[1].yPos : 0)) ? 0 : 1;
						var otherClassNum = greaterClassNum == 0 ? 1 : 0;
// ---------------------------------------------------------------------------------------------------------------

						// Filling in the information.
					if (classNum_[1] == null) {classNum_[1] = classNum_[0];}
					if (classNum_[0] == null) {classNum_[0] = classNum_[1];}
						y = classNum_[greaterClassNum].stepHeight;
						prevY = classNum_[greaterClassNum].yPos;
						y = y + prevY;

						timeBefore = classNum_[greaterClassNum].Time;
						var linkPrevTime = data[i].Time;
						var linkPrevY = 0;
						if (classNum_[otherClassNum] != null){
							linkPrevTime = classNum_[otherClassNum].Time;
							linkY = classNum_[otherClassNum].stepHeight;     
							linkPrevY = classNum_[otherClassNum].yPos;  
							linkY = linkY + linkPrevY;
						}
						// Redundant.
						// Pushing into classInfo array.
						var sourceData = classInfo[data[i].ClassNum[otherClassNum]].push({
							Time : data[i].Time,
							yPos : linkY,
							InteractionType: data[i].InteractionType,
							prevTime: linkPrevTime,
							yPrev : linkPrevY,
							classNum : data[i].ClassNum[otherClassNum],
							DocNum : data[i].DocNum,
							tags : data[i].tags,
							stepHeight: data[i].stepHeight,
							myColor1: data[i].ClassNum[0]
						});
						var targetData = classInfo[data[i].ClassNum[greaterClassNum]].push({
							Time : data[i].Time,
							yPos : y,
							InteractionType: data[i].InteractionType,
							prevTime: timeBefore,
							yPrev : prevY,
							classNum : data[i].ClassNum[greaterClassNum],
							DocNum : data[i].DocNum,
							tags : data[i].tags,
							stepHeight: data[i].stepHeight,
							myColor1: data[i].ClassNum[0]
						});
						classLinks.push({source: classInfo[data[i].ClassNum[otherClassNum]][sourceData-1], target: classInfo[data[i].ClassNum[greaterClassNum]][targetData-1]});
					}            //  -------------------------- Done with all data points -------------------------
				}

                                //  ---------------------------- Push the last Point ------------------------------
				var yHeights = []

				for (var i = 0; i < classIDList.length; i++){   // Add it to all classes
					endData.push([]);
					if (classInfo[i].length >= 1){ 	// Adding a node at the end for each class at the same time.

						var y = classInfo[i][classInfo[i].length - 1].yPos;
						yHeights.push(y);
					if (curvethread == 0){
						classInfo[i][classInfo[i].length - 1].Time += 3 / timeStep;
					}
					if (topicThreads == 1) { 
						y_ = y;
						time_ = data[data.length - 1].Time;
						}
						else{     // last_point for Interest threads
						y_ = 0;

						time_ = data[data.length - 1].Time  + 20;    // End point 
						}              											   // Connect in to the ground
						var timeBefore = classInfo[i][classInfo[i].length - 1].Time;
						var ind = endData[i].push({
							Time : time_,
							yPos : y_,
							InteractionType: "END",
							prevTime: timeBefore,
							yPrev : y,
							classNum : data[i].ClassNum[0],
							DocNum : data[i].DocNum,
							tags : data[i].tags,
							stepHeight: data[i].stepHeight,
							myColor1: data[i].ClassNum[0]
						});
						classInfo[i].push(endData[i][0]);
					}
				}
				dataYRange.max = maxY;


				// ----------------------------- Lazy Curves ---------------------

				for (var i = 0; i < classIDList.length; i++){
					for (var j = 0; j < classInfo[i].length; j++){
						if (classInfo[i][j] == null)
							continue;
						classInfo[i][j].yPosi = chart.yScale(classInfo[i][j].yPos);
						classInfo[i][j].xPosi = chart.xScale((classInfo[i][j].Aa ) * timeStep);
					}
				}

				classIDText = []
				for (var i = 0; i < classIDList.length; i++){
					if (classInfo[i].length == 0)
						continue;
					var y = classInfo[i][classInfo[i].length - 1].yPos;
					classIDText.push("Topic " + i);
				}


	}

	function makeDynamicArray(topic_pointer,original_data){

		var raw_data = jQuery.extend(true, [], original_data);
		classIDList.length=0;
		var time_array = []
		var data_temp = []
	
				// If array size one with one object
				for (var i = 0; i < raw_data.length; i++){

					// --------------------- Topic Threads ----------------------
					// --------------------- Analysis task ----------------------
					// --------------------- Analysis task2 ---------------------
                    if ((topicThreads ==1) | (topicThreads > 2)){
						if (raw_data[i].ClassNum.length == 1){
							raw_data[i].ClassNum[0] =  topic_pointer[raw_data[i].ClassNum[0] -1] + 1;
							data_temp.push(raw_data[i])
						}else{
							raw_data[i].ClassNum[0] = topic_pointer[raw_data[i].ClassNum[0] -1] + 1;
							raw_data[i].ClassNum[1] = topic_pointer[raw_data[i].ClassNum[0] -1] + 1;
							data_temp.push(raw_data[i])
						}
					// -------------------- Interest Threads --------------------
					
					}else if (topicThreads == 2){
						
						//   ----- for non-link data points ------
								// ---- Positive steps ----
								if (raw_data[i].stepHeight > 0){

											// ---- if pointer is different from the class Number ----
									if (raw_data[i].ClassNum[0] !=  topic_pointer[raw_data[i].ClassNum[0] -1] + 1){
										raw_data[i].ClassNum[0] =  topic_pointer[raw_data[i].ClassNum[0] -1] + 1;
										if (raw_data[i].ClassNum.length > 1){raw_data[i].ClassNum[1] = raw_data[i].ClassNum[0];} //topic B is same as A
										data_temp.push(raw_data[i]);  			  // Push it in new data array
										for (var kk = i - 11; kk< i + 11; kk++){  // ---- It's negarive companies steps ----

												var kkk = kk
												if (kkk < 0) { kkk = 0;
												} else if (kkk > raw_data.length - 1){
												kkk = raw_data.length - 1;}

											if ((raw_data[kkk].Time == raw_data[i].Time) & (raw_data[kkk].stepHeight < 0)) {   // if neighbors are same time and negative
												if (raw_data[kkk].ClassNum[0] !=  topic_pointer[raw_data[i].ClassNum[0] -1] + 1) {
													// Multiply by number of same class# in pointer then push
													data_temp.push(raw_data[kkk]);   // push if pointer is the same as actual class
												}
											}
										}
									}else{  // ---- right pointer (Positive pointer) -----
										data_temp.push(raw_data[i]);  			  // Push it in new data array
										for (var kk = i - 11; kk< i + 11; kk++){  // ---- It's negarive companies steps ----

												var kkk = kk
												if (kkk < 0) { kkk = 0;
												} else if (kkk > raw_data.length - 1){
												kkk = raw_data.length - 1;}

											if ((raw_data[kkk].Time == raw_data[i].Time) & (raw_data[kkk].stepHeight < 0)) {   // if neighbors are same time and negative
												if (raw_data[kkk].ClassNum[0] ==  topic_pointer[raw_data[kkk].ClassNum[0] -1] + 1) {
													// Multiply by number of same class# in pointer then push
													data_temp.push(raw_data[kkk]);   // push if pointer is the same as actual class
												}
											}
										}
									}
								}else{    // ---- Negative steps ----
								}

					}
				}
				
				
				// -------------- Run the analysis ---------------------


				if (topicThreads < 3) { 		 // -- Topic threads -or- Interest Threads  --
					dataPoints(data_temp);
				}
				if (topicThreads == 4){
					data = [];
					strategy_windows = []
					flyIt = []

					var temp_array = Analysistask2(data_temp);
					
					
					var data_temp_temp = temp_array[0]
					strategy_windows = temp_array[1]
					flyIt = strategy_windows;
					dataPoints(data_temp_temp)
					if (barchart == 1) draw_strategy(strategy_windows,original_data)
					
				}
				if (topicThreads == 3) {
					data = [];
					strategy_windows = []
					flyIt = []

					var temp_array = Analysistask(data_temp);
					var data_temp_temp = temp_array[0]
					strategy_windows = temp_array[1]
					flyIt = strategy_windows;
					dataPoints(data_temp_temp)
					if (barchart == 1) draw_strategy(strategy_windows,original_data)

				}
	}

	function dataPoints(data_temp){

    classInfo = [];
	classLinks = [];
	classIDList = [];

	endData = [];
    maxY = 0 ;

	classIDList.length=0;


				for (var i = 0; i < data_temp.length; i++){
					
					if (data_temp[i].ClassNum.length == null){
						data_temp[i].ClassNum = [data_temp[i].ClassNum];
					}

					if ( (data_temp[i].ClassNum[0] == 0)){   // eliminate any topic 0 interaction!
						data_temp[i].ClassNum = [1]
					}
					if ( (data_temp[i].ClassNum[0] == 0) | (data_temp[i].ClassNum == null)){   // eliminate any topic 0 interaction!
						data_temp[i].ClassNum = [1]
					}
					data_temp[i].classID = [];
					
					// Trying to get a list of class nums...
					for (var k = 0; k < data_temp[i].ClassNum.length; k++){
						data_temp[i].classID.push(data_temp[i].ClassNum[k]);
						if (classIDList.length == 0) {
							classIDList.push(data_temp[i].classID[k]);
						} else if (classIDList.filter(function(d) {return d == data_temp[i].classID[k];}).length == 0){
							classIDList.push(data_temp[i].classID[k]);
						} else {
							//data_temp[i].ClassNum[k] = classIDList.indexOf(data_temp[i].classID[k]);
						}
					}

				}

				classIDList = [];

				for (var ii = 0; ii < 10 + 1; ii++){   // Class number
				classIDList.push(ii)
				}

				classIDList.sort(function(a, b) {
				return a - b;
				});
				for (var i = 0; i < classIDList[0]; i++){
					classIDList.unshift(i);
				}

				// Sorting the class arrays by time. json
				data_temp.sort(function(a, b) {
					return a.Time - b.Time;
				});

				dataXRange.min = 0;
				dataXRange.max = (data_temp[data_temp.length - 1].Time + 3000) * timeStep; 
				// -------------------------- Initializing classInfo array. -----------------------------

				for (var ii = 0; ii < 10 + 1; ii++){   // Class number
					classInfo.push([]);
					myColor.push([]);
				}
				for (var ii = 0; ii < 2*classIDList.length; ii++){
					myLightColor.push(Lightcolor(ii));
				}

				// ---------------------------- Putting data_temp in classInfo array! ---------------------------
				for (var i = 0; i < data_temp.length; i++){
					var y = 0.0001;
					var prevY = 0;
					var timeBefore = 0;
					var beingRead = false;
					// If any class zero exists!
					if (classInfo[data_temp[i].ClassNum[0]] == null){
						data_temp[i].ClassNum = [1];
					}
					// If negative time exists!
					if (data_temp[i].Time < 0){
						data_temp[i].Time = 0;
					}

					var currClass = data_temp[i].ClassNum[0];

					// Making sure the array of arrays is properly initialized
					if (classInfo[data_temp[i].ClassNum[0]] == null){
						console.log('Array does not include this class.', data_temp[i].ClassNum[0], classInfo[data_temp[i].ClassNum[0]]);
						alert("Array does not include this class!", data_temp[i] 	);
						return;
					}

					      //  ---------------------- Not a Link -------------------------

					if (data_temp[i].InteractionType != linkDocs){  					// If that data_temp is not a link.
						y = data_temp[i].stepHeight;   						// Getting the interaction y-value.

							y = data_temp[i].stepHeight;  // This is using the previous class interaction type as the jump base.

							if (classInfo[currClass].length < 1){ 			// If the first in the array for that class.
							y_temp = 0;
							y = 0
							}else{
							y_temp = classInfo[currClass][classInfo[currClass].length-1].yPos;
							
							if (y < 0){y = y  * magicNumber;}   // Interest Threads
							y = y_temp + y  		// new y
							if (y < 0){y = 0.001}    // No negative threads
							if (y > maxY){maxY = y;}   //Update max Yaxis value
							}
							
							
							
							if (classInfo[currClass].length < 1){ 			// If the first in the array for that class.
							timeBefore = data_temp[i].Time - 2;
							prevY = 0;
							}else{
							timeBefore = classInfo[currClass][classInfo[currClass].length-1].Time;	
							prevY = classInfo[currClass][classInfo[currClass].length-1].yPos;
							}
							
						// -------------- Pushing all other into classInfo array.
						last_point = data_temp[i].Time;
						var ind = classInfo[currClass].push({
							Time : data_temp[i].Time,
							yPos : y,
							InteractionType: data_temp[i].InteractionType,
							prevTime: timeBefore,
							yPrev : prevY,
							classNum : data_temp[i].ClassNum[0],
							DocNum : data_temp[i].DocNum,
							tags : data_temp[i].tags,
							stepHeight: data_temp[i].stepHeight,
							myColor1: data_temp[i].ClassNum[0]

						});
					} else {
						//  --------------------------  IS A LINK -------------------------
						// Finding out which class is higher in value.
						var classNum_ = new Array(2);
						classNum_[0] = classInfo[data_temp[i].ClassNum[0]].length >= 1 ? classInfo[data_temp[i].ClassNum[0]][classInfo[data_temp[i].ClassNum[0]].length-1] : null;
						classNum_[1] = classInfo[data_temp[i].ClassNum[1]].length >= 1 ? classInfo[data_temp[i].ClassNum[1]][classInfo[data_temp[i].ClassNum[1]].length-1] : null;
						var greaterClassNum = ((classNum[0] != null ? classNum[0].yPos : 0)  > (classNum[1] != null ? classNum[1].yPos : 0)) ? 0 : 1;
						var otherClassNum = greaterClassNum == 0 ? 1 : 0;

						// Filling in the information.

					if (classNum_[1] == null) {classNum_[1] = classNum_[0];}
					if (classNum_[0] == null) {classNum_[0] = classNum_[1];}
						y = classNum_[greaterClassNum].stepHeight;       // new
						prevY = classNum_[greaterClassNum].yPos;  //new
						y = y + prevY;

						timeBefore = classNum_[greaterClassNum].Time;
						var linkPrevTime = data_temp[i].Time;
						var linkPrevY = 0;
						if (classNum_[otherClassNum] != null){
							linkPrevTime = classNum_[otherClassNum].Time;
							linkY = classNum_[otherClassNum].stepHeight;       // new
							linkPrevY = classNum_[otherClassNum].yPos;  //new
							linkY = linkY + linkPrevY;
						}
						// Redundant.
						// Pushing into classInfo array.
						var sourceData = classInfo[data_temp[i].ClassNum[otherClassNum]].push({
							Time : data_temp[i].Time,
							yPos : linkY, 
							InteractionType: data_temp[i].InteractionType,
							prevTime: linkPrevTime,
							yPrev : linkPrevY,
							classNum : data_temp[i].ClassNum[otherClassNum],
							DocNum : data_temp[i].DocNum,
							tags : data_temp[i].tags,
							stepHeight: data_temp[i].stepHeight,
							myColor1: data_temp[i].ClassNum[0]
						});
						var targetData = classInfo[data_temp[i].ClassNum[greaterClassNum]].push({
							Time : data_temp[i].Time,
							yPos : y,
							InteractionType: data_temp[i].InteractionType,
							prevTime: timeBefore,
							yPrev : prevY,
							classNum : data_temp[i].ClassNum[greaterClassNum],
							DocNum : data_temp[i].DocNum,
							tags : data_temp[i].tags,
							stepHeight: data_temp[i].stepHeight,
							myColor1: data_temp[i].ClassNum[0]
						});
						classLinks.push({source: classInfo[data_temp[i].ClassNum[otherClassNum]][sourceData-1], target: classInfo[data_temp[i].ClassNum[greaterClassNum]][targetData-1]});
					}            //  -------------------------- Done with all data_temp points -------------------------
				}

                                //  ---------------------------- Push the last Point ------------------------------
				var yHeights = []

				for (var i = 0; i < 11; i++){  // Add it to all classes
					endData.push([]);
					if (classInfo[i].length >= 1){ 	// Adding a node at the end for each class at the same time.

						var y = classInfo[i][classInfo[i].length - 1].yPos;
						yHeights.push(y);
					if (curvethread == 0){
						classInfo[i][classInfo[i].length - 1].Time += 3 / timeStep;
					}
					if (topicThreads == 1) { // last_point for topic threads

						y_ = y;
						time_ = data_temp[data_temp.length - 1].Time; //data_temp[data_temp.length - 1].Time + data_temp[0].Time + 20;   // dataXRange.max / (timeStep) + data_temp[0].Time
						}
						else{     // last_point for Interest threads
						y_ = 0;

						time_ = data_temp[data_temp.length - 1].Time  + 20;    // End point 
						}              										   // Connect in to the ground
						var timeBefore = classInfo[i][classInfo[i].length - 1].Time;
						var ind = endData[i].push({
							Time : time_,
							yPos : y_,
							InteractionType: "END",
							prevTime: timeBefore,
							yPrev : y,
							classNum : data_temp[i].ClassNum[0],
							DocNum : data_temp[i].DocNum,
							tags : data_temp[i].tags,
							stepHeight: data_temp[i].stepHeight,
							myColor1: data_temp[i].ClassNum[0]
						});
						classInfo[i].push(endData[i][0]);
					}
				}
				dataYRange.max = maxY;


				// ----------------------------- Lazy Curves ---------------------
				for (var i = 0; i < classIDList.length; i++){
					for (var j = 0; j < classInfo[i].length; j++){
						if (classInfo[i][j] == null)
							continue;
						classInfo[i][j].yPosi = chart.yScale(classInfo[i][j].yPos);
						classInfo[i][j].xPosi = chart.xScale((classInfo[i][j].Aa ) * timeStep);
					}
				}

				classIDText = []
				for (var i = 0; i < classIDList.length; i++){
					if (classInfo[i].length == 0)
						continue;
					var y = classInfo[i][classInfo[i].length - 1].yPos;
					classIDText.push("Topic " + i);
				}

	}

	function Analysistask2(new_data){

		var jsondata = jQuery.extend(true, [], new_data);

        for (var res =0; res < 5; res ++){
			totLength = jsondata.length
			var analysisData = [];
			var inFrame; 	 	    // current inetraction numebr in the time frame
			var framEnd;         // last interaction number in the time frame
			var soFar = []; 	   	// Keeps interactions exist in the tiem fram
			var soFar2 = [0,0,0,0,0,0,0,0,0,0,0];
			var myClass_ = [1]     // current LDA class in the frame, use it to end the task
			var myTime_ = [1];        
			var e_point;
			var s_point = 0;
			var e_point2;
			var s_point2 = 0;
			var startegy_mat = [];
			var oldI = 0;
			
			for (var i = 0; i < totLength - 1; i++){   // check all user interactions
				soFar = [0,0,0,0,0,0,0,0,0,0,0];   // storing capacity for all possible topics
					
				if (jsondata[i].ClassNum[0] == jsondata[i+1].ClassNum[0]){   // if next topic is the same, Jump!
					soFar[jsondata[i].ClassNum[0]] = soFar[jsondata[i].ClassNum[0]] + parseInt(jsondata[i].stepHeight)
					soFar2[jsondata[i].ClassNum[0]] = soFar2[jsondata[i].ClassNum[0]] + parseInt(jsondata[i].stepHeight)
				}else{
					// ------- if next topic is different ----------
					soFar[jsondata[i].ClassNum[0]] = soFar[jsondata[i].ClassNum[0]] + parseInt(jsondata[i].stepHeight)
					soFar2[jsondata[i].ClassNum[0]] = soFar2[jsondata[i].ClassNum[0]] + parseInt(jsondata[i].stepHeight)
			
						// Switch from counting interactions to measuring time. 
						var magicNumber_3 = 1
						for (var count = 0 ; count < 100; count++){

							if (i+count > totLength - 2){
								count = count - 2;
								if (jsondata[i+count].Time > jsondata[i].Time + magicNumber_2*600) { magicNumber_3 = count;}
								count = 1010;   // jump out!
							}else if ( (jsondata[i+count].Time > jsondata[i].Time + magicNumber_2*600)){  
								magicNumber_3 = count;
								count = 1010;   // jump out!
							}else if (( (jsondata[i+count+1].ClassNum[0] != jsondata[i].ClassNum[0]) | (jsondata[i+count+1].ClassNum[0] != jsondata[i+count].ClassNum[0])) & (jsondata[i+count].InteractionType == "search")){  // 
								magicNumber_3 = count;
								if (count > 1) magicNumber_3 = count -2;
								count = 1010;   // jump out!
							}
						}

						framEnd = i + magicNumber_3;   
						if (framEnd > totLength - 2) { framEnd = totLength - 2; }

						for (var j = 1 ; j < (magicNumber_3 + 1) ; j++){       // start checking all in the frame size and accumulate soFar setep heights!
							inFrame = i+j;     								 // last point to check
							if (inFrame > (totLength - 1)) {inFrame = totLength - 2;}
							soFar[jsondata[inFrame].ClassNum[0]] = soFar[jsondata[inFrame].ClassNum[0]] + parseInt(jsondata[inFrame].stepHeight);    // Sum up stepHeights in each class
							soFar2[jsondata[inFrame].ClassNum[0]] = soFar2[jsondata[inFrame].ClassNum[0]] + parseInt(jsondata[inFrame].stepHeight);    // Sum up stepHeights in each class
						}

					for (var ii = 0; ii < 11 ; ii++) {     						// checking class 1 to 10
						if (Math.max.apply(null, soFar) ==  soFar[ii]){          // largest compoent
							if (ii != jsondata[i].ClassNum[0]){

									for (var jj = oldI ; jj < (i + 1) ; jj++){           // Turn all in the frame to the Dominant = Original topic!
										jsondata[jj].ClassNum[0] = ii; 				// largers stepHeight
											if (jsondata[jj].ClassNum.length > 1) { jsondata[jj].ClassNum[1] = ii;}     // largers stepHeight
										analysisData.push(jsondata[jj]);
										soFar2[jsondata[jj].ClassNum[0]] = soFar2[jsondata[jj].ClassNum[0]] + parseInt(jsondata[jj].stepHeight);    // Sum up stepHeights in each class
									}

									fake = {
										"DocNum": "Topic Change",
										"tags": [],
										"ClassNum": [jsondata[i].ClassNum[0]],   // close the last segment 
										"stepHeight": -10000,
										"Time": jsondata[i+1].Time - 20,   //  "Time": jsondata[i].Time + 20, after the last sample 
										"Duration": 20,
										"InteractionType": "fake1"
									}
									analysisData.push(fake)
									e_point = jsondata[i+1].Time;   // End point of the last strategy rect
									startegy_mat.push([s_point, e_point, soFar2[jsondata[i].ClassNum[0]]]);
									soFar2 = [0,0,0,0,0,0,0,0,0,0,0];

									// change class num to the dominant class!
									
									for (var fake_counter = 1; fake_counter < 11; fake_counter++){
										if (fake_counter != jsondata[i].ClassNum[0]){  // make all other classes zero! including the new segment! 
											fake = {
												"DocNum": "Topic Change",
												"tags": [],
												"ClassNum": [fake_counter], 
												"stepHeight": -10000,
												"Time": jsondata[i+1].Time - 30, 
												"Duration": 20,
												"InteractionType": "fake2"
											}
											analysisData.push(fake)
											s_point = jsondata[i+1].Time; 
										}
									}
									
							 }else{    // Now draw the new segment ! 
								
								for (var jj = oldI ; jj < (i + 1) ; jj++){    
										jsondata[jj].ClassNum[0] = jsondata[i].ClassNum[0]; // = ii   	// largers stepHeight
										if (jsondata[jj].ClassNum.length > 1) { jsondata[jj].ClassNum[1] = jsondata[i].ClassNum[0];} 	     // largers stepHeight
										analysisData.push(jsondata[jj])

								}
									
								for (var jj = i+1 ; jj < (framEnd + 1) ; jj++){           // Turn all in the frame to the Dominant = Original topic!
								jsondata[jj].ClassNum[0] = jsondata[i].ClassNum[0]; 		// largers stepHeight
									if (jsondata[jj].ClassNum.length > 1) { jsondata[jj].ClassNum[1] = jsondata[i].ClassNum[0];} 	     // largers stepHeight
								analysisData.push(jsondata[jj])
								soFar[jsondata[jj].ClassNum[0]] = soFar[jsondata[jj].ClassNum[0]] + parseInt(jsondata[jj].stepHeight)

								}

									var fake = {
									"DocNum": "Topic Change",
									"tags": [],
									"ClassNum": [jsondata[framEnd].ClassNum[0]],
									"stepHeight": -10000,
									"Time": jsondata[framEnd+1].Time - 20,  // "Time": jsondata[framEnd].Time + 20 , after the last sample
									"Duration": 20,
									"InteractionType": "fake3"
									}
									analysisData.push(fake);
									e_point = jsondata[framEnd+1].Time;   // End point of the last strategy rect
									startegy_mat.push([s_point, e_point,soFar2[jsondata[framEnd].ClassNum[0]]]);
									soFar2 = [0,0,0,0,0,0,0,0,0,0,0];

									for (var fake_counter = 1; fake_counter < 11; fake_counter++){
										if (fake_counter != jsondata[framEnd].ClassNum[0]){
									var fake = {
									"DocNum": "Topic Change",
									"tags": [],
									"ClassNum": [fake_counter],
									"stepHeight": -10000,
									"Time": jsondata[framEnd+1].Time - 20,  
									"Duration": 20,
									"InteractionType": "fake4"
									}
									analysisData.push(fake)
									s_point = jsondata[framEnd+1].Time;
										}
									}

								if (framEnd > totLength) { framEnd = totLength - 1; }
								i = framEnd;   // jump to next new segment!
							}

							ii= 11;    // jump out!
						}
					}
					oldI = i+1;
				}
			}
	  }

	return [analysisData,startegy_mat]
	}

	function Analysistask(new_data){

		var jsondata = jQuery.extend(true, [], new_data);
		for (var res =0; res < 5; res ++){
			totLength = jsondata.length
			var analysisData = []; //  = [jsondata.length];
			var inFrame; 	 	    // current inetraction numebr in the time frame
			var framEnd;        		 // last interaction number in the time frame
			var soFar = []; 	   	// Keeps interactions exist in the tiem fram
			var soFar2 = [0,0,0,0,0,0,0,0,0,0,0];
			var myClass_ = [1]     // current LDA class in the frame, use it to end the task
			var myTime_ = [1];        // current time in task frame ?
			var e_point;
			var s_point = 0;
			var e_point2;
			var s_point2 = 0;
			var startegy_mat = [];

			for (var i = 0; i < totLength - 1; i++){   // check all user interactions
				soFar = [0,0,0,0,0,0,0,0,0,0,0]; 	  // Storing capacity for all possible topics

				if (jsondata[i].ClassNum[0] == jsondata[i+1].ClassNum[0]){   // if next topic is the same, Jump!
					analysisData.push(jsondata[i])
					soFar[jsondata[i].ClassNum[0]] = soFar[jsondata[i].ClassNum[0]] + parseInt(jsondata[i].stepHeight)
					soFar2[jsondata[i].ClassNum[0]] = soFar2[jsondata[i].ClassNum[0]] + parseInt(jsondata[i].stepHeight)
				}else{                               // ------- if next topic is different ----------
						analysisData.push(jsondata[i]) 

						soFar[jsondata[i].ClassNum[0]] = soFar[jsondata[i].ClassNum[0]] + parseInt(jsondata[i].stepHeight)
						soFar2[jsondata[i].ClassNum[0]] = soFar2[jsondata[i].ClassNum[0]] + parseInt(jsondata[i].stepHeight)
					
					
						// Switch from counting interactions to measuring time. 

						magicNumber_3 = 1
						for (var count = 0 ; count < 100; count++){

							if (i+count > totLength - 2){
								count = count - 2;
								if ( jsondata[i+count].Time > jsondata[i].Time + magicNumber_2*600){ magicNumber_3 = count;}
								count = 1010;
							}else if ( jsondata[i+count].Time > jsondata[i].Time + magicNumber_2*600){
								magicNumber_3 = count;
								count = 1010;
							}else if (( (jsondata[i+count+1].ClassNum[0] != jsondata[i].ClassNum[0]) | (jsondata[i+count+1].ClassNum[0] != jsondata[i+count].ClassNum[0])) & (jsondata[i+count].InteractionType == "search")){  // 
								magicNumber_3 = count;
								if (count > 1) magicNumber_3 = count - 1;
								count = 1010;   // jump out!
							}
						}

						framEnd = i + magicNumber_3;
						if (framEnd > totLength - 2) { framEnd = totLength - 2; }

						for (var j = 1 ; j < (magicNumber_3 + 1) ; j++){       // start checking all in the frame size and accumulate soFar setep heights!
							inFrame = i+j;       // last point to check
							if ( inFrame > totLength - 1 ) {inFrame = totLength - 1;}
							soFar[jsondata[inFrame].ClassNum[0]] = soFar[jsondata[inFrame].ClassNum[0]] + parseInt(jsondata[inFrame].stepHeight)    // Sum up stepHeights in each class
							soFar2[jsondata[inFrame].ClassNum[0]] = soFar2[jsondata[inFrame].ClassNum[0]] + parseInt(jsondata[inFrame].stepHeight)    // Sum up stepHeights in each class
						}

					for (var ii = 0; ii < 11 ; ii++) {     // checking class 1 to 10
						if (Math.max.apply(null, soFar) ==  soFar[ii]){          // largest compoent

							if (ii != jsondata[i].ClassNum[0]) {
								fake = {
									"DocNum": "Topic Change",
									"tags": [],
									"ClassNum": [jsondata[i].ClassNum[0]],   //  before the first sample
									"stepHeight": -10000,
									"Time": jsondata[i+1].Time - 20,  
									"Duration": 20,
									"InteractionType": "fake1"
								}
								analysisData.push(fake)
								e_point = jsondata[i+1].Time;   // End point of the last strategy rect

								startegy_mat.push([s_point, e_point, soFar2[jsondata[i].ClassNum[0]]]);
								soFar2 = [0,0,0,0,0,0,0,0,0,0,0];

								
								for (var fake_counter = 1; fake_counter < 11; fake_counter++){
										if (fake_counter != jsondata[i].ClassNum[0]){
								fake = {
									"DocNum": "Topic Change",
									"tags": [],
									"ClassNum": [fake_counter], 
									"stepHeight": -10000,
									"Time": jsondata[i+1].Time - 20, 
									"Duration": 20,
									"InteractionType": "fake2"
								}
								analysisData.push(fake)
								s_point = jsondata[i+1].Time; 
								}
								}

							 }else{

								for (var jj = i+1 ; jj < (framEnd + 1) ; jj++){           // Turn all in the frame to the Dominant = Original topic!
								jsondata[jj].ClassNum[0] = jsondata[i].ClassNum[0]; // = ii   	// largers stepHeight
									if (jsondata[jj].ClassNum.length > 1) { jsondata[jj].ClassNum[1] = jsondata[i].ClassNum[0];} 	     // largers stepHeight
								analysisData.push(jsondata[jj])
								soFar[jsondata[jj].ClassNum[0]] = soFar[jsondata[jj].ClassNum[0]] + parseInt(jsondata[jj].stepHeight)
								soFar2[jsondata[jj].ClassNum[0]] = soFar2[jsondata[jj].ClassNum[0]] + parseInt(jsondata[jj].stepHeight)
								}

									var fake = {
									"DocNum": "Topic Change",
									"tags": [],
									"ClassNum": [jsondata[framEnd].ClassNum[0]], 
									"stepHeight": -10000,
									"Time": jsondata[framEnd+1].Time - 20 ,  // after the last sample
									"Duration": 20,
									"InteractionType": "fake3"
									}
									analysisData.push(fake);
									e_point = jsondata[framEnd+1].Time ;   // End point of the last strategy rect

									startegy_mat.push([s_point, e_point,soFar2[jsondata[framEnd].ClassNum[0]]]);
									soFar2 = [0,0,0,0,0,0,0,0,0,0,0];

									for (var fake_counter = 1; fake_counter < 11; fake_counter++){
										if (fake_counter != jsondata[framEnd].ClassNum[0]){
									var fake = {
									"DocNum": "Topic Change",
									"tags": [],
									"ClassNum": [fake_counter], 
									"stepHeight": -10000,
									"Time": jsondata[framEnd+1].Time - 20,  
									"Duration": 20,
									"InteractionType": "fake4"
									}
									analysisData.push(fake)
									s_point = jsondata[framEnd+1].Time;
										}
									}
								//}

								if (framEnd > totLength) { framEnd = totLength - 1; }
								i = framEnd;   // jump to next new segment!
							}
							ii= 11;    // jump out!
						}
					}
				}
			}
		}
		return [analysisData,startegy_mat];
	}

	function updateWindow(){
		var chart_x = w_size.innerWidth || e_size.clientWidth || g_size.clientWidth;
		chartWidth = chart_x - margin.left - margin.right;
		chart.attr("width", chart_x);
		tags.attr("width", chart_x);
		new_chartWidth1 = chartWidth;
		new_chartWidth2 = chart_x;
		
		zoom.translateExtent([[0, -Infinity], [chartWidth, Infinity]])
		
		updateWidth();
		
	}
	
	function zoomed() {
		  var xz = d3.event.transform.rescaleX(xScale_zoom);
		  xGroup.call(chart.xAxis.scale(xz));
		 
		chart.plotArea.selectAll(".tCurves")
			.attr("d", function link(d) {
				var ySource = chart.yScale(d.source.y);
				var yTarget = chart.yScale(d.target.y);
				var xSource = xz(d.source.x);
				var xTarget = xz(d.target.x);					
				var endDist = Math.abs((xTarget - xSource) * 0.05);
				var endDist2 = Math.abs((yTarget - ySource) * 0.1);

				if (yTarget > ySource) {   // -------------------- Raising edge -----------------------
					return "M" + xSource + "," + ySource
				+ "C" + (3*endDist + xTarget) + "," + (ySource)
				+ " " + (3*endDist + xTarget) + "," + (ySource + 3*endDist2)
				+ " " + (2*endDist + xTarget) + "," + (yTarget - 3*endDist2)
				+ "S" + (1*endDist + xTarget) + "," + (yTarget - 1*endDist2)
				+ " " + xTarget + "," + yTarget;
				}else{    //----------------- Falling edge -----------------
					return "M" +  xSource + "," + ySource
				+ "C" + (xSource - 1*endDist) + "," + (ySource + endDist2)
				+ " " + (xSource - 2*endDist) + "," + (yTarget + 3*endDist2)
				+ " " + (xSource - 3*endDist) + "," + (yTarget + 2*endDist2)
				+ "S" + (xSource - 4*endDist) + "," + (yTarget)
				+ " " + xTarget + "," + yTarget;
				}
			})
			.attr("opacity", function(d){
						
						if ((xz(d.source.x)) == 0){
							// console.log(xz(d.source.x))
							return 0;
						}else if ((xz(d.target.x)) == 2056){
							return 0;
						}else{
							return 1;
						}
					});
				
			chart.plotArea.selectAll(".pattern_icon") 
					.attr("x", function(d){
					 return xz(d.target.x) - 20/2;   // icon svg size
					})
					.attr("opacity", function(d){
						if ((xz(d.target.x)) == 0){
							return 0;
						}else if ( xz(d.target.x) == 2056){
							return 0;
						}else{
							// console.log(xz(d.target.x))
							return 1;
						}
					});

	}
				
	function initializeChart() {

		chart = d3.select("#chartDiv").append("svg")
			.attr("width", width + textRoom)
			.attr("height", height);

		chart.plotArea = chart.append("g")
			.attr("pointer-events", "all")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			chart.plotArea.on("mousemove", function() {
			var mousePos = d3.mouse(this);
			chart.xMarker.attr("transform", "translate(" + (mousePos[0] - 7) + ", " + 0 + ")");
			d3.selectAll(".timeLine").attr("transform", "translate(" + (mousePos[0]) + ", " + 0 + ")");
			chart.xMarker.selectAll("text").text("Time: " + chart.xScale.invert(mousePos[0]).toFixed(2));
			});
			
			chart.plotArea.on("mousemove", function() {
			justClicked = 0

			var mousePos = d3.mouse(this);
			var time1 = chart.xScale.invert(mousePos[0])
			chart.xMarker.attr("transform", "translate(" + (mousePos[0] - 7) + ", " + 0 + ")");
			d3.selectAll(".timeLine").attr("transform", "translate(" + (mousePos[0] ) + ", " + 0 + ")");
			if (60*(time1 - Math.floor(time1)) > 9) {
			chart.xMarker.selectAll("text").text("Time: " + Math.floor(time1) + ":" + (60*(time1 - Math.floor(time1))).toFixed());
			}else{
			chart.xMarker.selectAll("text").text("Time: " + Math.floor(time1) + ":0" + (60*(time1 - Math.floor(time1))).toFixed());
			}
			
			})
			.on("click", function(d){   // Cancel singling
				if (justClicked ==0){

				if (singling > 0 ){
					hoverSegLines(2, 0,0);    // singling cancel
					if (topicThreads == 3){
						chart.plotArea.selectAll(".words")
							.style("opacity", function(d){
								if (d.isSel){return 1;} else {return 0;}
							});
						chart.plotArea.selectAll(".wordsBox")
							.style("opacity", function(d){
								if (d.isSel){return .3} else {return 0;}
							})
					}
					singling = 0;
					chart.selectAll(".hover_boxes").remove();
					for (var kk =0; kk<10;kk++){
						tags.selectAll(".recttag-"+(kk).toString())
							.attr("fill",  function(d,i){return color(topic_pointer[kk]);}) 
							.attr("opacity", "0.6")
							.attr("stroke", "none");
					}
					}
				}
			});

		zoom = d3.zoom()
					.scaleExtent([1, 10])
					.translateExtent([[0, -Infinity], [width, Infinity]])
					.on("zoom", zoomed);
					
		
		zoomRect = chart.append("rect")
			.attr('class', 'zoom_rect')
			.attr("width", width)
			.attr("height", height)
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.call(zoom)
			.on("mouseout", function(d){   // Cancel singling
				if (singling == 0){
					for (var kk =0; kk<10;kk++){
						tags.selectAll(".recttag-"+(kk).toString())
							.attr("fill",  function(d,i){return color(topic_pointer[kk]);})
							.attr("opacity", "0.6")
							.attr("stroke", "none");
					}
				}
			})
			.on("mousemove", function() {
			var mousePos = d3.mouse(this);
			chart.xMarker.attr("transform", "translate(" + (mousePos[0] - 7 - margin.left -2 ) + ", " + 0 + ")");
			d3.selectAll(".timeLine").attr("transform", "translate(" + (mousePos[0] - margin.left - 2) + ", " + 0 + ")");
			chart.xMarker.selectAll("text").text("Time: " + chart.xScale.invert(mousePos[0]).toFixed(2));
			});
			
			chart.selectAll(".zoom_rect").moveToBack();

	}
	
	window.saveIt = function(){
				
		if (flyIt == null) {
			alert("No segments for this provenance!");
			return console.warn(error);
		}
		var data = [];	    
		var data2 = [];
		
		if (source5 == "-UModel-"){
			var new_jsonfile = "./data/NewIDs" + source5 + "/Dataset_" + array[0] + "/UserInteractions/" + array[1] + "_" + source2 + "_InteractionsLogs.json"; // .toString()
		}else{
			var new_jsonfile = "./data/NewIDs" + source5 + source6 + "/Dataset_" + array[0] + "/UserInteractions/" + array[1] + "_" + source2 + "_InteractionsLogs.json"; // .toString()
		}

		var count = 0;	
		var count1 = 0;	
		var ref = []
		var seg_num = 0

		d3.json(new_jsonfile, function(error, new_json){

			new_json.forEach(function(d){
				
				if (d.InteractionType == "Topic_change" ) {   // find the topic change event times
						
						seg_num = seg_num + 1;
						if (d.ID == "bottom-up"){
							ref.push([d.time,0, seg_num]); 	  //  0: bottom-up
						}else if(d.ID == "top-down"){
							ref.push([d.time,1, seg_num]);	  // 1: top-down						
						}
					}
				});
		
		if (ref == []) {
			alert("No segments for this think-aloud!");
			return console.warn(error);
		}
		var next_count = 0
		var next_duration_mean = 0
		var next_ = 0;
		var next_seg = [];
		
		data2.push(["Segment Length","Top-down" ,"Bottom-up","User ID"]);         // Top-down and Bottom-up segments behavior 
		
		for (var i=0; i<ref.length; i++){
			var this_ref = ref[i];
			var next_ref = [];
			var next_next_ref = [];
			var count = 0;			
			var duration_mean = 0;
			count = next_count + count;
			next_count = 0;
			duration_mean = duration_mean + next_duration_mean;
			next_duration_mean = 0;
			
			if (i == (ref.length -1)){
				next_ref[0] = 95 * 600;  		// maximum time
			}else{
				next_ref = ref[i+1];  		// next ref time
			}
			if (i >= (ref.length -2)){
				next_next_ref[0] = 95 * 600;  		// maximum time
			}else{
				next_next_ref = ref[i+2];  		// next ref time
			}
			
			for (var j=0; j<flyIt.length ;j++){   // Count it!
				this_seg = flyIt[j];   			 
				var duration_ = this_seg[1] - this_seg[0];  	  
				if ( (this_seg[0] >= this_ref[0]) & (this_seg[1] < next_ref[0]) ) {
					if (duration_ > 50) count++;
				}else if ( (this_seg[0] >= this_ref[0]) & (this_seg[0] < next_ref[0]) & ( (next_ref[0] - this_seg[0]) > duration_/2) ) {
					if (duration_ > 50) count++;
				}else if ( (this_seg[0] >= this_ref[0]) & (this_seg[0] < next_ref[0]) & ( (next_ref[0] - this_seg[0]) < duration_/2) ){
					if (duration_ > 50) next_count++;
				}else if ( (this_ref[2] == 1) & (this_seg[0] < this_ref[0]) ){
					if (duration_ > 50) count++;
				}								
			}

			if (next_ == 1) {
				next_seg[2] = count;
				data.push(next_seg); 			
				next_ = 0;
			}

			for (var j=0; j<flyIt.length ;j++){   // Apply it!
				this_seg = flyIt[j];   			  // 		
				var duration_ = this_seg[1] - this_seg[0];  	 
				if ( (this_seg[0] >= this_ref[0]) & (this_seg[1] < next_ref[0]) ) {
					if (duration_ > 50) {
						data.push([duration_/10,this_ref[1], count,this_ref[2]]);
						duration_mean = duration_mean + duration_/10;
					}
				}else if ( (this_seg[0] >= this_ref[0]) & (this_seg[0] < next_ref[0]) & (this_seg[1] < next_next_ref[0]) & ( (next_ref[0] - this_seg[0]) > duration_/2) ) {
					if (duration_ > 50) {
						data.push([duration_/10,this_ref[1], count,this_ref[2]]);
						duration_mean = duration_mean + duration_/10;
					}
				}else if ( (this_seg[0] >= this_ref[0]) & (this_seg[0] < next_ref[0]) & (this_seg[1] < next_next_ref[0]) & ( (next_ref[0] - this_seg[0]) < duration_/2) ) {
					if (duration_ > 50) {
						next_seg = [duration_/10,next_ref[1], count,next_ref[2]];
					    next_ = 1;
						next_duration_mean = duration_/10;
					}
					
				}else if ( (this_seg[0] >= this_ref[0]) & (this_seg[0] < next_ref[0]) & (this_seg[1] > next_next_ref[0]) & ( (next_ref[0] - this_seg[0]) < duration_/2) ) {
					duration_mean = duration_mean + duration_/10;
				}else if ( (this_ref[2] == 1) & (this_seg[0] < this_ref[0]) ){
					if (duration_ > 50) {
						data.push([duration_/10,this_ref[1], count,this_ref[2]]);
						duration_mean = duration_mean + duration_/10;
					}
				}					
			}
			
			if (this_ref[1] == 0){
				data2.push([duration_mean/count,,count,array[1]+"_"+source2]); 
			}else{
				data2.push([duration_mean/count,count,,array[1]+"_"+source2]);
			}
		}
		
		
		var csvContent = "data:text/csv;charset=utf-8,";
		data2.forEach(function(infoArray, index){		
			   dataString = infoArray.join(",");
			   csvContent += index < data2.length ? dataString+ "\n" : dataString;
		}); 
		
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", array[1]+"_"+source2+"_"+source5+"_"+ magicNumber_2 + "_" + source4 + "_Segments_Length.csv");
		document.body.appendChild(link);    // Required for FF

		link.click(); 
		
		
		});		
	}
	
	window.saveIt2 = function(){
		
		if (flyIt == null){
			alert("No segments for this provenance!");
			return console.warn(error);
		}
		var data = [];	    		
		
		if (source5 == "-UModel-"){
			var new_jsonfile = "./data/NewIDs" + source5 + "/Dataset_" + array[0] + "/UserInteractions/" + array[1] + "_" + source2 + "_InteractionsLogs.json"; // .toString()
		}else{
			var new_jsonfile = "./data/NewIDs" + source5 + source6 + "/Dataset_" + array[0] + "/UserInteractions/" + array[1] + "_" + source2 + "_InteractionsLogs.json"; // .toString()
		}

		var count = 0;										
		var count1 = 0;										
		var ref = []
		var seg_num = 0

		d3.json(new_jsonfile, function(error, new_json){

			new_json.forEach(function(d){
				
				if (d.InteractionType == "Topic_change" ) {   // find the topic change event times
						
						
						if (d.ID == "bottom-up"){        // don't count "break" segments! 
							seg_num = seg_num + 1;
							ref.push([d.time,0, seg_num]); 	  //  0: bottom-up
						}else if(d.ID == "top-down"){
							seg_num = seg_num + 1;
							ref.push([d.time,1, seg_num]);	  // 1: top-down						
						}
					}
				});
		
		if (ref == []) {
			alert("No segments for this think-aloud!");
			return console.warn(error);
		}
		var next_count = 0
		var next_ = 0;
		var next_seg = [];
		
		data.push(["Segment Length","Accuracy"]);         // Top-down and Bottom-up segments behavior 
		
		for (var i=0; i<ref.length; i++){
			var this_ref = ref[i];
			var next_ref = [];
			var next_next_ref = [];
			var count = 0;			
			count = next_count + count;
			next_count = 0;
			if (i == (ref.length -1)){
				next_ref[0] = 95 * 600;  		// maximum time
			}else{
				next_ref = ref[i+1];  		// next ref time
			}
			if (i >= (ref.length -2)){
				next_next_ref[0] = 95 * 600;  		// maximum time
			}else{
				next_next_ref = ref[i+2];  		// next ref time
			}
				
			for (var j=0; j<flyIt.length ;j++){   // Count it!
				this_seg = flyIt[j];   			 
				var duration_ = this_seg[1] - this_seg[0];  
				if ( (this_seg[0] >= this_ref[0]) & (this_seg[1] < next_ref[0]) ) {
					if (duration_ > 50) count++;
				}else if ( (this_seg[0] >= this_ref[0]) & (this_seg[0] < next_ref[0]) & ( (next_ref[0] - this_seg[0]) > duration_/2) ) {
					if (duration_ > 50) count++;
				}else if ( (this_seg[0] >= this_ref[0]) & (this_seg[0] < next_ref[0]) & ( (next_ref[0] - this_seg[0]) < duration_/2) ){
					if (duration_ > 50) next_count++;
				}else if ( (this_ref[2] == 1) & (this_seg[0] < this_ref[0]) ){
					if (duration_ > 50) count++;
				}								
			}

			if (next_ == 1) {
				next_seg[1] = count;
				data.push(next_seg); 			
				next_ = 0;
			}

			for (var j=0; j<flyIt.length ;j++){   // Apply it!
				this_seg = flyIt[j];   			  // 		
				var duration_ = this_seg[1] - this_seg[0];  
				if ( (this_seg[0] >= this_ref[0]) & (this_seg[1] < next_ref[0]) ) {
					if (duration_ > 50) data.push([duration_, 1]);
				}else if ( (this_seg[0] >= this_ref[0]) & (this_seg[0] < next_ref[0]) & (this_seg[1] < next_next_ref[0]) ) { 
					var temp = Math.abs( ( Math.abs(next_ref[0] - this_seg[0]) - Math.abs(next_ref[0] - this_seg[1]) ) /  duration_)  
					var temp2 = Math.abs( ( Math.abs(next_ref[0] - this_seg[0]) + Math.abs(next_ref[0] - this_seg[1]) ) /  duration_) 
					if (duration_ > 50) {data.push([duration_, temp]);}
				}else if ( (this_seg[0] >= this_ref[0]) & (this_seg[0] < next_ref[0]) & (this_seg[1] > next_next_ref[0]) ) {  
					if (duration_ > 50) data.push([duration_, 0]);
				}else if ( (this_ref[2] == 1) & (this_seg[0] < this_ref[0]) ){
					var temp = Math.abs( ( Math.abs(this_ref[0] - this_seg[0]) - Math.abs(this_ref[0] - this_seg[1]) ) /  duration_)  
					var temp2 = Math.abs( ( Math.abs(this_ref[0] - this_seg[0]) + Math.abs(this_ref[0] - this_seg[1]) ) /  duration_) 
					if (duration_ > 50) {data.push([duration_, temp]);}
				}					
			}
		}
		var tot_acc = 0
		var tot_time = 0
		data.forEach(function(d, i){
			if (i > 0){
				tot_acc = tot_acc + (d[0] * d[1]);
				tot_time = tot_time + d[0];
			}
		}); 
		
		data.push([(tot_time/10), (tot_acc / tot_time)*100, flyIt.length])   // calculate the maximum! 
		
		var csvContent = "data:text/csv;charset=utf-8,";
			data.forEach(function(infoArray, index){
			   dataString = infoArray.join(",");
			   csvContent += index < data.length ? dataString+ "\n" : dataString;
		}); 
		
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", array[1]+"_"+source2+"_"+source5+"_"+ magicNumber_2 + "_" + source4 + "_Segmentation_Error.csv");
		document.body.appendChild(link); 								// Required for FF

		link.click(); 
		});	
	
	}

	function makeWordTags(){

		tags = d3.select("#WordListsDiv").append("svg")
			.attr("width", width + textRoom) 
			.attr("height",keywords_Height) 
			.attr("transform", "translate( " + margin.left + ", 0)")
			.on("click", function(d){   // Cancel singling

				if (justClicked ==0){

				if (singling > 0 ){
					hoverSegLines(2, 0,0);    // singling cancel
					if (topicThreads == 3){
						chart.plotArea.selectAll(".words")
							.style("opacity", function(d){
								if (d.isSel){return 1;} else {return 0;}
							});
						chart.plotArea.selectAll(".wordsBox")
							.style("opacity", function(d){
								if (d.isSel){return .3} else {return 0;}
							})
					}
					singling = 0;
					chart.selectAll(".hover_boxes").remove();
					for (var kk =0; kk<10;kk++){
						tags.selectAll(".recttag-"+(kk).toString())
							.attr("fill",  function(d,i){return color(topic_pointer[kk]);}) 
							.attr("opacity", "0.6")
							.attr("stroke", "none");
						}
					}
				}
				justClicked = 0
			});


	}

	
	function updateWidth(){
               // ------------------------ xScale --------------------------------


		xScale_zoom = chart.xScale
			.domain([dataXRange.min , dataXRange.max])
			.range([0, chartWidth]);


		chart.xAxis.scale(chart.xScale);

		xGroup = chart.xAxisGroup
			.call(chart.xAxis);

		chart.xLabel
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + margin.top + margin.bottom - axisFont / 2 - 10) + ")");

		chart.selectAll(".zoom_rect")
		.attr("width", chartWidth + textRoom );
		
		chart.selectAll(".zoom_rect").moveToBack();
			
			
		chart.yScale
			.domain([dataYRange.min + 0.01, dataYRange.max])
			.range([chartHeight, 0.01]);
		
		chart.yAxis.scale(chart.yScale);

		chart.yAxisContainer
			.call(chart.yAxis);

		chart.plotArea.selectAll(".links")
			.attr("x1", function(d){ return chart.xScale((d.source.Time) * timeStep) }) 
			.attr("x2", function(d){ return chart.xScale((d.target.Time) * timeStep) });

		chart.plotArea.selectAll(".dots")
				.attr("cx", function(d, i) {
				return chart.xScale((d.Time) * timeStep); 
				});

		chart.plotArea.selectAll(".strategy_boxes")
			 .attr("x", function(d){ return chart.xScale(d[0] * timeStep);} )
			 .attr("width",  function(d){ return chart.xScale((d[1] - d[0]) * timeStep)});

		chart.selectAll(".list")
			 .attr("transform", "translate( " + (chartWidth+25) + ", 10)");

			chart.plotArea.selectAll(".links")
			.attr("y1", function(d){
				return  chart.yScale(d.source.yPos)
			})
			.attr("y2", function(d){ return  chart.yScale(d.target.yPos) });

		chart.plotArea.selectAll(".dots")
			.attr("cy", function(d, i) {
					return chart.yScale(d.yPos);
			});
			// ------------------------------------- Keywords and boxes ---------------------------------------
			
			tagPos = chartWidth/2 - source4*50;

			for (var count_all = 0; count_all < source4; count_all++){   
			    boundingBox[count_all] = (tagPos + count_all*110);
	        }

			for (var kk = 0; kk<source4; kk++){   
				var newBoxPosX_ = prevBoxPosX[kk] + tagPos - oldTagPos;
				prevBoxPosX[kk] = newBoxPosX_;    
				d3.selectAll(".recttag-" + kk.toString()).attr("transform", "translate( " + newBoxPosX_ + "," + prevBoxPosY[kk]+ " )");
				d3.selectAll(".wordtag-"+kk.toString()).attr("transform", "translate( " + newBoxPosX_ + "," + prevBoxPosY[kk]+ " )");

				newBoxPosX_ = newBoxPosX_ + 110*kk;
				boundingBox[kk] = newBoxPosX_;

		    }

			oldTagPos =  tagPos;

			chart.plotArea.selectAll(".flag")
				.attr("cx", function(d, i) {
				return chart.xScale(d.Time);
				});
 		
			chart.plotArea.selectAll(".tCurves")
				.attr("d", function link(d) {
				var ySource = chart.yScale(d.source.y);
				var yTarget = chart.yScale(d.target.y);
				var xSource = chart.xScale(d.source.x);
				var xTarget = chart.xScale(d.target.x);					
				var endDist = Math.abs((xTarget - xSource) * 0.05);
				var endDist2 = Math.abs((yTarget - ySource) * 0.1);

				if (yTarget > ySource) {   			// -------------------- Raising edge -----------------------
					return "M" + xSource + "," + ySource
				+ "C" + (3*endDist + xTarget) + "," + (ySource)
				+ " " + (3*endDist + xTarget) + "," + (ySource + 3*endDist2)
				+ " " + (2*endDist + xTarget) + "," + (yTarget - 3*endDist2)
				+ "S" + (1*endDist + xTarget) + "," + (yTarget - 1*endDist2)
				+ " " + xTarget + "," + yTarget;
				}else{    //----------------- Falling edge -----------------
					return "M" +  xSource + "," + ySource
				+ "C" + (xSource - 1*endDist) + "," + (ySource + endDist2)
				+ " " + (xSource - 2*endDist) + "," + (yTarget + 3*endDist2)
				+ " " + (xSource - 3*endDist) + "," + (yTarget + 2*endDist2)
				+ "S" + (xSource - 4*endDist) + "," + (yTarget)
				+ " " + xTarget + "," + yTarget;
				}
			})
			.attr("stroke-width", function link(d) {
					if ((d.target.y < 0.1) & (d.source.y < 0.1)){
						return 1; 				
					}else{
						return pathStroke; 				
					}		
			})
			.attr("opacity", function(d){
			
			if ((chart.xScale(d.source.x)) == 0){
				// console.log(xz(d.source.x))
				return 0;
			}else if ((chart.xScale(d.target.x)) == 2056){
				return 0;
			}else{
				return 1;
			}
			});
		
		chart.plotArea.selectAll(".words")
			.attr("dx", function(d){
				return chart.xScale(d.target.x);
			});
		chart.plotArea.selectAll(".wordsBox")
			.attr("x", function(d){
				return chart.xScale(d.target.x) - 100 /2 ;   // Tooltips box size
			});
		chart.plotArea.selectAll(".pattern_icon")
			.attr("x", function(d){
				return chart.xScale(d.target.x) - 20/2;   // icon svg size
			});

		chart.plotArea.selectAll(".pattern_icon")
			 .attr("y", function(d, i){
				return chart.yScale(d.target.y);
			  });

		chart.plotArea.selectAll(".talks")
			.attr("x", function(d){
				return chart.xScale(d.time * timeStep);   // icon svg size
			});

		chart.plotArea.selectAll(".thinks")
			.attr("x", function(d){return chart.xScale(d.time * timeStep);})
			.attr("width", function(d){return chart.xScale(d.width * timeStep);});
	}

	function createAxes() {

		chart.rightArrow = chart.plotArea.append("svg:defs")
			.append("svg:marker")
			.attr("id", "arrow")
			.attr("refX", -1.5)
			.attr("refY", 5)
			.attr("markerWidth", 10)
			.attr("markerHeight", 10)
			.attr("markerUnits", "userSpaceOnUse")
			.attr("orient", "auto")
			.append("svg:path")
			.style("fill", "blue")
			.attr("d", "M0,0 L0,10 L10,5 z");
		// Arrowhead Pointing Right
		// Trying to figure out how to access via variable.
		chart.rightArrow = chart.plotArea.append("svg:defs")
			.append("svg:marker")
			.attr("id", "arrow")
			.attr("refX", -1.5)
			.attr("refY", 5)
			.attr("markerWidth", 10)
			.attr("markerHeight", 10)
			.attr("markerUnits", "userSpaceOnUse")
			.attr("orient", "auto")
			.append("svg:path")
			.style("fill", "blue")
			.attr("d", "M0,0 L0,10 L10,5 z");

		// Arrowhead Pointing Left
		chart.plotArea.append("svg:defs")
			.append("svg:marker")
			.attr("id", "arrowLeft")
			.attr("refX", 8)
			.attr("refY", 5)
			.attr("markerWidth", 10)
			.attr("markerHeight", 10)
			.attr("markerUnits", "userSpaceOnUse")
			.attr("orient", "auto")
			.append("svg:path")
			.style("fill", "black")
			.attr("d", "M0,5 L8,10 L10,0 z");

		// x axis
		chart.xScale = d3.scaleLinear()
			.clamp(true)
			.domain([dataXRange.min, dataXRange.max])  
			.range([0, chartWidth]);

		chart.xAxis = d3.axisBottom(chart.xScale);

		chart.xAxisContainer = chart.append("g")
			.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")");
		chart.xAxisGroup = chart.xAxisContainer.append("g")
			.attr("class", "x axis scatter-xaxis")
			.call(chart.xAxis);

		// x axis header labela
		chart.xLabel = chart.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", axisFont + "px")
			.style("font-weight", "bold")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + margin.top + margin.bottom - (axisFont / 2) - 10) + ")")
			.text(xAxisLabelHeader);

		chart.xMarker = chart.xAxisContainer.append("g");

		chart.xMarker
			.append("text")
			.attr("text-anchor", "middle")
			.attr("text-align", "center")
			.attr("transform", "translate(" + 0 + ", " + 30 + ")")
			.style("font-size", "12px")
			.text("Time: 0 min");

		d3.xml("./styles/timer.svg").mimeType("image/svg+xml").get(function(error, xml) {
		   if (error) throw error;
		   var svgElem = chart.xMarker.node().appendChild(xml.documentElement);
			 d3.select(svgElem)
					.attr("height", 20)
					.attr("width", 15)
					.attr("preserveAspectRatio", "xMinYMid meet")
					.attr("transformOrigin", "left")
					.style("text-align", "left")
					.style("margin", 0);
		});

		chart.plotArea.append("g").attr("class", "timeLine").append("line")
			.attr("x1", 0)
			.attr("x2", 0)
			.attr("y0", 0)
			.attr("y1", chartHeight)
			.style("fill", "none")
			.style("stroke-dasharray", ("10, 10"))
			.style("stroke-width", 2)
			.style("opacity", .3)
			.style("stroke", "red");

		// y axis labels
			chart.yScale = d3.scaleLinear();
		
		chart.yScale
			.domain([dataYRange.min + 0.01, dataYRange.max])
			.range([chartHeight, 0.01])
			.clamp(true);

		chart.yAxis = d3.axisLeft(chart.yScale);

		chart.yAxisContainer = chart.append("g")
			.attr("class", "y axis scatter-yaxis")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
			.call(chart.yAxis);

		// y axis header label
		chart.yLabel = chart.append('text')
			.style("font-size", axisFont + "px")
			.attr("class", "heatmap-yaxis")
			.attr("text-anchor", "middle")
			.attr("font-weight", "bold")
			.attr("transform", "translate(" + (axisFont+ 25) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
			.text(yAxisLabelHeader);
	}


	function make2ndSlider(){
			
		sliderSVG2 = d3.select("#Slider1Div").append("svg")
						.attr("width", sliderWidth2 + margin.left + margin.right)
						.attr("height", sliderHeight2);

		var slider2 = sliderSVG2.append("g")
			.attr("class", "slider2")
			.attr("transform", "translate(" + margin.left + "," + sliderHeight2 /2 + ")");
			
		
		var xSlider_ = d3.scaleLinear()
			.domain([0, 10])
			.range([0, sliderWidth2])
			.clamp(true);

			slider2.append("line")
			.attr("class", "track")
			.attr("x1", xSlider_.range()[0])
			.attr("x2", xSlider_.range()[1])
				.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
			.attr("class", "track-inset")
				.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
			.attr("class", "track-overlay")
			.call(d3.drag()
				.on("start.interrupt", function() { slider2.interrupt(); })
				.on("start drag", function() { hue2(xSlider_.invert(d3.event.x)); }));

		
		slider2.append('text')
		.attr("fill", "#e6e6ff")
		.attr("transform", "translate(0, " + -1*sliderHeight2 /4 + ")")
		.style("font-size", 18 + "px")
		.text("Topic Threads Subtraction Ratio:");
		
		slider2.insert("g", ".track-overlay")
			.attr("class", "ticks")
			.attr("transform", "translate(0," + 18 + ")")
		  .selectAll("text")
		  .data(xSlider_.ticks(5))
		  .attr("fill", "#e6e6ff")
		  .enter().append("text")
			.attr("x", xSlider_)
			.attr("fill", "#e6e6ff")
			.attr("text-anchor", "middle")
			.text(function(d) { return d; });

		var handle1 = slider2.insert("circle", ".track-overlay")
			.attr("class", "handle1")
			.attr("fill", "#ff6600")
			.attr("r", 9);

			slider2.transition()
			.duration(750)
			.tween("hue2", function() {
				var i = d3.interpolate(6, 6);
				return function(t) { hue2(i(t)); };
			});



	function hue2(h) {

		handle1.attr("cx", xSlider_(h));
		magicNumber = h;
		if ((topicThreads == 2) & (flag == 1)) {
			 flag = 0;
			 makeDynamicArray(topic_pointer, original_data);
			 drawIt(); 
			 chartWidth =  new_chartWidth1;
			 chart.attr("width", new_chartWidth2);
			 updateWidth();
			flag = 1;
		}
	}
}

	function make3rdSlider(){

		sliderSVG3 = d3.select("#Slider2Div").append("svg")
						.attr("width", sliderWidth3 + margin.left + margin.right)
						.attr("height", sliderHeight3);
	
		var slider3 = sliderSVG3.append("g")
			.attr("class", "slider3")
			.attr("transform", "translate(" + margin.left + "," + sliderHeight3 /2 + ")");

		var xSlider_3 = d3.scaleLinear()
			.domain([0, 5])
			.range([1, sliderWidth3])
			.clamp(true);

			slider3.append("line")
			.attr("class", "track")
			.attr("x1", xSlider_3.range()[0])
			.attr("x2", xSlider_3.range()[1])
				.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
			.attr("class", "track-inset")
				.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
			.attr("class", "track-overlay")
			.call(d3.drag()
				.on("start.interrupt", function() { slider3.interrupt(); })
				.on("start drag", function() { hue3(xSlider_3.invert(d3.event.x)); }));

		slider3.append('text')
		    .attr("fill", "#e6e6ff")
			.attr("transform", "translate(0, " + -1*sliderHeight2 /4 + ")")
			.style("font-size", 18 + "px")
			.text("Merging Segments Time Threshold: ");

		slider3.insert("g", ".track-overlay")
			.attr("class", "ticks")
			.attr("transform", "translate(0," + 18 + ")")
		  .selectAll("text")
		  .data(xSlider_3.ticks(10))
		  .attr("fill", "#e6e6ff")

		  .enter().append("text")
			.attr("x", xSlider_3)
			.attr("text-anchor", "middle")
			.attr("fill", "#e6e6ff")
			.text(function(d) { return d; });

		var handle3 = slider3.insert("circle", ".track-overlay")
			.attr("class", "handle3")
			.attr("r", 9)
			.attr("fill", "#ff6600");

			slider3.transition()
			.duration(750)
			.tween("hue3", function() {
				var i = d3.interpolate(1.25, 1.25);
				return function(t) { hue3(i(t)); };
			});

			function hue3(h) {
				handle3.attr("cx", xSlider_3(h));
				var temp = Math.floor(h*2);
							timer = setTimeout(function(){
							if (((topicThreads == 3) | (topicThreads == 4))  & (temp != old_magicNumber_2) & (flag == 1)) {

									old_magicNumber_2 = temp;
									magicNumber_2  = temp/2
									flag = 0;

									makeDynamicArray(topic_pointer, original_data);

									// Draw new threads 
									drawIt(); 
									chartWidth =  new_chartWidth1;
									chart.attr("width", new_chartWidth2);
									updateWidth();
									flag = 1;
									// drawIt();
									}
							clearTimeout(timer);
						}, 100);
			}
}

	function updateInterest(){

	   if (topicThreads == 2) {
			if (doIt ==1) {chart.plotArea.selectAll(".pattern_icon").remove();}
			chart.plotArea.selectAll(".wordsBox").remove();   // Remove are markers in not checked --- not hide
			chart.plotArea.selectAll(".words").remove();  		 // Remove are markers in not checked --- not hide
			for (var ii = 0; ii < classIDList.length; ii++){
				if (classInfo[ii].length != 0){
					if (curvethread == 1){
						dataIn = []
						dataIn = classInfo[ii]
						num = ii
						num2 = ii
						makeData2 = [];

						for (var i = 0; i < dataIn.length; i++){
							 if (i != dataIn.length-1){ 
								makeData2.push({
									target: {x: (dataIn[i].Time) * timeStep, y: dataIn[i].yPos}, 
									source: {x: (dataIn[i+1].Time) * timeStep, y: dataIn[i+1].yPos},
									x: [(dataIn[i+1].Time) * timeStep, (dataIn[i].Time) * timeStep],
									y: [dataIn[i+1].yPos, dataIn[i].yPos],
									InteractionType: dataIn[i].InteractionType,
									Time: dataIn[i].Time,
									DocNum: dataIn[i].DocNum,
									tags : dataIn[i].tags,
									paintIt: dataIn[i].myColor1,
									link: makeData2[i]
								})
							}
						}
			chart.plotArea.selectAll(".t-" + num.toString()) 
			.attr("d", function link(d) {
				var ySource = chart.yScale(d.source.y);
				var yTarget = chart.yScale(d.target.y);
				var xSource = chart.xScale(d.source.x);
				var xTarget = chart.xScale(d.target.x);
					
				var endDist = Math.abs((xTarget - xSource) * 0.05);
				var endDist2 = Math.abs((yTarget - ySource) * 0.1);

				if (yTarget > ySource) {  	 // -------------------- Raising edge -----------------------
					return "M" + xSource + "," + ySource
				+ "C" + (3*endDist + xTarget) + "," + (ySource)
				+ " " + (3*endDist + xTarget) + "," + (ySource + 3*endDist2)
				+ " " + (2*endDist + xTarget) + "," + (yTarget - 3*endDist2)
				+ "S" + (1*endDist + xTarget) + "," + (yTarget - 1*endDist2)
				+ " " + xTarget + "," + yTarget;
				}else{    //----------------- Falling edge -----------------
					return "M" +  xSource + "," + ySource
				+ "C" + (xSource - 1*endDist) + "," + (ySource + endDist2)
				+ " " + (xSource - 2*endDist) + "," + (yTarget + 3*endDist2)
				+ " " + (xSource - 3*endDist) + "," + (yTarget + 2*endDist2)
				+ "S" + (xSource - 4*endDist) + "," + (yTarget)
				+ " " + xTarget + "," + yTarget;
				}
			})
			.attr("opacity", function(d){
			
			if ((chart.xScale(d.source.x)) == 0){
				// console.log(xz(d.source.x))
				return 0;
			}else if ((chart.xScale(d.target.x)) == 2056){
				return 0;
			}else{
				return 1;
			}
			});

	
			if (doIt == 0){
			 chart.plotArea.selectAll(".pattern_icon")
			 .attr("y", function(d, i){
			 if (d.isSel == 1){
				return chart.yScale(d.target.y);}
			 });
			}
			// ----------------------------- Interaction pattern Icons -----------------------
			// if (doIt ==1) {drawIcons(makeData2,num);}
			drawIcons(makeData2,num);
		  }
		}
	  }

		if (doIt ==1) {doIt = 0;}

		}

	}

	function classUpdate(overTopic, underTopic, func){

		if (func == 1){
			topic_pointer[underTopic] = topic_pointer[overTopic];    // The one which is moved: under
		}else if (func == 2){
			topic_pointer[underTopic] = underTopic;
		}else{
			topic_pointer[underTopic] = underTopic;
		}
	
		makeDynamicArray(topic_pointer,original_data);
	
		// Draw new threads  -----------

		drawIt();  
		chartWidth =  new_chartWidth1;
		chart.attr("width", new_chartWidth2);
		updateWidth();

	}
	
  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

    d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };

	function hoverSegLines(hovering, num,num_2){
     	if (hovering == 1){  				 //--------------- on mouse over: 1

			chart.plotArea.selectAll(".tCurves")
				.style("stroke", "lightgrey")
				// .style("opacity", 1);
			chart.plotArea.selectAll(".t-" + num.toString())
				.style("stroke",function(d){return d.color;})  
				// .style("opacity", 1.0);
				
			chart.plotArea.selectAll(".links")
				.style("stroke", "lightgrey");
			chart.plotArea.selectAll(".class-"+num.toString()).moveToFront();
		} else if (hovering == 2) { 		//--------------- on mouse out & cancel singling:
			chart.plotArea.selectAll(".tCurves")
				.style("stroke", function(d){return d.color;})
				// .style("opacity", 1);
			chart.plotArea.selectAll(".links")
				.style("stroke", function(d){return d.color;});
		} else if (hovering == 3) {         //--------------- on box over: 3
			chart.plotArea.selectAll(".t-" + num.toString()).filter("path#tag-" + num_2.toString()) //
				.style("stroke",function(d){return "red";}) 
				// .style("opacity", 1.0);
		} else if (hovering == 4) {         //--------------- on box out: 4
			chart.plotArea.selectAll(".t-" + num.toString()).filter("path#tag-" + num_2.toString()) //
				.style("stroke",function(d){return d.color;})  
				// .style("opacity", 1.0);
		}
	}

	function tooltip(d){

		if ((d.source.y > d.target.y) | (topicThreads !=2) ){
		div1.transition()
			.duration(200)
			.style("opacity", tooltipOpacity);
			
		if (d.InteractionType == "search"){
		div1.html("&nbsp" + "   " + "<br/>" + "&nbsp" + "   " + showIt[d.InteractionType] + "  &quot" + d.tags + "&quot   " + "<br/>" + "&nbsp") 
		}else if (d.InteractionType == "HighlightTxt"){
		div1.html("&nbsp" + "   " + "<br/>" + "&nbsp" + "   " + showIt[d.InteractionType] +  "   &quot" + d.tags + "&quot   " + "&nbsp" + "<br/>" + "&nbsp" + "   In document: &quot" + d.DocNum + "&quot   " + "<br/>" + "&nbsp")
		}else if (d.InteractionType == "addNote"){
		div1.html("&nbsp" + "   " + "<br/>" + "&nbsp" + "   " + showIt[d.InteractionType] + "   " + "&nbsp" + "<br/>" + "&nbsp" + "   &quot" + d.tags + "&quot   " + "<br/>" + "&nbsp") 
		}else{
		div1.html("&nbsp" + "   " + "<br/>" + "&nbsp" + "   " + showIt[d.InteractionType] + "   &quot" + d.DocNum + "&quot   " + "&nbsp" + "<br/>" + "&nbsp" + "   [" + d.tags + "]   " + "<br/>" + "&nbsp") 
		}
		
		if (d3.event.pageY < 200){
		div1.style("left", (d3.event.pageX - 120) + "px")
			.style("top", (d3.event.pageY + 108) + "px")
			.style("background", myLightColor[2 * (d.paintIt) -1 ]);
		}else{
		div1.style("left", (d3.event.pageX - 120) + "px")
			.style("top", (d3.event.pageY - 108) + "px")
			.style("background", myLightColor[2 * (d.paintIt) -1 ]);
		}
		}
	}

	function drawDots2(dataIn, num, dataIn2){

		var dots = chart.plotArea.selectAll(".class-"+num.toString())
		.selectAll(".dot"+"-"+num.toString())
		.append("g").attr("class", "dot"+"-"+num.toString())
			.data(dataIn)
			.enter().append("circle")
			.attr("class", "dots")
				.attr("cx", function(d) {
					return chart.xScale((d.Time) * timeStep);   // With the slider active 
				})
				.attr("cy", function(d, i) {return d.yPosi;})
				.style("opacity", function(d){return 1;})
				.attr("r", function(d, i){
					return 3;
				})
				.style("fill",function(d) {
					return "grey";
				})
				.style("visibility", "visible")
				.on("click", function(d)
				{
				})   // --------- No mouseover mouseout for markers , just log
				.on("mouseover", function(d){

					div3.transition()
						.duration(100)
						.style("opacity", .9);
					div3.html("Time: " + Math.floor(d.Time*timeStep) + ":"+ (60*(d.Time*timeStep - Math.floor(d.Time*timeStep))).toFixed() + "<br/>" 
						+ " User Interaction" + ": " + d.InteractionType + " ")
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY - 28) + "px");
				})
			.on("mouseout", function(d) {
					div3.transition()
						.duration(500)
						.style("opacity", 0);
			});
	}

	function drawBoxes(classInfo,num){

		dataIn = classInfo[num]

		var makeData2 = [];

		for (var i = 0; i < dataIn.length; i++){
			if (i != dataIn.length-1){ 
				makeData2.push({
					target: {x: (dataIn[i].Time) * timeStep, y: dataIn[i].yPos}, 
					source: {x: (dataIn[i+1].Time) * timeStep, y: dataIn[i+1].yPos},
					x: [(dataIn[i+1].Time) * timeStep, (dataIn[i].Time) * timeStep],
					y: [dataIn[i+1].yPos, dataIn[i].yPos],
					InteractionType: dataIn[i].InteractionType,
					Time: dataIn[i].Time,
					DocNum: dataIn[i].DocNum,
					tags : dataIn[i].tags,
					paintIt: dataIn[i].myColor1,
					link: makeData2[i]
				})
			}
		}


		var boxes = chart.plotArea.append("g").attr("class", "hover_boxes")
			.selectAll("rect")
			.enter().append("g").attr("class", "testboxes")
			.data(makeData2).enter().append("rect")
			.attr("class", "box" + "-"+num.toString())   // This "class" is the thread number
			.attr("id", function(d,i){ return 'tag-'+ i }) // assign ID // This "id" is the segment number
			.style("fill", "none")
			.attr("height", function(d,i){
				var this_height;
				var yTarget = chart.yScale(d.source.y);
				var ySource = chart.yScale(d.target.y);
				var xTarget = chart.xScale(d.source.x);
				var xSource = chart.xScale(d.target.x);
					if (topicThreads > 2) {this_height = (Math.abs(yTarget - ySource) + 2*height)}
					else {this_height = (Math.abs(yTarget - ySource) + 400)}
				return this_height; })
			.attr("width",  function(d,i){
				var yTarget = chart.yScale(d.source.y);
				var ySource = chart.yScale(d.target.y);
				var xTarget = chart.xScale(d.source.x);
				var xSource = chart.xScale(d.target.x);
				return Math.abs(xTarget - xSource)})
			.attr("y",function(d,i){
				var this_y;
					if (topicThreads > 2) {this_y = ((chart.yScale(d.source.y) - height));}
					else {this_y = (chart.yScale(d.source.y) - 200);}
			return this_y;})  
			.attr("x",function(d,i){return chart.xScale(d.target.x);})
			.on("mouseover", function(d,j) {
				 box_num_1 = d3.select(this).attr('class').split("-")[1]
				 box_num_2 = d3.select(this).attr('id').split("-")[1]

				if ( (singling > 0) &  (singling == (Number(box_num_1) + 1)) & (d.source.y > d.target.y) ){
					 tooltip(d)
					 hoverSegLines(3, box_num_1,box_num_2);
				}

			})
			.on("mouseout", function(d,j) {
				 box_num_1 = d3.select(this).attr('class').split("-")[1]
				 box_num_2 = d3.select(this).attr('id').split("-")[1]
					if ( (singling > 0) &  (singling == (Number(box_num_1) + 1)) ){
					 hoverSegLines(4, box_num_1,box_num_2);   // mouse out on singling: 4
					}
				div1.transition()
					.duration(300)
					.style("opacity", 0);
			});
	}

	function drawIcons(makeData2,num){

		if (pattern_ == 1){

		    var w = 20

			line.append("g").selectAll(".pattIcon") 
				.data(makeData2).enter().append('image')
				.attr("class", "pattern_icon")
				.each(function(d){  //
						if ( (d.source.y > d.target.y) & (highlightInteract == d.InteractionType || noteInteract == d.InteractionType ||  searchInteract == d.InteractionType || ceartNoteInteract == d.InteractionType || openDocInteract == d.InteractionType) ) {// (d.target.y > d.source.y) & (highlightInteract == d.InteractionType || noteInteract == d.InteractionType ||  searchInteract == d.InteractionType || ceartNoteInteract == d.InteractionType || openDocInteract == d.InteractionType) ) ) {
							d.isSel = true;
						} else {
							d.isSel = false;
							d3.select(this).remove();
						}

				})
				.attr('xlink:href',function(d){return "./styles/"+ d.InteractionType + ".svg";}) 
				.attr('height', '30')
				.attr('width', '30')
				.attr("x", function(d){return chart.xScale(d.target.x) - 15 -15;}) 
				.attr("y", function(d, i){ 
				var target_ = d.target.y;
				var source_ = d.source.y;
				
					if (source_ < 0) {
						source_ = 0;
					}
					if (target_ < 0) {
						target_ = 0;
					}
				
				return ( (chart.yScale(target_) + chart.yScale(source_))/2 - 15 -15);})
				.attr("opacity", function(d){
					if ((chart.xScale(d.target.x) - 15 -15) == 0){
						return 0;
					}else{
						return 1;
					}
				})
				.on("mouseover", function(d){
					div1.transition()
							.duration(200)
							.style("opacity", tooltipOpacity);
					tooltip(d);
				})
				.on("mouseout", function(d){
						div1.transition()
								.duration(500)
								.style("opacity", 0);
				});
		
			}

	}

	function thinkaloud(){

		if (source5 == "-UModel-"){
		var new_jsonfile = "./data/NewIDs" + source5 + "/Dataset_" + array[0] + "/UserInteractions/" + array[1] + "_" + source2 + "_InteractionsLogs.json"; // .toString()
		}else{
		var new_jsonfile = "./data/NewIDs" + source5 + source6 + "/Dataset_" + array[0] + "/UserInteractions/" + array[1] + "_" + source2 + "_InteractionsLogs.json"; // .toString()
		}

		var count = 0;											
		var count1 = 0;											
		var each_seg = []
		d3.json(new_jsonfile, function(error, new_json){

				var think = chart.plotArea.append("g").attr("class", "eval").selectAll(".eval")
							.data(new_json).enter();

				think.append("rect")
					.attr("class", "thinks")
					.each(function(d){
  					if (d.InteractionType != "Topic_change" ) {   // find the topic change event times
							d3.select(this).remove();
						}else{
							each_seg.pop();
							each_seg.push(d.time); 
							each_seg.push(57000);
						}
					})
					.each(function(d){
 					if (d.InteractionType != "Topic_change" ) {   // find the topic changes length
							d3.select(this).remove();
						}else{
							count = count + 1;
							d.width = each_seg[count] - (d.time - 50);
						}
					})
				.attr("fill", "none")
				.attr("stroke", "black")
			    .attr("x", function(d){return chart.xScale((d.time) * timeStep);}) 
			    .attr("y", margin.top)
			    .attr("width", function(d){ if (d.InteractionType == "Topic_change") {return chart.xScale(d.width * timeStep);} })
			    .attr("height", 520)
				.on("mouseover", function(d,i){
					var ii = i;
					var my_text = "";
				chart.plotArea.selectAll(".talks").remove();

				think.append("text").attr("class", "talks")
				.each(function(d,i){
  					if ( ((d.InteractionType != "Topic_change" ) & (d.InteractionType != "Think_aloud" )) || (i != ii) ){
							d3.select(this).remove();
						}else{
							my_text += d.Text;
						}
					})
				.attr("x", function(d){return chart.xScale((d.time) * timeStep);}) 
				.attr("y", margin.top + 10)
				.attr("dy", ".35em")
				.text(function(d){return my_text});
				});
				
				chart.plotArea.selectAll(".zoom_rect").moveToFront();
				for(count = 0; count < 11; count++){   							 // Move threads to front after drawing the boxes,
				chart.plotArea.selectAll(".class-"+count.toString()).moveToFront(); //
				}
		});
			
			chart.plotArea.selectAll(".zoom_rect").moveToFront();
			
		}

    function dragstarted(d) {
		  d3.select(this).raise().classed("active", true);
		  prevMousePosX = d3.event.x;
		  prevMousePosY = d3.event.y;
	}

	function box_dragged(d) {

		var selectBox = parseInt(d3.select(this).attr('class').split("-")[1]);


		newBoxPosX = prevBoxPosX[selectBox] + (d3.event.x) -  prevMousePosX;
		newBoxPosY =  prevBoxPosY[selectBox] + (d3.event.y) - prevMousePosY;


		  d3.selectAll(".wordtag-"+selectBox.toString()).attr("transform", "translate( " +  newBoxPosX + ", " + newBoxPosY + ")");
		  d3.selectAll(".wordtag-"+selectBox.toString()).moveToFront();
		  d3.select(this).attr("transform", "translate( " + (newBoxPosX)  + ", " + (newBoxPosY) + " )");

		  prevMousePosX = d3.event.x;
		  prevMousePosY = d3.event.y;

		  prevBoxPosX[selectBox] = newBoxPosX;
		  prevBoxPosY[selectBox] = newBoxPosY;
		  newPosBox = newBoxPosX + 110*selectBox;
		  boundingBox[selectBox] = newPosBox;

		  for (var check_bounding = 0; check_bounding < source4; check_bounding++){ 

			  if ( (check_bounding != selectBox) & ((((newPosBox) > boundingBox[check_bounding]) & ((newPosBox)< (boundingBox[check_bounding]+ 100))) | (((newPosBox + 100) > boundingBox[check_bounding]) & ((newPosBox + 100) < (boundingBox[check_bounding]+ 100)))  )  ) {

				  d3.select(this).attr("stroke", "red")
				  d3.select(this).attr("stroke-width", "10")

				  if ( (topic_pointer[selectBox] == topic_pointer[check_bounding] ) ) { 			  // If boxes were passing over each other  // (last_check_bounding != check_bounding ) &
						func = 0;
						overTopic = -1;

					 }else{
						if (last_check_bounding != check_bounding ){
							  overTopic = check_bounding;
							  underTopic = selectBox;
							  func = 1;
							  d3.select(this).attr("fill", color(topic_pointer[overTopic]))
						}
					 }
					 last_check_bounding = check_bounding;
			  }else{


				  if (last_check_bounding == check_bounding){

				     d3.select(this).attr("stroke", "none")
					 if (overTopic == check_bounding){  				 // If boxes were passing over each other
						func = 0;	

					 }else{
						func = 2;                     					 // If it was a real split!
						overTopic = check_bounding;
						underTopic = selectBox;

					 }
					 last_check_bounding = -1;
					 d3.select(this).attr("fill", color(underTopic))
				  }


			  }


		  }
		  var all_test = 0;
		  for (var check_bounding = 0; check_bounding < source4; check_bounding++){ 

			   if ( (check_bounding != selectBox) & ((((newPosBox) > boundingBox[check_bounding]) & ((newPosBox)< (boundingBox[check_bounding]+ 100))) | (((newPosBox + 100) > boundingBox[check_bounding]) & ((newPosBox + 100) < (boundingBox[check_bounding]+ 100)))  )  ) {

				   if ((func == 0) & (selectBox != topic_pointer[selectBox]) ){
							  all_test -= 100;
						  }else{
							  all_test -=100;
						  }

			   }else{
						  if ((func == 0) & (selectBox != topic_pointer[selectBox]) ){
							  all_test += 1;
						  }else{
							  all_test -=100;
						  }
			   }
		  }
		  if (all_test > 1) {
						  func = 3;
						  underTopic = selectBox;
						  d3.select(this).attr("fill", color(underTopic))
		  }


	}

	function dragended(d) {
		   d3.select(this).classed("active", false);
		   d3.select(this).attr("stroke", "none")

		// if (func == 1) console.log("Merge it!  ----------> ", overTopic, "and ",  underTopic);
		// if (func == 2) console.log("Split it!  ----------> ", overTopic, "and ",  underTopic);

		if (func > 0){classUpdate(overTopic, underTopic,func);}  				  // Apply Merge/Splite!
		func = 0;

	}

	function drawThreads(makeData2,num){
		// Making a group for all curves (testCurves)
		// Making sub groups for the classes (tCurves)
		line = chart.plotArea.append("g").attr("class", "class-"+num.toString());

			// ----------------------------- Interaction pattern Icons -----------------------
			drawIcons(makeData2,num)
			// --------------------------------- Draw Threads ----------------------------

			line.selectAll(".testCurves")
			.enter().append("g").attr("class", "testCurves")
			.data(makeData2).enter().append("path")
			.attr("class", "tCurves " + "t-"+num.toString())   // This "class" is the thread number
			.style("stroke", function(d,i) {
				d.color = color(num-1);
				myColor[num] = color(num-1);
				return color(num-1);
			})
			.attr("id", function(d,i){ return 'tag-'+ i }) 			// assign ID // This "id" is the segment number
			.style("fill", "none")
			.attr("stroke-linecap", "round")
			.attr("d", function link(d) {
				var ySource = chart.yScale(d.source.y);
				var yTarget = chart.yScale(d.target.y);
				var xSource = chart.xScale(d.source.x);
				var xTarget = chart.xScale(d.target.x);

				var endDist = Math.abs((xTarget - xSource) * 0.05);
				var endDist2 = Math.abs((yTarget - ySource) * 0.1);

				if (yTarget > ySource) {   // -------------------- Raising edge -----------------------
					return "M" + xSource + "," + ySource
				+ "C" + (3*endDist + xTarget) + "," + (ySource)
				+ " " + (3*endDist + xTarget) + "," + (ySource + 3*endDist2)
				+ " " + (2*endDist + xTarget) + "," + (yTarget - 3*endDist2)
				+ "S" + (1*endDist + xTarget) + "," + (yTarget - 1*endDist2)
				+ " " + xTarget + "," + yTarget;
				}else{    //----------------- Falling edge -----------------
					return "M" +  xSource + "," + ySource
				+ "C" + (xSource - 1*endDist) + "," + (ySource + endDist2)
				+ " " + (xSource - 2*endDist) + "," + (yTarget + 3*endDist2) 
				+ " " + (xSource - 3*endDist) + "," + (yTarget + 2*endDist2)
				+ "S" + (xSource - 4*endDist) + "," + (yTarget)
				+ " " + xTarget + "," + yTarget;
				}
			})
			.attr("stroke-width", function link(d) {
					if ((d.target.y < 0.1) & (d.source.y < 0.1)){
						return 1; 				
					}else{
						return pathStroke; 				
					}		
			})
			.attr("opacity", function(d){
			
			if ((chart.xScale(d.source.x)) == 0){
				// console.log(xz(d.source.x))
				return 0;
			}else if ((chart.xScale(d.target.x)) == 2056){
				return 0;
			}else{
				return 1;
			}
			})
			.on("mouseover", function(d,j) {
				// If mousing over for more than a second
				num_ = d3.select(this).attr('class').split("-")[1]
				num_2 = d3.select(this).attr('id').split("-")[1]
				 // console.log("ID", num_)
				 // console.log("Itag", num_2)
				if (singling == 0){
					hoverSegLines(1, num_,num_2);   // on mouse over: 1

				chart.selectAll(".list").remove();
				
				wordList.append("g")
					.attr("class", "list")   
					.each(function (d,i){
						if (i == num_ - 1){
						for (var j = 0; j < 10; j++) {
						if (d.keywords[j]==null)
							continue;
						d3.select(this).append("text")
							.text(function(){
								var tempp = d.keywords[j] 
								return tempp[0];
							})
							.attr("fill", color(topic_pointer[num_ - 1]))
							.attr("dy", ()=> {
								var yP = j ? (2.0*j + 2.0).toString()+"em" : "2.0em";
								return yP;
							})
							.attr("x", 120)
							.attr("text-anchor", "middle")
							.attr("font-size", 22)
							.attr("class", "tspan" + j)
							.on("mouseover", (d2) => {
								var chosenWords = wordtags.selectAll("text").filter((di)=>{
									if (di.substring(0, 6) == d2.substring(0, 6)){
										return true;
									}
								});
								chosenWords.attr("fill", "yellow").attr("font-style", "oblique").attr("font-size", 30);
							})
							.on("mouseout", (d2) => {
								var chosenWords = wordtags.selectAll("text").filter((di)=>{
									if (di.substring(0, 6) == d2.substring(0, 6)){
										return true;
									}
								});
								chosenWords.attr("fill", "black").attr("font-style", "normal").attr("font-size", 18);
							});
						}}})
				.attr("transform", "translate( " + (chartWidth+25) + ", 70)");

				}
				if (((singling == 0) | ( (singling > 0) &  (singling == (Number(num_) + 1)) ) ) & ((d.source.y > d.target.y) | (topicThreads !=2) ) ){ 
					tooltip(d)
					d3.select(this).style("stroke","red");
				}

				justClicked = 0
			})
			.on("mouseout", function(d) {
				num_ = d3.select(this).attr('class').split("-")[1]
				if (singling == 0){
					hoverSegLines(2, num_,num_2);  // on mouse out: 2

				}
				div1.transition()
					.duration(300)
					.style("opacity", 0);
				if ((singling == 0) | ( (singling > 0) &  (singling == (Number(num_) + 1)) ) ){
				d3.select(this).style("stroke",myColor[d.paintIt]);
				}
			})
			.on("click", function(d){
				num_ = d3.select(this).attr('class').split("-")[1]
				singling = Number(num_) + 1;
				chart.plotArea.selectAll(".class-"+num_.toString()).moveToFront();
				// Only move links to front if related to clicked class
				chart.plotArea.selectAll(".links").filter(function(d){
				if (d.source.classNum == num_) 
						return this;
				}).moveToFront();

					justClicked = 1
					for (var kk=0;kk<11;kk++){
						tags.selectAll(".recttag-"+(kk-1).toString())
							.attr("fill", "lightgrey") 
							.attr("opacity","0.5")
							.attr("stroke", "none");
					}
						tags.selectAll(".recttag-"+(singling-2).toString())
							.attr("fill",  function(d,i){return color(topic_pointer[singling-2]);}) 
							.attr("opacity", "0.6")
							.attr("stroke", "none");

				chart.selectAll(".list").remove();

				wordList.append("g")
					.attr("class", "list")   
					.each(function (d,i){
						if (i == singling - 2){
						for (var j = 0; j < 10; j++) {
						if (d.keywords[j]==null)
							continue;
						d3.select(this).append("text")
							.text(function(){
								var tempp = d.keywords[j] 
								return tempp[0];
							})
							.attr("fill", color(topic_pointer[singling - 2]))
							.attr("dy", ()=> {
								var yP = j ? (2.0*j + 2.0).toString()+"em" : "2.0em";
								return yP;
							})
							.attr("x", 10)
							.attr("text-anchor", "middle")
							.attr("font-size", 22)
							.attr("class", "tspan" + j)
							.on("mouseover", (d2) => {
								var chosenWords = wordtags.selectAll("text").filter((di)=>{
									if (di.substring(0, 6) == d2.substring(0, 6)){
										return true;
									}
								});
								chosenWords.attr("fill", "yellow").attr("font-style", "oblique").attr("font-size", 30);
							})
							.on("mouseout", (d2) => {
								var chosenWords = wordtags.selectAll("text").filter((di)=>{
									if (di[1].substring(0, 6) == d2[1].substring(0, 6)){
										return true;
									}
								});
								chosenWords.attr("fill", "black").attr("font-style", "normal").attr("font-size", 18);
							});
						}}})
				.attr("transform", "translate( " + (chartWidth+25) + ", 70)");

					timer = setTimeout(function(){
					singling = Number(num_) + 1;
					drawBoxes(classInfo,num_)
					hoverSegLines(true, num_,num_2);
					clearTimeout(timer);
				}, 1);


				if (addingFlag){
					var mousePos = d3.mouse(this);
					addFlagCirc(mousePos, num_);
					addingFlag = false;
					textField.property("value", "");
				}

			});

	}

	function drawIt(){
		
		// Remove old threads
		chart.plotArea.selectAll(".tCurves").remove();   // Remove are markers in not checked --- not hide
		chart.selectAll(".tCurves").remove();
		chart.selectAll(".links").remove();
		chart.plotArea.selectAll(".dots").remove();
		chart.plotArea.selectAll(".pattern_icon").remove();
		chart.plotArea.selectAll(".wordsBox").remove();  			 // Remove are markers in not checked --- not hide
		chart.plotArea.selectAll(".words").remove();   				 // Remove are markers in not checked --- not hide
							

	for (var num = 0; num < classIDList.length; num++){

		if (classInfo[num].length != 0){

			dataIn = classInfo[num]
			makeData2 = [];
			for (var i = 0; i < dataIn.length; i++){
				 if (i != dataIn.length-1){ 
					makeData2.push({
						target: {x: (dataIn[i].Time) * timeStep, y: dataIn[i].yPos},  
						source: {x: (dataIn[i+1].Time) * timeStep, y: dataIn[i+1].yPos},
						x: [(dataIn[i+1].Time) * timeStep, (dataIn[i].Time) * timeStep],
						y: [dataIn[i+1].yPos, dataIn[i].yPos],
						InteractionType: dataIn[i].InteractionType,
						Time: dataIn[i].Time,
						DocNum: dataIn[i].DocNum,
						tags : dataIn[i].tags,
						paintIt: dataIn[i].myColor1,
						link: makeData2[i]
					})
				}
			}

			drawThreads(makeData2, num);

		}
	}  

	}

})();
