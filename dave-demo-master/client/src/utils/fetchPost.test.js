// __tests__/fetch.test.js
import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
// import Fetch from '../fetch'
import  fetchPost  from './fetchPost';

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.post('/', (req, res, ctx) => {
      // respond using a mocked JSON body
      if(req.body.value === 'pizza'){
        return res(ctx.json({greeting: 'hello there'}))
      }
      else{
        return res(ctx.status(401), ctx.json({ success: false }))
      }
    }),
  )
  
  // establish API mocking before all tests
  beforeAll(() => server.listen())
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers())
  // clean up once the tests are done
  afterAll(() => server.close())
  
  test('loads and displays greeting', async () => {
     // arrange
    const value = 'pizza';
    // act
      const res = await fetchPost('/', value);
    // assert
      expect(res.status).toEqual(200)
    })