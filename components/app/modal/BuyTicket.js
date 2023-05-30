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
import { NumericFormat } from "react-number-format";
import {
  useContractRead,
  useBalance,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BigNumber } from "ethers";
import useIsMounted from "../../hooks/../useIsMounted";
import Randomize from "../Randomize";
import useNetworkData from "../../../hooks/useNetworkData";
const ethers = require("ethers");
const lotteryABI = require("../../../utils/lotteryABI.json");
const ercABI = require("../../../utils/ercABI.json");

const BuyTicket = ({ id, info }) => {
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
  const {
    data,
    error: countError,
    loading,
    isSuccess,
  } = useContractRead({
    address: lottery,
    abi: lotteryABI,
    functionName: "maxNumberTicketsPerBuyOrClaim",
  });

  const { address } = useAccount();

  const {
    data: allowanceData,
    error: allowanceError,
    isLoading: allowanceLoading,
    isSuccess: allowanceSuccess,
    refetch,
  } = useContractRead({
    address: YDT,
    abi: ercABI,
    functionName: "allowance",
    args: [address, lottery],
  });

  const allowanceNumber = allowanceData?.toString();

  const {
    data: ydt,
    isError,
    isLoading,
    error,
  } = useBalance({
    addressOrName: address,
    token: YDT,
    // scopeKey: 'wagmi',
    // onError(error) {
    //   console.log('Error', error)
    // },
    // onSuccess(data) {
    //   console.log('Success', data)
    // },
  });

  const balance = ydt?.value?.toString();

  const handleOpen = () => {
    setOpen(true);
  };

  const insufficentBalance =
    balance < info?.priceTicketInYDT?.toString() * amount;

  const realValue = ethers.utils.parseUnits(amount?.toString() || "0");

  const ticketWei = info?.priceTicketInYDT?.mul(amount || "0");

  const compare = ticketWei?.lte(allowanceData || "0");

  const greaterBal = ydt?.value?.gte(realValue);

  // console.log(compare, greaterBal, realValue.toString(), allowanceData?.toString());

  // useEffect(() => {
  //   totalTickets()
  //     .then((res) => setMax(Number(res)))
  //     .catch((err) => console.log(err));
  // }, []);

  const onChange = (e) => {
    setAmount(e.floatValue);

    const randomArray = Array.apply(null, Array(Number(e.floatValue) || 0)).map(
      (element, index) =>
        Math.floor(Math.random() * (1999999 - 1000000 + 1)) + 1000000
    );
    setRandom(randomArray);
  };

  const isMounted = useIsMounted();

  const { config, error: prepareError } = usePrepareContractWrite({
    address: YDT,
    abi: ercABI,
    functionName: "approve",
    args: [lottery, ticketWei],
    onError(error) {
      refetch();
    },
    onSuccess(data) {
      // console.log("Success", data);
    },
    enabled: true,
  });
  const {
    write,
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    data: approveData,
  } = useContractWrite(config);

  const {
    config: purchaseConfig,
    error: purchaseError,
    refetch: prepareFetch,
  } = usePrepareContractWrite({
    address: lottery,
    abi: lotteryABI,
    functionName: "buyTickets",
    args: [id, random],
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
    if (approveSuccess) {
      console.log(approveData);

      setApproveHash(approveData?.hash);
      setSuccess(true);
    }
  }, [approveSuccess, approveData]);

  useEffect(() => {
    if (purchaseSuccess) {
      console.log(purchaseData);
      setHash(purchaseData?.hash);
    }
  }, [isSuccess, purchaseData]);

  return (
    <>
      <Button
        variant={"contained"}
        onClick={handleOpen}
        disabled={isMounted && moment().unix() > info?.endTime?.toString()}
      >
        {isMounted && moment().unix() > info?.endTime?.toString()
          ? "Lottery ended"
          : "Buy ticket"}{" "}
        <i class="las la-wallet la-md"></i>
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
                      Buy tickets
                    </h2>
                    <div>
                      <div>
                        <NumericFormat
                          onValueChange={onChange}
                          thousandSeparator=","
                          type="number"
                          value={amount}
                          isAllowed={(values, sourceInfo) => {
                            const { value } = values;
                            return (
                              value <= BigNumber.from(data || 0).toNumber()
                            );
                          }}
                          allowNegative={false}
                          error={insufficentBalance}
                          helperText={
                            insufficentBalance ? "Insufficient Balance" : ""
                          }
                          label={"No. of tickets"}
                          placeholder="*amount of tickets to be purchased*"
                          name="amount"
                          // className={`p-[13px] placeholder-[#DAD2F8] bg-white w-full space-font rounded-[10px] border border-[#D8DEE6] ${insufficentBalance ? 'border-2 border-red-600 rounded-[10px]':null}`}
                          customInput={Textfield}
                        />
                      </div>

                      {/* <div className='mb-10'>
                        {
                          isMounted && address ?                     <p className=" flex text-[#87d6c1] gap-2 items-center justify-end text-[14px] space-font">
                          <span className='text-[#06D6A0] font-bold'> Bal: </span>
                         {ydt?.formatted + ' ' +  ydt?.symbol}
                        </p> : <p className=" flex text-[#87d6c1] text-center gap-2 items-center justify-end text-[14px] space-font">
                          Please make sure your wallet is connected
                        </p>
                        }

                  </div> */}
                  <div>
                  {!!select && random.map((ticket, i) => (
                        <Randomize
                          ticket={ticket}
                          index={i}
                          setRandom={setRandom}
                        />
                      ))}
                  </div>

                    

                      {isMounted && (
                        <p className=" text-center text-[14px] space-font">
                          Only a maximum of{" "}
                          {BigNumber.from(data || 0).toNumber()} tickets can be
                          bought at this time
                        </p>
                      )}

                      <div className="flex justify-around mb-10"></div>

                      <div className="flex justify-center gap-4 items-center">
                        {!!compare ? (
                          <>
                            <Button
                              variant={"contained"}
                              disabled={!mutate || purchaseLoading}
                              loading={purchaseLoading}
                              onClick={() => {
                                mutate?.();
                              }}
                            >
                              Buy now
                            </Button>
                            <div className="">
                              {!select ? (
                                <Button
                                  variant={"outlined"}
                                  disabled={!mutate || purchaseLoading}
                                  loading={purchaseLoading}
                                  onClick={() => {
                                    setSelect(true);
                                  }}
                                >
                                  Pick numbers
                                </Button>
                              ) : (
                                <Button
                                  variant={"outlined"}
                                  disabled={!mutate || purchaseLoading}
                                  loading={purchaseLoading}
                                  onClick={() => {
                                    const randomArray = Array.apply(
                                      null,
                                      Array(Number(amount) || 0)
                                    ).map(
                                      (element, index) =>
                                        Math.floor(
                                          Math.random() *
                                            (1999999 - 1000000 + 1)
                                        ) + 1000000
                                    );
                                    setRandom(randomArray);
                                  }}
                                >
                                  Randomize
                                </Button>
                              )}
                            </div>
                          </>
                        ) : (
                          <Button
                            variant={"contained"}
                            disabled={!amount || approveLoading || !write}
                            loading={approveLoading}
                            onClick={() => {
                              write?.();
                            }}
                          >
                            Enable purchase
                          </Button>
                        )}
                      </div>
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
            setRandom([])
            setSelect(false)
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

export default BuyTicket;
