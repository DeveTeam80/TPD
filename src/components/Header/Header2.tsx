// src/app/SiteHeader.tsx or Header2.tsx
import { getNavigation } from '@/data/navigation'
import { Button } from '@/shared/Button'
import Logo from '@/shared/Logo'
import clsx from 'clsx'
import { FC } from 'react'
import HamburgerBtnMenu from './HamburgerBtnMenu'
import Navigation from './Navigation/Navigation'
import SearchModal from './SearchModal'

interface Props {
  bottomBorder?: boolean
  className?: string
}

const Header2: FC<Props> = async ({ bottomBorder, className }) => {
  const navigationMenu = await getNavigation()

  // TODO: Replace with actual auth check
  const isAuthenticated = false

  return (
    <div
      className={clsx(
        'header-2 relative z-20 border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900',
        bottomBorder && 'border-b',
        !bottomBorder && 'has-[.header-popover-full-panel]:border-b',
        className
      )}
    >
      <div className="container flex h-20 justify-between">
        <div className="flex flex-1 items-center gap-x-4 sm:gap-x-5 lg:gap-x-7">
          <Logo />
          {/* Remove divider on small screens, show on medium+ */}
          <div className="hidden h-8 border-l md:block"></div>
          {/* Desktop Search - Better positioning */}
          <div className="hidden md:block md:min-w-[280px] lg:min-w-[320px]">
            <SearchModal type="type2" />
          </div>
        </div>

        <div className="mx-4 hidden flex-2 justify-center lg:flex">
          <Navigation menu={navigationMenu} featuredPosts={[]} />
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-2">
          {/* Mobile Search - Icon only */}
          <div className="md:hidden">
            <SearchModal type="type1" />
          </div>

          {/* Auth Buttons - Show when NOT authenticated */}
          {!isAuthenticated && (
            <>
              {/* <Button className="hidden h-10 px-4 sm:flex" href="/login" plain>
                Sign In
              </Button> */}
              <Button className="h-10 px-4" href="#">
                Get Started
              </Button>
            </>
          )}

          {/* Authenticated User Actions - Show when authenticated */}
          {isAuthenticated && (
            <>
              {/* Uncomment when ready to implement these features
              <Button className="hidden h-10 px-3 sm:flex" href="/nominate" plain>
                <PlusIcon className="size-5" />
                Nominate
              </Button>
              <NotifyDropdown className="me-3" />
              <AvatarDropdown />
              */}
            </>
          )}

          {/* Mobile Menu */}
          <div className="ms-2 flex lg:hidden">
            <HamburgerBtnMenu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header2