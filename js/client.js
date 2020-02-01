// global TrelloPowerUp

// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

var GRAY_ICON = './images/icon-gray.svg';

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

    return [{
      //title: '' + stars + ' stars', // for detail badges only
      text: '' + stars + ' stars',
      icon: GRAY_ICON, // for card front badges only
      callback: function(context) {
        return context.popup({
          title: '' + stars + ' stars',
          url: './popup.html',
          height: 184 // we can always resize later, but if we know the size in advance, its good to tell Trello
        });
      }
    }];
  });
};

var cardButtonCallback = function(t){
  return t.popup({
    title: 'Stars',
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
      icon: GRAY_ICON, // don't use a colored icon here
      text: 'Stars',
      callback: cardButtonCallback
    }];
  },
  'card-detail-badges': function(t, options) {
    return getBadges(t);
  }
});

console.log('Loaded by: ' + document.referrer);