import React, { useEffect, useState } from 'react';
import { FaCreditCard, FaCashRegister, FaMobileAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookingsForUser } from '../Redux/booking/Action';
import { fetchAllCars } from '../Redux/car/Action';
import { useNavigate } from 'react-router-dom';
import CreditCardPaymentForm from './CreditCardPaymentForm';

function CheckOut({
  toggleLocationPopup,
  showLocationPopup,
  handleLocationSave,
}) {
  const dispatch = useDispatch();
  const { bookings: userBookings, loading, error } = useSelector((state) => state.bookings.bookings);
  const { cars: allCars } = useSelector((state) => state.cars);
  const [localPaymentMessage, setLocalPaymentMessage] = useState('');
  const [localShowAddCardButton, setLocalShowAddCardButton] = useState(false);
  const [isCashOnDeliverySelected, setIsCashOnDeliverySelected] = useState(false);
  const navigate = useNavigate();
  const [isTelebirrSelected, setIsTelebirrSelected] = useState(false);
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const toggleCardPopup = () => {
    setShowCardPopup((prev) => !prev);
  };

  const handleAddNewCardClick = () => {
    toggleCardPopup(); // Show the popup when button is clicked
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getAllBookingsForUser());
    dispatch(fetchAllCars());
  }, [dispatch]);

  const filteredBookings = Array.isArray(userBookings)
    ? userBookings.filter((booking) =>
      allCars.some((car) => car._id === booking.car?._id)
    )
    : [];

  const totalAmount = filteredBookings.reduce((total, booking) => total + booking.totalAmount, 0);

  const localHandlePaymentOptionClick = (option) => {
    if (option === 'cash') {
      setLocalPaymentMessage('You have selected Cash on Delivery.');
      setLocalShowAddCardButton(false);
      setIsCashOnDeliverySelected(true);
      setIsTelebirrSelected(false);
    } else if (option === 'telebirr') {
      setLocalPaymentMessage('you have selected telebirr/mobile payment');
      setLocalShowAddCardButton(false);
      setIsCashOnDeliverySelected(false);
      setIsTelebirrSelected(true);
    } else {
      setLocalPaymentMessage('You have selected International Credit/Debit Card.');
      setLocalShowAddCardButton(true);
      setIsCashOnDeliverySelected(false);
      setIsTelebirrSelected(false);
    }
  };

  const bankDetails = {
    "Amole / Dashen Bank": {
      accountName: "Universal Courier Service PLC",
      accountNumber: "1000327571129",
      branch: "Karamara Branch",
    },
    "Bank of Abyssinia": {
      accountName: "Example Account Name",
      accountNumber: "Example Account Number",
      branch: "Example Branch",
    },
    "CBE - Commercial Bank of Ethiopia": {
      accountName: "Example Account Name",
      accountNumber: "Example Account Number",
      branch: "Example Branch",
    },
    "Nib Bank": {
      accountName: "Example Account Name",
      accountNumber: "Example Account Number",
      branch: "Example Branch",
    },
    "Telebirr": {
      accountName: "Example Account Name",
      accountNumber: "Example Account Number",
      branch: "Example Branch",
    },
    "Zemen Bank": {
      accountName: "Example Account Name",
      accountNumber: "Example Account Number",
      branch: "Example Branch",
    },
  };

  const handleBankClick = (bank) => {
    setSelectedBank(bank);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100">
      <div className="lg:flex gap-8 flex-grow max-w-screen-xl mx-auto">
        <div className="lg:w-1/4 w-full mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold mb-4">CheckOut</h1>
          <p className="text-sm text-gray-600">
            To complete your car rental order, review your rental details, add any necessary notes, include your payment details, and click the checkout button below to confirm. Once confirmed, please visit us to pick up your car.
          </p>
        </div>
        <div className="lg:w-2/3 w-full flex flex-col">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Confirm Your Car Rental Details</h2>
            {filteredBookings.length > 0 ? (
              <table className="min-w-full my-6 bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-3 border-b text-sm font-medium text-gray-700">#</th>
                    <th className="px-4 py-3 border-b text-sm font-medium text-gray-700">Car Brand</th>
                    <th className="px-4 py-3 border-b text-sm font-medium text-gray-700">Seats</th>
                    <th className="px-4 py-3 border-b text-sm font-medium text-gray-700">Price Per Day</th>
                    <th className="px-4 py-3 border-b text-sm font-medium text-gray-700">Rental Start Date</th>
                    <th className="px-4 py-3 border-b text-sm font-medium text-gray-700">Rental End Date</th>
                    <th className="px-4 py-3 border-b text-sm font-medium text-gray-700">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <tr key={booking._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{booking.car?.name} {booking.car?.brand}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{booking.car?.seats}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">${booking.car?.pricePerDay}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {new Date(booking.rentalStartDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {new Date(booking.rentalEndDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">${booking.totalAmount}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan="6" className="px-4 py-2 text-right">Total</td>
                    <td className="px-4 py-2">${totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-600">No bookings found!</p>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">2. Select a Payment Option</h2>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => localHandlePaymentOptionClick('card')}
                className="px-4 py-2 rounded-lg border border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center space-x-2"
              >
                <FaCreditCard />
                <span>International Credit/Debit Card</span>
              </button>
              <button
                onClick={() => localHandlePaymentOptionClick('cash')}
                className="px-4 py-2 rounded-lg border border-yellow-500 hover:bg-yellow-500 hover:text-white flex items-center justify-center space-x-2"
              >
                <FaCashRegister />
                <span>Cash on Delivery</span>
              </button>
              <button
                onClick={() => localHandlePaymentOptionClick('telebirr')}
                className="px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center space-x-2"
              >
                <FaMobileAlt />
                <span>Telebirr/Mobile Payment</span>
              </button>
            </div>
            {localPaymentMessage && (
              <div className="mt-4">
                <p className="text-lg text-gray-800">{localPaymentMessage}</p>
                {localPaymentMessage.includes('telebirr') && (
                  <div className="mt-4 space-y-2">
                    <div>
                      {isTelebirrSelected && (
                        <div className="mt-4 p-4 border border-blue-200 bg-blue-50 rounded-md">
                          <h3 className="font-semibold">Car Rental Confirmation</h3>
                          <p>To complete your car rental payment, please send the grand total for your order to one of the following supported banks and complete the following steps:</p>
                          <ol className="list-decimal list-inside mt-2">
                            <li>Take a screenshot of your bank transfer confirmation.</li>
                            <li>E-mail the screenshot to <a href="mailto:help@rcar.com" className="text-blue-500">help@rcar.com</a> along with your order number which will be shown to you after you click on the "Place your order" button below.</li>
                            <li>Please Note: Only once we have received a screenshot of your transfer confirmation (e-mailed to help@deliveraddis.com) will we be able to proceed with your car rental order. Thank you!</li>
                          </ol>
                          <p className="mt-4 font-semibold">Supported Banks:</p>
                          <ul className="list-inside mt-2 list-none px-4 space-y-2">
                            {Object.keys(bankDetails).map((bank) => (
                              <li key={bank} onClick={() => handleBankClick(bank)} 
                              className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors">
                                {bank}
                              </li>
                            ))}
                          </ul>
                          {selectedBank && (
                            <div className="mt-4 px-4">
                              <h4 className="font-semibold">Account Details for {selectedBank}:</h4>
                              <p>Account Name: {bankDetails[selectedBank].accountName}</p>
                              <p>Account Number: {bankDetails[selectedBank].accountNumber}</p>
                              <p>Branch: {bankDetails[selectedBank].branch}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {isCashOnDeliverySelected && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 leading-6">
                      Please ensure you have the correct amount of cash available for your rental payment. Note that drivers may not always carry exact change, so having the full amount will help make the transaction smoother and faster.
                    </p>
                  </div>
                )}
                {localShowAddCardButton && (
                  <button
                    onClick={handleAddNewCardClick}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Add New Card
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {showLocationPopup && <AddNewLocation onClose={toggleLocationPopup} onSave={handleLocationSave} />}
      {showCardPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <CreditCardPaymentForm
              paymentDetails={paymentDetails}
              handlePaymentChange={handlePaymentChange}
            />
            <button
              onClick={toggleCardPopup}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;