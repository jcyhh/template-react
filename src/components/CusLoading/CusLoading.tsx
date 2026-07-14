import {
    type CSSProperties,
} from 'react'

import { Popup } from '@/components/Popup'

import './CusLoading.scss'

const LOADING_DOTS = Array.from({ length: 7 }, (_, index) => index + 1)

export interface CusLoadingProps {
    show: boolean
    className?: string
}

export function CusLoading({
    show,
    className = '',
}: CusLoadingProps) {
    const loadingClassName = [
        'cus-loading',
        className,
    ].filter(Boolean).join(' ')

    return (
        <Popup
            show={show}
            position="center"
            contentPreset={false}
            closeOnOverlayClick={false}
            enterAnimation="fadeIn"
            leaveAnimation="fadeOut"
            className="cus-loading-popup"
            contentClassName="cus-loading-popup__content"
        >
            <div className={loadingClassName} aria-label="Loading" role="status">
                <svg
                    className="cus-loading__svg"
                    viewBox="0 0 300 300"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient
                            id="cus-loading-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="#50D6FC" />
                            <stop offset="100%" stopColor="#1989F5" />
                        </linearGradient>

                        <filter id="cus-loading-gooey">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                            <feColorMatrix
                                values="
                                    1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 20 -10
                                "
                            />
                        </filter>
                    </defs>

                    <g filter="url(#cus-loading-gooey)">
                        {LOADING_DOTS.map((dotIndex) => (
                            <g
                                key={dotIndex}
                                className="cus-loading__dot"
                                style={{ '--i': dotIndex } as CSSProperties}
                            >
                                <circle cx="150" cy="28" r="28" />
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        </Popup>
    )
}
