import { HTTPTransport } from '../api/HTTP';

describe('Проверка HTTP', () => {
  let api: HTTPTransport;
  let request: jest.SpyInstance;

  beforeEach(() => {
    api = new HTTPTransport('api/v2/chats');
    request = jest
      .spyOn(api, 'request')
      .mockImplementation(() =>
        Promise.resolve({} as unknown as XMLHttpRequest),
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('событие GET сработало', async () => {
    await api.get('/', { data: { d: 1 } });
    expect(request).toHaveBeenCalledWith('/', {
      data: { d: 1 },
      method: 'GET',
    });
  });

  test('событие PUT сработало', async () => {
    await api.put('/', { data: { d: 1 } });
    expect(request).toHaveBeenCalledWith('/', {
      data: { d: 1 },
      method: 'PUT',
    });
  });

  test('событие POST сработало', async () => {
    await api.post('/', { data: { d: 1 } });
    expect(request).toHaveBeenCalledWith('/', {
      data: { d: 1 },
      method: 'POST',
    });
  });

  test('событие DELETE сработало', async () => {
    await api.delete('/', { data: { d: 1 } });
    expect(request).toHaveBeenCalledWith('/', {
      data: { d: 1 },
      method: 'DELETE',
    });
  });
});
