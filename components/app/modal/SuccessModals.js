import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Textfield from "../textfield/Index";
import Button from "../Button";
import { useRouter } from "next/router";
import { submitVote, web3 } from "../../utils/useYd";
import { useMetaMask } from "metamask-react";
import { useWaitForTransaction } from "wagmi";
import { FadeLoader } from "react-spinners";
import { useOnboardProvider } from "../../context/OnBoardProvider";

const SuccessModals = ({ hash, success, error, setHash, action, closeModal }) => {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [response, setResponse] = useState(true);
  const cancelButtonRef = useRef(null);

  const { refetch } = useOnboardProvider();

  // Either use the fetched current 
  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash,
    onSuccess(data) {
      setResponse(data)
      if(data.status && action){
        // setLoader(true)
        refetch().then(res=>{

          // console.log(res.data.toString(), 'this is the new count')
        })
        action().then(res=>{
          console.log(res)
          setLoader(false)}).catch(err=>{
          setLoader(false)
          console.log(err)})
      }
      console.log('Success', data)
    },
    onError(err) {
      console.log('error', err)
    },
  })

  useEffect(() => {
    hash && setOpen(true);
  }, [hash]);
 
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[15]"
          initialFocus={cancelButtonRef}
          onClose={() => {
            if(isSuccess){
              setOpen(false)
            }
          }}
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
                  <h2 className="text-center text-[20.99px] font-bold nippo mb-10">
                    VALIDATING TRANSACTION
                  </h2>

                  {isLoading || loader ? (
                    <div className="flex justify-center">
                       <FadeLoader color="#36d7b7" />
                    </div>
                  ) : response.status ? (
                    <div>
                      <h2 className="text-center text-[20.99px]  font-bold nippo mb-10">
                        Transaction successful
                      </h2>
                      <p className="text-white text-center text-[14px] space-font mb-6">
                        {/* {response?success:error} */}
                      </p>
                      <div className="flex justify-center">
                        <Button
                          variant={"contained"}
                          onClick={() => {
                            setOpen(false);
                            closeModal()
                          }}
                        >
                          Close
                        </Button>
                        <Button
                          variant={"contained"}
                          onClick={() => {
                            setOpen(false);
                        
                          }}
                        >
                         View my campaigns
                        </Button>
                    </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-center text-[20.99px] font-bold nippo mb-10">
                        Transaction failed
                      </h2>
                      <div className="flex justify-center">
                        <Button
                          variant={"contained"}
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SuccessModals;
