'use client'

import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/ui/card"
import { Button } from '../ui/button';
import Link from 'next/link';

type ProjectProps = {
    title: string;
    description: string;
    content: string;
    footer: {
        design?: {
            tool: string;
            url: string
        };
        code?: {
            tool: string;
            url: string
        }
    };
};

type CardProjectsProps = {
    dataProjects: ProjectProps[];
};

const CardProjects = ({ dataProjects }: CardProjectsProps) => {

    return <>
        {
            dataProjects?.map((dataProject, index) => {
                return <Card key={index} className="w-[287.5px] h-[360px]">
                    <CardHeader>
                        <CardTitle>{dataProject.title}</CardTitle>
                        <CardDescription>{dataProject.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-center'>
                        <Image
                            src={dataProject.content}
                            alt='Fa Têxtil'
                            width={150}
                            height={150}
                        />
                    </CardContent>
                    <CardFooter className='flex justify-center gap-8'>
                        {
                            dataProject.footer.design && <Link href={dataProject.footer.design?.url} target='_blank'>
                                <Button>
                                    {dataProject.footer.design?.tool}
                                </Button>
                            </Link>
                        }

                        {
                            dataProject.footer.code && <Link href={dataProject.footer.code?.url} target='_blank'>
                                <Button>
                                    {dataProject.footer.code?.tool}
                                </Button>
                            </Link>
                        }
                    </CardFooter>
                </Card>
            })
        }
    </>
}

export default CardProjects;