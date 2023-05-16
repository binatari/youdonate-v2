import "../styles/globals.css";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { WagmiConfig, createClient } from "wagmi";
import Head from "next/head";
import { OnBoardContextProvider } from "../context/OnBoardProvider";
import { myChains, wagmiClient } from "../utils/wagmi";
import "swiper/css";
import "swiper/css/navigation";
import useURI from "../hooks/useURI";
import Script from "next/script";
import 'flowbite';

function MyApp({ Component, pageProps }) {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          approvedDonations: offsetLimitPagination(),
        },
      },
    },
  });
  const uri = useURI();
  const client = new ApolloClient({
    uri,
    cache,
  });
  const getLayout = Component.getLayout || ((page) => page);
  return (
    
    <>
      <Script
        async
        id="gtags"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-5531V16J0K"
      />
      <Script id="gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function
gtag(){dataLayer.push(arguments);} gtag('js', new Date());
gtag('config', 'G-5531V16J0K');`}
      </Script>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="shortcut icon" href="/small-logo.svg" />
        <title>YouDonate</title>
        <meta
          property="description"
          name="description"
          content="Charitable Giving"
        />
        <meta
          property="description"
          name="description"
          content="Fundraising Platforms"
        />
        <meta
          property="description"
          name="description"
          content="Donor Management"
        />
        <meta
          property="description"
          name="description"
          content="Donation Tracking"
        />
        <meta
          property="description"
          name="description"
          content="Online Donations"
        />
        <meta
          property="description"
          name="description"
          content="Crowdfunding Campaigns"
        />
        <meta
          property="description"
          name="description"
          content="Nonprofit Organizations"
        />
        <meta
          property="description"
          name="description"
          content="Social Impact Investing"
        />
        <meta
          property="description"
          name="description"
          content="Philanthropy & Corporate Social Responsibility"
        />
        <meta
          property="description"
          name="description"
          content="Impact Measurement & Evaluation"
        />
        <meta
          property="description"
          name="description"
          content="Social Good Initiatives"
        />
        <meta property="description" name="description" content="" />
        <meta property="description" name="description" content="" />
        <meta property="description" name="description" content="" />
        <meta property="description" name="description" content="" />
        <meta property="description" name="description" content="" />
        <meta property="description" name="description" content="" />
        <meta property="description" name="description" content="" />
        <meta property="description" name="description" content="" />
        <meta property="description" name="description" content="" />
        <meta property="description" name="description" content="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        ></link>
      </Head>
      <WagmiConfig client={wagmiClient}>
        <ApolloProvider client={client}>
        <ConnectKitProvider>
          <OnBoardContextProvider>
        { getLayout(<Component {...pageProps} />)}
          </OnBoardContextProvider>
          </ConnectKitProvider>
        </ApolloProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
