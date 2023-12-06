import { extractFirstAndLastName } from "../utils/extract-first-and-last-name";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
}

export default function Avatar(props: AvatarProps) {
  const { src, alt, name } = props;

  if (src && alt) {
    return (
      <img
        className="rounded-md w-48 h-48 bg-black-30"
        alt={`${alt} avatar`}
        src={src}
      />
    );
  }

  if (name) {
    const { firstName, lastName } = extractFirstAndLastName(name);

    return (
      <div className="flex flex-col justify-center relative items-center w-48 h-48 bg-blue-10 rounded-md">
        <p className="leading-none text-4xl   absolute text-blue-100">
          {firstName?.charAt(0)}
          {lastName?.charAt(0)}
        </p>
      </div>
    );
  }

  return null;
}
