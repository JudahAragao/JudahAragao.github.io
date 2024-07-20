'use client'

import { Button } from "@/ui/button"
import { HomeIcon, AvatarIcon, RocketIcon, MixIcon, BackpackIcon, CookieIcon } from '@radix-ui/react-icons'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import ModeToggle from "../Toggle"

export default function NavigationMenuBar() {

  return (
    <div className="flex items-center justify-between rounded-full bg-primary p-2 max-w-max">
      <div className="flex space-x-2 pr-1">
        <ScrollLink
          activeClass="active"
          to="about"
          spy={true}
          smooth={true}
          duration={300}
          // offset={-60} // Ajuste conforme necessário para o seu layout
        >
          <Button
            className="text-zinc-100 relative rounded-full hover:bg-slate-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <AvatarIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">About</span>
          </Button>
        </ScrollLink>
        <ScrollLink
          activeClass="active"
          to="projects"
          spy={true}
          smooth={true}
          duration={300}
          // offset={-60} // Ajuste conforme necessário para o seu layout
        >
          <Button
            className="text-zinc-100 rounded-full hover:bg-slate-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <RocketIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Projects</span>
          </Button>
        </ScrollLink>
        <ScrollLink
          activeClass="active"
          to="skills"
          spy={true}
          smooth={true}
          duration={300}
          // offset={-60} // Ajuste conforme necessário para o seu layout
        >
          <Button
            className="text-zinc-100 rounded-full hover:bg-slate-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <MixIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Skills</span>
          </Button>
        </ScrollLink>
        <ScrollLink
          activeClass="active"
          to="educations-works"
          spy={true}
          smooth={true}
          duration={300}
          // offset={-60} // Ajuste conforme necessário para o seu layout
        >
          <Button
            className="text-zinc-100 rounded-full hover:bg-slate-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <BackpackIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Educations And Works</span>
          </Button>
        </ScrollLink>
        <ScrollLink
          activeClass="active"
          to="blog"
          spy={true}
          smooth={true}
          duration={300}
          // offset={-60} // Ajuste conforme necessário para o seu layout
        >
          <Button
            className="text-zinc-100 rounded-full hover:bg-slate-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <CookieIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Blog</span>
          </Button>
        </ScrollLink>
        <div className="border-r border-neutral-950"></div>
        <ModeToggle />
      </div>
    </div>
  );
}
