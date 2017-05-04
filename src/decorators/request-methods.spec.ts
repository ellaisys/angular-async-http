import {assert} from 'chai';
import { Observable } from 'rxjs';
import { Http, Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { RestClient } from '../rest-client';
import { Get, Post } from './request-methods';
import { Client } from './client';

describe('@Get', () => {

  it('verify request method is set', () => {
    // Arrange
    var method;
    var url;
    let requestMock = new HttpMock((req: Request) => {
      method = req.method;
      url = req.url;
      return Observable.of(new Response(new ResponseOptions()));
    });
    let testClient = new TestClient(requestMock);

    // Act
    testClient.getItems();

    assert.equal(method, RequestMethod.Get);
    assert.equal(url, '/test');
  });
});

describe('@Post', () => {

  it('verify request method is set', () => {
    // Arrange
    var method;
    var url;
    let requestMock = new HttpMock((req: Request) => {
      method = req.method;
      url = req.url;
      return Observable.of(new Response(new ResponseOptions()));
    });
    let testClient = new TestClient(requestMock);

    // Act
    testClient.createItems();

    assert.equal(method, RequestMethod.Post);
    assert.equal(url, '/test');
  });
});

class HttpMock extends Http {

  public callCount:number = 0;
  public lastRequest:Request;

  constructor(private requestFunction: (req: Request) => Observable<Response>) {
    super(null, null);
  }

  public request(req: Request): Observable<Response> {
    this.callCount++;
    this.lastRequest = req;
    return this.requestFunction(req);
  }
}

class TestClient extends RestClient {

  @Get('/test')
  public getItems(): Observable<Response> {
    return null;
  }

  @Post('/test')
  public createItems(): Observable<Response> {
    return null;
  }

}
