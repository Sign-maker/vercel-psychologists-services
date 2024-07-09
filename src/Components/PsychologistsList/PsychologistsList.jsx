import { PsychologistsItem } from "../PsychologistsItem/PsychologistsItem";

export const PsychologistsList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <PsychologistsItem key={item.key} item={item} />
      ))}
    </ul>
  );
};
