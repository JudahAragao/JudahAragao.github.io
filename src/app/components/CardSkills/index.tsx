import { Card } from '../ui/card';
import Image from 'next/image';

type SkillsProps = {
  skillPhoto: string;
  skillType: string;
};

type CardSkillsProps = {
  dataSkills: SkillsProps[];
  skillType: string; // Adicionando skillType como propriedade
};

const CardSkills = ({ dataSkills, skillType }: CardSkillsProps) => {
  return (
    <>
      {dataSkills
        .filter((skill) => skill.skillType === skillType) // Filtra as habilidades com base no tipo fornecido
        .map((dataSkill, index) => (
          <Card
            key={index}
            className="flex flex-wrap w-[120px] h-[120px] justify-center items-center"
          >
            <Image
              src={dataSkill.skillPhoto}
              alt={dataSkill.skillType} // Use o tipo da habilidade como texto alternativo da imagem
              width={80}
              height={80}
            />
          </Card>
        ))}
    </>
  );
};

export default CardSkills;
