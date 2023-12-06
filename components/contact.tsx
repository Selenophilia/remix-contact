import Avatar from "./avatar";
import ContactsFavorite from "../app/contacts/widgets/contacts-favorites";
import { ContactRecord } from "~/data";

interface ContactProps {
  contact: ContactRecord;
}

export default function Contact({ contact }: ContactProps) {
  return (
    <div className="flex flex-1 gap-8 w-10/12">
      <Avatar
        src={contact.avatar}
        name={`${contact.first} ${contact.last}`}
        alt={`${contact.first} avatar`}
      />

      <div className="flex flex-col justify-betwenn">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl font-bold">
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
          </h1>
          <ContactsFavorite contact={contact} />
        </div>
        {contact.twitter && (
          <a
            href={`https://twitter.com/${contact.twitter}`}
            className="text-blue-20 text-2xl"
          >
            {contact.twitter}
          </a>
        )}

        {contact.notes && <p className="text-justify">{contact.notes}</p>}
      </div>
    </div>
  );
}
