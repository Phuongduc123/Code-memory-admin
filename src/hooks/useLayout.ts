import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ROUTE_COUNT = {
  URL: 2,
  SUB_URL: 3,
};

export const useGetActiveSider = () => {
  const [activeKey, setActiveKey] = useState([]);
  const [activeSubKey, setActiveSubKey] = useState([]);

  const history = useHistory();
  const pathName = history.location.pathname;

  useEffect(() => {
    if (!!pathName) {
      const keyMenus = pathName.split('/');
      if (ROUTE_COUNT.SUB_URL === keyMenus?.length) {
        setActiveSubKey([pathName]);
        !!!activeKey.length && setActiveKey([keyMenus[1]]);
      } else if (ROUTE_COUNT.URL === keyMenus?.length) {
        setActiveSubKey([`/${keyMenus[1]}`]);
        !!!activeKey.length && setActiveKey([keyMenus[1]]);
      }
    }
  }, [pathName, activeKey]);

  const onOpenTabChange = openKey => {
    setActiveKey(openKey);
  };

  return { activeKey, activeSubKey, onOpenTabChange };
};
