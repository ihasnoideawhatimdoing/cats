//resource fullness before convert
resourceThreshold = 0.9;

religionTabCanUpgrade = true;

//resource current max tuple
resourceCurrMaxTuple = {};
resourceCurrMaxTuple.current = 0;
resourceCurrMaxTuple.max = 0;

//get craft table button 
function getCraft25ResourceButton(resource){
  for (var i in gamePage.craftTable.resRows){
    if (gamePage.craftTable.resRows[i].recipeRef.name == resource){
      return gamePage.craftTable.resRows[i].a25;
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
    getCraft25ResourceButton("wood").click();
  }

  //wood -> beam
  if (isResourceAboveThreshold("wood")){
    getCraft25ResourceButton("beam").click();
  }

  //coal -> steel
  if (isResourceAboveThreshold("coal")){
    getCraft25ResourceButton("steel").click();
  }

  //mineral -> slab
  if (isResourceAboveThreshold("minerals")){
    getCraft25ResourceButton("slab").click();
  }

  //iron -> plate
  if (isResourceAboveThreshold("iron")){
    getCraft25ResourceButton("plate").click();
  }
}

// auto pray
function updateReligionTabUpgradibility(){
  resourceCapOkay = true;
  upgradesRemaining = false;

  for (var i in gamePage.religionTab.rUpgradeButtons){
    //look for available upgrades haven't been completed yet
    if (gamePage.religionTab.rUpgradeButtons[i].visible && !gamePage.religionTab.rUpgradeButtons[i].getName().includes("complete")){
      upgradesRemaining = true;
      rUpgrade = gamePage.religionTab.rUpgradeButtons[i];
      //check if faith and gold resource cap is limiting
      if (rUpgrade.getPrices()[0] > (getResource("faith").maxValue * resourceThreshold)){
        resourceCapOkay = false;
        break;        
      }
      if (rUpgrade.getPrices()[1] != null && rUpgrade.getPrices()[1] > (getResource("gold").maxValue * resourceThreshold)){
        resourceCapOkay = false;
        break;
      }
    }
  }

  //upgrade button with no (complete), no upgrades require more than cap
  religionTabCanUpgrade = (upgradesRemaining && resourceCapOkay);
  return;
}

function autoUpgradeReligion(){
  if (religionTabCanUpgrade){
    for (var i in gamePage.religionTab.rUpgradeButtons){
      //blindly click, easier than checking resource req again
      gamePage.religionTab.rUpgradeButtons[i].onClick();
    }
  }
}

function autoPray(){
  updateReligionTabUpgradibility();
  getResourceCurrentAndMax("faith");
  if (!religionTabCanUpgrade && (resourceCurrMaxTuple.current > (resourceCurrMaxTuple.max / 2))){
    gamePage.religionTab.praiseBtn.onClick();
  } else {
    autoUpgradeReligion();
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
  resourceCurrMaxTuple.current = getResource(resource).value;
  resourceCurrMaxTuple.max = getResource(resource).maxValue;
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
  pray = setInterval(autoPray, 5*1000);
}

function stopBeingLazy(){
  clearInterval(observe);
  clearInterval(basicConvert);
  clearInterval(pray);
}