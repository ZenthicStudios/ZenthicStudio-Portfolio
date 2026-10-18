import { ArrowUp } from "lucide-react";
import { site } from "../data/site";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#home" className="brand">
          <span className="brand-mark">{site.monogram}</span>
          <span>
            {site.shortName}
            <small>{site.wordmarkSuffix}</small>
          </span>
        </a>
        <p>{site.footer.tagline}</p>
        <a className="back-top" href="#home">
          {site.footer.top}
          <ArrowUp aria-hidden="true" />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}. {site.footer.rights}
        </span>
        <span>{site.footer.credit}</span>
      </div>
    </footer>
  );
}
