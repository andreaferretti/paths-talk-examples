(function () {
  function key_accessor(keys) {
    var a = {};
    for (var i in keys) {
      (function(k) {
        a[k] = function(o) { return o[k]; }
      })(keys[i]);
    }
    return a;
  }

  var pokemon = [
    { name: "Bulbasaur", hp: 45, attack: 49, defense: 49, sp_attack: 65, sp_defense: 65, speed: 45 },
    { name: "Ivysaur", hp: 60, attack: 62, defense: 63, sp_attack: 80, sp_defense: 80, speed: 60 },
    { name: "Venusaur", hp: 80, attack: 82, defense: 83, sp_attack: 100, sp_defense: 100, speed: 80 },
    { name: "Kakuna", hp: 45, attack: 25, defense: 50, sp_attack: 25, sp_defense: 25, speed: 35 },
    { name: "Charmeleon", hp: 58, attack: 64, defense: 58, sp_attack: 80, sp_defense: 65, speed: 80 },
    { name: "Squirtle", hp: 44, attack: 48, defense: 65, sp_attack: 50, sp_defense: 64, speed: 43 },
    { name: "Blastoise", hp: 79, attack: 83, defense: 100, sp_attack: 85, sp_defense: 105, speed: 78 },
    { name: "Butterfree", hp: 60, attack: 45, defense: 50, sp_attack: 90, sp_defense: 80, speed: 70 }
  ];
  var labels = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];

  var radar = new Ractive({
    el: '#ractive',
    template: '#ractive-template',
    data: {
      Radar: paths.Radar,
      center: [0, 0],
      r: 130,
      max: 100,
      accessor: key_accessor(labels),
      data: [pokemon[0]],
      names: pokemon.map(function (p) { return p.name; }),
      labels: labels,
      translate: function(t) {
        var x = t[0], y = t[1];
        return 'translate (' + Math.floor(1.2 * x) + ',' + Math.floor(1.2 * y) + ')';
      },
      x: function(t) { return t[0]; },
      y: function(t) { return t[1]; }
    }
  });

  radar.observe('pokemon', function(i) {
    this.animate({data: [pokemon[i]]});
  });
})();