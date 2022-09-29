import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React, { ReactNode } from 'react';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
import AntImage from '../Image/AntImage';
import LogoSider from '../../asset/image/logo_header.webp';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '../../appRoutes';
import { useGetActiveSider } from '../../hooks/useLayout';
import { Link } from 'react-router-dom';

interface IMenuItem {
  title: string;
  key?: string;
  url?: string;
}

interface IMenuSider {
  menu: IMenuItem;
  icon: ReactNode;
  child?: IMenuItem[];
}

const getKeyMenu = (key: string): string => {
  return key.replace('/', '');
};

const menuSider: IMenuSider[] = [
  {
    menu: {
      title: 'menu.dashboard',
      key: getKeyMenu(ROUTE.DASHBOARD_BLOG),
    },
    icon: <PieChartOutlined />,
    child: [
      {
        title: 'menu.blog_child_list',
        url: ROUTE.DASHBOARD_BLOG,
      },
    ],
  },
  {
    menu: {
      title: 'menu.blog',
      key: getKeyMenu(ROUTE.BLOG_LIST),
    },
    icon: <PieChartOutlined />,
    child: [
      {
        title: 'menu.blog_child_list',
        url: ROUTE.BLOG_LIST,
      },
      {
        title: 'menu.blog_child_list',
        url: ROUTE.BLOG_ADD,
      },
    ],
  },
  {
    menu: {
      title: 'menu.tag',
      key: getKeyMenu(ROUTE.TAG_LIST),
    },
    icon: <PieChartOutlined />,
    child: [
      {
        title: 'menu.tag_child_list',
        url: ROUTE.TAG_LIST,
      },
    ],
  },
  {
    menu: {
      title: 'menu.profile',
      key: getKeyMenu(ROUTE.PROFILE),
    },
    icon: <UserOutlined />,
    child: [
      {
        title: 'menu.experience_list',
        key: ROUTE.PROFILE_EXPERIENCE_LIST,
        url: ROUTE.PROFILE_EXPERIENCE_LIST,
      },
      {
        title: 'menu.project_list',
        key: ROUTE.PROFILE_PROJECT_LIST,
        url: ROUTE.PROFILE_PROJECT_LIST,
      },
      {
        title: 'menu.skill_list',
        key: ROUTE.SKILL_LIST,
        url: ROUTE.SKILL_LIST,
      },
    ],
  },
  {
    menu: {
      title: 'menu.setting_seo',
      key: getKeyMenu(ROUTE.SEO),
    },
    icon: <PieChartOutlined />,
    child: [
      {
        title: 'menu.seo_home',
        url: ROUTE.SEO,
      },
      {
        title: 'menu.seo_history',
        url: ROUTE.SEO_HISTORY,
      },
    ],
  },
];

export const SiderAdmin = () => {
  const { activeKey, activeSubKey, onOpenTabChange } = useGetActiveSider();

  const { t } = useTranslation();

  return (
    <Sider trigger={null} className="sider" collapsible collapsed={false}>
      <AntImage src={LogoSider} wrapperClassName="logo-slider center-block" />
      <Menu selectedKeys={activeSubKey} onOpenChange={onOpenTabChange} openKeys={activeKey} mode="inline">
        {menuSider.map((item: IMenuSider) => {
          const { child, menu, icon } = item;
          return (
            <SubMenu key={menu.key} icon={icon} title={t(menu.title)}>
              {child.map((subMenu: IMenuItem) => (
                <Menu.Item key={subMenu.url}>
                  <Link to={subMenu.url}>{t(subMenu.title)}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
};
