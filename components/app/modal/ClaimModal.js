import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Textfield from "../textfield/Index";
import Button from "../Button";
import moment from "moment";
import SuccessModal from "./SuccessModal";
// import {
//   buyTicket,
//   donate,
//   getBalance,
//   totalTickets,
// } from "../../utils/contract";
import { useMetaMask } from "metamask-react";
import { NumericFormat } from "react-number-format";
import {
  useContractRead,
  useBalance,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BigNumber } from "ethers";
import useIsMounted from "../../hooks/useIsMounted";
import Randomize from "../Randomize";
import useNetworkData from "../../hooks/useNetworkData";
const bigNumber = require("bignumber.js");
const ethers = require("ethers");
const lotteryABI = require("../../utils/lotteryABI.json");
const ercABI = require("../../utils/ercABI.json");

const ClaimModal = ({ id, tickets, brackets }) => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hash, setHash] = useState("");
  const [approveHash, setApproveHash] = useState("");
  const [select, setSelect] = useState(0);
  const [amount, setAmount] = useState(0);
  const [random, setRandom] = useState([]);
  const cancelButtonRef = useRef(null);

  const {lottery, YDT} = useNetworkData()

  const handleOpen = () => {
    setOpen(true);
  };


  const isMounted = useIsMounted();

  const {
    config: purchaseConfig,
    error: purchaseError,
    refetch: prepareFetch,
  } = usePrepareContractWrite({
    address: lottery,
    abi: lotteryABI,
    functionName: "claimTickets",
    args: [id, tickets, brackets],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
    enabled: true,
  });

  const {
    write: mutate,
    isLoading: purchaseLoading,
    isSuccess: purchaseSuccess,
    data: purchaseData,
  } = useContractWrite(purchaseConfig);

  useEffect(() => {
    if (purchaseSuccess) {
      console.log(purchaseData);
      setHash(purchaseData?.hash);
    }
  }, [purchaseSuccess, purchaseData]);

  return (
    <>
      <Button
        variant={"contained"}
        onClick={handleOpen}
        // disabled={isMounted && moment().unix() > info?.endTime?.toString()}
      >
     Claim Tickets
      </Button>
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
                    <div
                      className={`flex items-center ${
                        select ? "justify-between" : "justify-end"
                      }`}
                    >
                      {select ? (
                        <i
                          class="las la-angle-double-left la-2x text-black cursor-pointer"
                          onClick={() => setSelect(false)}
                        ></i>
                      ) : null}
                      <i
                        class="las la-times la-2x text-black cursor-pointer"
                        onClick={() => setOpen(false)}
                      ></i>
                    </div>
                    <h2 className="text-center text-[20.99px] font-bold nippo mb-10">
                      Claim tickets
                    </h2>
                    <div className="flex justify-center w-full">
                      <Button
                        variant={"contained"}
                        disabled={!mutate || purchaseLoading}
                        loading={purchaseLoading}
                        onClick={() => {
                          mutate?.();
                        }}
                      >
                        Claim Tickets
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {hash ? (
        <SuccessModal
          hash={hash}
          setHash={setHash}
          success={`Your purchase has been recorded `}
          error="Sorry an error occurred and your purchase could not be completed at this time"
          closeModal={() => {
            refetch();
            setAmount(0);
            setSuccess(false);
            setRandom([]);
            setSelect(false);
            setOpenModal(false);
            setOpen(false);
            setHash("");
          }}
        />
      ) : null}

      {approveHash ? (
        <SuccessModal
          hash={approveHash}
          setHash={setApproveHash}
          success={`Your tokens have been approved `}
          error="Sorry an error occurred and your purchase could not be completed at this time"
          closeModal={() => {
            refetch();
            prepareFetch();
            setApproveHash("");
          }}
        />
      ) : null}
    </>
  );
};

export default ClaimModal;
