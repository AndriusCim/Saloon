import React from 'react';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <main>
      <h1>404 - That page does not seem to exist...</h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <button>Go home</button>
      </Link>
    </main>
  );
};

export default Custom404;
