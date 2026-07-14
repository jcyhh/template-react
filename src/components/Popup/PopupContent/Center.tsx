import type { ComponentPropsWithoutRef } from 'react'

import { Icon } from '../../Icon'

import './PopupContent.scss'

export interface PopupContentCenterProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onClose'> {
    onClose?: () => void
}

export function PopupContentCenter({
    className = '',
    children,
    onClose,
    ...props
}: PopupContentCenterProps) {
    const classes = [
        'popup-content',
        'popup-content--center',
        className,
    ].filter(Boolean).join(' ')

    return (
        <div className={classes} {...props}>
            <div className="popup-content__header">
                <div className="popup-content__title size-32 bold-6">标题</div>
                <Icon name="cross" className="size-48 opc-6" onClick={onClose} />
            </div>

            {children}
        </div>
    )
}
