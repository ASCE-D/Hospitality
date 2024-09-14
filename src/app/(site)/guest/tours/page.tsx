import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Place {
  name: string;
  information: string;
  images: string[];
}

const places: Place[] = [
  {
    name: "ACQUARIO DI GENOVA",
    information: "https://g.co/kgs/oJVJPMa",
    images: [
      "/images/tours/0.jpg",
      "/images/tours/1.jpg",
      "/images/tours/2.jpg",
      "/images/tours/3.jpg",
    ],
  },
  {
    name: "PORTO ANTICO",
    information: "https://portoantico.it/",
    images: [
      "/images/tours/4.jpg",
      "/images/tours/5.jpg",
      "/images/tours/6.jpg",
      "/images/tours/7.jpg",
    ],
  },
  {
    name: "Museo del Galata",
    information: "https://g.co/kgs/TLq5kBP",
    images: [
      "/images/tours/8.jpg",
      "/images/tours/9.jpg",
      "/images/tours/10.jpg",
      "/images/tours/11.jpg",
    ],
  },
  {
    name: "Boccadasse",
    information: "https://maps.app.goo.gl/MNCYHJdQBuAJM7fF9",
    images: [
      "/images/tours/12.jpg",
      "/images/tours/13.jpg",
      "/images/tours/14.jpg",
      "/images/tours/15.jpg",
    ],
  },
  {
    name: "Corso Italia",
    information: "https://maps.app.goo.gl/3fhJMyc9xpW4PY649",
    images: [
      "/images/tours/16.jpg",
      "/images/tours/17.jpg",
      "/images/tours/18.jpg",
      "/images/tours/19.jpg",
    ],
  },
  {
    name: "Via XX Settembre e Piazza de Ferrari",
    information: "https://maps.app.goo.gl/LStzLWbBGfod18ZFA",
    images: [
      "/images/tours/20.jpg",
      "/images/tours/21.jpg",
      "/images/tours/22.jpg",
      "/images/tours/23.jpg",
    ],
  },
  {
    name: "Parchi di Nervi",
    information: "https://maps.app.goo.gl/oNZdD8uBhmUrQah5A",
    images: [
      "/images/tours/24.jpg",
      "/images/tours/25.jpg",
      "/images/tours/26.jpg",
      "/images/tours/27.jpg",
    ],
  },
];

const PlacesToVisit: React.FC = () => {
  return (
    <div className="container mx-auto p-4 pt-[80px] md:pt-[130px] lg:pt-[160px]">
      <h1 className="mb-6 text-3xl font-bold">Places to Visit in Genova</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {places.map((place, index) => (
          <Card key={index}>
            <CardHeader>
              <h2 className="text-xl font-semibold">{place.name}</h2>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-2 gap-2">
                {place.images.map((image, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={image}
                    alt={`${place.name} image ${imgIndex + 1}`}
                    width={200}
                    height={150}
                    className="rounded-md"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">Location</span>
                </div>
                <a
                  href={place.information}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:underline"
                >
                  More Info
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
