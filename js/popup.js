// global TrelloPowerUp

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

t.render(function(){
  return t.get('card', 'shared', 'stars')
  .then(function([card, stars]) {
    console.log("render card: " + card);
    console.log("stars: " + stars);

    ///TODO: show stars on page
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
