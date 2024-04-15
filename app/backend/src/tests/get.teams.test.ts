import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams/TeamsSequelize.models'; 
import { team, teams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', function() {
it('deve retornar todos os times', async function() {

  sinon.stub(Teams, 'findAll').resolves(teams as any);

  const { status, body } = await chai.request(app).get('/teams');

  expect(status).to.equal(200);
  expect(body).to.deep.equal(teams);
});

it('retorna um time pelo id', async function() {
  sinon.stub(Teams, 'findOne').resolves(team as any);

  const { status, body } = await chai.request(app).get('/teams/1');

  expect(status).to.equal(200);
  expect(body).to.deep.equal(team);
});


});
