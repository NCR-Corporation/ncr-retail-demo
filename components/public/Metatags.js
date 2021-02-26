import Head from 'next/head';
export default function Metatags({ children }) {
  const title = 'MART | Sample App Retail Demo';
  const description =
    "A sample retail demo application built on top of NCR's APIs.";
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />

        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={`/mart.png`} />

        <meta property="og:url" content="https://retaildemo.ncrcloud.com" />
        <meta property="og:type" content="website" />
        <meta itemProp="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`/mart.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="https://retaildemo.ncrcloud.com"
        />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`/mart.png`} />
      </Head>
      {children}
    </div>
  );
}
