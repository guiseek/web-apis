import { Attribute, Autonomous, css, html, pipe } from '@web-apis/ui-web';
import './app.element.scss';

interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: 'GUILHERME', age: 17 },
  { name: 'hallison', age: 19 },
  { name: 'Maria', age: 23 },
];

interface CallbackMap<T, R> {
  (item: T): R;
}

interface CallbackFilter<T> {
  (item: T): boolean;
}

interface CallbackReduce<T, R> {
  (previousValue: R, currentValue: T, currentIndex: number, array: T[]): R;
}

const map = <T, R>(items: T[], callback: CallbackMap<T, R>) =>
  items.map(callback);

const filter = <T>(items: T[], callback: CallbackFilter<T>) =>
  items.filter(callback);

const reduce = <T, R>(
  items: T[],
  callback: CallbackReduce<T, R>,
  initialValue: R
) => items.reduce(callback, initialValue);

@Autonomous({
  selector: 'user-age',
})
export class UserAge extends HTMLElement {
  static observedAttributes = [
    'userid'
  ];

  // @Attribute()
  userid = 0

  styles = css`
    :host {
      display: flex;
    }
  `;

  template = () => html`
    <p>Idade: ${users[this.userid].age} * 3 = ${pipe(users[this.userid].age, ['multiply:3'])}</p>
  `;
}

@Autonomous({
  selector: 'app-root',
})
export class AppElement extends HTMLElement {
  styles = css`
    :host {
      display: block;
      border: 2px dashed #111;
      padding: 0px 16px 16px;
    }
  `;

  template = () => html`
    <section>
      <h4>Todos</h4>
      ${map(
        users,
        (user) => `
          <p>${pipe(user.name, ['capitalize'])}</p>
          <user-age userid="${user.age}"></user-age>
          <hr />
        `
      )}
    </section>

    <section>
      <h4>Maiores de 18</h4>
      ${map(
        filter(users, (user) => user.age > 18),
        (user) => `<p>${pipe(user.name, ['capitalize'])}</p>`
      )}
    </section>

    <section>
      <h4>Idades somadas</h4>
      ${reduce(users, (prev, curr) => prev + curr.age, 0)}
    </section>
  `;
}
