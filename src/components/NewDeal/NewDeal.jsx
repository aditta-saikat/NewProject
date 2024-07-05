import React, { useEffect, useState } from "react";
import "./NewDeal.css";
import { useNavigate } from "react-router-dom";

const NewDeal = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const initialNewDealInfo = {
    name: "",
    number: "",
    seller: "",
    stockItems: [{ stockName: "", quantity: 0, price: 0 }],
  };
  const [newDealInfo, setNewDealInfo] = useState(initialNewDealInfo);
  const [newUserInfo, setNewUserInfo] = useState({
    name: "",
    number: "",
    village: "",
    fathersName: "",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/get-all-farmers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    return () => {
      // Optional clean-up logic here
    };
  }, []);

  const handleDealInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedStockItems = [...newDealInfo.stockItems];
    updatedStockItems[index] = {
      ...updatedStockItems[index],
      [name]: value,
    };
    setNewDealInfo({
      ...newDealInfo,
      [name]: value,
      stockItems: updatedStockItems,
    });

    if (name === "name") {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setNewUserInfo({ ...newUserInfo, [name]: value });
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setNewDealInfo({
      ...newDealInfo,
      name: user.name,
      number: user.number,
      seller: user.seller,
    });
    setFilteredUsers([]);
  };

  const handleAddDeal = async (e) => {
    e.preventDefault();

    const { name, number, seller } = newDealInfo;
    if (
      !name ||
      !number ||
      !seller ||
      newDealInfo.stockItems.some(
        (item) => !item.stockName || !item.quantity || !item.price
      )
    ) {
      alert("Please fill in all fields");
      return;
    }

    const url = `${process.env.REACT_APP_BACKEND_URL}/create-deal`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDealInfo),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Failed to add deal");
      }

      alert("Successfully created new deals");
      setNewDealInfo(initialNewDealInfo);
      setSelectedUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error adding deal:", error);
      alert(error.message || "Failed to add deal");
    }
  };

  const handleAddUser = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/create-farmer`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || "Network response was not ok");
      }

      alert("Successfully created");
      setShowAddForm(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddRow = () => {
    setNewDealInfo({
      ...newDealInfo,
      stockItems: [
        ...newDealInfo.stockItems,
        { stockName: "", quantity: 0, price: 0 },
      ],
    });
  };

  const handleRemoveRow = (index) => {
    const updatedStockItems = [...newDealInfo.stockItems];
    updatedStockItems.splice(index, 1);
    setNewDealInfo({ ...newDealInfo, stockItems: updatedStockItems });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Add New Deal</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newDealInfo.name}
                onChange={(e) => handleDealInputChange(e)}
              />
              {filteredUsers.length > 0 && (
                <ul className="list-group">
                  {filteredUsers.map((user) => (
                    <li
                      key={user.id}
                      className="list-group-item"
                      onClick={() => handleUserSelect(user)}
                    >
                      {user.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="number">Number</label>
              <input
                type="text"
                className="form-control"
                id="number"
                name="number"
                value={newDealInfo.number}
                onChange={(e) => handleDealInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="seller">Seller</label>
              <input
                type="text"
                className="form-control"
                id="seller"
                name="seller"
                value={newDealInfo.seller}
                onChange={(e) => handleDealInputChange(e)}
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Stock Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {newDealInfo.stockItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="stockName"
                        value={item.stockName}
                        onChange={(e) => handleDealInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleDealInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={item.price}
                        onChange={(e) => handleDealInputChange(e, index)}
                      />
                    </td>
                    <td>
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveRow(index)}
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col-md-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddRow}
                >
                  Add Row
                </button>
              </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleAddDeal}>
              Save
            </button>
          </form>
        </div>
        <div className="border-line"></div>
        <div className="col-md-6">
          <h2 className="mb-4">Selected User Info</h2>
          <div className="selected-user">
            {selectedUser ? (
              <div>
                <p>
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Number:</strong> {selectedUser.number}
                </p>
                <p>
                  <strong>Seller:</strong> {selectedUser.seller}
                </p>
                {selectedUser.stockItems &&
                  selectedUser.stockItems.map((item, index) => (
                    <div key={index}>
                      <p>
                        <strong>Stock Name:</strong> {item.stockName}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Price:</strong> {item.price}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <p>No user selected</p>
            )}
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowAddForm(true)}
          >
            Add New Farmer
          </button>
          {showAddForm && (
            <div className="add-user-form">
              <h2 className="mb-4">Add New Farmer</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newUserInfo.name}
                    onChange={handleUserInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="number">Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    name="number"
                    value={newUserInfo.number}
                    onChange={handleUserInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="village">Village</label>
                  <input
                    type="text"
                    className="form-control"
                    id="village"
                    name="village"
                    value={newUserInfo.village}
                    onChange={handleUserInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fathersName">Father's Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fathersName"
                    name="fathersName"
                    value={newUserInfo.fathersName}
                    onChange={handleUserInputChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddUser}
                >
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewDeal;
