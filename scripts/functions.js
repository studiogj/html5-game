$(document).ready(function() { 

//beginvariabelen
var score = 0;
var gameArea = "#gameArea"
var level = 0;
//verberg de game en het eindscherm
$("#endGameCanvas").hide();
$("#gameCanvas").hide();

//de dimensies voor het scherm zetten
resizeGame();
//verwijder klik vertraging
FastClick.attach(document.body);

////////////////////////////////////////////////////////////

//functie score berekenen
function scorecount(){
	score = score + 1;	
	$("#score").text(score);	
}


//Wanneer een launcher wordt geklikt
$(".rocket").click(function() {  
		// positie verkrijgen van de launcher					
		 var position = $(this).position();
		 var leftposition = position.left;
		 var clickedLauncher = $(this).attr('id');
		 ReadyFire (leftposition, clickedLauncher);
}) 					   



//beginstatus van de launchers, deze mogen vuren
	rocketlaunch1 = "yes";
	rocketlaunch2 = "yes";
	rocketlaunch3 = "yes";

function ReadyFire(leftposition, clickedLauncher){
	
	if (clickedLauncher == "rocketlaunch1" && rocketlaunch1 == "yes"){
		shoot(leftposition, clickedLauncher);
		loader("#loader1");
		rocketlaunch1 = "no";
	}
	if (clickedLauncher == "rocketlaunch2" && rocketlaunch2 == "yes"){
		shoot(leftposition, clickedLauncher);
		loader("#loader2");
		rocketlaunch2 = "no";
	}
	if (clickedLauncher == "rocketlaunch3" && rocketlaunch3 == "yes"){
		shoot(leftposition, clickedLauncher);
		loader("#loader3");
		rocketlaunch3 = "no";
	}
}

//functie afvuren launcher
function shoot(leftposition, clickedLauncher){
	
	
	function ResetLauncher(){
//reset de launchers zodat ze weer mogen vuren	
	if (clickedLauncher == "rocketlaunch1"){
		rocketlaunch1 = "yes";
	}
	if (clickedLauncher == "rocketlaunch2"){
		rocketlaunch2 = "yes";
	}
	if (clickedLauncher == "rocketlaunch3"){
		rocketlaunch3 = "yes";
	}		
}
	
	var newElement=$('.ammo').eq(0).clone();
	newElement.appendTo(gameArea);
	// positie overnemen van de geklikte launcher
	newElement.css({left: leftposition});
	
	//Raak?
	$(newElement).collide(".collide", function(o,t){
		
		o.removeClass("collide").remove();
		t.removeClass("collide").remove();
		scorecount();
		
 		});
	
	newElement.animate({ 'bottom': '100%'}, 1500, "linear",
    		function() {
	// verwijder de ammo aan het einde (valt buiten scherm)
	newElement.remove();
	ResetLauncher();
	
});
		
}

function loader (loaderId){
//loaders animeren
	$(loaderId).css({height: "0"});
	$(loaderId).animate({height: "8%"}, 1500)
}
///////////////////////////////////////////////
///////////////////////////////////////////////


function DeployBirds(numberB, basicspeed1, basicspeed2, basicdelay1, basicdelay2) {

var i = 0;
function nextTime() {
         if (i < numberB){
             i++;
					var basicSpeed = Math.floor((Math.random()*basicspeed1)+basicspeed2);
					var basicDelay = Math.floor((Math.random()*basicdelay1)+basicdelay2);
					var basicBottomCord = Math.floor((Math.random()*60)+30);
					var idString1 = Math.floor(Math.random() * 10000000000000001)
					var newCollidet=$(".collide").eq(0).clone();
					newCollidet.appendTo(gameArea);
					newCollidet.css({bottom: basicBottomCord + "%"});
					newCollidet.css({left: "-6%"});
					newCollidet.attr("id", "enemy" + idString1);
					newCollidet.animate({left: "100%"}, basicSpeed, "linear", function(){newCollidet.remove()});
             		setTimeout(nextTime, basicDelay);
         }
     }
nextTime();

// controleren of de Game is geeindigd. (alle enemies gedeployed en geen enemies meer op het veld)
var endGameCheck = setInterval(function() {
					if($(".collide").length == 1 && i == numberB){ 
					endGame(numberB);
					clearInterval(endGameCheck);
}
}, 5000);
	
}


//starten van een game
function startGame(){
	$("#endGameCanvas").hide();
	$("#startGameCanvas").hide();
	$("#gameCanvas").show();
	$("#score").text(0);
	$("#levelText").text(level);
	score = 0;
//LEVEL Variabelen
//numberB, basicspeed1, basicspeed2, basicdelay1, basicdelay2
if (level==1){
DeployBirds(3, 16000, 15000, 6000, 3000);
};
if (level==2){
DeployBirds(5, 11000, 9000, 6000, 3000);
};
if (level==3){
DeployBirds(7, 11000, 9000, 6000, 3000);
};
if (level==4){
DeployBirds(10, 11000, 9000, 6000, 3000);
};
if (level==5){
DeployBirds(12, 11000, 9000, 6000, 3000);
};
}
///////////////////////////////////////////////
function endGame(numberB){
	$("#endGameCanvas").show();
	$("#gameCanvas").hide();
	var score = $("#score").text();
	//slagingspercentage berekenen
	var onePercent =  numberB / 100;
	var ultimateScore = score / onePercent;
	console.log(ultimateScore);
	// score hoger dan 80 of gelijk? gewonnen!
	if (ultimateScore >= 80){
	$('#endNext, #endAgain').show();
	$('#endAgain').hide();
	$("#endText").html("<p>Hoera! je hebt " + score + " van de " + numberB + " gevangen.</p>");
	} else {
	//verloren
	$('#endNext, #endAgain').show();
	$('#endNext').hide();
	$("#endText").html("<p>Helaas! je hebt " + score + " van de " + numberB + " gevangen, dat is niet genoeg.</p> ");
	}
}
//////////////////////////////////////////////
//start een game
$(".nextButton").click(function(){
	level = level + 1;
	startGame(); 
	});
$(".againButton").click(function(){
	startGame(); 
	});

});