import React, { Fragment } from "react";
import logo from "images/logo_small.png";
import { Menu, Transition } from '@headlessui/react'
import { BsChevronDown, BsPersonCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { connect } from "react-redux";
import { logoutAction } from "actions/auth";
import { loadingAction } from "actions/shared";
import toast from "react-hot-toast";

const Navbar = ({ dispatch }) => {

    const handleLogOut = () => {
        dispatch(loadingAction(true));
        setTimeout(() => {
            dispatch(logoutAction());
            toast.success("Logout successfull")
            dispatch(loadingAction(false));
        }, 3000);
    };

    return (
        <nav>
            <div className="flex flex-row flex-wrap items-center justify-between p-2">
                <div className="flex items-center">
                    <img src={logo} alt="logo" className="inline-block w-8 h-8 mx-auto" />
                    <span className="ml-2 text-xl">Afkanerd Developer Console</span>
                </div>


                <Menu as="div" className="relative inline-block">
                    <div>
                        <Menu.Button className="inline-flex items-center align-center">
                            <BsPersonCircle size={24} />
                            <BsChevronDown className="ml-2" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-56 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => handleLogOut()}
                                        className="flex items-center w-full p-2 rounded"
                                    >
                                        <FiLogOut className="mr-2" />
                                        <span>Logout</span>
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </nav>
    )
}

export default connect()(Navbar)