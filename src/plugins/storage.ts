export class StorageAccess {
  constructor(fallback: string = '{}') {
    if (window.localStorage) {

      this.clear = () => window.localStorage.clear();
      this.set = (key, value) => window.localStorage.setItem(key, JSON.stringify(value === undefined ? fallback : value));
      this.get = (key) => JSON.parse(window.localStorage.getItem(key) || fallback);
      this.remove = (key) => window.localStorage.removeItem(key);
      this.key = (index) => window.localStorage.key(index);

      Object.defineProperty(this, 'length', {
        get: () => localStorage.length
      });
/*
    } else if (document.cookie) {

      console.error('NO LOLCALSTORAGE DETECTED!!1! FALLING BACK TO COOKIES!');

      this.clear = () => document.cookie = '';
      this.set = (key, value) => document.cookie.concat(key, '=', JSON.stringify(value === undefined ? fallback : value), ';');
      this.get = (key) => {
        let idx = document.cookie.indexOf(key + '=');
        if (idx > -1) {
          return JSON.parse((document.cookie.substr(idx + key.length).match(/=.*?;/) || [';=;'])[0].split('=')[1].replace(';', '') || fallback);
        } else return JSON.parse(fallback);
      }

      this.remove = (key) => {
        let idx = document.cookie.indexOf(key + '=');
        if (idx > -1) {
          document.cookie = document.cookie.substr(0, idx) + document.cookie.substr(idx + key.length).replace(/=.*?;/, '');
        }
      }

      Object.defineProperty(this, 'length', {
        get: () => (document.cookie.match('=') || []).length
      })
 */
    } else {

      console.error('WTF??? NO COOKIES FOR YOU!!!');

      const error = () => console.error('No suitable storage detected');

      this.clear = error;
      this.set = error;
      this.get = () => (error(), {});
      this.remove = error;
      this.key = () => (error(), {});

      Object.defineProperty(this, 'length', {
        get: () => 0
      })
    }
  }

  readonly set: (key: string, value: any) => void;
  readonly clear: () => void;
  readonly get: (key: string) => any;
  readonly remove: (key: string) => void;
  readonly key!: (index: number) => any;
  readonly length!: number;
}
