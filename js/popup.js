// global TrelloPowerUp

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var starsInput = document.getElementById('starsCount');
var addCategoryButton = document.getElementById('add-category');
var categoryContent = document.getElementById('category-content');
var starsCategory = document.getElementById('stars-category');

addCategoryButton.onclick = function() {
  categoryContent.hidden = false;
  return t.sizeTo('#content').done();
};

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
    t.get('card', 'shared', 'stars', 'null'),
    t.get('card', 'shared', 'stars-category', 'null')
  ])
  .spread(function(stars, category){
    if(stars == 'null') {
      stars = 0;
    }
    stars = parseInt('' + stars);
    console.log('stars: ' + stars);
    starRating1.setRating(stars);

    if(category != 'null') {
      console.log('category: ' + category);
      starsCategory.value = category;
    }
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  });
});

document.getElementById('save').addEventListener('click', function(){
  var stars = starRating1.getRating();
  var category = starsCategory.value;
  if((category == 'null') || (category.length == 0)) category = 'null';
  if(category.toLowerCase() == 'rating') category = 'null';
  return t.set('card', 'shared', { 'stars': stars, 'stars-category': category })
  .then(function(){
    t.closePopup();
  });
})
