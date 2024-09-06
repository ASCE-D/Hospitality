import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HomePage from "../Home/page";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-primary pt-[80px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container"></div>
        <HomePage />
      </section>
    </>
  );
};

export default Hero;
