import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

export const Button = ({ variant = 'primary', ...props }) => {
    const { disabled, className } = props;

    const baseClasses = 'px-4 py-2 font-medium rounded transition focus:outline-none cursor-pointer';
    const variantStyles = {
        primary: 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-500',
        secondary: 'bg-sky-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400',
    };
    const disabledStyles = 'bg-gray-300 text-gray-500 cursor-not-allowed';
    const computedClasses = twMerge(
        baseClasses,
        disabled ? disabledStyles : variantStyles[variant],
        className
    );
    return (
        <button
            className={`${computedClasses} ${className}`}
            {...props}
        />
    );
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary']),
};
