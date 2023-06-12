import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'media-stream-recording';
    this.innerHTML = `
      <div class="device">
      <nav>
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
        </svg>
      </nav>
      <snap-tabs>
        <header class="scroll-snap-x">
          <nav>
            <a active href="#responsive">Responsive</a>
            <a href="#accessible">Accessible</a>
            <a href="#overscroll">Horizontal Overscroll Ready</a>
            <a href="#more">
              <svg fill="currentColor" viewBox="0 0 20 20" role="presentation" focusable="false">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
            </a>
          </nav>
          <span class="snap-indicator"></span>
        </header>
        <section class="scroll-snap-x">
          <article id="responsive">
            <h2>Sit dolor</h2>
            <p>Lorem ipsum dolor sit amet consectet adipisicing elit</p>
            <h2>Lore sf</h2>
            <p>Lorem ipsum dolor sit amet consectet adipisicing elit</p>
            <p>Sit molestiae itaque rem optio molestias voluptati obcaecati!</p>
            <p>Ipsum, a? Tenetur aut a nisi, aspernatur earum eligendi id quam nihil sint quas?</p>
            <p>nisi, aspernatur earum eligendi id quam nihil sint quas?</p>
            <p>Sit molestiae itaque rem optio molestias voluptati obcaecati!</p>
            <p>Ipsum, a? Tenetur aut a nisi, aspernatur earum eligendi id quam nihil sint quas?</p>
            <p>nisi, aspernatur earum eligendi id quam nihil sint quas?</p>
          </article>
          <article id="accessible">
            <h2>Tenetur</h2>
            <p>Lorem ipsum dolor sit amet consectet adipisicing elit. Sit molestiae itaque rem optio molestias voluptati obcaecati!</p>
            <h2>Tenet urs</h2>
            <p>Ipsum, a? Tenetur aut a nisi, aspernatur earum eligendi id quam nihil sint quas?</p>
            <p>nisi, aspernatur earum eligendi id quam nihil sint quas?</p>
            <h2>Lore s sdf</h2>
            <p>Lorem ipsum dolor sit amet consectet adipisicing elit</p>
            <p>Sit molestiae itaque rem optio molestias voluptati obcaecati!</p>
            <p>Ipsum, a? Tenetur aut a nisi, aspernatur earum eligendi id quam nihil sint quas?</p>
            <p>nisi, aspernatur earum eligendi id quam nihil sint quas?</p>
          </article>
          <article id="overscroll">
            <h2>Lorems dolor</h2>
            <p>Lorem ipsum dolor sit amet consectet adipisicing elit</p>
            <p>Sit molestiae itaque rem optio molestias voluptati obcaecati!</p>
            <p>nisi, aspernatur earum eligendi id quam nihil sint quas?</p><ul>
              <li>Lorem</li>
              <li>ipsum</li>
              <li>dolor</li>
            </ul>
            <p>Sit molestiae itaque rem optio molestias voluptati obcaecati!</p>
          </article>
          <article id="more">
            <h2>Lore s sdf</h2>
            <ul>
              <li>Lorem</li>
              <li>ipsum</li>
              <li>dolor</li>
              <li>Lorem</li>
              <li>ipsum</li>
              <li>dolor</li>
            </ul>
            <p>Sit molestiae itaque rem optio molestias voluptati obcaecati!</p>
          </article>
        </section>
      </snap-tabs>
    </div>
      `;
  }
}
customElements.define('app-root', AppElement);
