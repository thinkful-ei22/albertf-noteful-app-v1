'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Reality check', function(){
  it('true should be true', function() {
    expect(true).to.be.true;
  });
  it('true should be true', function() {
    expect(true).to.be.true;
  });
  it('2 + 2 should equal 4', function() {
    expect(2 + 2).to.equal(4);
  });
});

describe('Express static', function() {

  it('GET request "/" should return the index page', function() {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('404 handler', function() {

  it('should respond with 404 when given a bad path', function() {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});

describe('GET /api/notes', function() {
  it('should return the default of 10 Notes as an array', function () {
    return chai.request(app)
      .get('/api/notes')
      .then(res => {
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(10);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
});

describe('GET /api/notes/:id', function () {

  it('should return correct notes', function () {
    return chai.request(app)
      .get('/api/notes/1000')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.equal(1000);
        expect(res.body.title).to.equal('5 life lessons learned from cats');
      });
  });

  it('should respond with a 404 for an invalid id', function () {
    return chai.request(app)
      .get('/api/notes/DOESNOTEXIST')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });

});
