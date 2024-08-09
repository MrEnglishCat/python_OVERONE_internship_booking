import React from 'react';


const UserReviewStar = (props) => {
    return (
        <span>
            {
            ((
                            props.rating.cleanliness +
                            props.rating.conformity_to_photos +
                            props.rating.timeliness_of_check_in +
                            props.rating.price_quality +
                            props.rating.location +
                            props.rating.quality_of_service
                        ) / 6).toFixed(1)
            }
        </span>
    );
};


export default UserReviewStar;