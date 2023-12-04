import { FormEvent, Dispatch, SetStateAction } from "react";

import { Form } from "@remix-run/react";

interface ContactsSearchFormProps {
  onContactSearch: (event: FormEvent<HTMLFormElement>) => void;
  searching: boolean;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
}
export default function ContactsSearchForm(props: ContactsSearchFormProps) {
  const { onContactSearch, setSearchValue, searchValue } = props;

  return (
    <div className="flex flex-row w-full items-center justify-between gap-5">
      <Form role="search" onChange={(event) => onContactSearch(event)}>
        <input
          aria-label="Search contacts"
          className="w-full rounded-md pl-8 py-2 shadow-md search-icon bg-no-repeat bg-[length:24px_24px] bg-[center_left_0.5rem] relative"
          placeholder="Search"
          type="search"
          name="q"
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          value={searchValue}
        />
      </Form>
      <Form method="post">
        <button type="submit" className="contact-button">
          New
        </button>
      </Form>
    </div>
  );
}
