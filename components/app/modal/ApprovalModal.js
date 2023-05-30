import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Textfield from "../textfield/Index";
import Button from "../Button";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
const tokenABI = require("../../utils/ercABI.json");
// import { donate, getBalance } from "../../utils/contract";
import { NumericFormat } from "react-number-format";
import useNetworkData from '../../hooks/useNetworkData'

const ApprovalModal = ({address, setHash }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [coins, setCoins] = useState([]);
  const [token, setToken] = useState("");
  const cancelButtonRef = useRef(null);

  const { YDT,} = useNetworkData()


  const handleOpen = () => {
    setOpen(true);
  };

//   const { address } = useAccount()

  const onChange = (e) => {
    setAmount(e.floatValue);
  };
// console.log(address)
  const { config, error } = usePrepareContractWrite({
    address,
    abi: tokenABI,
    functionName: "approve",
    args: [YDT, (amount * 1000000000000000000).toString()],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
    enabled: true,
  });
  const { write, isLoading, isSuccess, data } = useContractWrite(config);

console.log(error, write)
  return (
    <>
      <Button variant={"contained"} onClick={handleOpen}>
        Approve token
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
                  <div className="flex justify-end">
                    <i
                      class="las la-times la-2x text-white cursor-pointer"
                      onClick={() => setOpen(false)}
                    ></i>
                  </div>
                  <h2 className="text-center text-[20.99px] text-white font-bold nippo mb-10">
                    Approve token{" "}
                  </h2>
                  <div className="border-mypink glass p-[33px] mb-[30px]">
                    <NumericFormat
                      onValueChange={onChange}
                      thousandSeparator=","
                      allowNegative={false}
                      label={"AMOUNT"}
                      placeholder="*Please put in the amount to be donated*"
                      name="amount"
                      customInput={Textfield}
                    />

                    <div className="flex justify-center">
                      <Button
                        variant={"contained"}
                        disabled={!amount || !write}
                        onClick={() => {
                          write?.();
                        }}
                      >
                        Approve
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

export default ApprovalModal;
