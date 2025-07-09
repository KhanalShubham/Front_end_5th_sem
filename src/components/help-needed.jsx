"use client"

import { useEffect, useState } from "react"
import Card from "./card"
import Button from "./buttons"
import Badge from "./badge"
import ProgressBar from "./progress-bar"
import { Loader2, AlertTriangle } from "lucide-react"

// Helper to format numbers into Indian Rupee currency string (e.g., ₹5,00,000)
const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    amount = 0;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper to get the full image URL from the backend
const getBackendImageUrl = (filePath) => {
  // Use a fallback placeholder if no image path is provided
  if (!filePath) return "/placeholder.svg?height=200&width=300";

  // IMPORTANT: This uses Vite's syntax for environment variables.
  // Your frontend .env file must have VITE_API_BASE_URL=http://localhost:5050
  const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";
  return `${backendUrl}/${filePath.replace(/\\/g, "/")}`;
};

// A simple skeleton card component for the loading state
const SkeletonCard = () => (
  <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
    <div className="bg-gray-300 h-48 w-full rounded-md mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="space-y-3 mt-4">
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
    <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
  </div>
);


const HelpNeededSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("help-needed-section")
    if (element) observer.observe(element)

    return () => {
      if(element) observer.unobserve(element);
    }
  }, [])

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // CORRECTED: Use Vite's syntax for environment variables
        const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";
        const response = await fetch(`${backendUrl}/api/campaigns`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCampaigns(data);

      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []); // Empty dependency array ensures this runs once when the component mounts


  return (
    <section id="help-needed-section" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "animate-fadeInUp opacity-100" : "opacity-0 translate-y-[50px]"}`}
        >
          <Badge variant="primary" className="mb-4 animate-pulse">
            Donate
          </Badge>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your help is Needed</h2>
        </div>
        
        {/* Conditional Rendering based on state */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Show 4 skeleton cards while loading */}
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : isError ? (
           <div className="text-center py-10 px-4 bg-red-50 rounded-lg border border-red-200">
             <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
             <h3 className="mt-2 text-lg font-medium text-red-800">Failed to load campaigns</h3>
             <p className="mt-1 text-sm text-red-700">Please try refreshing the page.</p>
           </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-10 px-4 bg-gray-100 rounded-lg">
             <h3 className="mt-2 text-lg font-medium text-gray-800">No Active Campaigns</h3>
             <p className="mt-1 text-sm text-gray-600">There are currently no approved campaigns needing help. Please check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {campaigns.map((campaign, index) => {
              // Calculate progress. Guard against division by zero.
              const progress = campaign.goalAmount > 0 
                ? (campaign.raisedAmount / campaign.goalAmount) * 100 
                : 0;

              return (
                <Card
                  key={campaign._id}
                  padding="none"
                  className={`overflow-hidden group ${isVisible ? "animate-slideInUp opacity-100" : "opacity-0 translate-y-[100px]"}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={getBackendImageUrl(campaign.userImage)}
                      alt={campaign.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {campaign.title}
                    </h3>
                    
                    {/* NOTE: The progress bar will reflect the 'raisedAmount' from the API.
                        If the backend is sending 0, the progress will be 0%. */}
                    <ProgressBar progress={isVisible ? progress : 0} className="mb-3" />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Raised:</span>
                        <span className="font-medium text-green-600">{formatCurrency(campaign.raisedAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Goal:</span>
                        <span className="font-medium">{formatCurrency(campaign.goalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Donors:</span>
                        {/* Assuming 'donors' from the API is a number (count of donors) */}
                        <span className="font-medium">{campaign.donors}</span>
                      </div>
                    </div>
                    <Button variant="secondary" size="small" className="w-full mt-4">
                      Donate →
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default HelpNeededSection