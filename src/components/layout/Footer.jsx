import PropTypes from "prop-types";


function Footer({  socials }) {
    
  return (
    <section>
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-links">
        </div>
        <div className="social-media">
          {socials &&
            socials.map((social, i) => (
              <a key={i} href={social.url} className="social-icon" target="_blank" rel="noopener noreferrer">
                PedroLamanna 
                <i className={`bi bi-${social.icon}`} aria-hidden="true"></i>
              </a>
            ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; copyright 2025</p>
        <p>Developed by :<a href="https://github.com/adrian161103">ADRIANALEJOS</a></p>
      </div>
    </footer>
    </section>
  );
}

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired, // Ejemplo: 'whatsapp', 'instagram'
    })
  ),
};

export default Footer;

