// global TrelloPowerUp

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var starsInput = document.getElementById('starsCount');

t.render(function(){
  return t.get('card', 'shared', 'stars', 'null')
  .then(function(stars) {
    if(stars == 'null') {
      stars = 0;
    }
    stars = parseInt(stars);
    console.log("stars: " + stars);

    starsInput.value = "" + stars;
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  });
});

document.getElementById('save').addEventListener('click', function(){
  ///TODO: add a selector for stars
  return t.set('card', 'shared', 'stars', 5)
  .then(function(){
    t.closePopup();
  });
})
