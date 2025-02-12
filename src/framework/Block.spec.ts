import Block from './Block';

describe('Проверка Block', () => {
  let blockClass: typeof Block;

  beforeEach(() => {
    class Component extends Block {
      constructor(props: unknown) {
        super({ ...(props as object) });
      }

      render(): string {
        return '<div>{{Content}}</div>';
      }
    }

    blockClass = Component;
  });

  test('корректно создается класс', () => {
    const content = 'Контент';
    const Component = new blockClass({ Content: content });
    const render = jest.spyOn(Component, 'render');
    Component.render();

    expect(Component.getContent().innerHTML).toBe(content);
    expect(render).toHaveBeenCalled();
  });

  test('проверка события клика', () => {
    const content = 'Контент';
    const handleClick = jest.fn();
    const Component = new blockClass({
      Content: content,
      events: {
        click: handleClick,
      },
    });
    Component.render();
    Component.getContent().dispatchEvent(new MouseEvent('click'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('передача Props', () => {
    const content = 'Контент';
    const Component = new blockClass();
    const render = jest.spyOn(Component, '_render');
    Component.setProps({ Content: content });

    expect(render).toHaveBeenCalled();
    expect(Component.getContent().innerHTML).toBe(content);
  });
});
