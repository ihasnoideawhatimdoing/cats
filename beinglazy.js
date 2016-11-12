//resource fullness before convert
resourceThreshold = 0.9;

//get craft table button 
function getCraftAllResourceButton(resourceName){
	visibleResources = $("#craftContainer .resourceRow");
	for (var i = 0; i < visibleResources.length; i++){
		count = i+1;
		var resource = $("#craftContainer .resourceRow:nth-child("+count+") td:contains('"+resourceName+"')");
		if (resource.length != 0){
			return $("#craftContainer .resourceRow:nth-child("+count+") a:contains('all')");
		}
	}
}

function isResourceAboveThreshold(resource){
	for (var i in gamePage.resPool.resources){
		if (gamePage.resPool.resources[i].name == resource){
			return gamePage.resPool.resources[i].value > (gamePage.resPool.resources[i].maxValue * resourceThreshold)
		}
	}
}

// convert resources when >90% full
function autoConvert(){
	//catnip -> wood
	if (isResourceAboveThreshold("catnip")){
		Console.log("converting catnip to wood...");
		Console.log(getCraftAllResourceButton("wood"));
		getCraftAllResourceButton("wood").click();
	}

	//wood -> beam
	if (isResourceAboveThreshold("wood")){
		Console.log("converting wood to beam...");
		Console.log(getCraftAllResourceButton("beam"));
		getCraftAllResourceButton("beam").click();
	}

	//coal -> steel
	if (isResourceAboveThreshold("coal")){
		Console.log("converting coal to steel...");
		Console.log(getCraftAllResourceButton("steel"));
		getCraftAllResourceButton("steel").click();
	}

	//mineral -> slab
	if (isResourceAboveThreshold("minerals")){
		Console.log("converting minerals to slab...");
		Console.log(getCraftAllResourceButton("slab"));
		getCraftAllResourceButton("slab").click();
	}

	//iron -> plate
	if (isResourceAboveThreshold("iron")){
		Console.log("converting iron to plate...");
		Console.log(getCraftAllResourceButton("plate"));
		getCraftAllResourceButton("plate").click();
	}
}

// auto pray
//  if can pray research (gold + faith cap) save up (toggle)
//  else pray

// auto trade (when cat power > 50%)
// ^^ if saving up, don't trade
// else trade in order

// auto hunt
// hunt at >90% cat power
// cycle? 5?

function observeTheSky () { $("#observeBtn").click(); }

function beingLazy(){
	observe = setInterval(observeTheSky, 3*1000);
	basicConvert = setInterval(autoConvert, 2*1000);
}

function stopBeingLazy(){
	clearInterval(observe);
	clearInterval(basicConvert);
}