import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import icon from '../../assets/pngwing.com.png'

export default function Navbar() {
  return (
    <Disclosure as="nav" className="fixed w-full top-0 z-50 backdrop-blur-md">
      <div id="a-header" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-5 items-center justify-between"></div>
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        <div className="flex ">
          <img 
            src={icon} 
            alt="Company Logo" 
            className="h-10 w-auto mr-10" 
          />
          <nav>
              <a
                key='HOME'
                href='/'
                className="text-black hover:text-gray-600 text-sm font-medium"
              >
                HOME
              </a>
          </nav>
        </div>
      </div>
    </Disclosure>
  )
}