

$(document).ready(function(){
	var topics = [
	'Spongebob',
	'Squidward',
	'Mr Krabs',
	'Patrick',
	'Mermaid Man',
	'Barnacle Boy',
	'Plankton',
	'Mrs. Puff',
	]
//loops through array to make topic buttons
	function initButton(){
		$('#buttonList').empty();
		for (i = 0; i < topics.length; i++){
			var newPress = $('<button>');
			newPress.addClass('btn')
			newPress.addClass('btn-primary')
			newPress.addClass('topicButtons')
			newPress.html(topics[i]);
			newPress.appendTo('#buttonList')

		}
	}
	initButton()
//click function for topic buttons to display search results
	$(document).on('click','.topicButtons', function(){
		var searchReturn = $(this).html();
		var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + searchReturn + '&limit=12&rating=pg&api_key=dc6zaTOxFJmzC';
		$.ajax({url: queryUrl, method: 'GET'})
		.done(function(response){
			console.log(response)
			var resultbox = $('#searchResults')
			resultbox.empty()
			for (i = 0; i < response.data.length; i++){
				var resultDiv = $('<div>')
				resultDiv.addClass('resultDiv')
				var image = $('<img>')
				var stillGif = response.data[i].images.original_still.url
				var moveGif = response.data[i].images.original.url
				image.attr('src', stillGif)
				image.attr('still', stillGif)
				image.attr('animated', moveGif)
				image.attr('alt', searchReturn + ".gif")
				image.attr('currently', 'still')
				image.addClass('searchResults')
				image.appendTo(resultDiv)
				resultDiv.appendTo(resultbox)
			}

		})
	})
//click function to start/stop gif animations
	$(document).on('click','.searchResults', function(){
		var state = $(this).attr('currently')

		if( state == 'still'){
			$(this).attr('src',$(this).attr('animated'));
			$(this).attr('currently', 'animated');
		}
		else {
			$(this).attr('src',$(this).attr('still'));
			$(this).attr('currently', 'still');	
		}

	
	})
//adds a new button to topics
	$(document).on('click', '.btn-success', function(){
		if ($('#userAdd').val().trim() == ''){
			alert('This field must have a value to add a button')
		}		
		else{
		newButton = $('#userAdd').val();
		topics.push(newButton);
		$('#userAdd').val('');
		initButton();
		console.log(topics)
		}
	})
	
	
})

