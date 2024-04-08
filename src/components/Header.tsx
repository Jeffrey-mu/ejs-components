import { useEffect, useState } from 'react'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import Logo from './svg/Logo'
import { appConfig } from '@/lib/constant'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const [pathname, setPathname] = useState('/')
  useEffect(() => {
    setPathname(location.pathname)
  })
  const menuItems = [
    {
      name: 'Components',
      path: '/',
    },
    {
      name: 'Library',
      path: '/Library',
    },
    {
      name: 'About',
      path: '/About',
    },
  ]

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink
            to="/"
            className="flex gap-2 self-center text-orange-600 font-semibold whitespace-nowrap"
          >
            <Logo />
            <p className="self-center text-2xl whitespace-nowrap">
              {appConfig.siteName}
              {' '}
            </p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          menuItems.map((item) => {
            return (
              <NavbarItem key={item.name}>
                <NavLink className={clsx(pathname === item.path ? 'text-orange-600' : 'text-yellow-800')} to={item.path}>
                  {item.name}
                </NavLink>
              </NavbarItem>
            )
          })
        }
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://image.jiafengfmc.cn/file/39b413a7c5baf7f843e38.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">jeffrey.muc@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink
              color={
                index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
              }
              className="w-full"
              to={item.path}
            >
              {item.name}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
