import asd from './index.css';

console.log(asd);

export default function App () {
  return (
    <div id="wrapper">
      <section id="main">
        <header>
          <span className="avatar"><img src="../../images/avatar.jpg" alt="" width="150" height="150" /></span>
          <h1>Anton Tursenev</h1>
          <p className={asd.test}>Senior Psychonautics Engineer</p>
        </header>
        <footer>
          <ul className="icons">
            <li><a href="#" className="fa-twitter">Twitter</a></li>
            <li><a href="#" className="fa-instagram">Instagram</a></li>
            <li><a href="#" className="fa-facebook">Facebook</a></li>
          </ul>
        </footer>
      </section>

      <footer id="footer">
        <ul className="copyright">
          <li>&copy; Anton Tursenev</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
        </ul>
      </footer>
    </div>
  );
}