import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  imageUrl?: string;
}

const Metatags: React.FC<Props> = ({
  title = 'Saloon - place for friends by friends',
  description = 'Born out of love for craft beer and quality code.',
  imageUrl = 'https://images.newindianexpress.com/uploads/user/imagelibrary/2020/8/29/w1200X800/Post_tests-.jpg'
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
    </Head>
  );
};

export default Metatags;
