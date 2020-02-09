// global TrelloPowerUp

// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

var STAR = '\u2605';

var cardButtonCallback = function(t){
  return t.popup({
    title: 'Rate Card',
    url: './popup.html',
    height: 100 // we can always resize later, but if we know the size in advance, its good to tell Trello
  });
};

var getFrontBadges = function(t){
  return Promise.all([
    t.get('card', 'shared', 'stars', null),
    t.get('card', 'shared', 'stars-category', null)
  ])
  .spread(function(stars, category){
    if(!stars) {
      stars = 0;
    }
    stars = parseInt('' + stars);

    if(stars <= 0) {
      return [];
    }
    if(stars > 5) {
      return [];
    }

    var starText = STAR + stars;
    if(category) {
      starText = starText + '(' + category + ')';
    }
    return [{
      text: starText
    }];
  });
};

var getBackBadges = function(t){
  return Promise.all([
    t.get('card', 'shared', 'stars', null),
    t.get('card', 'shared', 'stars-category', null)
  ])
  .spread(function(stars, category){
    if(!stars) {
      stars = 0;
    }
    stars = parseInt('' + stars);

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

    if(!category) {
      category = 'Rating';
    }

    return [{
      title: category + ': ' + starsText,
      text: 'Rate',
      callback: cardButtonCallback
    }];
  });
};

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return getFrontBadges(t);
  },
  'card-buttons': function(t, options) {
    return [{
      text: STAR + ' Rate Card',
      callback: cardButtonCallback
    }];
  },
  'card-detail-badges': function(t, options) {
    return getBackBadges(t);
  }
});