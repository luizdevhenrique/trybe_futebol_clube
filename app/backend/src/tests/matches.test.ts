import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';
import MatchesSequelize from '../database/models/MatchesSequelize.models';
import MatchesService from '../services/Matches.service';
import { matchStatusMock, matchesMock } from './mocks/matches.mock';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../database/models/MatchesModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', function () {
beforeEach(sinon.restore)

  it('deve retornar todas as partidas', async function () {

    sinon.stub(MatchesSequelize, 'findAll').resolves(matchesMock as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock);
  });

  it('deve obter o valor do parâmetro inProgress da requisição', function () {
    const req = {
      query: {
        inProgress: 'true'
      }
    };

    const query = req.query.inProgress as string;

    expect(query).to.equal('true');
  });

  it('deve retornar as partidas filtradas', async function () {

    sinon.stub(MatchesSequelize, 'findAll').resolves([{
      "awayTeam": {
        "teamName": "Grêmio"
      },
      "awayTeamGoals": 1,
      "awayTeamId": 8,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "homeTeamGoals": 1,
      "homeTeamId": 16,
      "id": 1,
      "inProgress": false
    }] as any)

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal([{
      "awayTeam": {
        "teamName": "Grêmio"
      },
      "awayTeamGoals": 1,
      "awayTeamId": 8,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "homeTeamGoals": 1,
      "homeTeamId": 16,
      "id": 1,
      "inProgress": false
    }])
  });

  it('deve criar uma partida', async function () {
    sinon.stub(MatchesSequelize, 'create').resolves({
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": true
    } as any);

    const response = await chai.request(app).post('/matches').send({
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
    }).set(
      {authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEzMjAxMzAzfQ.IcmTxTPmlXBfq0Jn7yzpkmVs4yWC70YD0Q_Rh0JcDZM'});
    expect(response.status).to.equal(201);
    expect(response.body).to.be.deep.equal({
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": true
    });
  })
});
