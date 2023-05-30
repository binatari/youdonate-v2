import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import { useContractWrite, usePrepareContractWrite, useContractRead, useAccount } from "wagmi";
const simiABI = require("../../utils/goerliSimi.json");
import { useRouter } from "next/router";
import useNetworkData from '../../hooks/useNetworkData'
// import { submitVote } from "../../utils/contract";
const VoteModal = ({ id,  setOpen, open, showButton, votesRefetch }) => {
  const [value, setValue] = useState(null);
  const [loader, setLoader] = useState(false);
  const [share, setShare] = useState(false);
  const [hash, setHash] = useState('');
  const cancelButtonRef = useRef(null);
  const {simiDao} = useNetworkData()



  const {address}= useAccount()
  const { config, error } = usePrepareContractWrite({
    address: simiDao,
    abi: simiABI,
    functionName: "submitVote",
    args: [id, value],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
    enabled: true,
  });

  const { refetch, data } = useContractRead({
    address: simiDao,
    abi: simiABI,
    functionName: "getMemberProposalVote",
    args:[address, id]
  });


  const { write, isLoading, isSuccess:voteSuccess, data:voteData } = useContractWrite(config);

  useEffect(() => {
    if (voteSuccess) {
     
      setHash(voteData?.hash);
    }
  }, [voteSuccess, voteData]);

  return (
    <>
    {
      !data && showButton &&  <Button
      variant={"contained"}
      onClick={() => setOpen(true)}
      disabled={!!data}
      // style={{
      //   border: "1px solid white",
      //   color: "white",
      //   marginLeft: "1em",
      // }}
    >
      {
        !!data ? 'Your vote has been cast' : ' Vote'
      }
     
    </Button>
    }
     
       

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[15]"
          initialFocus={cancelButtonRef}
          onClose={()=>setOpen(false)}
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
                <Dialog.Panel className="relative transform overflow-hidden  text-left transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                <div className="bg-white p-[33px] mb-[30px] rounded-[40px]">
                  <div className="flex justify-end">
                    <i
                      class="las la-times la-2x  cursor-pointer"
                      onClick={() => setOpen(false)}
                    ></i>
                  </div>
                  <h2 className="text-center text-[20.99px] font-bold nippo mb-10">
                    VOTE FOR THIS CAMPAIGN
                  </h2>
                  <div>
                    <p className=" text-center text-[14px] space-font mb-4">
                      Decide what campaign gets approved
                    </p>
                    <div className="flex items-center justify-center mb-10">
                      <i
                        class={`las la-thumbs-up la-4x   mr-4 cursor-pointer p-6 rounded-[10px] ${value == 1 ?'text-white bg-[#06D6A0]' : ' text-[#06D6A0] bg-white'}`}
                        onClick={() => setValue(1)}
                      ></i>
                      <i
                        class={`las la-thumbs-down la-4x cursor-pointer p-6  rounded-[10px] ${value == 2 ?'text-white bg-[#06D6A0]' : ' text-[#06D6A0] bg-white '}`}
                        onClick={() => setValue(2)}
                      ></i>
                    </div>
                    
                  </div>
                  <div className="flex justify-center flex-col">
                      <Button
                        variant={"contained"}
                        disabled={!value || !write || isLoading}
                        loading={isLoading}
                        onClick={()=>{write?.()}}
                      >
                        Vote
                      </Button>
                      {
                        value && error?.reason &&  <span className="block  text-red-400 space-font font-semibold text-[10px] text-center mt-4">
                        {error?.reason || ''}
                      </span>
                      }
                    </div>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {
        hash? <SuccessModal
        hash={hash}
        setHash={setHash}
        success={`Thank you for casting your vote `}
        error='Your vote could not be recorded at this time'
        closeModal={() => {
          if(votesRefetch){
            votesRefetch()
          }
        setOpen(false)
         setHash('')
         refetch()
        }}
      />:null
      }

    </>
  );
};

export default VoteModal;
