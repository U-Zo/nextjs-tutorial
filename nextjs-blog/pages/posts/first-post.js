import Link from 'next/link';
import MyComponent from '../../components/MyComponent';

const FirstPost = () => {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </h2>
      <MyComponent />
    </>
  );
};

export default FirstPost;
