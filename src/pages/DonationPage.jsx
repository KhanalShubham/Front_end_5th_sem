import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, User, Mail } from 'lucide-react';

// Make sure you have the Khalti Checkout script in your public/index.html
// <script src="https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js"></script>

const formatCurrency = (amount) => {
  if (isNaN(amount) || amount === '') return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const DonationPageSkeleton = () => (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="animate-pulse max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mb-8"></div>
        <div className="h-14 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-14 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-14 bg-gray-300 rounded w-full mb-6"></div>
        <div className="h-16 bg-gray-300 rounded-lg w-full"></div>
        </div>
    </div>
);

// --- Main Donation Page Component ---
const DonationPage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  // --- State Management ---
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";
  const khaltiPublicKey = import.meta.env.VITE_KHALTI_PUBLIC_KEY || "test_public_key_dc74e0fd57cb46cd93832aee0a390234"; // <-- IMPORTANT

  // --- Data Fetching ---
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${backendUrl}/api/campaigns/${campaignId}`);
        if (!response.ok) {
          throw new Error('Campaign not found');
        }
        const data = await response.json();
        setCampaign(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaignDetails();
  }, [campaignId, backendUrl]);

  // --- Payment Handler ---
  const handleKhaltiPayment = () => {
    const khaltiConfig = {
      publicKey: khaltiPublicKey, // Use your Khalti Test Public Key
      productIdentity: campaign._id,
      productName: campaign.title,
      productUrl: window.location.href,
      eventHandler: {
        async onSuccess(payload) {
          // Client-side success -> Now, VERIFY on the server
          try {
            // The amount from the form is in Rupees, which is what our backend expects
            const amountInRupees = Number(amount);

            const response = await axios.post(
              `${backendUrl}/api/donations/khalti-payment-verification`, // <-- Call our new backend endpoint
              {
                token: payload.token,
                amount: amountInRupees,
                campaignId: campaign._id,
                donorDetails: {
                  name: name,
                  email: email,
                  isAnonymous: isAnonymous
                }
              }
            );

            if (response.data.success) {
              navigate('/donation/success'); // Or a page showing donation details
            } else {
              // Handle specific failure messages from our server
              navigate(`/donation/failure?message=${response.data.message || 'Payment verification failed'}`);
            }
          } catch (error) {
            console.error('Error verifying Khalti payment on server:', error);
            const errorMessage = error.response?.data?.message || 'Server verification failed';
            navigate(`/donation/failure?message=${errorMessage}`);
          }
        },
        onError(error) {
          console.log(error);
          alert('Khalti payment was cancelled or failed.');
        },
        onClose() {
          console.log('Khalti widget was closed.');
        }
      },
      paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };

    // a check to ensure the KhaltiCheckout library is loaded
    if (window.KhaltiCheckout) {
        const checkout = new window.KhaltiCheckout(khaltiConfig);
        // The widget expects the amount in Paisa (Amount in Rupees * 100)
        checkout.show({ amount: Number(amount) * 100 }); 
    } else {
        alert("Khalti payment gateway is not available. Please refresh the page.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) < 10) {
      alert("Please enter an amount of at least ₹10.");
      return;
    }
    if (!isAnonymous && !name.trim()) {
      alert("Please enter your name or choose to donate anonymously.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    // Directly call the Khalti handler
    handleKhaltiPayment();
  };

  // --- Render Logic ---
  if (isLoading) return <DonationPageSkeleton />;

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">Error: {error}</h2>
        <p className="text-gray-500 mt-2">Could not load the campaign details.</p>
        <Link to="/" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg">
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">Donate to {campaign.title}</h1>
        <p className="text-gray-500 mt-2">
          Your contribution will make a huge difference. Goal: {formatCurrency(campaign.goalAmount)}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose an amount (INR)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[500, 1000, 2500, 5000].map((val) => (
                <button type="button" key={val} onClick={() => setAmount(val)} className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${amount == val ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'}`}>
                  {formatCurrency(val)}
                </button>
              ))}
            </div>
            <div className="relative mt-4">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
              <input type="number" placeholder="Or enter a custom amount" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"/>
            </div>
          </div>
          
          {/* Donor Details */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative mt-1">
              <User className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400 pointer-events-none" />
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isAnonymous} required={!isAnonymous} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"/>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <p className="text-xs text-gray-500">A receipt will be sent here.</p>
            <div className="relative mt-1">
              <Mail className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400 pointer-events-none" />
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"/>
            </div>
          </div>
          
          {/* Anonymous Option */}
          <div className="flex items-center">
            <input id="anonymous" type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"/>
            <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900">Make my donation anonymous</label>
          </div>

          {/* Payment Method -- Simplified to just one button */}
          <button type="submit" className="w-full bg-purple-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isLoading}>
            <CreditCard className="mr-2 h-5 w-5" />
            Pay with Khalti {formatCurrency(amount)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;