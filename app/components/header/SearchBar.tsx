import { Form } from '@remix-run/react';

export function SearchBar() {
  let initialQuery = '';
  if (typeof window === 'undefined') {
    // running in a server environment
  } else {
    // running in a browser environment
    initialQuery = new URL(window.location.href).searchParams.get('q') ?? '';
  }

  return (
    <Form method="get" action="/search" key={initialQuery} className='d-flex'>
      <input
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder="Search"
        className="form-control me-2"
      />
       <button className="btn btn-outline-primary" type="submit">Search</button>
    </Form>
  );
}
