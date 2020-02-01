// global TrelloPowerUp

// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

var GRAY_ICON = './images/icon-gray.svg';
var STAR = '\u2605';

var getBadges = function(t){
  return t.get('card', 'shared', 'stars', 'null')
  .then(function(stars) {
    if(stars == 'null') {
      stars = 0;
    }
    stars = parseInt("" + stars);

    if(stars <= 0) {
      return [];
    }
    if(stars > 5) {
      return [];
    }

    var starsText = '';
    for(i = 0; i < stars; i++) {
      starsText += STAR;
    }

    var starsFrontText = STAR + stars;

    return [{
      text: starsFrontText,
      title: starsText,
      cardButtonCallback
      /*callback: function(context) {
        return context.popup({
          title: starsText,
          url: './popup.html',
          height: 184
        });
      }*/
    }];
  });
};

var cardButtonCallback = function(t){
  return t.popup({
    title: 'Rate Card',
    url: './popup.html',
    height: 184 // we can always resize later, but if we know the size in advance, its good to tell Trello
  });
};

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return getBadges(t);
  },
  'card-buttons': function(t, options) {
    return [{
      text: STAR + ' Rate Card',
      callback: cardButtonCallback
    }];
  },
  'card-detail-badges': function(t, options) {
    return getBadges(t);
  }
});

console.log('Loaded by: ' + document.referrer);