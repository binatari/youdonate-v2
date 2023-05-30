import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Textfield from "../textfield/Index";
import Button from "../Button";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  InstapaperIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useRouter } from "next/router";
const ShareModal = ({ name }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [share, setShare] = useState(false);
  const cancelButtonRef = useRef(null);
  const { asPath } = useRouter();

  const text = `Help us reach our goal and make a difference! Donate to our  ${name} campaign today to be eligible for daily lottery rewards %0a %0a Every contribution counts, so please join us in making a positive impact on the world. Click the link below to donate now:  ${encodeURIComponent(url)}. Thank you for your support! `;

  useEffect(() => {
    setUrl(window.location.origin + asPath);
  }, []);

  // console.log(decodeURIComponent('https://web.whatsapp.com/send?text=Hi%2C%0A%0AI%27d%20really%20appreciate%20it%20if%20you%20would%20share%20or%20donate%20to%20this%20GoFundMe.%0A%0A*Volunteer%20Rescue%20Services*%0A%0A%0AOn%20behalf%20of%20the%20family%2C%20this%20page%20has%20been%20set%20up%20to%20help%20cover%20the%20cost%20being%20incurred%20by%20the%20volunteers%20from%20all%20over%20Ireland%20who%20have%20been%20helpi%E2%80%A6%0A%0ARead%20more%20here%20https%3A%2F%2Fgofund.me%2F6e9c9eba%0A%0AForward%20this%20message%20to%20your%20contacts%20to%20help%20this%20campaign%20reach%20its%20goal!'))
  return (
    <>
      <Button
        variant={"outlined"}
        onClick={() => setOpen(true)}
        style={
          {
            // border: "1px solid white",
            // color: "white",
            // marginLeft: "1em",
          }
        }
      >
        Share
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
                <Dialog.Panel className="relative transform overflow-hidden  text-left transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                  <div className="bg-white p-[33px] mb-[30px] rounded-[40px]">
                    <div className="flex justify-end">
                      <i
                        class="las la-times la-2x  cursor-pointer"
                        onClick={() => setOpen(false)}
                      ></i>
                    </div>
                    <h2 className="text-center text-[20.99px]  font-bold nippo ">
                      SHARE YOUR CAMPAIGN
                    </h2>
                    <div className="">
                      <p className="text-white text-center text-[14px] space-font">
                        Get more people to view your campaign.
                      </p>
                      <div className="flex justify-evenly py-[31px] socials">
                        <FacebookShareButton url={url}>
                          <img src="/facebook-green.png" />
                        </FacebookShareButton>
                        <TwitterShareButton url={url}>
                          <img src="/twitter-green.png" />
                        </TwitterShareButton>
                        <LinkedinShareButton url={url}>
                          <img src="/linkedin-green.png" />
                        </LinkedinShareButton>
                        <a
                          onClick={() => {
                            const strWindowFeatures =
                              "location=yes,height=570,width=520,scrollbars=yes,status=yes";
                            window.open(
                              `https://web.whatsapp.com/send?text=${text}`,
                              "_blank",
                              strWindowFeatures
                            );
                          }}
                        >
                          <img src="/whatsapp-green.png" />
                        </a>
                      </div>
                      <Textfield type="text" value={url} disabled />
                      <div className="flex justify-center">
                        <Button
                          variant={"contained"}
                          onClick={() => {
                            navigator.clipboard.writeText(url);
                            setShare(true);
                          }}
                        >
                          Share
                        </Button>
                      </div>
                      {share && (
                        <p className=" text-center text-[14px] pt-6 space-font">
                          Link copied!!
                        </p>
                      )}
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

export default ShareModal;
