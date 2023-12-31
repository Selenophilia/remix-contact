import { useEffect, useState, FormEvent } from "react";
import { redirect } from "@remix-run/node";

import { useLoaderData, useNavigation } from "@remix-run/react";

import { createEmptyContact } from "../../data";
import ContactsSearchForm from "~/contacts/widgets/contacts-search-form";
import { loader } from "~/root";

interface SidebarProps {
  onContactSearch: (event: FormEvent<HTMLFormElement>) => void;
  title: string;
  body: JSX.Element[];
}

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export default function ContactsSidebar(props: SidebarProps) {
  const { onContactSearch, title, body } = props;
  const { searchParams } = useLoaderData<typeof loader>();
  const [searchValue, setSearchValue] = useState(searchParams || "");
  const navigation = useNavigation();
  const searching = (navigation.location &&
    new URLSearchParams(navigation.location.search).has("q")) as boolean;
  const noContact = body.length === 0 && !searching;

  useEffect(() => {
    setSearchValue(searchParams || "");
  }, [searchParams]);

  return (
    <aside className="flex flex-col w-1/4 bg-black-5 border-r-2 border-black-0 max-h-screen min-h-screen py-2">
      <div className="border-b-2 border-black-0 p-2 ">
        <ContactsSearchForm
          onContactSearch={onContactSearch}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          searching={searching}
        />
      </div>
      {searching && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="loader" />
          <p className="flex items-start justify-center mt-10">
            Fetching data...
          </p>
        </div>
      )}

      {noContact && (
        <p className="flex flex-col items-center justify-center my-2 h-full">
          No Contact found!
        </p>
      )}

      <nav className="overflow-auto py-2 h-auto px-4 w-full flex-1">
        {!searching && <ul className="p-0 m-0">{body}</ul>}
      </nav>

      <h1 className="font-medium m-0 py-2 px-6 border-t-2 border-black-0 remix-icon">
        {title}
      </h1>
    </aside>
  );
}
