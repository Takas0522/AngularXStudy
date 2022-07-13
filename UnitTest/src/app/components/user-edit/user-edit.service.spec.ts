import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserEditService } from './user-edit.service';
import { HttpClient } from '@angular/common/http';
import { defer, Observable } from 'rxjs';
import { asyncData } from 'src/app/tesiting/asyncData';

describe('UserListService', () => {

  let service: UserEditService;
  let httpClientSpy: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: []
    }).compileComponents();
    service = TestBed.inject(UserEditService);
    httpClientSpy = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Observableな値が返却されるテスト', (done: DoneFn) => {
    spyOn(httpClientSpy, 'get').and.returnValue(asyncData('fuga'));
    service.dummyTest().subscribe(x => {
      expect(x).toEqual('fuga');
      done();
    });
  });

  it('Observableな値が返却されるテスト2', (done: DoneFn) => {
    spyOn(httpClientSpy, 'get').and.returnValue(asyncData('hoge'));
    service.dummyTest().subscribe(x => {
      expect(x).toEqual('hoge');
      done();
    });
  });

});
