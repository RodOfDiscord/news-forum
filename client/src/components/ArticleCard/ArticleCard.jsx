import React from 'react';
import PropTypes from 'prop-types';


const ArticleCard = ({ variant = "default", content, image, title, date, onClick }) => {
    return (
        <div className={`${base} ${layouts[variant]}`}>
            {variant !== 'compact' && (
                <img
                    src={image}
                    alt={title}
                    className={imgClasses[variant]}
                    onClick={onClick}
                />
            )}
            <div className={textClasses[variant]}>
                <h2
                    className="text-xl font-bold mb-2 cursor-pointer hover:underline"
                    onClick={onClick}
                >
                    {title}
                </h2>
                {variant !== 'compact' && <div className="mb-2 text-gray-700">{content}</div>}
                <p className="text-sm text-gray-500">{date}</p>
            </div>
        </div>
    )
};

const base = 'border rounded-lg shadow-md overflow-hidden';

const layouts = {
    compact: 'flex flex-row items-stretch',
    default: 'flex flex-col',
    'side-image': 'flex flex-row items-stretch',
}

const imgClasses = {
    default: 'w-full h-48 object-cover cursor-pointer',
    "side-image": "h-full w-64 object-cover cursor-pointer"
}

const textClasses = {
    compact: 'p-4 flex flex-col justify-center',
    default: 'p-4 flex flex-col justify-between',
    "side-image": "p-4 flex flex-col justify-between"
}


ArticleCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['default', 'side-image', 'compact']),
    content: PropTypes.node,
};

export default ArticleCard;
