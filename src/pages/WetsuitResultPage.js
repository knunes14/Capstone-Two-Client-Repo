import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import WetsuitCard from '../components/WetsuitCard';
import './WetsuitResultPage.css';

const WetsuitResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = Array.isArray(location.state?.product) ? location.state.product : [];

    const handleReturn = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className='wetsuit-results-container'>
            <div className="wrapper">
                <h1 className="title">OUR RECOMMENDATIONS FOR YOU</h1>
                {product.map(prod => (
                    <WetsuitCard key={prod._id} product={prod} />
                ))}
                <h2 className="subtitle">Questions about our wetsuit recommendations? Please email us at swellmade@gmail.com</h2>
                <button className="button" onClick={handleReturn}>Try Again</button>
            </div>
        </div>
    );
};

export default WetsuitResultPage;






// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './WetsuitResultPage.css'; // Adjust the path if necessary

// const WetsuitResultPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const product = Array.isArray(location.state?.product) ? location.state.product : [];

//     const handleReturn = () => {
//         navigate(-1); // Go back to the previous page
//     };

//     return (
//     <div className='wetsuit-results-container'>
//         <div className="wrapper">
//     <h1 className="title">OUR RECOMMENDATIONS FOR YOU</h1>
//     {product.map(prod => (
//         <div className="wetsuit-card" key={prod._id}>
//             <h2>{prod.title}</h2>
//             <img src={prod.img} alt={prod.title} style={{ width: '100%' }} />
//             <p>{prod.description}</p>
//             <div className="separator"></div>
//             <p>{`Style: ${prod.style}, Material: ${prod.material}`}</p>
//             <div className="separator"></div>
//             <p>{`Price: $${prod.price.toFixed(2)}`}</p>
//         </div>
//     ))}
//     <h2 className="subtitle">Questions about our wetsuit recommendations? Please email us at swellmade@gmail.com</h2>
//     <button className="button" onClick={handleReturn}>Try Again</button>
// </div>
//     </div>

//     );
// };

// export default WetsuitResultPage;