import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Textfield from "../textfield/Index";
import Button from "../Button";
import moment from "moment";
// import { createProposal } from "../../utils/useYd";
import { NumericFormat } from "react-number-format";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import useIsMounted from "../../hooks/useIsMounted";
import { Web3Storage } from "web3.storage";
import { useDropzone } from "react-dropzone";
import Select from "react-select";

import { ethers } from "ethers";
import Editor from "../editor/CKeditor";
import TryEditor from "../editor/TryEditor";
import SuccessModal from "./SuccessModal";
import axios from "axios";
import { simiDao } from "../../utils/constants";
const goerSimi = require("../../utils/goerliSimi.json");

const UpdateDescriptionModal = ({
  id,
  address,
  onSuccess,
  response,
  description,
}) => {
  const [amount, setAmount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [paths, setPaths] = useState([]);
  const [step, setStep] = useState(1);
  const [data, setData] = useState(description);
  const [date, setDate] = useState("");
  const [hash, setHash] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const [createLoader, setCreateLoader] = useState(false);

  const addDescription = async () => {
    setLoader(true);
    axios
      .put("https://api-staging-youdonate.herokuapp.com/api/proposal/update", {
        ...response,
        description: data,
      })
      .then((res) => {
        setLoader(false);
        onSuccess();
        setOpen(false);
      })
      .catch((err) => setLoader(false));
  };

  // console.log(error, isLoading);
  //   const onAmountChange = (e) => {
  //     setValues({
  //       ...values,
  //       _goal: e.floatValue,
  //     });
  //   };

  // const isMounted = useIsMounted()

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button variant={"contained"} onClick={handleOpen}>
        Update description
      </Button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[15]"
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
                <Dialog.Panel className="relative transform overflow-hidden  text-left transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                  <div className="bg-white p-[33px] mb-[30px] rounded-[40px]">
                    <div className="flex justify-end">
                      <i
                        class="las la-times la-2x cursor-pointer"
                        onClick={() => setOpen(false)}
                      ></i>
                    </div>
                    <h2 className="text-[20.99px] font-bold nippo mb-10">
                      Update campaign description
                    </h2>
                    {editorLoaded ? (
                      <TryEditor data={data} setData={setData} />
                    ) : null}

                    <div className="flex justify-center gap-4">
                      <Button
                        loading={loader}
                        disabled={!data}
                        onClick={addDescription}
                        variant={"contained"}
                        style={{
                          width: "100%",
                        }}
                      >
                        Update description
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

export default UpdateDescriptionModal;
