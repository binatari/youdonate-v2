import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Textfield from "../textfield/Index";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useContractRead,
  useToken,
  useSigner,
  useBalance,
} from "wagmi";
const ydtABI = require("../../../utils/donateABI.json");
const ercABI = require("../../../utils/ercABI.json");
import { BigNumber, ethers } from "ethers";
import Select, { components } from "react-select";

// import { donate, getBalance } from "../../utils/contract";
import { NumericFormat } from "react-number-format";
import { useOnboardProvider } from "../../../context/OnBoardProvider";
import useNetworkData from '../../../hooks/useNetworkData'

const DonateModal = ({ id, depositRefetch }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [hash, setHash] = useState("");
  const [approveHash, setApproveHash] = useState("");
  const [token, setToken] = useState("");
  const [decimals, setDecimals] = useState(18);
  const cancelButtonRef = useRef(null);

  const {tokens , YDT, YDTProc} = useNetworkData()

  const { Option } = components;

  const IconOption = (props) => (
    <Option {...props}>
      <div className="flex justify-center items-center gap-4">
        <img
          src={props.data.image}
          className="h-8 w-8 rounded-full "
          alt="country-image"
        />
        <span>{props.data.label}</span>
      </div>
    </Option>
  );

  const { rate } = useOnboardProvider();

  const handleOpen = () => {
    setOpen(true);
  };

  const onChange = (e) => {
    setAmount(e.floatValue);
  };

  const { address } = useAccount();

  const {
    data: allowanceData,
    error: allowanceError,
    isLoading: allowanceLoading,
    isSuccess: allowanceSuccess,
    refetch,
  } = useContractRead({
    address: token,
    abi: ercABI,
    functionName: "allowance",
    args: [address, YDTProc],
    onError(error) {
      console.log("Error", error);
    },
  });

  // console.log(allowanceData);

  const { data: signer } = useSigner();

  const realValue = ethers.utils.parseUnits(
    amount?.toString() || "0",
    decimals
  );

  const compare = realValue.lte(allowanceData || "0");

  // useEffect(()=>{
  //   if(signer){
  //   const getAdd = donate(signer, [Number(id), realValue, token])
  //   }
  // }, [signer])

  const {
    config,
    error,
    refetch: donateRefetch,
  } = usePrepareContractWrite({
    address: YDTProc,
    abi: ydtABI,
    functionName: "donateToProject",
    args: [Number(id), realValue, token],
    // onError(error) {
    //   console.log("Error", error);
    // },
    // onSuccess(data) {
    //   console.log("Success", data);
    // },
    enabled: true,
  });
  const {
    write,
    isLoading,
    data: donateData,
    isSuccess: donateSuccess,
  } = useContractWrite(config);

  const addToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: YDT, // The address that the token is at.
            symbol: "YDT", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            // image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    config: approveConfig,
    error: approveError,
    refetch: prepareFetch,
  } = usePrepareContractWrite({
    address: token,
    abi: ercABI,
    functionName: "approve",
    args: [YDTProc, realValue],
    // onError(error) {
    //   console.log("Error", error);
    // },
    // onSuccess(data) {
    //   console.log("Success", data);
    // },
    enabled: true,
  });
  const {
    write: mutate,
    isLoading: mutateIsLoading,
    data: approveData,
    isSuccess: approveSuccess,
  } = useContractWrite(approveConfig);

  const { data: coinData } = useBalance({
    addressOrName: address,
    token: YDT,
    watch: true,
  });

  // useEffect(() => {
  // account && getBalance(account, setCoins);
  // }, [account]);

  useEffect(() => {
    if (approveSuccess) {
      console.log(approveData);
      setApproveHash(approveData?.hash);
      // setSuccess(true)
    }
  }, [approveSuccess, approveData]);

  useEffect(() => {
    if (donateSuccess) {
      console.log(donateData);

      setHash(donateData?.hash);
    }
  }, [donateSuccess, donateData]);

  const getWeth = tokens.filter((token) => {
    return token.label == "Weth";
  });

  return (
    <>
      <Button variant={"contained"} onClick={handleOpen}>
        Donate
      </Button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[15]"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setOpen(false);
            setAmount("");
            setToken("");
            setDecimals(18);
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
                <Dialog.Panel className="relative transform  text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white p-[33px] mb-[30px] rounded-[40px]">
                    <div className="flex justify-end">
                      <i
                        class="las la-times la-2x  cursor-pointer"
                        onClick={() => {
                          setOpen(false);
                          setAmount("");
                          setToken("");
                          setDecimals(18);
                        }}
                      ></i>
                    </div>
                    <h2 className="text-center text-[20.99px]  font-bold nippo mb-10">
                      MAKE A DONATION
                    </h2>
                    <div>
                      <NumericFormat
                        onValueChange={onChange}
                        thousandSeparator=","
                        allowNegative={false}
                        label={"AMOUNT"}
                        placeholder="*Please put in the amount to be donated*"
                        name="amount"
                        helperText={
                          getWeth[0]?.value == token && amount ? (
                            <span className="block text-[#06D6A0] mt-2  space-font font-semibold text-[10px] text-right">
                              ≈{" "}
                              {Number(rate * amount)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                              USD
                            </span>
                          ) : null
                        }
                        customInput={Textfield}
                      />
                      {/* {getWeth[0].value == token && amount ? (
                        <span className="block  space-font font-semibold text-[10px] text-right">
                          ≈{" "}
                          {Number(rate * amount)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                          USD
                        </span>
                      ) : null} */}

                      <div className="flex justify-around mb-10 w-full">
                        <Select
                          options={tokens}
                          //  value={token}
                          className="w-full"
                          onChange={(e) => {
                            setToken(e.value);
                            setDecimals(e.decimals);
                          }}
                          components={{ Option: IconOption }}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: "10px",
                              padding: "7px",
                              marginBottom: "28px",
                              zIndex: "500",
                            }),
                            menu: (baseStyles, state) => ({
                              ...baseStyles,
                              zIndex: "500",
                              maxWidth: "200px",
                            }),
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: "#06D6A0",
                            },
                          })}
                        />
                        {/* {tokens.map(({ name, address }, i) => (
                        
                        ))} */}
                      </div>

                      <div className="flex flex-col justify-center">
                        {compare ? (
                          <Button
                            variant={"contained"}
                            disabled={!amount || !token || !write || isLoading}
                            loading={isLoading}
                            onClick={() => {
                              write?.();
                            }}
                          >
                            Donate
                          </Button>
                        ) : (
                          <Button
                            variant={"contained"}
                            disabled={!amount || !token || !mutate}
                            loading={mutateIsLoading}
                            onClick={() => {
                              mutate?.();
                            }}
                          >
                            Enable donation
                          </Button>
                        )}

                        {amount && error?.reason && token && (
                          <span className="block  text-red-400 space-font font-semibold text-[10px] text-center mt-4">
                            {error?.reason || ""}
                          </span>
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
          success={`Your donation has been made `}
          error="Sorry an error occurred and your donation could not be completed at this time"
          action={() => {
            if (depositRefetch) {
              depositRefetch();
            }
            refetch();
            if (coinData?.value?.isZero()) {
              addToken();
            }
          }}
          closeModal={() => {
            setAmount(0);
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
          error="Sorry an error occurred and your request could not be completed at this time"
          closeModal={() => {
            refetch();
            donateRefetch();
            prepareFetch();
            setApproveHash("");
          }}
        />
      ) : null}
    </>
  );
};

export default DonateModal;
