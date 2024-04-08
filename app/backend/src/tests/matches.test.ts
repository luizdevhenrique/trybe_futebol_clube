import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesSequelize.models';
import { matchesMock, filterMatchesMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', function() {
  it('deve retornar todas as partidas', async function() {

    sinon.stub(Matches, 'findAll').resolves(matchesMock as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock);
  });

    it('deve filtrar as partidas e retornar o resultado', async function() {

    sinon.stub(Matches, 'findAll').resolves(matchesMock as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(filterMatchesMock);

    });
  });
