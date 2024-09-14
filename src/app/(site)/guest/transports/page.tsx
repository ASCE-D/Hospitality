import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Phone, Train, TrainIcon } from "lucide-react";
import Image from "next/image";

const TransportInformation: React.FC = () => {
  return (
    <div className="container mx-auto p-4 pt-[80px] md:pt-[130px] lg:pt-[160px]">
      <h1 className="mb-6 text-3xl font-bold">Transport Information</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <h2 className="flex items-center text-xl font-semibold">
              <Phone size={24} className="mr-2" />
              Taxi
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Tel. 010 5966</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="flex items-center text-xl font-semibold">
              <Train size={24} className="mr-2" />
              Train Stations
            </h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://maps.app.goo.gl/qT4tbENbhSMLDjAq6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Genova Brignole
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/jJ7uxkg4VfVxyDsj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Genova Principe
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="flex items-center text-xl font-semibold">
              <TrainIcon size={24} className="mr-2" />
              Metro
            </h2>
          </CardHeader>
          <CardContent>
            <Image
              src="/images/transport/1.png"
              alt="Metro map"
              width={600}
              height={400}
              className="rounded-md"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransportInformation;
