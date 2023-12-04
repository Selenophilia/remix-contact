import { FormEvent } from "react";
import { json, redirect, LoaderFunctionArgs } from "@remix-run/node";

import { NavLink, useLoaderData, useSubmit, Outlet } from "@remix-run/react";

import { ContactRecord, createEmptyContact, getContacts } from "../data";
import ContactsSidebar from "~/contacts/widgets/contacts-sidebar";
import { getNavClass } from "./utils/get-nav-class";
import { loader } from "~/root";

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export default function ContactsPage() {
  const { contacts, searchParams } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const onContactSearch = (event: FormEvent<HTMLFormElement>) => {
    const isFirstSearch = searchParams === null;
    submit(event.currentTarget, {
      replace: !isFirstSearch,
    });
  };

  const contactsData = contacts.map((contact: ContactRecord) => {
    let name;
    let favorite;
    if (contact.first || contact.last) {
      name = `${contact.first} ${contact.last}`;
    } else {
      name = "No name";
    }

    if (contact.favorite) {
      favorite = <span className="text-yellow-5">★</span>;
    }

    return (
      <li className="my-3" key={contact.id}>
        <NavLink className={getNavClass} to={`contacts/${contact.id}`}>
          {name}
          {favorite}
        </NavLink>
      </li>
    );
  });

  return (
    <main className="flex">
      <ContactsSidebar
        onContactSearch={onContactSearch}
        title="Remix Contacts"
        body={contactsData}
      />
      <div className="p-10 w-full">
        <Outlet />
      </div>
    </main>
  );
}
