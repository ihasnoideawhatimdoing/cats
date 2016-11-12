//resource fullness before convert
resourceThreshold = 0.9;

religionTabCanUpgrade = true;

//resource current max tuple
var resourceCurrMaxTuple = { current = 0, max = 0 };

//get craft table button 
function getCraftAllResourceButton(resource){
	for (var i in gamePage.craftTable.resRows){
		if (gamePage.craftTable.resRows[i].recipeRef.name == resource){
			return gamePage.craftTable.resRows[i].aAll;
		}
	}
}

function isResourceAboveThreshold(resource){
	return getResource(resource).value > (getResource(resource).maxValue * resourceThreshold)
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
function updateReligionTabUpgradibility(){
	for (var i in gamePage.religionTab.rUpgradeButtons){
		if (!gamePage.religionTab.rUpgradeButtons[i].getName().inludes("complete")){
			//check if resource cap is limiting			
			for (var j in gamePage.religionTab.rUpgradeButtons[i].getPrices()){
				var res = gamePage.religionTab.rUpgradeButtons[i].getPrices()[j];
				getResourceCurrentAndMax(res.name);
				if ((getResourceCurrentAndMax.max * resourceThreshold) > res.val){
					religionTabCanUpgrade = true;
					return;
				}
			}
		}
	}
  //looped through all upgrades, nothing upgradable
  religionTabCanUpgrade = false;
  return;
}

function autoPray(){
  updateReligionTabUpgradibility();
  if (!religionTabCanUpgrade){
    gamePage.religionTab.praiseBtn.onClick();
  }
}

// auto trade (when cat power > 50%)
// ^^ if saving up, don't trade because uses gold
// else trade in order

// auto hunt
// hunt at >90% cat power
// cycle? 5?

//utility
function getResourceCurrentAndMax(resource){
	resourceCurMaxTuple.current = getResource(resource).value;
	getResourceCurrentAndMax.max = getResource(resource).maxValue;
}

function getResource(resource){
	for (var i in gamePage.resPool.resources){
		if (gamePage.resPool.resources[i].name == resource){
			return gamePage.resPool.resources[i];
		}
	}
}

function testlog(){
	console.log("i don't know js");
}

function observeTheSky () { $("#observeBtn").click(); }

function beingLazy(){
	observe = setInterval(observeTheSky, 3*1000);
	basicConvert = setInterval(autoConvert, 2*1000);
  pray = setInterval(autoConvert, 5*1000);
}

function stopBeingLazy(){
	clearInterval(observe);
	clearInterval(basicConvert);
  clearInterval(pray);
}