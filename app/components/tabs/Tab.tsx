import { NavLink, useMatches, useResolvedPath } from '@remix-run/react';
import { To } from '@remix-run/router';

type IconElement = React.SVGProps<SVGSVGElement> & {
  title?: string;
  titleId?: string;
};

export type TabProps = {
  Icon: React.FC<IconElement>;
  text: string;
  to: To;
};

export function Tab({ Icon, text, to }: TabProps) {
  const resolved = useResolvedPath(to);
  const matches = useMatches();
  const isActive = matches.find((m) => m.pathname === resolved.pathname);

  return (
    <li className={'list-inline-item me-4 '+ (isActive ? `cursor-default` : `cursor-pointer`)}>
      <NavLink
        to={to}
        className={` ${
          isActive
            ? 'text-primary'
            : 'text-secondary'
        }`}
      >
        <span className='flex'>

        <Icon
          className={`w-7 h-7 ${
            isActive
              ? 'text-primary'
              : 'text-secondary'
          }`}
        />
        <span className="flex-1">{text}</span>
        </span>
      </NavLink>
    </li>
  );
}
