import React from 'react';
import { FaCreditCard, FaCashRegister, FaMobileAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

function CheckOut({
  cartItemsFromRedux,
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
  return (
    <div className="min-h-screen flex flex-col max-w-screen-xl mx-auto p-6 bg-gray-100">
      <div className="lg:flex gap-8 flex-grow">
        {/* Left section: Information and instructions */}
        <div className="lg:w-1/4 w-full mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold mb-4">CheckOut</h1>
          <p className="text-sm text-gray-600">
            To complete your order, ensure your location details are correct, add notes if needed, include your payment details, and click the checkout button below to confirm.
          </p>
        </div>

        {/* Right section: Forms and actions */}
        <div className="lg:w-2/3 w-full flex flex-col">
          {/* Location selection */}
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Select a Saved Location</h2>
            <button
              onClick={toggleLocationPopup}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Add New Location
            </button>
            <div className="my-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18499.68485934746!2d38.495503500000005!3d7.032923149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1735568094312!5m2!1sen!2set"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Order confirmation */}
          <div>
            <h2 className="text-xl font-semibold mb-2">2. Confirm Your Order Details</h2>
            {cartItemsFromRedux?.items?.length > 0 ? (
              <table className="min-w-full table-auto mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Item</th>
                    <th className="px-4 py-2 border-b text-left">Quantity</th>
                    <th className="px-4 py-2 border-b text-left">Price</th>
                    <th className="px-4 py-2 border-b text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItemsFromRedux.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b">{item.foodMenu.title}</td>
                      <td className="px-4 py-2 border-b">{item.quantity}</td>
                      <td className="px-4 py-2 border-b">${item.foodMenu.price.toFixed(2)}</td>
                      <td className="px-4 py-2 border-b text-right">${(item.quantity * item.foodMenu.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-600">Your cart is empty!</p>
            )}
            <p className="text-xl font-medium text-right mt-4">Total Price: $155</p>
          </div>

          {/* Payment options */}
          <div>
            <h2 className="text-xl font-semibold mb-2">3. Select a Payment Option</h2>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => handlePaymentOptionClick('card')}
                className="px-4 py-2 rounded-lg border border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center space-x-2"
              >
                <FaCreditCard />
                <span>International Credit/Debit Card</span>
              </button>
              <button
                onClick={() => handlePaymentOptionClick('cash')}
                className="px-4 py-2 rounded-lg border border-yellow-500 hover:bg-yellow-500 hover:text-white flex items-center justify-center space-x-2"
              >
                <FaCashRegister />
                <span>Cash on Delivery</span>
              </button>
              <button
                onClick={() => handlePaymentOptionClick('telebirr')}
                className="px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center space-x-2"
              >
                <FaMobileAlt />
                <span>Telebirr/Mobile Payment</span>
              </button>
            </div>
            {paymentMessage && (
              <div className="mt-4">
                <p className="text-lg">{paymentMessage}</p>
                {showAddCardButton && (
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
