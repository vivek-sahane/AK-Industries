import React from 'react'

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">About AK Industries</h1>
        
        {/* Company Overview */}
        <p className="text-gray-700 text-lg leading-7 mb-6">
          Welcome to <span className="font-semibold text-indigo-600">AK Industries</span> – your trusted destination for quality food products and snacks. 
          Based in Akole, Maharashtra (422601), we specialize in delivering authentic and hygienic snacks prepared with love and care.
        </p>

        {/* Highlights */}
        <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
          <li><span className="font-medium">Owner:</span> Mr. Akshay Kailas Dhumal</li>
          <li><span className="font-medium">Core Focus:</span> Quality Food Manufacturing & Delivery</li>
          <li><span className="font-medium">Service Area:</span> Maharashtra and expanding across India</li>
        </ul>

        {/* Contact Details */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div>
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">Contact Information</h2>
            <p className="text-gray-700"><strong>Phone:</strong> +91 9876543210</p>
            <p className="text-gray-700"><strong>Email:</strong> support@akindustries.in</p>
            <p className="text-gray-700"><strong>Address:</strong> Akole, Maharashtra – 422601</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Premium quality ingredients</li>
              <li>Traditional & hygienic recipes</li>
              <li>Fast delivery & customer support</li>
              <li>Thousands of satisfied customers</li>
            </ul>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <iframe
            title="AK Industries Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.6723009303836!2d74.1775!3d19.0888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc590a62219f4b%3A0x1125b03821f65ffb!2sAkole%2C%20Maharashtra%20422601!5e0!3m2!1sen!2sin!4v1719222222222"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[300px] border-2 border-indigo-200"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
