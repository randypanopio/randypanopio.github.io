//used for loading final status

var defaultStats = {
  partyCount:16,
	powerCount:12,
	foodCount:12,
	day:0,
  hasScientist:false
}

function loadStats(){
  var finalDay = document.getElementById('final_day');
  var finalParty = document.getElementById('final_party');
  finalParty.innerHTML = localStorage.getItem('stats_party');
  finalDay.innerHTML = localStorage.getItem('stats_days');
}

loadStats();

function resetStats() {
  localStorage.setItem('stats_party', defaultStats.partyCount);
  localStorage.setItem('stats_days', defaultStats.day);
}
