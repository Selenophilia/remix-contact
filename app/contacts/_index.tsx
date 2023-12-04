import { json, redirect, LoaderFunctionArgs } from "@remix-run/node";

import { getContacts } from "../data";

import { createEmptyContact } from "../data";
export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("q");
  const contacts = await getContacts(searchParams);
  return json({ contacts, searchParams });
};

export default function Index() {
  return (
    <main className="index-page flex flex-col justify-center items-center h-1/2">
      <div className="flex flex-col justify-center items-center">
        <p> This is a demo for Remix.</p>
        <span>
          Check out <a href="https://remix.run">the docs at remix.run</a>
        </span>
      </div>
    </main>
  );
}
