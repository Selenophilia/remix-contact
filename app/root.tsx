import {
  LinksFunction,
  json,
  redirect,
  LoaderFunctionArgs,
} from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/main.css";

import { getContacts } from "./data";
import ContactsPage from "./contacts/page";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("q");
  const contacts = await getContacts(searchParams);
  return json({ contacts, searchParams });
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ContactsPage />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
