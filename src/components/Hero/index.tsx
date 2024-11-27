import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HomePage from "../Home/page";

const Hero = ({ host, house }: { host?: string; house?: string }) => {
  return (
    <>
      <section id="home" className="relative overflow-hidden bg-primary">
        <div className="container"></div>
        <HomePage host={host} house={house} />
      </section>
    </>
  );
};

export default Hero;
