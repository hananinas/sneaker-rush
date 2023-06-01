// pages/index.js
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to my Next.js app!</h1>
      <Link href="/game">
        <a>Play the Game</a>
      </Link>
    </div>
  );
};

export default HomePage;
