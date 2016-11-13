//some constants
resourceThreshold = 0.9;
goldThreshold = 0.2;
catPowerThreshold = 0.5;
spiceThresholdIncrease = 1.04;
furThresholdIncrease = 1.02;
ivoryThresholdIncrease = 1.02;

religionTabCanUpgrade = true;
tradeToggle = false;
huntToggle = true;

//initialize some stuff
rareResources = {};
rareResources.ivory = {};
rareResources.ivory.targetThreshold = 0;
rareResources.spice = {};
rareResources.spice.targetThreshold = 0;
rareResources.furs = {};
rareResources.furs.targetThreshold = 0;
rareResources.furs.minThreshold = 0;

//get craft table button 
function getCraft25ResourceButton(resource){
  for (var i in gamePage.craftTable.resRows){
    if (gamePage.craftTable.resRows[i].recipeRef.name == resource){
      return gamePage.craftTable.resRows[i].a25;
    }
  }
}

function getCraftSingleResourceButton(resource){
  for (var i in gamePage.craftTable.resRows){
    if (gamePage.craftTable.resRows[i].recipeRef.name == resource){
      return gamePage.craftTable.resRows[i].a1;
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
  if (!religionTabCanUpgrade && (getResource("faith").value > (getResource("faith").maxValue / 2))) {
    gamePage.religionTab.praiseBtn.onClick();
  } else {
    autoUpgradeReligion();
  }
}

function autoTrade(){
  if (!religionTabCanUpgrade && tradeToggle 
    && (getResource("gold").value > getResource("gold").maxValue * goldThreshold)
    && (getResource("manpower").value > getResource("manpower").maxValue * catPowerThreshold)) {
      
    for (var i in gamePage.diplomacyTab.racePanels){
      gamePage.diplomacyTab.racePanels[i].tradeBtn.onClick();
      if (getResource("spice") > rareResources.spice.targetThreshold){
        rareResources.spice.targetThreshold = rareResources.spice.targetThreshold * spiceThresholdIncrease;
        tradeToggle = false;
        huntToggle = true;
      }
    }
  }
}

function autoHunt(){
  if (huntToggle){
    gamePage.village.huntAll();
    if (getResource("ivory").value > rareResources.ivory.targetThreshold
      && getResource("furs").value > rareResources.furs.targetThreshold){
      rareResources.ivory.targetThreshold = rareResources.ivory.targetThreshold * ivoryThresholdIncrease;
      rareResources.furs.minThreshold = rareResources.furs.targetThreshold;
      rareResources.furs.targetThreshold = rareResources.furs.targetThreshold * furThresholdIncrease;
      huntToggle = false;
      tradeToggle = true;
    }
  }
}

function autoPaperManagement(){
  getCraftSingleResourceButton("manuscript").onClick();
  if (getResource("furs").value > rareResources.furs.minThreshold){
    getCraftSingleResourceButton("parchment").onClick();
  }
  if (getResource("science").value > (getResource("science").maxValue * resourceThreshold)){
    getCraftSingleResourceButton("compedium").onClick();
  }
}

function getResource(resource){
  for (var i in gamePage.resPool.resources){
    if (gamePage.resPool.resources[i].name == resource){
      return gamePage.resPool.resources[i];
    }
  }
}

function populateRareResourceThreshold(){
  rareResources.ivory.targetThreshold = getResource("ivory").value * 1.1;
  rareResources.spice.targetThreshold = getResource("spice").value * 1.1;
  rareResources.furs.targetThreshold = getResource("furs").value * 1.1;
  rareResources.furs.minThreshold = getResource("furs").value * 0.9;
}

function testlog(){
  console.log("i don't know js");
}

function observeTheSky () { $("#observeBtn").click(); }

function beLazy(){
  populateRareResourceThreshold();
  observe = setInterval(observeTheSky, 3*1000);
  basicConvert = setInterval(autoConvert, 2*1000);
  pray = setInterval(autoPray, 5*1000);
  hunt = setInterval(autoHunt, 10*1000);
  trade = setInterval(autoTrade, 10*1000);
  paperManagement = setInterval(autoPaperManagement, 10*1000);
}

function stopBeingLazy(){
  clearInterval(observe);
  clearInterval(basicConvert);
  clearInterval(pray);
  clearInterval(hunt);
  clearInterval(trade);
  clearInterval(paperManagement);
}