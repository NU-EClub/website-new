import { Link } from 'react-router-dom';
import { asset } from '../lib/asset.js';
import { FOOTER, SITE_NAME } from '../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__cta">{FOOTER.cta}</p>
        <Link className="site-footer__button" to="/contact">{FOOTER.buttonLabel}</Link>

        <hr className="site-footer__rule" />

        <div className="site-footer__meta">
          <Link className="site-footer__brand" to="/">
            <img src={asset('logo-mark.png')} alt="" width="57" height="59" />
            <span>{SITE_NAME}</span>
          </Link>
          <p className="site-footer__org">{FOOTER.org}</p>
        </div>
      </div>
    </footer>
  );
}
