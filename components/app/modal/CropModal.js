import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Fragment, useEffect, useRef, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import { getCroppedImg } from "../../utils/func";
import { Web3Storage } from "web3.storage";

const CropModal = ({ open, setOpen, cb, imgSrc, croppedImage, setCroppedImage, fileName }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loader, setLoader] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  function makeStorageClient() {
    return new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxYjEzNjQ4RTQ0ZUExZDkxNzZFY0QyMERmQkM3MTgzMUZjMjg0NEMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjczMzI2MDc2NTMsIm5hbWUiOiJ5ZHQifQ.rHoChqXW4TphAzyaDsDGaQgC4XWPnE3OSweMGYhOoxw",
    });
  }

  const handleClose = () =>{
    setOpen(false)
  }

  async function storeFiles(files) {
    console.log(files)
    setLoader(true);
    const client = makeStorageClient();
    const cid = await client.put([files]);
    return (
      "https://" + cid + ".ipfs.w3s.link/" + encodeURIComponent(fileName)
    );
  }

  function urltoFile(url, filename, mimeType){
    mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
    );
}

// console.log(fileName)

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
      );
      // console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      return urltoFile(croppedImage, fileName)
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc]);


  return (
    <>
      {croppedImage || imgSrc ? (
        <div className="flex justify-center max-h-[200px] mt-6">
          <img src={croppedImage || imgSrc} className="aspect-[3/4] object-contain" />
        </div>
      ) : null}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[15]"
          // initialFocus={cancelButtonRef}
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
                <Dialog.Panel className="relative  w-full transform overflow-hidden text-left transition-all sm:my-8 s=">
                  <div className=" p-[33px] mb-[30px] rounded-[40px]">
                    <div className="flex justify-end">
                      <i
                        class="las la-times dark:text-white la-2x  cursor-pointer"
                        onClick={() => {
                          setOpen(false);
                        }}
                      ></i>
                    </div>
                    <h2 className="text-center dark:text-white text-[20.99px]  font-bold nippo mb-10">
                      Crop image
                    </h2>

                    <div className="h-[200px]  sm:h-[400px] relative">
                      <div className="crop-container">
                        <Cropper
                          image={imgSrc}
                          crop={crop}
                          zoom={zoom}
                          aspect={4 / 3}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </div>
                      <div className="controls">
                        <input
                          type="range"
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          onChange={(e) => {
                            setZoom(e.target.value);
                          }}
                          className="zoom-range"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="justify-center gap-4 flex">
                    <Button
                      variant="contained"
                      loading={loader}
                      onClick={async() => {
                        setLoader(true)
                        const crop = await showCroppedImage().then((res=>{
                          storeFiles(res)
                          .then((response) => {
                            cb(response);
                            handleClose()
                            setLoader(false);
                          })
                          .catch((err) => {
                            console.log(err);
                            setLoader(false);
                          });
                          return res
                        })).catch((err)=>console.log(err))
                      }}
                    >
                      Upload
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Close
                    </Button>
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

export default CropModal;
