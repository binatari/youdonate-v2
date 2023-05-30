import React from "react";
import CampaignCard from "./CampaignCard";
import { useQuery, gql } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
const goerSimi = require("../utils/goerliSimi.json");
import useNetworkData from "../hooks/useNetworkData";
import useIsMounted from "../hooks/useIsMounted";
import {
  useNetwork,
  useContractReads,
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useContractRead,
} from "wagmi";

const GET_APPROVED_PROPOSALS = gql`
  query getProposals {
    approvedDonations(where: { noVotes_lt: "2" }, orderBy: yesVotes, first: 6) {
      proposalId
      amountRaised
      paymentRequested
      donors
      name
    }
  }
`;

const TrendingCampaigns = () => {
  const { chain } = useNetwork();

  //   useEffect(()=>{
  //   account &&  getTestBalance(account, console.log)
  //   }, [account])

  const { simiDao } = useNetworkData();

  const {
    loading: processedLoader,
    error: processedError,
    data: processedData,
  } = useQuery(GET_APPROVED_PROPOSALS);

  const { data: countdata, error: countError } = useContractRead({
    address: simiDao,
    abi: goerSimi,
    functionName: "proposalCount",
  });

  const startCount = Number(countdata?.toString());

  const isMounted = useIsMounted();

  const { data, fetchNextPage, loading } = useContractInfiniteReads({
    cacheKey: "mlootAttributes",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address: simiDao,
            abi: goerSimi,
            functionName: "approvedDonation",
            args: [index],
          },
        ];
      },
      {
        start: startCount <= 6 ? 0 : startCount - 6,
        perPage: startCount < 6 ? startCount : 6,
        direction: "increment",
      }
    ),
    enabled: !!countdata,
    select: (data) => {
      const newData = data.pages[0].map((datum, i) => {
        return {
          name: datum[0],
          proposalId: startCount <= 6 ? i : startCount - 6 + i,
          media: datum[2],
          proposer: datum[3],
          category: datum[8],
          paymentRequested: datum[4],
          amountRaised: datum[5],
          donors: datum[9].toString(),
        };
      });
      return newData;
    },
  });
  return (
    <div className="py-[60px]">
      <span className="text-sm block text-center leading-7 text-[#676E89]">
        TRENDING CAMPAIGNS
      </span>
      <h3 className="text-[35px] text-center font-extrabold leading-[35px] text-white mb-4">
        Explore trending campaigns
      </h3>
      {isMounted ? (
        <div className="container mx-auto ">
          {chain?.id !== 41 ? (
            <div className=" mt-[70px] px-4">
              {processedLoader ? (
                <div className="flex justify-center"></div>
              ) : (
                <Swiper
                  spaceBetween={50}
                  // slidesPerView={3}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
                  navigation={true}
                  modules={[Navigation, Autoplay]}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                  }}
                >
                  {processedData?.approvedDonations?.map(
                    (
                      {
                        proposalId,
                        amountRaised,
                        paymentRequested,
                        donors,
                        name,
                      },
                      index
                    ) => (
                      <SwiperSlide  className="h-[auto!important]">
                        <CampaignCard
                          name={name}
                          duration={100000}
                          media={""}
                          status={""}
                          donors={donors}
                          approved
                          details={""}
                          proposalId={proposalId}
                          PaymentRequested={paymentRequested}
                          amountRaised={amountRaised}
                          key={proposalId}
                        />
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              )}
            </div>
          ) : (
            <div className=" mt-[70px] px-4">
              {loading ? (
                <div className="flex justify-center">
                  {/* <FadeLoader color="#36d7b7" /> */}
                </div>
              ) : (
                <Swiper
                  spaceBetween={50}
                  // slidesPerView={3}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
                  navigation={true}
                  modules={[Navigation, Autoplay]}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                  }}
                >
                  {data?.map(
                    (
                      {
                        proposalId,
                        amountRaised,
                        paymentRequested,
                        donors,
                        name,
                        media,
                      },
                      index
                    ) => (
                      <SwiperSlide className="h-[auto!important]">
                        <CampaignCard
                          name={name}
                          duration={100000}
                          media={media}
                          status={""}
                          donors={donors}
                          approved
                          details={""}
                          proposalId={proposalId}
                          PaymentRequested={paymentRequested}
                          amountRaised={amountRaised}
                          key={proposalId}
                        />
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              )}
            </div>
          )}
        </div>
      ) : null}

      <img src="/assets/gradient-upper.png" className="absolute top-0 left-0" />
    </div>
  );
};

export default TrendingCampaigns;
