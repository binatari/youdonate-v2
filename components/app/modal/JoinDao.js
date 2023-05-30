import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Textfield from "../textfield/Index";
import Button from "../Button";
import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useContractRead,
  useToken,
} from "wagmi";
const simiABI = require("../../utils/goerliSimi.json");
const ercABI = require("../../utils/ercABI.json");
import { BigNumber, ethers } from "ethers";
// import { donate, getBalance } from "../../utils/contract";
import { NumericFormat } from "react-number-format";
import useIsMounted from "../../hooks/useIsMounted";
import SuccessModal from "./SuccessModal";
import useNetworkData from "../../hooks/useNetworkData";

const JoinDao = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [hash, setHash] = useState("");
  const [approveHash, setApproveHash] = useState("");
  const cancelButtonRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const onChange = (e) => {
    setAmount(e.floatValue);
  };

  const { simiDao, YDT } = useNetworkData();

  const { address } = useAccount();

  const {
    data: membersData,
    error: membersError,
    isLoading: membersLoading,
    isSuccess: membersSuccess,
    refetch,
  } = useContractRead({
    address: simiDao,
    abi: simiABI,
    functionName: "members",
    args: [address],
    onError(error) {
      console.log("Error", error);
    },
  });

  const { config: approveConfig, error: approveError, refetch:joinRefetch } =
    usePrepareContractWrite({
      address: simiDao,
      abi: simiABI,
      functionName: "joinSimiDAO",
      onError(error) {
        console.log("Error", error);
      },
      // onSuccess(data) {
      //   console.log("Success", data);
      // },
      enabled: true,
    });
  const {
    write: mutate,
    isLoading: mutateIsLoading,
    isSuccess,
    data,
  } = useContractWrite(approveConfig);
  // useEffect(() => {
  // account && getBalance(account, setCoins);
  // }, [account]);

  const realValue = ethers.utils.parseUnits("100", 18);

  const {
    config: approveConfi,
    error: approveErro,
    refetch: prepareFetch,
    isSuccess:prepareSuccess,
  
  } = usePrepareContractWrite({
    address: YDT,
    abi: ercABI,
    functionName: "approve",
    args: [simiDao, realValue],
    // onError(error) {
    //   console.log("Error", error);
    // },
    // onSuccess(data) {
    //   console.log("Success", data);
    // },
    enabled: true,
  });

  const {
    write: validMutate,
    isLoading: validLoading,
    data: validData,
    isSuccess: validApproval,
  } = useContractWrite(approveConfi);

  // const { data: coinData } = useBalance({
  //   addressOrName: address,
  //   token: YDT,
  //   watch: true,
  // });

  // useEffect(() => {
  // account && getBalance(account, setCoins);
  // }, [account]);

  useEffect(() => {
    if (validApproval) {
      console.log(validData);
      setApproveHash(validData?.hash);
      // setSuccess(true)
    }
  }, [validApproval, validData]);

  // useEffect(() => {
  //   if (donateSuccess) {
  //     console.log(donateData);

  //     setHash(donateData?.hash);
  //   }
  // }, [donateSuccess, donateData]);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      setHash(data?.hash);
    }
  }, [isSuccess, data]);

  return (
    <>
      {isMounted && !membersData?.exists && (
        <Button
          className={
            "bg-white text-[#06D6A0]  px-8 py-2 space-font z-10  rounded-[46px]"
          }
          onClick={handleOpen}
        >
          Become a member
        </Button>
      )}

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
                      Join the DAO
                    </h2>
                    <div className="justify-center flex flex-col">
                      {mutate ? (
                        <Button
                          disabled={!mutate || mutateIsLoading}
                          loading={mutateIsLoading}
                          variant="contained"
                          onClick={() => {
                            mutate?.();
                          }}
                        >
                          Join
                        </Button>
                      ) : (
                        <Button
                          disabled={!validMutate || validLoading}
                          loading={validLoading}
                          variant="contained"
                          onClick={() => {
                            validMutate?.();
                          }}
                        >
                         Enable
                        </Button>
                      )}

                      <p className="text-center text-sm nippo mt-6">
                        NOTE: 100 YDT Required
                      </p>
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
          success={<p>
            Transaction complete! You're now a DAO Member. Join us on Discord to
            connect with other members: <a href='discord.gg/C43W9yUR3x'><i class="lab la-discord la-2x"></i></a> 
          </p>}
          error="Sorry an error occurred and your transaction could not be completed at this time"
          closeModal={() => {
            refetch();
            setHash("");
            setOpen(false);
          }}
        />
      ) : null}
      {approveHash ? (
        <SuccessModal
          hash={approveHash}
          setHash={setApproveHash}
          success={`Your tokens have been approved `}
          error="Sorry an error occurred and your request could not be completed at this time"
          closeModal={() => {
            // refetch();
            // donateRefetch();
            // prepareFetch();
            joinRefetch()
            setApproveHash("");
          }}
        />
      ) : null}
    </>
  );
};

export default JoinDao;
