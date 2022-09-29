import React from 'react';
import { Button, Tooltip } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';
import { TooltipPlacement } from 'antd/lib/tooltip';
import clsx from 'clsx';
export interface _ButtonCommon extends BaseButtonProps {
  children?: any;
  titleTooltip?: string;
  className?: string;
  placement?: TooltipPlacement;
  href?: string;
  onClick?: any;
  actionTypeLoading?: string;
}

const ButtonCommon: React.FC<_ButtonCommon> = ({
  children,
  shape,
  type = 'primary',
  className,
  placement = 'bottom',
  icon = null,
  titleTooltip,
  ...props
}) => {
  return (
    <Tooltip overlayClassName={clsx(`${className}-tooltip`)} placement={placement} title={titleTooltip || children}>
      <Button type={type} shape={shape} className={clsx({ 'app-btn': true, [className]: className })} icon={icon} {...props}>
        {children}
      </Button>
    </Tooltip>
  );
};

export default ButtonCommon;
