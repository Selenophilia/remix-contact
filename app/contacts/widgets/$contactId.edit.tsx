import { useState, ChangeEvent } from "react";

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getContact, updateContact } from "../../data";
import {
  ValidationError,
  getValidationError,
  validationSchema,
} from "~/utils/validation";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  try {
    invariant(params.contactId, "Missing contactId param");
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  } catch (_) {
    invariant("An error occured");
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export default function ContactEdit() {
  const validationErrorMap: Record<string, string> = {
    [ValidationError.Empty]: "Input is empty.",
    [ValidationError.NoSpecialCharacter]: "Special character is not allowed.",
    [ValidationError.HasUrl]: "Invalid image url.",
    [ValidationError.NoNumber]: "Numeric character is not allowed.",
  };
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<typeof contact.first>(
    contact.first
  );
  const [lastName, setLastName] = useState<typeof contact.last>(contact.last);
  const [twitter, setTwitter] = useState<typeof contact.twitter>(
    contact.twitter
  );
  const [avatarSrc, setAvatarSrc] = useState<typeof contact.avatar>(
    contact.avatar
  );
  const [notes, setNotes] = useState<typeof contact.notes>(contact.notes);

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [avatarError, setAvatarError] = useState<string>("");
  const [notesError, setNotesError] = useState<string>("");

  const inputEmpty = [firstName, lastName, twitter, notes].every((input) =>
    Boolean(input)
  );

  const maySubmit =
    !inputEmpty ||
    Boolean(firstNameError) ||
    Boolean(lastNameError) ||
    Boolean(avatarError) ||
    Boolean(notesError);

  return (
    <Form
      method="post"
      className="flex flex-1 flex-col justify-center h-1/2 w-8/12"
    >
      <div className="flex gap-5 pb-3">
        <label htmlFor="first" className="w-full flex flex-col gap-1">
          <span className="text-xs uppercase text-black-60 font-medium">
            First name
          </span>
          <input
            type="text"
            required
            autoComplete="off"
            aria-label="First name"
            name="first"
            placeholder="First"
            value={firstName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target || {};
              setFirstNameError("");
              const validationResult = validationSchema.nonempty
                .and(validationSchema.nonempty)
                .and(validationSchema.noSpecialCharacter)
                .and(validationSchema.noNumber)
                .safeParse(value);

              const validationError = getValidationError(validationResult, [
                ValidationError.Empty,
                ValidationError.NoSpecialCharacter,
                ValidationError.NoNumber,
              ]);

              if (validationError) {
                setFirstNameError(validationErrorMap[validationError]);
              }
              setFirstName(value);
            }}
          />

          {firstNameError && (
            <span className="w-full font-medium text-sm text-cienna-100 mt-1">
              {firstNameError}
            </span>
          )}
        </label>

        <label htmlFor="last" className="w-full flex flex-col gap-1">
          <span className="text-xs uppercase text-black-60 font-medium">
            Last name
          </span>
          <input
            type="text"
            required
            autoComplete="off"
            aria-label="Last name"
            name="last"
            placeholder="Last"
            value={lastName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target || {};
              setLastNameError("");
              const validationResult = validationSchema.nonempty
                .and(validationSchema.nonempty)
                .and(validationSchema.noSpecialCharacter)
                .and(validationSchema.noNumber)
                .safeParse(value);

              const validationError = getValidationError(validationResult, [
                ValidationError.Empty,
                ValidationError.NoSpecialCharacter,
                ValidationError.NoNumber,
              ]);

              if (validationError) {
                setLastNameError(validationErrorMap[validationError]);
              }
              setLastName(event.target.value);
            }}
          />

          {lastNameError && (
            <span className="w-full font-medium text-sm text-cienna-100 mt-1">
              {lastNameError}
            </span>
          )}
        </label>
      </div>

      <div className="flex gap-5 pb-3">
        <label htmlFor="twitter" className="w-full flex flex-col gap-1">
          <span className="text-xs uppercase text-black-60 font-medium">
            Twitter
          </span>
          <input
            required
            autoComplete="off"
            aria-label="twitter"
            name="twitter"
            placeholder="@jack"
            type="text"
            value={twitter}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setTwitter(event.target.value);
            }}
          />
        </label>

        <label htmlFor="avatar" className="w-full flex flex-col gap-1">
          <span className="text-xs uppercase text-black-60 font-medium">
            Avatar url
          </span>
          <input
            autoComplete="off"
            aria-label="Avatar URL"
            name="avatar"
            placeholder="https://example.com/avatar.jpg"
            type="text"
            value={avatarSrc}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target || {};
              const validationResult = validationSchema.nonempty
                .and(validationSchema.hasUrl)
                .safeParse(value);

              const validationError = getValidationError(validationResult, [
                ValidationError.HasUrl,
              ]);

              if (validationError) {
                setAvatarError(validationErrorMap[validationError]);
              }
              setAvatarSrc(event.target.value);
            }}
          />

          {avatarError && (
            <span className="w-full font-medium text-sm text-cienna-100 mt-1">
              {avatarError}
            </span>
          )}
        </label>
      </div>

      <label htmlFor="avatar" className="w-full flex flex-col gap-1 pb-3">
        <span className="text-xs uppercase text-black-60 font-medium">
          Notes
        </span>
        <textarea
          defaultValue={contact.notes}
          name="notes"
          rows={6}
          value={notes}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = event.target || {};
            setNotesError("");
            const validationResult = validationSchema.nonempty
              .and(validationSchema.nonempty)
              .and(validationSchema.noSpecialCharacter)
              .safeParse(value);

            const validationError = getValidationError(validationResult, [
              ValidationError.Empty,
              ValidationError.NoSpecialCharacter,
            ]);

            if (validationError) {
              setNotesError(validationErrorMap[validationError]);
            }
            setNotes(event.target.value);
          }}
        />
        {notesError && (
          <span className="w-full font-medium text-sm text-cienna-100 mt-1">
            {notesError}
          </span>
        )}
      </label>
      <div className="w-full flex gap-5">
        <button className="contact-button" type="submit" disabled={maySubmit}>
          Save
        </button>
        <button
          className="contact-button text-red-5"
          onClick={() => navigate(-1)}
          type="button"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}
