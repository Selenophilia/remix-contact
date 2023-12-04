import { useFetcher } from "@remix-run/react";

import type { ContactRecord } from "../../data";

interface ContactsFavoriteProps {
  contact: Pick<ContactRecord, "favorite">;
}

export default function ContactsFavorite({ contact }: ContactsFavoriteProps) {
  const fetcher = useFetcher();
  let favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  } else {
    favorite = contact.favorite;
  }

  return (
    <fetcher.Form method="post">
      <button
        className="shadow-none"
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? (
          <span className="text-yellow-5">★</span>
        ) : (
          <span className="text-yellow-5">☆</span>
        )}
      </button>
    </fetcher.Form>
  );
}
