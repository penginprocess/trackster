var Trackster = {};
const API_KEY = "0ff7806303c0d952771eda27b4b03ec9";

$(document).ready(function () {
  $('#search-button').click(function() {
    console.log($('#search-input').val());
    Trackster.searchTracksByTitle($('#search-input').val());
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  var $trackList = $('#track-list');
  console.log(tracks);
  $trackList.empty();
  const trackslength=30;
  for (var trackIndex = 0; trackIndex < trackslength; trackIndex++) {
    var track = tracks[trackIndex];
    var htmlTrackRow =
      '<div class="row track">' +
      '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
      '    <a href="' + track.url + '" target="_blank">' +
      '      <i class="fa fa-play-circle-o fa-2x"></i>' +
      '    </a>' +
      '  </div>' +
      '  <div class="col-xs-4">' + track.name + '</div>' +
      '  <div class="col-xs-2">' + track.artist + '</div>' +
      '  <div class="col-xs-2">' + track.image[0] + '</div>' +
      '  <div class="col-xs-2">' + track.listeners + '</div>' +
      '</div>';

    $trackList.append(htmlTrackRow);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
      datatype: 'jsonp',
      success: function(data) {
        Trackster.renderTracks(data.results.trackmatches.track);
  }
});

};
