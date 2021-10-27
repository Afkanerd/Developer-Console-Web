import React, { Fragment } from "react";
import logo from "images/logo_small.png";
import { Menu, Transition } from "@headlessui/react";
import { BsChevronDown, BsPersonCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { connect } from "react-redux";
import { logoutAction } from "actions/auth";
import { loadingAction } from "actions/shared";
import toast from "react-hot-toast";
import { clearCache } from "services/storage";
import { userLogOut } from "services/auth";
import { removeProfileAction } from "actions/profile";

const Navbar = ({ dispatch, auth }) => {
    const handleLogOut = () => {
        dispatch(loadingAction(true));
        userLogOut(auth)
            .then(() => {
                // clear active session state in memory
                dispatch(logoutAction());
                dispatch(removeProfileAction())
                // clear any cached sessions
                clearCache();
                toast.success("Logout successful");
                dispatch(loadingAction(false));
            })
            .catch((error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 400:
                            toast.error("An error occured. Please contact support");
                            break;
                        case 401:
                            toast.error(
                                "Sorry you are not authorized to use this service. Please contact support"
                            );
                            break;
                        case 409:
                            toast.error(
                                "There is a possible duplicate of this account please contact support"
                            );
                            break;

                        case 429:
                            toast.error(
                                "Too many failed attempts please wait a while and try again"
                            );
                            break;
                        case 500:
                            toast.error("A critical error occured. Please contact support");
                            break;
                        default:
                            toast.error("An error occured, please try again");
                    }
                } else if (error.request) {
                    toast.error("An error occured, please check your network try again");
                } else {
                    toast.error("An error occured");
                }
                dispatch(loadingAction(false));
            });
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
    );
};

export default connect((state) => ({
    auth: state.auth
}))(Navbar);
