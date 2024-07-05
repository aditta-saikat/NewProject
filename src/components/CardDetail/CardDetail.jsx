import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CardDetail.css";

const CardDetail = () => {
  const { id } = useParams(); // Assuming id is passed as a URL parameter
  const [rows, setRows] = useState([{ name: "", kg: "", price: "" }]);
  const [loadedData, setLoadedData] = useState(null);
  const [commission, setCommission] = useState(0);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/get-card-details/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch card details");
        }
        const data = await response.json();
        setLoadedData(data);
      } catch (error) {
        console.error("Error fetching card details:", error);
        // Handle error state or alert user
      }
    };

    fetchCardDetails();
  }, [id]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { name: "", kg: "", price: "" }]);
  };

  const handleSave = () => {
    console.log("Saved data: ", rows);
    // Implement save functionality here
  };

  const handleCommissionChange = (event) => {
    setCommission(parseFloat(event.target.value) || 0);
  };

  const calculateTotalPrice = () => {
    const databaseTotalPrice = loadedData
      ? loadedData.stock.reduce(
          (total, item) =>
            total + parseFloat(item.price) * parseFloat(item.kg || 1),
          0
        )
      : 0;

    const newEntriesTotalPrice = rows.reduce(
      (total, row) =>
        total + parseFloat(row.price || 0) * parseFloat(row.kg || 1),
      0
    );

    return databaseTotalPrice + newEntriesTotalPrice;
  };

  const totalPrice = calculateTotalPrice();
  const finalPrice = totalPrice - commission;

  return (
    <div className="container mt-4">
      <h2 className="my-4 py-2 text-center">Card Details</h2>
      {loadedData && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{loadedData.name}</h5>
            {loadedData.stock.map((item, index) => (
              <div key={index}>
                <p className="card-text">
                  {item.stockName}: <b>{item.price}</b> tk per Kg
                </p>
              </div>
            ))}
            <p className="card-text">{loadedData.price}</p>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h4>Total Price: {totalPrice.toFixed(2)} tk</h4>
        <div className="form-group">
          <label htmlFor="commission">Commission:</label>
          <input
            type="number"
            className="form-control"
            id="commission"
            value={commission}
            onChange={handleCommissionChange}
          />
        </div>
        <h4>Final Price: {finalPrice.toFixed(2)} tk</h4>
      </div>
    </div>
  );
};

export default CardDetail;
