import React, { useEffect, useState } from 'react';
import { FaCreditCard, FaCashRegister, FaMobileAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookingsForUser } from '../Redux/booking/Action';

function CheckOut({
  toggleLocationPopup,
  showLocationPopup,
  handleLocationSave,
  handlePaymentOptionClick,
  paymentMessage,
  showAddCardButton,
  handleAddNewCardClick,
  showCardPopup,
  toggleCardPopup,
  paymentDetails,
  handlePaymentChange,
}) {
  const dispatch = useDispatch();
  const { bookings: userBookings, loading, error } = useSelector((state) => state.bookings.bookings);
  const [localPaymentMessage, setLocalPaymentMessage] = useState('');
  const [localShowAddCardButton, setLocalShowAddCardButton] = useState(false);

  useEffect(() => {
    dispatch(getAllBookingsForUser());
  }, [dispatch]);

  // Ensure userBookings is an array before using reduce
  const totalAmount = Array.isArray(userBookings)
    ? userBookings.reduce((total, booking) => total + booking.totalAmount, 0)
    : 0;

  const localHandlePaymentOptionClick = (option) => {
    if (option === 'cash') {
      setLocalPaymentMessage('You have selected Cash on Delivery.');
      setLocalShowAddCardButton(false);
    } else if (option === 'telebirr') {
      setLocalPaymentMessage('You have selected Telebirr.');
      setLocalShowAddCardButton(false);
    } else {
      setLocalPaymentMessage('You have selected International Credit/Debit Card.');
      setLocalShowAddCardButton(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100">
      <div className="lg:flex gap-8 flex-grow max-w-screen-xl mx-auto">
        {/* Left section: Information and instructions */}
        <div className="lg:w-1/4 w-full mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold mb-4">CheckOut</h1>
          <p className="text-sm text-gray-600">
            To complete your order, ensure your location details are correct, add notes if needed, include your payment details, and click the checkout button below to confirm.
          </p>
        </div>
        {/* Right section: Forms and actions */}
        <div className="lg:w-2/3 w-full flex flex-col">
          {/* Order confirmation */}
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Confirm Your Car Rental Details</h2>
            {Array.isArray(userBookings) && userBookings.length > 0 ? (
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
                  {userBookings.map((booking, index) => (
                    <tr key={booking._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{booking.car?.brand}</td>
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
          {/* Payment options */}
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
                <p className="text-lg">{localPaymentMessage}</p>
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

      {/* Popups */}
      {showLocationPopup && <AddNewLocation onClose={toggleLocationPopup} onSave={handleLocationSave} />}
      {showCardPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Card Details</h2>
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
