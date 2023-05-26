import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import ShareHeader from './ShareHeader';
import Footer from './Footer';

const Layout = (props) => {
  const [isSharePage, setIsSharePage] = useState(true);
  const router = useRouter();
  const { children } = props;

  useEffect(() => {
    const pathName = router.pathname;
    setIsSharePage(pathName.search('video') > -1 || pathName.search('article') > -1);
  }, []);

  return (
    <div>
      {isSharePage && <ShareHeader />}
      {!isSharePage && <Header />}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
