const axios = require('axios');

function buildShortUrl(code) {
  console.log(window.location);
  return '/a/' + code;
}

module.exports = {
  el: '#shortener',
  data: {
    url: '',
    shortUrl: ''
  },
  methods: {
    shorten: function () {
      if (!this.$data.url)
        return;
      axios.get('/api/urls/save', {
        params: {
          url: this.$data.url
        }
      })
        .then(function (response) {
          this.$data.shortUrl = buildShortUrl(response.data.code);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};