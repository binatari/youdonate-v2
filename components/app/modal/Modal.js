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
import { useOnboardProvider } from "../../context/OnBoardProvider";
// import { simiDao } from "../../utils/constants";
import CropModal from "./CropModal";
import useNetworkData from "../../hooks/useNetworkData";
const goerSimi = require("../../utils/goerliSimi.json");

const Modal = ({ open, setOpen }) => {
  const [amount, setAmount] = useState(0);
  const [cropper, setCropper] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [paths, setPaths] = useState([]);
  const [step, setStep] = useState(1);
  const [data, setData] = useState("");
  const [date, setDate] = useState("");
  const [hash, setHash] = useState("");
  const [values, setValues] = useState({
    _name: "",
    _goal: 0,
    _beneficiary: "",
    _beneficiaryName: "",
    _beneficiarySocial: "",
    _media: "",
    _duration: "",
    details: "",
  });
  const [socials, setSocials] = useState(["", "", "", ""]);

  const { rate } = useOnboardProvider();

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const [category, setCategory] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPaths(e.target.result);
        setCropper(true);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [setPaths]
  );

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 2,
      onDrop,
    });

  const [createLoader, setCreateLoader] = useState(false);

  const cancelButtonRef = useRef(null);
  const onChange = (e) => {
    if (e.target.name == "_duration") {
      setDate(e.target.value);
      setValues({
        ...values,
        [e.target.name]: moment(e.target.value).unix() - moment().unix(),
      });
      return;
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const { address } = useAccount();

  const { simiDao } = useNetworkData();

  const { data: countdata, error: countError } = useContractRead({
    address: simiDao,
    abi: goerSimi,
    functionName: "proposalCount",
    enabled: open,
  });

  const options = [
    { value: "Clubs & Community", label: "Clubs & Community" },
    { value: "Creative Projects", label: " Creative Projects" },
    { value: "Disaster Relief", label: "Disaster Relief" },
    { value: "Fraternities & Sororities", label: "Fraternities & Sororities" },
    { value: "Fun & Special Events", label: "Fun & Special Events" },
    { value: "Kids & Family", label: "Kids & Family" },
    { value: "LGBT", label: "LGBT" },
    { value: "Medical & Health", label: "Medical & Health" },
    { value: "Memorials & Funerals", label: "Memorials & Funerals" },
    { value: "Military", label: "Military" },
    { value: "Non-Profit and Charity", label: "Non-Profit and Charity" },
    { value: "Pets & Animals", label: "Pets & Animals" },
    { value: "Politics  & Public Office", label: "Politics  & Public Office" },
    { value: "Religious Organizations", label: "Religious Organizations" },
    { value: "Runs & Walks & Rides", label: "Runs & Walks & Rides" },
    {
      value: "Schools & Education Sports & Teams",
      label: "Schools & Education Sports & Teams",
    },
    { value: "Trips & Adventures", label: "Trips & Adventures" },
  ];

  const addDescription = async () => {
    return axios
      .post("https://api-staging-youdonate.herokuapp.com/api/proposal", {
        proposalId: `${Number(countdata)}`,
        userWalletAddress: address,
        description: data,
      })
      .then((res) => res)
      .catch((err) => console.log(err));
  };
  const [
    name,
    goal,
    beneficiary,
    beneficiaryName,
    beneficiarySocial,
    media,
    duration,
    details,
  ] = Object.values(values).map((item, i) => item);

  const stringSocials = socials
    .filter((social) => {
      if (social !== "") {
        return social;
      }
    })
    .join("|");

  // console.log(stringSocials)

  const { config, error } = usePrepareContractWrite({
    address: simiDao,
    abi: goerSimi,
    functionName: "submitDonationProposal",
    args: [
      name,
      ethers.utils.parseUnits(goal?.toString() || "0", 8),
      beneficiary,
      beneficiaryName,
      stringSocials,
      media,
      duration,
      category?.value,
    ],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
    enabled: true,
  });
  const {
    write,
    isLoading,
    isSuccess,
    data: donationData,
  } = useContractWrite(config);

  // console.log(error, isLoading);
  const onAmountChange = (e) => {
    setValues({
      ...values,
      _goal: e.floatValue,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setHash(donationData?.hash);
    }
  }, [isSuccess, donationData]);

  // const isMounted = useIsMounted()
  return (
    <>
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
                <Dialog.Panel className="relative transform overflow-hidden  text-left transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                  <div className="bg-white p-[33px] mb-[30px] rounded-[40px]">
                    <div className="flex justify-end">
                      <i
                        class="las la-times la-2x cursor-pointer"
                        onClick={() => setOpen(false)}
                      ></i>
                    </div>
                    <h2 className="text-[20.99px] font-bold nippo mb-10">
                      {step == 1
                        ? "Lets Begin your Fundraising journey"
                        : step == 2
                        ? "Tell Us Who You are Raising Funds for"
                        : step == 3
                        ? "Campaign socials"
                        : step == 4
                        ? "Description of Campaign Request"
                        : step == 5
                        ? "Campaign Summary "
                        : "Request submitted"}
                    </h2>
                    {step == 1 ? (
                      <>
                        <Textfield
                          label={"CAMPAIGN NAME"}
                          type="text"
                          value={values._name}
                          placeholder="*What's your campaign's name*"
                          onChange={onChange}
                          name="_name"
                        />
                        <span className="block space-font font-semibold text-[10px]  mb-[10px]">
                          CATEGORY
                        </span>
                        <Select
                          options={options}
                          value={category}
                          onChange={(e) => {
                            setCategory(e);
                          }}
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
                        <NumericFormat
                          onValueChange={onAmountChange}
                          thousandSeparator=","
                          allowNegative={false}
                          value={values._goal}
                          // helperText={`*≈ ${ goal?  (goal * rate)
                          //   .toFixed(2)
                          //   .replace(/\d(?=(\d{3})+\.)/g, "$&,"): 0.00} USD`}
                          suffix=" USD"
                          label={"CAMPAIGN GOAL"}
                          placeholder="*insert campaign amount*"
                          name="_goal"
                          customInput={Textfield}
                        />
                        <Textfield
                          label={"DONATION END TIME"}
                          type="date"
                          value={moment(date).format("YYYY-MM-DD")}
                          min={moment().format("YYYY-MM-DD")}
                          placeholder="mm/dd/yyyy"
                          onChange={onChange}
                          name={"_duration"}
                        />
                      </>
                    ) : step == 2 ? (
                      <>
                        <Textfield
                          label={"BENEFICIARY WALLET ADDRESS"}
                          type="text"
                          value={values._beneficiary}
                          placeholder="*What address would you like to use*"
                          onChange={onChange}
                          name="_beneficiary"
                        />
                        <Textfield
                          label={"BENEFICIARY NAME"}
                          type="text"
                          value={values._beneficiaryName}
                          placeholder="*What's the name of your beneficiary*"
                          onChange={onChange}
                          name="_beneficiaryName"
                        />
                      </>
                    ) : step == 3 ? (
                      <>
                        {/* <TryEditor data={data} setData={setData} /> */}
                        <Textfield
                          label={"Facebook"}
                          type="text"
                          value={socials[0]}
                          placeholder="*Your campaign's facebook page*"
                          onChange={(e) => {
                            const arr = [...socials];
                            arr[0] = e.target.value;
                            setSocials(arr);
                          }}
                        />
                        <Textfield
                          label={"Instagram"}
                          type="text"
                          value={socials[1]}
                          placeholder="*Your campaign's  Instagram page*"
                          onChange={(e) => {
                            const arr = [...socials];
                            arr[1] = e.target.value;
                            setSocials(arr);
                          }}
                        />
                        <Textfield
                          label={"Twitter"}
                          type="text"
                          value={socials[2]}
                          placeholder="*Your campaign's  twitter page*"
                          onChange={(e) => {
                            const arr = [...socials];
                            arr[2] = e.target.value;
                            setSocials(arr);
                          }}
                        />
                        <Textfield
                          label={"LinkedIn"}
                          type="text"
                          value={socials[3]}
                          placeholder="*Your campaign's linkedIn page*"
                          onChange={(e) => {
                            const arr = [...socials];
                            arr[3] = e.target.value;
                            setSocials(arr);
                          }}
                        />
                      </>
                    ) : step == 4 ? (
                      <>
                        {/* <TryEditor data={data} setData={setData} /> */}
                        <div
                          {...getRootProps({
                            className:
                              "dropzone border-dashed border rounded-[10px] w-full py-5 flex flex-col items-center justify-center",
                          })}
                        >
                          <input {...getInputProps()} />
                          <img src="/images/add-document.svg" />
                          <span className="text-[#868E96] text-center">
                            Upload a File size: 10MB Max <br /> Allowed Files:
                            PDF, JPEG, JPG, PNG
                          </span>
                          {acceptedFiles.map((file) => (
                            <li
                              className="text-center list-none text-black"
                              key={file.path}
                            >
                              {file.path}
                            </li>
                          ))}
                        </div>
                        <CropModal
                          open={cropper}
                          setOpen={setCropper}
                          imgSrc={paths}
                          setCroppedImage={setCroppedImage}
                          croppedImage={croppedImage}
                          fileName={acceptedFiles[0]?.name || ""}
                          cb={(res) => {
                            setValues({ ...values, _media: res });
                          }}
                        />
                      </>
                    ) : step == 5 ? (
                      <div className="grid grid-cols-2 gap-x-2 h-80 overflow-y-scroll px-4">
                        <Textfield
                          label={"CAMPAIGN NAME"}
                          type="text"
                          value={values._name}
                          placeholder="*What's your campaign's name*"
                          onChange={onChange}
                          name="_name"
                        />
                        <NumericFormat
                          onValueChange={onAmountChange}
                          thousandSeparator=","
                          allowNegative={false}
                          value={values._goal}
                          suffix=" USD"
                          label={"CAMPAIGN GOAL"}
                          placeholder="*insert amount*"
                          name="_goal"
                          customInput={Textfield}
                        />
                        <Textfield
                          label={"DONATION END TIME"}
                          value={moment(date).format("YYYY-MM-DD")}
                          min={moment().format("YYYY-MM-DD")}
                          placeholder="mm/dd/yyyy"
                          onChange={onChange}
                          name={"_duration"}
                        />
                        <Textfield
                          label={"BENEFICIARY WALLET ADDRESS"}
                          type="text"
                          value={values._beneficiary}
                          placeholder="*What address would you like to use*"
                          onChange={onChange}
                          name="_beneficiary"
                        />
                        <div className="col-span-2">
                          <Textfield
                            label={"BENEFICIARY NAME"}
                            type="text"
                            value={values._beneficiaryName}
                            placeholder="*What's the name of your beneficiary*"
                            onChange={onChange}
                            name="_beneficiaryName"
                          />
                        </div>
                        <div className="col-span-2">
                          <Textfield
                            label={"Facebook"}
                            type="text"
                            value={socials[0]}
                            placeholder="*Your campaign's facebook page*"
                            onChange={(e) => {
                              const arr = [...socials];
                              arr[0] = e.target.value;
                              setSocials(arr);
                            }}
                          />
                          <Textfield
                            label={"Instagram"}
                            type="text"
                            value={socials[1]}
                            placeholder="*Your campaign's Instagram page*"
                            onChange={(e) => {
                              const arr = [...socials];
                              arr[1] = e.target.value;
                              setSocials(arr);
                            }}
                          />
                          <Textfield
                            label={"Twitter"}
                            type="text"
                            value={socials[2]}
                            placeholder="*Your campaign's twitter page*"
                            onChange={(e) => {
                              const arr = [...socials];
                              arr[2] = e.target.value;
                              setSocials(arr);
                            }}
                          />
                          <Textfield
                            label={"LinkedIn"}
                            type="text"
                            value={socials[3]}
                            placeholder="*Your campaign's twitter page*"
                            onChange={(e) => {
                              const arr = [...socials];
                              arr[3] = e.target.value;
                              setSocials(arr);
                            }}
                          />
                        </div>
                        {acceptedFiles.length ? (
                          <div className="col-span-2 ">
                            <CropModal
                              open={cropper}
                              setOpen={setCropper}
                              imgSrc={paths}
                              setCroppedImage={setCroppedImage}
                              croppedImage={croppedImage}
                              fileName={acceptedFiles[0]?.name || ""}
                              cb={(res) => {
                                setValues({ ...values, _media: res });
                              }}
                            />
                          </div>
                        ) : (
                          <>
                            <div
                              {...getRootProps({
                                className:
                                  "dropzone border-dashed border rounded-[10px] col-span-2 w-full py-5 flex flex-col items-center justify-center",
                              })}
                            >
                              <input {...getInputProps()} />
                              <img src="/images/add-document.svg" />
                              <span className="text-[#868E96] text-center">
                                Upload a File size: 10MB Max <br /> Allowed
                                Files: PDF, JPEG, JPG, PNG
                              </span>
                              {acceptedFiles.map((file) => (
                                <li
                                  className="text-center list-none text-black"
                                  key={file.path}
                                >
                                  {file.path}
                                </li>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        <p className="font-bold text-[#495057]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nec tellus enim neque, ut. Sed non facilisis
                          aliquet egestas aliquet arcu gravida ultrices.
                        </p>
                      </>
                    )}

                    <span className=" space-font font-semibold text-[10px] text-white">
                      {values?.details?.length + "/500"}
                    </span>
                    <div className="flex justify-center gap-4">
                      {step < 5 ? (
                        <Button
                          disabled={
                            step == 1
                              ? !values._name || !values._duration || !category
                              : step == 2
                              ? !values._beneficiary || !values._beneficiaryName
                              : step == 4
                              ? !acceptedFiles.length ||
                                loader ||
                                !values._media
                              : null
                          }
                          loading={loader}
                          variant={"contained"}
                          onClick={() => {
                            setStep(step + 1);
                          }}
                          style={{
                            width: step == 1 && "100%",
                          }}
                        >
                          {step == 5 ? "Create Campaign" : "Next"}
                        </Button>
                      ) : (
                        <Button
                          disabled={
                            isLoading ||
                            !values._media ||
                            !values._beneficiary ||
                            !values._beneficiaryName ||
                            !values._name ||
                            !values._duration
                          }
                          loading={isLoading}
                          variant={"contained"}
                          onClick={() => {
                            if (step == 6) {
                              setOpen(false);
                              return;
                            }
                            write?.();
                          }}
                        >
                          {step == 6 ? "Close" : "Create campaign"}
                        </Button>
                      )}

                      {/* <Button
                      variant={"contained"}
                      onClick={()=>write()}
                     
                    >
                      {"Next"}
                    </Button> */}
                      {step > 1 && step < 6 && (
                        <Button
                          variant={"outlined"}
                          onClick={() => {
                            setStep(step - 1);
                          }}
                        >
                          Back
                        </Button>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <SuccessModal
        hash={hash}
        setHash={setHash}
        action={addDescription}
        success={`Your campaign has been successfully created, please visit your dashboard to add a description, to finish the creation process.
        campaign's with descriptions have a statistically higher chance of being approved and receiving donations. `}
        error="Sorry an error occurred your campaign could not be processed at this time"
        closeModal={() => {
          setOpen(false);
          setValues({
            _name: "",
            _goal: 0,
            _beneficiary: "",
            _beneficiaryName: "",
            _beneficiarySocial: "",
            _media: "",
            _duration: "",
            details: "",
          });
          setCategory("");
        }}
      />
    </>
  );
};

export default Modal;
