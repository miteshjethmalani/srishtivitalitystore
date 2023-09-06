import { Form } from '@remix-run/react';
import {Input, Button} from '@material-tailwind/react';

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
      <Input
          type="search"
          label="Type here..."
          name="q"
          defaultValue={initialQuery}
          className="pr-20"
          containerProps={{
            className: "min-w-[288px]",
          }}
        />
        <Button type="submit" size="sm" className="!absolute right-1 top-1 rounded button-deep-purple">
          Search
        </Button>
    </Form>
  );
}
