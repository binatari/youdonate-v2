import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const ConfettiModal = ({ id }) => {
  const [open, setOpen] = useState(true);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [hash, setHash] = useState("");
  const cancelButtonRef = useRef(null);
  const { width, height } = useWindowSize();

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <>
      {open ? <Confetti width={width} height={height} /> : null}


      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[15]"
          initialFocus={cancelButtonRef}
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white p-[33px] mb-[30px] rounded-[40px]">
                    <div className="flex justify-end">
                      <i
                        class="las la-times la-2x  cursor-pointer"
                        onClick={() => setOpen(false)}
                      ></i>
                    </div>
                    <h2 className="text-center text-[20.99px]  font-bold nippo mb-10">
                     Campaign has been fully funded
                    </h2>
                    <div className="justify-center flex">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ConfettiModal;
