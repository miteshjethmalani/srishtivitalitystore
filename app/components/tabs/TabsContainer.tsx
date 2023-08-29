import { ReactNode } from 'react';
import { Tab, TabProps } from './Tab';
import { Tabs, TabsHeader } from '@material-tailwind/react';
import { useLocation, useMatches } from '@remix-run/react';

export function TabsContainer({
  tabs,
  children,
}: {
  tabs: TabProps[];
  children: ReactNode | string;
}) {
  let location = useLocation();
  console.log(location.pathname);
  const isActive:any = tabs?.find((m) => m.pathName === location.pathname );

  return (
    <>
      <Tabs value={isActive?.text} className="block w-full rounded-xl shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 bg-white mx-auto max-w-screen-xl p-2 lg:pl-6 text-gray-900">

        <TabsHeader className="list-inline">
          {tabs.map((props) => (
            <Tab
              Icon={props.Icon}
              text={props.text}
              to={props.to}
              key={props.text}
              pathName={props.pathName}
            />
          ))}
        </TabsHeader>

        {children}
      </Tabs>
    </>
  );
}
