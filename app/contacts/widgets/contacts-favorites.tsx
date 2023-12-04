import { useFetcher } from "@remix-run/react";

import type { ContactRecord } from "../../data";

interface ContactsFavoriteProps {
  contact: Pick<ContactRecord, "favorite">;
}

export default function ContactsFavorite({ contact }: ContactsFavoriteProps) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        className="shadow-none"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
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
