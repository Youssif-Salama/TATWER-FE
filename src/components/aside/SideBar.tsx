"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { MdFormatAlignCenter, MdPayments } from 'react-icons/md';
import { SiGoogleforms } from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/componentsShadcn/ui/button';
import { RiArrowDownSFill } from 'react-icons/ri';
import SideBarDropDown3 from './SideBarDropDown3';
import { IoMdSettings } from "react-icons/io";
import SideBarDropDown4 from './SideBarDropDown4';
import SideBarDropDown5 from './SideBarDropDown5';


interface AsideRoute {
  name: string;
  path: string[];
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  haveDropDown?: boolean;
  id?: number;
  arrow?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

const routes: AsideRoute[] = [
  {
    name: 'الصفحه الرئيسيه',
    path: ['/'],
    icon: MdFormatAlignCenter,
  },
  {
    name: 'الدفعات',
    path: ['/systems'],
    icon: MdPayments,
  },
  {
    name: 'العقود',
    path: ['/contracts', '/contracts/create', '/contracts/create/files', '/contracts/create/address'],
    icon: SiGoogleforms,
    haveDropDown: true,
    id: 3,
    arrow: RiArrowDownSFill,
  },
  {
    name: 'العقارات',
    path: ['/estates', '/estates/create', '/estates/create/files', '/estates/create/address'],
      icon: SiGoogleforms,
      haveDropDown: true,
      id:5 ,
      arrow: RiArrowDownSFill,
    },
    {
    name: 'الاعدادات',
    path: ['/settings', '/settings/payment'],
    icon: SiGoogleforms,
    haveDropDown: true,
    id:4 ,
    arrow: RiArrowDownSFill,
  },
];

export default function Sidebar({ hide }: { hide: boolean }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentOpened, setCurrentOpened] = useState<number | null>(null);
  const [opendSideDrop3, setOpendSideDrop3] = useState(false);
  const [opendSideDrop4, setOpendSideDrop4] = useState(false);
  const [opendSideDrop5, setOpendSideDrop5] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const pathname = location.pathname;

  const onClickOutsideAside = useCallback((e: MouseEvent) => {
    if (asideRef.current && !asideRef.current.contains(e.target as Node) && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutsideAside);
    return () => {
      document.removeEventListener('mousedown', onClickOutsideAside);
    };
  }, [onClickOutsideAside]);

  const handleDropdownClick = (id: number | undefined) => {
    // @ts-ignore
    setCurrentOpened(prevId => (prevId === id ? null : id));
    if (id === 3) setOpendSideDrop3(prev => !prev);
    if (id === 4) setOpendSideDrop4(prev => !prev);
    if (id === 5) setOpendSideDrop5(prev => !prev);
  };

  return (
    <div className={`relative z-[1000] ${hide ? 'hidden' : ''}`}>
      <button
        className="fixed top-4 right-4 z-50"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? (
          <FiX size={24} className='bg-white rounded-full shadow text-[#0077b6] p-1' />
        ) : (
          <FiMenu size={24} className='bg-[#0077b6] rounded-full shadow text-white p-1 border-white border-2' />
        )}
      </button>

      <div
        ref={asideRef}
        className={`fixed top-0 right-0 h-full w-64 bg-[#0077b6] p-5 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-between`}
      >
        <nav className="mt-8">
          <ul className="space-y-2 text-white">
            {routes.map((item) => {
              const isActive = item.path.includes(pathname);
              const isOpenDropdown = item.id === currentOpened;

              return (
                <li key={item.id}>
                  <Link
                    to={item.path[0]}
                    className={`flex items-center justify-between uppercase font-semibold p-2 rounded-md
                      ${isActive ? 'bg-white text-[#0077b6] shadow-[0_0_10px_0_rgba(255,255,255,1)]' : 'animate-in hover:scale-95 duration-300 transition-all transform ease-in-out'}
                    `}
                  >
                    <span>{item.name}</span>
                    <div className='flex gap-2 items-center'>
                      {item.icon && <item.icon className='font-bold text-[16px]' />}
                      {item.haveDropDown && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleDropdownClick(item.id)}}
                        >
                          {item.arrow && <item.arrow className={`font-bold text-[19px] ${isOpenDropdown ? 'rotate-180' : 'rotate-0'}`} />}
                        </span>
                      )}
                    </div>
                  </Link>
                  {item.haveDropDown && item.id === 3 && <SideBarDropDown3 opendSideDrop3={opendSideDrop3} />}
                  {item.haveDropDown && item.id === 4 && <SideBarDropDown4 opendSideDrop4={opendSideDrop4} />}
                  {item.haveDropDown && item.id === 5 && <SideBarDropDown5 opendSideDrop5={opendSideDrop5} />}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto">
          <Button
            className='w-full bg-white text-[#0077b6] flex items-center gap-1 hover:bg-white hover:scale-95 transform transition-all ease-in-out duration-300'
            onClick={() => window.location.reload()}
          >
            <span>تسجيل الخروج</span>
            <FiLogOut />
          </Button>
        </div>
      </div>
    </div>
  );
}
