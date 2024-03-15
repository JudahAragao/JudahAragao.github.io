'use client'

import Image from 'next/image';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/ui/card"
import { CalendarIcon } from '@radix-ui/react-icons'

type EducationsAndWorksProps = {
  companyName: string,
  companyPhoto: string,
  description: string,
  inicio: string,
  fim: string,
  localizacao: string,
  responsibilities?: { description: string }[]
}

type CardEducationsAndWorksProps = {
  dataEducationsAndWorks: EducationsAndWorksProps[];
};

export default function Educations({ dataEducationsAndWorks }: CardEducationsAndWorksProps) {
  return <>
    {
      dataEducationsAndWorks?.map((data, index) => {
        return <Card key={index} className='w-[443.5px]'>
          <CardHeader className="p-6 grid gap-4 items-start">
            <div className="flex gap-4 items-center">
              <Image
                src={data.companyPhoto}
                alt={data.companyName}
                width={46}
                height={46}
              />
              <div className="grid gap-1.5">
                <CardTitle className="text-base font-medium">{data.companyName}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-xs">
              <div className="flex items-center gap-0.5">
                <CalendarIcon className="w-4 h-4" />
                <span className="ml-2.5">{data.inicio} - {data.fim}</span>
              </div>
            </div>
          </CardHeader>
        </Card>
      })
    }
  </>
}
