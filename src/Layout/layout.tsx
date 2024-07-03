import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

const Layout = (props: any) => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-sine",
      // delay: 100,
    });
  }, []);

  return <div className="">{props.children}</div>;
};

export default Layout;
