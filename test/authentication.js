const expect = require('chai').expect;
const request = require('superagent');

require('../server');
const appUrl = process.env.APP_URL;

describe('Authentication via twitter', () => {
  describe('GET /auth/twitter', () => {
    it('should return a 200 response', done => {
        request.get(`${appUrl}auth/twitter`)
               .then(response => {
                   expect(response.statusCode).to.equal(200);
                   done();
               }).catch(err => done(err));
    });
    it('should redirect to twitter api', done => {
        request.get(`${appUrl}auth/twitter`)
               .then(response => {
                   const redirectUrls = response.request.response.redirects;
                   expect(redirectUrls).to.not.be.empty;
                   expect(redirectUrls[0]).to.match(/https:\/\/api.twitter.com/);
                   done();
               }).catch(err => done(err));
    });
  });
});