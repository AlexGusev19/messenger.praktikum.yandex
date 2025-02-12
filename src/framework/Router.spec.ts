import Block from './Block';
import { Router } from './Router';

describe('Проверка Router', () => {
  let router: Router;
  beforeEach(() => {
    router = new Router('app');
    class Component1 extends Block {
      constructor() {
        super({});
      }

      render(): string {
        return '<div>Component1</div>';
      }
    }
    class Component2 extends Block {
      constructor() {
        super({});
      }

      render(): string {
        return '<div>Component2</div>';
      }
    }
    router.use('/test-path', Component1).use('/', Component2);
  });

  test('корректно добавились пути в router', () => {
    expect(router.routes.length).toBe(2);
  });

  test('переход по ссылкам', () => {
    router.go('/');
    expect(router.getCurrentPath()).toBe('/');
    router.go('/test-path');
    expect(router.getCurrentPath()).toBe('/test-path');
  });
});
