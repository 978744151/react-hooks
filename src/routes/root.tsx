import { Outlet, Link, useParams ,NavLink, useSubmit,useLoaderData, useNavigation, Form, redirect } from "react-router-dom";
import { getContacts, createContact } from "../contacts.ts";
import { useEffect, useState } from "react";

export async function action() {
 
  const contact = await createContact();
  console.log(contact)
  // return { contact };
  return redirect(`/contacts/${contact.id}/edit`);
}
export default function Root() {
  const navigation = useNavigation();
  const { contacts, q } = useLoaderData() as any;
  const [query,setQuery] = useState(q)
  const submit = useSubmit();

  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );
  useEffect(() => {
    setQuery(q)
  }, [q]);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>

        <div>
          <div>
            {/* other code */}
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>

        </div>
        <Form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            className={searching ? "loading" : ""}
            type="search"
            name="q"
            // value={query}
            defaultValue={q}
            onChange={(event) => {
              const isFirstSearch = q == null;
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              });
            }}
          />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </Form>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                          ? "pending"
                          : ""
                    }
                  >
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={
        navigation.state === "loading" ? "loading" : ""
      }>
        <Outlet />
      </div>
    </>
  );
}
// export async function loader() {
//   const contacts = await getContacts();
//   console.log(contacts)
//   return { contacts };
// }
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}