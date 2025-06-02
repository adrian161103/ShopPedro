import Header from "./layout/Header";
import Footer from "./layout/Footer";
import propTypes from "prop-types";function Page({ children,gap }) {
      const socials = [
        { url: 'https://wa.me/541136074775', name: 'WhatsApp', icon: 'whatsapp' },
        { url: 'https://www.instagram.com/pedro.lamanna/', name: 'Instagram', icon: 'instagram' }
      ];

    return (
      <section className= {`pageSection ${gap ? "pageSectionGap" : ""}`}>
        <Header/>
        {children}
        <Footer socials={socials} />
      </section>
    );
  }
  Page.propTypes = {
    children: propTypes.node.isRequired,
    gap: propTypes.bool,
  };
  
  export default Page;
  