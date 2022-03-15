import styles from '../styles/switch.module.css'

import { FiInfo } from 'react-icons/fi'
import { IoClose } from 'react-icons/io'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import Ports from './ports';

export default function SwitchElement({sw, departments, types}) {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function ModalSwitchInfo({codename, location, reference, ip, mac}) {
        return (
          <>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
              >
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                <Dialog.Overlay className="fixed inset-0" />
                  </Transition.Child>
      
                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform text-white shadow-xl rounded-2xl bg-black">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white-900"
                      >
                        Switch {codename}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p>IP: {ip}</p>
                        <p>MAC: {mac}</p>
                        <p>Localização: {location}</p>
                        <p>Referência: {reference}</p>
                      </div>
      
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={closeModal}
                        >
                          Fechar
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </>
        )
      }
      
    let even
    let odd
    {odd = sw.Ports.filter(port => port.codename % 2 !== 0)}
    {even = sw.Ports.filter(port => port.codename % 2 === 0)}

    const ordernedOdd = odd.sort((a,b) => a.codename - b.codename)
    const ordernedEven = even.sort((a,b) => a.codename - b.codename)

    const swStyle = types.find(type =>  type.id === sw.typeId)

    return (
        <div className={styles.switch} style={{backgroundColor: swStyle.color1, border: `${swStyle.color2} 2px solid`}}>
            <div>
                {<Ports ports={ordernedOdd} orientation={"up"} key={`${sw.id}-up`} departments={departments} swStyle={swStyle}/>}
                {<Ports ports={ordernedEven} orientation={"down"} key={`${sw.id}-down`} departments={departments} swStyle={swStyle}/>}
            </div>
            <div className={styles.swcode}>
                <h1>{sw.codename}</h1>
                <FiInfo onClick={() => openModal()}/>
                <ModalSwitchInfo codename={sw.codename} location={sw.location} reference={sw.reference} ip={sw.ip} mac={sw.mac}/>
            </div>
        </div>
    )
}
