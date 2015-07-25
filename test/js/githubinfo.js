window.onload = function() {
  $.ajax({
    url: 'https://api.github.com/users/francislewis',
    type: 'GET',
    dataType: 'JSONP',
    success: function(userdata) {
      document.getElementById('repos').innerHTML = userdata.data['public_repos'];
      document.getElementById('gists').innerHTML = userdata.data['public_gists'];
    },
    error: function(e) {
      if (typeof console !== "undefined" && console !== null) {
        console.error(e);
      }
    }
  });
  });
