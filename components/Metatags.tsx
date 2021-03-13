import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  imageUrl?: string; 
}

const Metatags: React.FC<Props> = ({
  title = 'The Full Next.js + Firebase Course',
  description = 'A complete Next.js + Firebase course by Fireship.io',
  imageUrl = 'https://fireship.io/courses/react-next-firebase/img/featured.png'
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