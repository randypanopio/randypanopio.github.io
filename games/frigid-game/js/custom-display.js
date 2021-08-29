/*
The scene display timeline:
- The scene is cleared (choices and characters are removed from the page)
- The actions are executed (changing place, updating variables, etc)
- The character is displayed
- The conditions on every choice are evaluated, and the available choices are displayed
- The player clicks on a choice, usually triggering a change of scene
*/
//

var stats = {
	partyCount:16,
	powerCount:12,
	foodCount:12,
	day:0,
	hasScientist:false,
	hasDogs:false
}

var matsUpdateSubstring = "$";
var dayUpdateSubstringShort = "$d";
var dayUpdateSubstringMed = "$e";
var dayUpdateSubstringLong = "$f";
var deathFlag = "%die:";
var gainFlag = "%gain:";
var powerGainSubstring = "@pg:";
var foodGainSubstring = "@fg:";
var powerLossSubstring = "@pl:";
var foodLossSubstring = "@fl:";
var gainScientist = "&sci";
var gainDogs = "&dog";
var bothGainSubstring = "@bg:";
var endSubstring = "*end";

var dayStringElement = document.getElementById('days');
var partyStringElement = document.getElementById('party');
var foodStringElement = document.getElementById('food');
var powerStringElement = document.getElementById('power');

function onSceneCleared()
{
	if(stats.foodCount <= 0) {
		localStorage.setItem('stats_party', stats.partyCount);
		localStorage.setItem('stats_days', stats.day);
		location = "endstarve.html";
		return true;
	}
	if(stats.powerCount <= 0) {
		localStorage.setItem('stats_party', stats.partyCount);
		localStorage.setItem('stats_days', stats.day);
		location = "endfreeze.html";
		return true;
	}
	//Custom code that will be executed right after the scene has been cleared from its choices and characters,
	//before any of the content of the scene is processed.
}

function onPlaceDisplayed(place)
{
	//Custom code that will be executed right after a place has been displayed in a scene
}

function onCharacterDisplayed(character)
{
	//Custom code that will be executed right after a character has been displayed in a scene
}

function onSceneDisplayed(scene)
{
	//Custom code that will be executed right after a scene is completely drawn
}

function onChoiceClicked(targetSceneId)
{
	if(targetSceneId.toLowerCase().includes(endSubstring)){
		stats.foodCount =1;
		stats.powerCount =1;
		foodStringElement.innerHTML = stats.foodCount;
		powerStringElement.innerHTML = stats.powerCount;
	}

	if(targetSceneId.toLowerCase().includes(gainScientist)){
			stats.hasScientist = true;
			console.log("got scientist")
	}

	if(targetSceneId.toLowerCase().includes(gainDogs)){
			stats.hasDogs = true;
			console.log("got dogs")
	}

	if(targetSceneId.toLowerCase().includes(matsUpdateSubstring)) {
		stats.foodCount -=1;
		stats.powerCount -=1;
		foodStringElement.innerHTML = stats.foodCount;
		powerStringElement.innerHTML = stats.powerCount;
	}

	if(targetSceneId.toLowerCase().includes(foodGainSubstring)) {
		var toAdd = Number(targetSceneId.substring(targetSceneId.indexOf(foodGainSubstring) + 4));
		stats.foodCount += toAdd;
		foodStringElement.innerHTML = stats.foodCount;
		// console.log(stats.foodCount);
	}

	if(targetSceneId.toLowerCase().includes(powerGainSubstring)) {
		var toAdd = Number(targetSceneId.substring(targetSceneId.indexOf(powerGainSubstring) + 4));
		stats.powerCount += toAdd;
		powerStringElement.innerHTML = stats.powerCount;
		// console.log(stats.powerCount);
	}

	if(targetSceneId.toLowerCase().includes(foodLossSubstring)) {
		var toLose = Number(targetSceneId.substring(targetSceneId.indexOf(foodLossSubstring) + 4));
		stats.foodCount -= toLose;
		foodStringElement.innerHTML = stats.foodCount;
		// console.log(stats.foodCount);
	}

	if(targetSceneId.toLowerCase().includes(powerLossSubstring)) {
		var toLose = Number(targetSceneId.substring(targetSceneId.indexOf(powerLossSubstring) + 4));
		stats.powerCount -= toLose;
		powerStringElement.innerHTML = stats.powerCount;
		// console.log(stats.powerCount);
	}

	if(targetSceneId.toLowerCase().includes(bothGainSubstring)) {
		var toAdd = Number(targetSceneId.substring(targetSceneId.indexOf(bothGainSubstring) + 4));
		stats.powerCount += toAdd;
		stats.foodCount += toAdd;
		powerStringElement.innerHTML = stats.powerCount;
		foodStringElement.innerHTML = stats.foodCount;
	}


	if(targetSceneId.toLowerCase().includes(dayUpdateSubstringShort)){
		stats.day += getRandomInt(3,4);
		dayStringElement.innerHTML = stats.day;
	} else if (targetSceneId.toLowerCase().includes(dayUpdateSubstringMed)){
		stats.day += getRandomInt(5,8);
		dayStringElement.innerHTML = stats.day;
	} else if (targetSceneId.toLowerCase().includes(dayUpdateSubstringLong)){
		stats.day += getRandomInt(10,15);
		dayStringElement.innerHTML = stats.day;
	}

	if(targetSceneId.toLowerCase().includes(deathFlag)){
		// console.log(stats.partyCount);
		var toRemove = Number(targetSceneId.substring(targetSceneId.indexOf(deathFlag) + 5));
		// console.log(toRemove);
		stats.partyCount -= toRemove;
		partyStringElement.innerHTML = stats.partyCount;
	}

	if(targetSceneId.toLowerCase().includes(gainFlag)){
		var toAdd = Number(targetSceneId.substring(targetSceneId.indexOf(gainFlag) + 6));
		stats.partyCount += toAdd;
		partyStringElement.innerHTML = stats.partyCount;
	}

	//Custom code that will be executed when the player clicks on a choice
	//targetSceneId can be an actual scene identifier, but it could also be a special value that you want to catch instead!
	//In any case, this function needs to return false for the default behaviour to be executed.
	//The default behaviour is to display the scene that has targetSceneId as its identifier.
	//If you've done something else and want to prevent the scene from displaying, return true instead.

	//Example of a custom behaviour upon clicking on a choice:
	//Redirecting the player to an ending page if the target of the choice is called "end"
	if(targetSceneId.toLowerCase() == "end")
	{
		localStorage.setItem('stats_party', stats.partyCount);
		localStorage.setItem('stats_days', stats.day);
		location = "end.html";
		return true;
	}

	return false;
}

// retrieve random int
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
