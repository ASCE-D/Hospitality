import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HomePage from "../Home/page";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-primary"
      >
        <div className="container"></div>
        <HomePage />
      </section>
    </>
  );
};

export default Hero;
