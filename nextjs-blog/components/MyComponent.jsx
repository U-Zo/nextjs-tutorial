import Image from 'next/image';

const MyComponent = () => {
  return (
    <Image src="/images/profile.jpg" height={144} width={144} alt="Woojo Kim" />
  );
};

export default MyComponent;
