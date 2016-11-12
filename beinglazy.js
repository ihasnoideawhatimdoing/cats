//resource fullness before convert
resourceThreshold = 0.9;

//get craft table button 
function getCraftAllResourceButton(resource){
	for (var i in gamePage.craftTable.resRows){
		if (gamePage.craftTable.resRows[i].recipeRef.name == resource){
			return gamePage.craftTable.resRows[i].aAll;
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
		getCraftAllResourceButton("wood").click();
	}

	//wood -> beam
	if (isResourceAboveThreshold("wood")){
		getCraftAllResourceButton("beam").click();
	}

	//coal -> steel
	if (isResourceAboveThreshold("coal")){
		getCraftAllResourceButton("steel").click();
	}

	//mineral -> slab
	if (isResourceAboveThreshold("minerals")){
		getCraftAllResourceButton("slab").click();
	}

	//iron -> plate
	if (isResourceAboveThreshold("iron")){
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

function testlog(){
	console.log("i don't know js");
}

function observeTheSky () { $("#observeBtn").click(); }

function beingLazy(){
	observe = setInterval(observeTheSky, 3*1000);
	basicConvert = setInterval(autoConvert, 2*1000);
}

function stopBeingLazy(){
	clearInterval(observe);
	clearInterval(basicConvert);
}