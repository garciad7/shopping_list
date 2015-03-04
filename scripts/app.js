$(document).ready(function() {
runProgram();

	function runProgram(){
		$("#completed-items").hide();
		var shoppingList = [];  // This assists the add button with dupe checking
		var completedList = []; // When this hits zero, the completed items section will disappear
		
		
		/*
		This function checks if the user enters nothing, a blank space, or a duped item.
		If those conditions are false, the program proceeds:
		*/
		function errorCheck (arg, dataset) {
			if (arg == "" ||  arg == " ") {
				//This displays an error modal. Closing the modal causes its div to be removed. A clean DOM is a happy DOM.
				$('<div id="dialog" title="Dialog Title">You forgot to enter an item. Try again.</div>').hide().appendTo("body").dialog({ autoOpen: true, title: "Error", modal: true, close: function(){$("#dialog").remove();}});
				$("input:first").val("");
			}
			else if (dataset.indexOf(arg) == -1) { //This checks if the value exists in the shoppingList array.  It prevents dupes.
				dataset.push(arg);
				$("#shopping-list").find(".empty").remove();
				$('<li class="list-item"><button class="done spaced-right">&#10003</button><span>'+ arg +'</span></li>').hide().appendTo('#shopping-list').show("clip"); // This creates a list item for the user input, hides it, adds it to the DOM and then shows it with a nice transition.
				$("#shopping-list").sortable();  //This makes the updated shopping list items drag and drop.
				$("input:first").val(""); //This resets the form field to blank.
			}
			else {
				//This displays an error modal. Closing the modal causes its div to be removed. A clean DOM is a happy DOM.
				$('<div id="dialog" title="Dialog Title">You\'ve already added that item. Try again.</div>').hide().appendTo("body").dialog({ autoOpen: true, title: "Error", modal: true, close: function(){$("#dialog").remove();}});
				$("input:first").val("");
			}			
		}		

		$(document).on("click", ".add", function(event){
			event.preventDefault();  //This stops the form from submitting
			var userInput = $("input:first").val();  //This grabs the user's input	
			errorCheck(userInput, shoppingList);
		});

		$(document).on("click", ".done", function(){
			completedList.push($(this).closest("li").find("span").text()); //This helps the anon function on line 54
			
			var itemIndex = shoppingList.indexOf($(this).closest("li").find("span").text());  //This takes the text from the line item to be removed, searches for it in the shoppingList array, and returns the index number.
			shoppingList.splice([itemIndex], 1);
						
			$(this).closest("li").hide("clip", function(){  //This hides the list item.
				$("#completed-items").hide("clip");  //This hides #completed-items.
				$(this).appendTo("#completed-list").show();  //This adds the list item to #completed-items.
				$(this).find("button").removeClass("done").addClass("completed");
				$("#completed-items").show("clip");  //This unhides #completed-items using a nice transition.
			});
		});	
		
		$(document).on("click", ".completed", function(){			
			shoppingList.push($(this).closest("li").find("span").text()); //This adds the item back into the shoppingList array to check for dupes.
			
			var itemIndex = completedList.indexOf($(this).closest("li").find("span").text());  //This takes the text from the line item to be removed, searches for it in the completedList array, and returns the index number.
			completedList.splice([itemIndex], 1);			
			
			$(this).closest("li").hide("clip", function(){ //This hides the list item.
				$("#todo-items").hide("clip");	//This hides the entire todo section (which includes #shopping-list and #completed-items).
				$(this).appendTo("#shopping-list").show();  //This adds the list item back to #shopping-list and unhides it.
				$(this).find("button").html("&#10003").removeClass("completed").addClass("done");
				$("#todo-items").show("clip");  //This unhides the entire todo section.
				if (completedList.length === 0) {
					$("#completed-items").hide("clip");	  //If there's nothing in #completed-items, no reason to show it.
				}
			});
		});
		
		$(document).on("mouseenter", ".completed", function(event){
		     $(this).text("x");
		});
		
		$(document).on("mouseleave", ".completed", function(event){
		     $(this).html("&#10003"); //This gives us the checkmark.
		});
	}
});