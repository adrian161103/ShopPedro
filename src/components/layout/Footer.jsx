import PropTypes from "prop-types";


function Footer({ socials }) {
  return (
    <footer className="footer glass-footer mini-footer" id="footer">
      <div className="footer-content footer-flex">
        <div className="social-media">
          {socials &&
            socials.map((social, i) => (
              <a key={i} href={social.url} className={`social-icon social-${social.icon}`} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                <i className={`bi bi-${social.icon}`}> pedro Lamanna</i>
              </a>
            ))}
        </div>
      </div>
      <div className="footer-bottom-absolute">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Pedro Lamanna</p>
        <span className="footer-author-bottom-absolute">
          Hecho con <span className="footer-heart">❤</span> por
          <a href="https://github.com/adrian161103" target="_blank" rel="noopener noreferrer" className="footer-link"> ADRIANALEJOS</a>
        </span>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ),
};

export default Footer;

