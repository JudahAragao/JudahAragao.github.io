'use client'

import { Button } from "@/ui/button"
import { HomeIcon, AvatarIcon, RocketIcon, MixIcon, BackpackIcon, CookieIcon } from '@radix-ui/react-icons'
import { Link } from 'react-scroll';

import ModeToggle from "../Toggle"

export default function NavigationMenuBar() {

  return (
    <div className="flex items-center justify-between rounded-full bg-woodland-900 p-2 max-w-max">
      <div className="flex space-x-2 pr-1">
        <Link smooth={true} duration={300} to="about">
          <Button
            className="text-zinc-100 relative rounded-full hover:bg-woodland-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <AvatarIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">About</span>
          </Button>
        </Link>
        <Link smooth={true} duration={300} to="projects">
          <Button
            className="text-zinc-100 rounded-full hover:bg-woodland-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <RocketIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Projects</span>
          </Button>
        </Link>
        <Link smooth={true} duration={300} to="skills">
          <Button
            className="text-zinc-100 rounded-full hover:bg-woodland-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <MixIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Skills</span>
          </Button>
        </Link>
        <Link smooth={true} duration={300} to="educations-works">
          <Button
            className="text-zinc-100 rounded-full hover:bg-woodland-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <BackpackIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Educations And Works</span>
          </Button>
        </Link>
        <Link smooth={true} duration={300} to="blog">
          <Button
            className="text-zinc-100 rounded-full hover:bg-woodland-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <CookieIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Blog</span>
          </Button>
        </Link>
        <div className="border-r border-woodland-950"></div>
        <ModeToggle />
      </div>
    </div>
  )
}
