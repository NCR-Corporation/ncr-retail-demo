import Head from 'next/head';
export default function Metatags({ children }) {
  const title = 'MART | Sample App Retail Demo';
  const description = "A sample retail demo application built on top of NCR's APIs.";
  const socialImage = `mart.png`;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />

        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={socialImage} />

        <meta property="og:url" content={process.env.REACT_APP_URI} />
        <meta property="og:type" content="website" />
        <meta itemProp="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={socialImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={process.env.REACT_APP_URI} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
      </Head>
      {children}
    </div>
  );
}
