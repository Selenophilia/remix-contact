import { json, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

import invariant from "tiny-invariant";

import { getContact, updateContact } from "../../data";
import { FormEvent } from "react";
import Contact from "../../../components/contact";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing id param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing id param");
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
};

export default function ContactId() {
  const { contact } = useLoaderData<typeof loader>();

  const onDelete = (event: FormEvent<HTMLFormElement>) => {
    const response = confirm("Please confirm you want to delete this record.");
    if (!response) {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col flex-1 p-5 gap-8">
      <Contact contact={contact} />
      <div className="flex gap-4">
        <Form action="edit">
          <button className="contact-button px-6 py-3" type="submit">
            Edit
          </button>
        </Form>

        <Form action="destroy" method="post" onSubmit={onDelete}>
          <button className="contact-button px-6 py-3 text-red-5" type="submit">
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
}
