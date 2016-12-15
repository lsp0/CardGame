var deck = [];
var hand = [];
var table = [];
// debug
var deckList = $('#deck').find("ul");
var handList = $('#hand').find("ul");
var tableList = $('#table').find("ul");

// defines ranks - abbreviation/id, string, card numerical value
var ranks = [
	new Rank("A","Ace",1), 
	new Rank("2","Two",2),
	new Rank("3","Three",3),
	new Rank("4","Four",4),
	new Rank("5","Five",5),
	new Rank("6","Six",6),
	new Rank("7","Seven",7),
	new Rank("8","Eight",8),
	new Rank("9","Nine",9),
	new Rank("10","Ten",10),
	new Rank("J","Jack",11),
	new Rank("Q","Queen",12),
	new Rank("K","King",13)
];
// defines suits - abbreviation/id, string, symbol, color
var suits = [
	new Suit("S","Spades","\u2660","Black"),
	new Suit("H","Hearts","\u2665","Red"),
	new Suit("D","Diamonds","\u2666","Red"),
	new Suit("C","Clubs","\u2663","Black")
];

// object defining Rank stores ID, Symbol, String and Value
function Rank(id, string, value){
	this.id = id; // abbreviation / id eg: A for Ace, J for Jack, 2 for two
	this.symbol = this.id; // for rank this is the same as ID
	this.string = string; // string when printed as text
	this.value = value; // card numerical value

	// getters
	this.toString = function(){return this.string;};
	this.getSymbol = function(){return this.symbol;};
	this.getID = function(){return this.id;};
	this.getValue = function(){return this.value;};
};

// object defining Suit stores ID, String, Symbol and Color
function Suit(id, string, symbol, color, value){
	this.id = id; // abbreviation / id eg: D for diamond
	this.string = string; // string when printed as text
	this.symbol = symbol; // unicode symbol, shorthand display
	this.color = color; // colour for text display

	// getters
	this.toString = function(){return this.string;};
	this.getID = function(){return this.id;};
	this.getSymbol = function(){return this.symbol;};
	this.getColor = function(){return this.color;};
};

function Card(rank, suit) {
	// generate individual card value to prevent forgery
	this.id = generateUUID();

	// sets rank and suit as typed in objects
	this.rank = rank;
	this.suit = suit;

	// returns abbreviated string for display eg: A
	this.toShortString = function(){
		return this.rank.getSymbol() + " " + this.suit.getSymbol();
	}
	// returns full string 
	this.toString = function(){
		return this.rank.toString() + " of " + this.suit.toString();
	};

	this.getID = function(){
		return this.id;
	};
};

function resetStack(stack) {
	stack = [];
	for(suit in suits){
		for(rank in ranks){
			stack.push(new Card(ranks[rank], suits[suit]));
		};
	};
	return stack;
};

function displayStack(stack, stackList, show){
	stackList.empty();
	stackList.append('<li class="special fa fa-random"></li>');
	stackList.append('<li class="special fa fa-plus-square-o"></li>');
	for(card in stack){
		stackList.append(displayCard(stack[card], show));
	}
};

function displayCard(card, show){
	var classes = "card";
	if(card.suit.getColor() === "Red")
		classes += " red";

	if(!show){
		return "<li class='card facedown'>N/A</li>";
	}
	return "<li class='" + classes + "'>" + card.rank.getSymbol() + "<br><span class='suit'>" + card.suit.getSymbol() + "</li>";
}

// shuffles array / deck / hand
function shuffle(array){
	var current = array.length, swap, random;

	// While there are elements left to shuffle (!= 0)
	while (current) {

		// Pick a random remaining element
		random = Math.floor(Math.random() * current--);

		// Swap with current element
		swap = array[current];
		array[element] = array[random];
		array[random] = swap;

	}
	return array;
}

// function resets
deck = resetStack(deck);
displayStack(deck, deckList, false);

hand = resetStack(hand);
displayStack(hand, handList, true);

table = resetStack(table);
displayStack(table, tableList, true);

// UUID generator from stackoverflow 105034 by Briguy37 and broofa
function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}