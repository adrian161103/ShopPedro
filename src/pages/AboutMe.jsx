import { useEffect } from "react";
import AboutmeP from '../components/AboutMe/AboutmeP'
import Page from '../components/page'

function AboutMe() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Page gap={true}>
      <AboutmeP />
    </Page>
    
    </>
  )
}

export default AboutMe