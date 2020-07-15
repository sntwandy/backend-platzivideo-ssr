const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const axios = require('axios');
const { config } = require('../../../config');

passport.use(new BasicStrategy( async function(email, password, cb) {
  try {
    console.log(config.apiUrl);
    const { data, status } = await axios({
      method: 'post',
      url: `${config.apiUrl}/api/auth/sign-in`,
      data: {
        apiKeyToken: config.apiKeyToken
      },
      auth: {
        password,
        username: email,
      },
    });

    if (!data || status != 200) {
      cb(boom.unauthorized(), false);
    };

    return cb(null, data);

  }catch(error) {
    cb(error);
  };

}));