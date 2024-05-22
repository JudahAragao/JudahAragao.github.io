import Header from './components/Header';
import NavigationMenuBar from './components/NavigationMenuBar';
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from '@radix-ui/react-icons';
import DevToIcon from './components/DevToIcon';
import CardProjects from './components/CardProjects';
import CardSkills from './components/CardSkills';
import Educations from './components/Educations';
import Works from './components/Works';

export default function Home() {
  const dataProjects = [
    {
      title: 'Fa Têxtil',
      badge: "Developing",
      description:
        'Gestão de Pedidos e Fabricação para Uma Fábrica de Confecção de Fardamentos.',
      content: '/logo-projeto-portfolio.png',
      footer: {
        design: {
          tool: 'Figma',
          url: 'https://www.figma.com/file/CEhXAG3rN7qIl1Hg60uvo4/FA-Confec%C3%A7%C3%A3o?type=design&node-id=0%3A1&mode=design&t=fW135PbMuJf2zTr7-1',
        },
        code: {
          tool: 'GitHub',
          url: 'https://github.com/JudahAragao/fa_textil_frontend_reactjs',
        },
      },
    },
    {
      title: 'Controle de Toners e Cartuchos',
      badge: "Developing",
      description: 'Controle de fluxo de recarga e uso de toner e cartuchos.',
      content: '/tonerbrother01-400x293-1.png',
      footer: {
        code: {
          tool: 'GitHub',
          url: 'https://github.com/JudahAragao/controle-toner-cartuchos',
        },
      },
    },
    {
      title: 'TheKeyCrypto',
      badge: "Completed",
      description: 'Ferramenta de criptografia e descriptografia de texto utilizando criptografia RSA - OAEP.',
      content: '/thekeycrypto.png',
      footer: {
        code: {
          tool: 'GitHub',
          url: 'https://github.com/JudahAragao/TheKeyCrypto',
        },
      },
    },
  ];

  const dataEducations = [
    {
      companyName:
        'Instituto Federal de Educação, Ciência e Tecnologia de Sergipe - IFS',
      companyPhoto: '/ifs_logo.png',
      description: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
      inicio: '2019',
      fim: '2023',
      localizacao:
        'Av. Eng. Gentil Tavares, 1166 - Getúlio Vargas, Aracaju - SE',
    },
  ];

  const dataWorks = [
    {
      companyName: 'Sergipe Parque Tecnologico - SERGIPETEC',
      companyPhoto: '/313520350_547309560671763_6614871819218893168_n.jpg',
      description: 'Técnico de Suporte Sênior',
      inicio: '08 Set 2022',
      fim: 'Atual',
      localizacao: 'Rua Arauá, 892 - São José, Aracaju - SE',
      responsibilities: [
        {
          description:
            'Administração das tarefas diárias de apoio e atendimento aos usuários.',
        },
        {
          description:
            'Participação ativa no projeto de desenvolvimento e otimização do portal da Controladoria Geral do Município de Aracaju e Transparência de Aracaju.',
        },
        {
          description:
            'Participação ativa na pesquisa e desenvolvimento de soluções inovadoras para aprimorar o cotidiano dos usuários.',
        },
      ],
    },
    {
      companyName: 'Controladoria-Geral do Município de Aracaju - CGM',
      companyPhoto: '/Brasão_de_Aracaju.svg',
      description: 'Estagiário de suporte e desenvolvimento',
      inicio: '02 Mar 2021',
      fim: '08 Set 2022',
      localizacao: 'Rua Arauá, 892 - São José, Aracaju - SE',
      responsibilities: [
        {
          description:
            'Execução das tarefas diárias de apoio e atendimento aos usuários.',
        },
        {
          description:
            'Suporte (Manutenção e Publicação de conteúdos) no portal da transparência de Aracaju',
        },
      ],
    },
  ];

  const dataSkills = [
    {
      skillPhoto: '/1684410508-image-7.png',
      skillType: 'frontend',
    },
    {
      skillPhoto: '/584830f5cef1014c0b5e4aa1.png',
      skillType: 'frontend',
    },
    {
      skillPhoto: '/logo-2582748_960_720.webp',
      skillType: 'frontend',
    },
    {
      skillPhoto: '/logo-2582747_1280.png',
      skillType: 'frontend',
    },
    {
      skillPhoto: '/pngwing.com.png',
      skillType: 'backend',
    },
    {
      skillPhoto: '/NestJS.svg',
      skillType: 'backend',
    },
    {
      skillPhoto:
        '/kisspng-flask-by-example-web-framework-python-bottle-sebastian-estenssoro-5b6c0aa37f9672.5900311015338072675226.png',
      skillType: 'backend',
    },
    {
      skillPhoto: '/fastapi.png',
      skillType: 'backend',
    },
    {
      skillPhoto: '/prisma.svg',
      skillType: 'backend',
    },
    {
      skillPhoto: '/256.png',
      skillType: 'backend',
    },
    {
      skillPhoto: '/sqlite_logo_icon_169724.png',
      skillType: 'backend',
    },
    {
      skillPhoto: '/download (1).png',
      skillType: 'backend',
    },
    {
      skillPhoto: '/com031.jpg',
      skillType: 'backend',
    },
    {
      skillPhoto: '/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.webp',
      skillType: 'design',
    },
  ];

  return (
    <main className="w-full min-h-screen flex flex-col items-center relative font-sans">
      <section className="w-full px-5 lg:max-w-[911px]" id="about">
        <Header />
      </section>

      <section className="h-full flex flex-col px-2 lg:max-w-[911px]">
        <section className="min-h-screen">
          <div className="mt-16 px-3">
            <h1 className="text-2xl font-bold mb-4">
              Olá! Me Chamo Judah Aragão!
            </h1>
            <p className="text-justify text-base">
              Sou um desenvolvedor full-stack em constante aprendizado.
              Atualmente contribuindo para o Sergipe Parque Tecnológico -
              SERGIPETEC. Destaco meu papel na Controladoria-Geral do Município
              de Aracaju, onde participei ativamente no aprimoramento do Portal
              da Transparência e no desenvolvimento do portal da
              Controladoria-Geral. Minhas habilidades abrangem o design UI/UX
              com Figma, o front-end, com Next.js, React.js, além de back-end
              com Nest.js, TypeORM, PrismaJs. Possuo realizações notáveis, como:
              meu trabalho de conclusão de curso (TCC) com o desenvolvimento de
              um sistema para gestão de processos de manufatura em uma fábrica
              de confecção de fardamentos. O código está disponível no GitHub!
            </p>
            <br />
            <p>
              Meus estudos e meus trabalhos refletem o comprometimento com
              inovação e busca na aplicação de boas práticas.
            </p>
            <br />
            <br />

            <div className="flex items-center gap-x-4">
              {' '}
              <p className="text-base">Me encontre no</p>
              <ul className="flex flex-1 items-center gap-x-2 sm:flex-initial">
                <li className="flex">
                  <a
                    className="inline-block p-1 sm:hover:text-link"
                    href="https://www.linkedin.com/in/judaharagao/"
                    target="_blank"
                    rel="noopener noreferrer "
                  >
                    <LinkedInLogoIcon className="h-5 w-5 stroke-1" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </li>

                <li className="flex">
                  <a
                    className="inline-block p-1 sm:hover:text-link"
                    href="https://github.com/JudahAragao"
                    target="_blank"
                    rel="noopener noreferrer "
                  >
                    <GitHubLogoIcon className="h-5 w-5 stroke-1" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </li>

                <li className="flex">
                  <a
                    className="inline-block p-1 sm:hover:text-link"
                    href="https://dev.to/judaharagao"
                    target="_blank"
                    rel="noopener noreferrer "
                  >
                    <DevToIcon />
                    <span className="sr-only">Dev.to</span>
                  </a>
                </li>

                <li className="flex">
                  <a
                    className="inline-block p-1 sm:hover:text-link"
                    href="https://www.instagram.com/judah.aragao/"
                    target="_blank"
                    rel="noopener noreferrer "
                  >
                    <InstagramLogoIcon className="h-5 w-5 stroke-1" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="min-h-screen" id="projects">
          <div className="mt-16 px-3">
            <div className="">
              <h1 className="text-2xl font-bold mb-4">Projetos</h1>
            </div>

            <div className="flex flex-col gap-6">
              <div className="w-full flex gap-6 flex-wrap">
                <CardProjects dataProjects={dataProjects} />
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen " id="skills">
          <div className="mt-16 px-3">
            <div className="">
              <h1 className="text-2xl font-bold mb-4">Experiências / Habilidades</h1>
            </div>

            <div className="mt-6">
              <h1 className="text-lg font-bold mb-4">Front-End</h1>
              <div className="mt-4 flex gap-[2.38rem] flex-wrap">
                <CardSkills dataSkills={dataSkills} skillType="frontend" />
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-lg font-bold mb-4">Back-End</h1>
              <div className="mt-4 flex gap-[2.38rem] flex-wrap">
                <CardSkills dataSkills={dataSkills} skillType="backend" />
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-lg font-bold mb-4">Design UI\UX</h1>
              <div className="mt-4 flex gap-[2.38rem] flex-wrap">
                <CardSkills dataSkills={dataSkills} skillType="design" />
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen px-3" id="educations-works">
          <div className="mt-16 px-3">
            <div className="">
              <h1 className="text-2xl font-bold mb-4">
                Formações e Experiências Profissionais
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:mx-auto  mt-6 w-full gap-6 ">
              <div>
                <div className="">
                  <h1 className="text-lg font-bold mb-4">Formação</h1>
                </div>
                <div className="flex flex-col gap-6">
                  <Educations dataEducationsAndWorks={dataEducations} />
                </div>
              </div>
              <div>
                <div className="">
                  <h1 className="text-lg font-bold mb-4">
                    Experiência de Trabalho
                  </h1>
                </div>
                <div className="flex flex-col gap-6">
                  <Works dataEducationsAndWorks={dataWorks} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen px-3" id="blog">
          <div className="mt-16 px-3">
            <div className="">
              <h1 className="text-2xl font-bold mb-4">Blog</h1>
            </div>
            <div>
              <h3>Em breve estarei realizando postagens...</h3>
            </div>
          </div>
        </section>
      </section>

      <div className="my-4 fixed bottom-1">
        <NavigationMenuBar />
      </div>
    </main>
  );
}
