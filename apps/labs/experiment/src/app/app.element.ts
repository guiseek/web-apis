import {
  css,
  html,
  map,
  pipe,
  filter,
  reduce,
  Autonomous,
  pages,
} from '@web-apis/ui-web';
import './app.element.scss';
import { inject } from '@web-apis/util-di';
import { AppService, ProductResponse } from './app.service';

interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: 'GUILHERME', age: 17 },
  { name: 'hallison', age: 19 },
  { name: 'Maria', age: 23 },
];

// template = () => html`
//   <section>
//     <h4>Todos</h4>
//     ${map(
//       users,
//       (user) => `
//         <p>${pipe(user.name, ['capitalize'])}</p>
//         <p>
//           Idade: ${user.age} * 3 =
//           ${pipe(user.age, ['multiply:3'])}
//         </p>
//         <hr />
//       `
//     )}
//   </section>

//   <section>
//     <h4>Maiores de 18</h4>
//     ${map(
//       filter(users, (user) => user.age > 18),
//       (user) => `<p>${pipe(user.name, ['capitalize'])}</p>`
//     )}
//   </section>

//   <section>
//     <h4>Idades somadas</h4>
//     ${reduce(users, (prev, curr) => prev + curr.age, 0)}
//   </section>
// `;

@Autonomous({
  selector: 'app-root',
})
export class AppElement extends HTMLElement {
  styles = css``;

  service = inject(AppService);

  connectedCallback() {
    this.service.get<ProductResponse>('products').then((data) => {
      if (this.shadowRoot) {
        this.shadowRoot.appendChild(
          html`
            <table>
              <tbody>
                ${map(
                  data.products,
                  (p) =>
                    `<tr>
                    <td>${p.title}</td>
                    <td>${p.brand}</td>
                    <td>${p.category}</td>
                  </tr>`
                )}
              </tbody>
            </table>

            <ul>
              ${pages(
                data.total / 30,
                (page) => `<li><a href="#page=${page}">${page}</a></li>`
              )}
            </ul>
          `
        );
      }
    });

    onpopstate = (ev) => {
      console.log(ev);
      console.log(location.hash);
      ev.preventDefault();

    };
  }
}
