import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import loginService from '../services/Login.service';
import wrongLoginMock from './mocks/login.mock';
import UsersSequelize from '../database/models/UsersSequelize.models';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', function() {
  it('Deve retornar um erro caso os campos não sejam preenchidos', async () => {
    sinon.stub(UsersSequelize, 'findOne').resolves({
        email: "",
        password: "",
    } as any);

    const response = await chai.request('http://localhost:3001').post('/login').send({
    
  });
  
      expect(response.status).to.equal(400);
});
});