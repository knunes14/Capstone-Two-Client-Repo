import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeightOptions from '../components/HeightOptions';
import WeightOptions from '../components/WeightOptions';
import api from '../services/api';
import Product from '../components/Product';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://scontent.cdninstagram.com/v/t39.30808-6/432668450_18422350075009960_5527286107716371751_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=teVK6oMr_90Q7kNvgFyfS7X&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&oh=00_AfAH_-vBDAN78PbJTXrvjo6E7OclI4s35ZbbRRHhnfypsQ&oe=66338E71")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    
`;

const Form = styled.form`
    display: flex;
    flex-direction: column; // Changed for better form structure
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    display: flex;
    justify-content: center;
`;

const StyledSelect = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  background-color: white; /* Match the background color of input fields */
  border: 1px solid #ccc; /* Match the border style of input fields */
  border-radius: 5px; /* Match the border radius of input fields */
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px; // Adjust spacing as needed
  color: #333; // Adjust color as needed
  font-size: 16px; // Adjust font size as needed
`;

const NumericInput = styled.input`
  width: 100%; // Take the full width of the form or adjust as necessary
  padding: 8px;
  margin-bottom: 15px; // Space after the input
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0; // Simplified margin for uniform spacing
    padding: 10px;
`;

const Button = styled.button`
    width: 100%; // Full width for better UI
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    &:disabled {
        background-color: gray; // Visual cue for disabled state
    }
`;

const Error = styled.span`
    color: red;
`;

function WetsuitSizeForm({ onSubmit }) {
    const [categories, setCategories] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    // const [chest, setChest] = useState("");
    // const [waist, setWaist] = useState("");
    const [style, setStyle] = useState("");
    const [material, setMaterial] = useState("");

    const dispatch = useDispatch();
    // const { isFetching, error } = useSelector((state) => state.user);
    const navigate = useNavigate();

    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        categories: '',
        height: '',
        weight: '',
        style: '',
        material: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Form submitted with data:", formData);


        console.log(api); // Should log { fetchRecommendations: f }
        console.log(api.fetchRecommendations); // Should log the function itself

        const recommendedWetsuits = await api.fetchRecommendations(formData);

        navigate('/results', { state: { product: recommendedWetsuits } });

        if (typeof onSubmit === 'function') {
            onSubmit(formData);
        } else {
            console.error('onSubmit is not provided or not a function');
        }
    };

    return (  
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>
                Gender:
                <select name="categories" value={formData.categories} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="men">Men's</option>
                    <option value="women">Women's</option>
                </select>
            </label>
            <label>
                Height (inches):
                <input type="number" name="height" value={formData.height} onChange={handleChange} />
            </label>
            <label>
                Weight (pounds):
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
            </label>
            <label>
                Style:
                <select name="style" value={formData.style} onChange={handleChange}>
                    <option value="">Select Style</option>
                    <option value="Fullsuit">Fullsuit</option>
                    <option value="Springsuit">Springsuit</option>
                </select>
            </label>
            <label>
                Material:
                <select name="material" value={formData.material} onChange={handleChange}>
                    <option value="">Select Material</option>
                    <option value="Geoflex">Geoflex</option>
                    <option value="Geoprene">Geoprene</option>
                </select>
            </label>
            <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Find My Wetsuit'}</button>
        </form>
    );
}

export default WetsuitSizeForm;