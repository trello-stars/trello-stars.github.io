// global TrelloPowerUp

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var starsInput = document.getElementById('starsCount');
var addCategoryButton = document.getElementById('add-category');
var categoryContent = document.getElementById('category-content');
var starsCategory = document.getElementById('stars-category');
var starsSave = document.getElementById('stars-save');
var starsReset = document.getElementById('stars-reset');

var starRating1 = raterJs( {
  starSize:32, 
  element:document.querySelector('#rater'), 
  rateCallback:function rateCallback(rating, done) {
    this.setRating(rating);
    done();
  }
});

t.render(function(){
  return Promise.all([
    t.get('card', 'shared', 'stars', null),
    t.get('card', 'shared', 'stars-category', null)
  ])
  .spread(function(stars, category){
    if(!stars) {
      stars = 0;
    }
    stars = parseInt('' + stars);
    starRating1.setRating(stars);

    if(category) {
      starsCategory.value = category;
    }

    starsCategory.placeholder = t.localizeKey('category-title');
    starsSave.value = t.localizeKey('save');
    starsReset.value = t.localizeKey('remove');
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  });
});

document.getElementById('save').addEventListener('click', function(){
  var stars = starRating1.getRating();
  var category = starsCategory.value;
  if(!stars) stars = null;
  if(!category) category = null;
  return t.set('card', 'shared', { 'stars': stars, 'stars-category': category })
  .then(function(){
    t.closePopup();
  });
})

document.getElementById('reset').addEventListener('click', function(){
  return t.set('card', 'shared', { 'stars': null, 'stars-category': null })
  .then(function(){
    t.closePopup();
  });
})
