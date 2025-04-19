import { Menu, ShoppingCart} from "lucide-react";
import Link from "next/link";
import logoImage from "@/assets/logo-commerce.svg";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle 
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const WebNavbar = ({
  logo = {
    url: "/",
    src: logoImage,
    alt: "logo",
    title: "Simple E-Commerce",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Products",
      url: "/products",
    },
    {
      title: "About",
      url: "/about",
    },
  ],
  auth = {
    login: { title: "Login", url: "/auth/login" },
    signup: { title: "Register", url: "/auth/register" },
  },
}: Navbar1Props) => {
  return (
    <section className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Desktop and Mobile Menu */}
        <nav className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <Image src={logoImage} alt="Hero Image" width={20} priority />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Desktop Auth Buttons - Hidden on mobile */}
          <div className="hidden md:flex gap-2 items-center">
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="ml-2">
              <Link href="/cart">
                <ShoppingCart className="size-5" />
              </Link>
            </Button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Button asChild variant="outline" size="icon">
              <Link href="/cart">
                <ShoppingCart className="size-5" />
              </Link>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="px-4 py-6 border-b">
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image src={logoImage} alt="Hero Image" width={20} priority />
                      <span className="text-lg font-semibold tracking-tighter">
                        {logo.title}
                      </span>
                    </Link>
                  </div>
                  <nav className="flex-1 px-4 py-6">
                    <ul className="space-y-4">
                      {menu.map((item) => (
                        <li key={item.title}>
                          <Link 
                            href={item.url}
                            className="text-base font-medium hover:text-primary"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="px-4 py-6 border-t">
                    <div className="flex flex-col gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export { WebNavbar };
