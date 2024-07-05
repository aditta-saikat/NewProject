import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/get-market-deals`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch market deals");
        }
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("Error fetching market deals:", error);
      }
    };

    fetchCardData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCards = cardData.filter((card) =>
    card.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewDealClick = () => {
    navigate("/new-deal");
  };

  const handleCardClick = (id) => {
    navigate(`/card-detail/${id}`);
  };
  console.log(cardData);
  console.log("filtered : ", filteredCards);

  return (
    <div className="container mt-4">
      <h2 className="my-4 py-2 text-center">Today's Market Deals</h2>
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, stock, or price..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-6 text-md-right mt-2 mt-md-0">
          <button className="btn btn-primary" onClick={handleNewDealClick}>
            New Deal
          </button>
        </div>
      </div>
      <div className="row">
        {filteredCards.map((card, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleCardClick(card._id)}>
              <div className="card-body">
                <h5 className="card-title">{card.farmerName}</h5>
                {card.stock.map((stockItem, idx) => (
                  <div key={idx}>
                    <p className="card-text">
                      {stockItem.stockName}: <b> {stockItem.quantity} kg </b> x{" "}
                      <b>{stockItem.price}</b> tk ={" "}
                      <b>{stockItem.price * stockItem.quantity}</b> tk
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
