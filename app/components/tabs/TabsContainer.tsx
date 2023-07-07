import { ReactNode } from 'react';
import { Tab, TabProps } from './Tab';

export function TabsContainer({
  tabs,
  children,
}: {
  tabs: TabProps[];
  children: ReactNode | string;
}) {
  return (
    <>
      <div className="border-bottom  mt-4">
        <ul className="list-inline">
          {tabs.map((props) => (
            <Tab
              Icon={props.Icon}
              text={props.text}
              to={props.to}
              key={props.text}
            />
          ))}
        </ul>
      </div>
      {children}
    </>
  );
}
