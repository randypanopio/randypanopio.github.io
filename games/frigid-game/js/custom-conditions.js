//Example of a custom condition:
//This evaluates to true when the given number is strictly bigger
//than a randomly picked number between 0 and 99 (included).
//Example usage: <<random 50>>
//A value of 50 means this condition will evaluate to true, 50% of the time.
var evaluateRandomCondition = function(condition)
{
	//Get a random integer between 0 and 99 (included)
	var n = Math.floor(Math.random()*100);
	//Check if the given number is greater than n
	//0 will never be strictly greater than n
	//100 will always be strictly greater than n
	//You will always be greater than n ❤
  	return n < parseInt(condition.options[0]);
}

//Add functions to evaluate your custom conditions here!
/*
var myCustomCondition = function(condition)
{
	var result = false;

	//Do something here?

	return result;
}
*/

var evaluateFoodMatsCondition = function (condition) {
	if(stats.foodCount >= (7)){
		return true;
	} else {
		return false;
	}
}

var evaluatePowerMatsCondition = function (condition) {
	if(stats.powerCount >= (7)){
		return true;
	} else {
		return false;
	}
}

var evaluateCheckScientist = function (condition) {
	if(stats.hasScientist == true) {
		return true;
	} else {
		return false;
	}
}

var evaluateCheckDogs = function (condition) {
	if(stats.hasDogs == true) {
		return true;
	} else {
		return false;
	}
}

var evaluateCheckFail = function (condition) {
	if(stats.hasScientist == false && stats.hasDogs == false) {
		return true;
	} else {
		return false;
	}
}

//A dictionary of all the known custom conditions, and the function they use to be evaluated.
//Don't forget to add your own "name":function pairs here, too!
var customConditions = {
  "random":evaluateRandomCondition,
  /* "custom":myCustomCondition, */
	"mats_food":evaluateFoodMatsCondition,
	"mats_power":evaluatePowerMatsCondition,
	"check_scientist":evaluateCheckScientist,
	"check_dogs":evaluateCheckDogs,
	"check_fail":evaluateCheckFail,
};
