var token;

var Video = function(value) {
  this.thumbnailimage = value.snippet.thumbnails.medium.url;
  this.largethumbnailimage = value.snippet.thumbnails.high.url;
  this.channellink = 'https://www.youtube.com/channel/' + value.snippet.channelId;
  this.channelname = value.snippet.channelTitle;
  this.link = 'https://www.youtube.com/watch?v=' +  value.id.videoId;
  this.title = value.snippet.title;
};

Video.prototype.makehtml = function() {
  this.html = '<li><a target="_new" href="'+ this.link +'"><h1>'+ this.title +'</h1></a><a target="_new" href="' + this.channellink + '"><h2>' + this.channelname + '</h2></a><a  data-lightbox="' + this.largethumbnailimage + '" href="' + this.largethumbnailimage + '"><img src="' + this.thumbnailimage + '"></a></li>';
  return this.html;
};

$(function() {
    $('#search-term').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        $('#search-results').empty();
        getRequest(searchTerm);

    });

    $('#nextpage').click(function () {
        var searchTerm = $('#query').val();

        getRequest(searchTerm, token);

    });

});

function getRequest(searchTerm, tokenInput) {
	var params = {
		part:'snippet',
    key: 'AIzaSyA3_pbYGu7QwIGraJ7MwH0eM09KZR9U2yA',
    q: searchTerm,
    pageToken: tokenInput
	};
	url = 'https://www.googleapis.com/youtube/v3/search';

	$.getJSON(url, params, function(data) {
      console.log(data);
      token = data.nextPageToken;
		showResults(data.items);
	});
}


function showResults(results) {
    var html = "";
    $.each(results, function(index, value) {
        var itemvideo = new Video(value);
        html += itemvideo.makehtml();
    });
    $('#search-results').append(html);
}
var token;

$(function() {
    $('#search-term').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        $('#search-results').empty();
        getRequest(searchTerm);

    });

    $('#nextpage').click(function () {
        var searchTerm = $('#query').val();

        getRequest(searchTerm, token);

    });

});
