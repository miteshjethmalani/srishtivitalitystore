import { Link, useMatches, useResolvedPath } from '@remix-run/react';
import { To } from '@remix-run/router';
import { Tab as TabM } from '@material-tailwind/react';

type IconElement = React.SVGProps<SVGSVGElement> & {
  title?: string;
  titleId?: string;
};

export type TabProps = {
  Icon: React.FC<IconElement>;
  text: string;
  to: To;
  pathName: string;
};

export function Tab({ Icon, text, to }: TabProps) {
  const resolved = useResolvedPath(to);
  const matches = useMatches();
  const isActive = matches.find((m) => m.pathname === resolved.pathname);

  return (
    <Link
      to={'./'+to}
      className={`w-full ${isActive
          ? 'text-primary'
          : 'text-secondary'
        }`}
    >
      <TabM key={text} value={text} className={'list-inline-item me-4 ' + (isActive ? `cursor-default` : `cursor-pointer`)}>
        <span className='flex'>

          <Icon
            className={`w-7 h-7 ${isActive
                ? 'text-primary'
                : 'text-secondary'
              }`}
          />
          <span className="flex-1">{text}</span>
        </span>
      </TabM>
    </Link>
  );
}
