import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Connecting people with products they love since 2020.
        </p>
        <Separator className="mt-8 max-w-md mx-auto" />
      </div>

      {/* Our Story Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Founded in 2020, we started with a simple mission: to create a 
            shopping experience that feels personal and effortless. What began as a small 
            startup has grown into a marketplace serving thousands of customers.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, we continue to expand while maintaining the same care and 
            attention to quality that defined our early days.
          </p>
        </div>
        <div className="md:w-1/2 relative h-[300px] w-full rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72" 
            alt="Our team working together" 
            fill 
            className="object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="mb-24">
        <h2 className="text-2xl font-semibold mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-3">Quality First</h3>
            <p className="text-muted-foreground">
              We carefully select products that meet our high standards for quality and value.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium mb-3">Customer Focus</h3>
            <p className="text-muted-foreground">
              We put our customers at the center of everything we do.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium mb-3">Sustainability</h3>
            <p className="text-muted-foreground">
              We're committed to reducing our environmental impact.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-24">
        <h2 className="text-2xl font-semibold mb-10 text-center">Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            },
            {
              name: "Sarah Williams",
              role: "Head of Product",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            },
            {
              name: "Michael Chen",
              role: "Lead Developer",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            },
            {
              name: "Priya Sharma",
              role: "Customer Experience",
              image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-10">Get In Touch</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 mb-12">
          <div className="flex flex-col items-center">
            <Mail className="h-6 w-6 text-primary mb-3" />
            <a href="mailto:info@example.com" className="text-primary hover:underline">
              info@example.com
            </a>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="h-6 w-6 text-primary mb-3" />
            <a href="tel:+1234567890" className="text-primary hover:underline">
              +1 (234) 567-890
            </a>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="h-6 w-6 text-primary mb-3" />
            <address className="not-italic text-muted-foreground">
              123 Commerce Street, Jakarta
            </address>
          </div>
        </div>
        <Button asChild variant="outline" size="lg" className="rounded-full px-8">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}