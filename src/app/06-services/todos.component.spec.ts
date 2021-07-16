import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import {of, throwError} from "rxjs";
import {empty} from "rxjs/internal/Observer";

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) })
    service = new TodoService(spy);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned array', () => {
    let todos = [1,2,3,4];
    spyOn(service, 'getTodos').and.returnValue(of(todos));

    component.ngOnInit();

    expect(component.todos).toBe(todos);
  });

  it('should call server to save changes when new todo item is added', () => {
    let spy = spyOn(service, 'add').and.returnValue(of(empty));

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add new todo item returned from server', () => {
    let todo = {id: 1};
    spyOn(service, 'add').and.returnValue(of(todo));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set message if server returns error when adding new todo', () => {
    let error = 'error from server';
    spyOn(service, 'add').and.returnValue(throwError(error));

    component.add();

    expect(component.message).toBe(error);
  });

  it('should call server to delete todo item if user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(of(empty));

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call server to delete todo item if user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(of(empty));

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });

});
