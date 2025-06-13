"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Heart,
  Share2,
  Calendar,
  MapPin,
  User,
  Activity,
  Clock,
  CreditCard,
  Wallet,
  DollarSign,
  ChevronLeft,
} from "lucide-react"
import DashboardLayout from "../../layouts/DashboardLayout"
import ProgressBar from "../../components/ui/ProgressBar"
import Button from "../../components/Button"
import Tabs from "../../components/ui/Tabs"

const DonationDetailPage = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [showDonateModal, setShowDonateModal] = useState(false)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Mock data for the donation
  const donation = {
    id: Number.parseInt(id),
    name: "Sarah Johnson",
    age: 7,
    location: "New York, USA",
    disease: "Leukemia",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Sarah is a bright and cheerful 7-year-old girl who was recently diagnosed with leukemia. Before her diagnosis, she loved dancing, playing with her friends, and going to school. Now, she needs urgent medical treatment to fight this disease and return to her normal childhood activities.\n\nThe treatment plan includes chemotherapy, possible bone marrow transplant, and extended hospital stays. Sarah's family has health insurance, but it doesn't cover all the specialized treatments she needs. The out-of-pocket expenses are overwhelming for her parents, who have already taken unpaid leave from work to be by her side.\n\nYour donation will directly help cover Sarah's medical expenses, specialized treatments, and support her family during this difficult time. Every contribution, no matter the size, brings Sarah one step closer to recovery and a chance at a healthy future.",
    raised: "$12,450",
    goal: "$25,000",
    progress: 49,
    daysLeft: 12,
    donors: 238,
    updates: [
      {
        date: "June 10, 2025",
        title: "Sarah started her second round of chemotherapy",
        content:
          "Sarah has been brave through her first round of treatment. The doctors are cautiously optimistic about her progress. Thank you for your continued support during this difficult time.",
      },
      {
        date: "May 28, 2025",
        title: "First treatment completed",
        content:
          "Sarah has completed her first round of treatment. The side effects have been difficult, but she remains positive. Your donations have helped cover the specialized medication she needs.",
      },
    ],
    comments: [
      {
        name: "John Smith",
        date: "June 12, 2025",
        amount: "$50",
        message: "Stay strong, Sarah! We're all rooting for you.",
      },
      {
        name: "Maria Rodriguez",
        date: "June 8, 2025",
        amount: "$100",
        message: "Sending love and healing thoughts to Sarah and her family.",
      },
      {
        name: "David Chen",
        date: "June 5, 2025",
        amount: "$75",
        message: "As a cancer survivor myself, I know how tough this journey can be. You've got this, Sarah!",
      },
    ],
  }

  const storyContent = (
    <div className="prose max-w-none">
      <p className="whitespace-pre-line">{donation.description}</p>
    </div>
  )

  const updatesContent = (
    <div className="space-y-6">
      {donation.updates.map((update, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            {update.date}
          </div>
          <h3 className="font-medium text-gray-900 mb-2">{update.title}</h3>
          <p className="text-gray-600">{update.content}</p>
        </div>
      ))}
    </div>
  )

  const commentsContent = (
    <div className="space-y-6">
      {donation.comments.map((comment, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between mb-2">
            <div className="font-medium text-gray-900">{comment.name}</div>
            <div className="text-green-600 font-medium">{comment.amount}</div>
          </div>
          <div className="text-sm text-gray-500 mb-2">{comment.date}</div>
          <p className="text-gray-600">{comment.message}</p>
        </div>
      ))}
    </div>
  )

  const tabs = [
    { label: "Story", content: storyContent },
    { label: "Updates", content: updatesContent },
    { label: "Comments", content: commentsContent },
  ]

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link to="/dashboard/donations" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to donations
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <div className="relative h-64 sm:h-96">
            <img
              src={donation.image || "/placeholder.svg"}
              alt={donation.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="bg-white bg-opacity-90 p-2 rounded-full text-gray-700 hover:text-red-500 transition-colors duration-200">
                <Heart className="h-5 w-5" />
              </button>
              <button className="bg-white bg-opacity-90 p-2 rounded-full text-gray-700 hover:text-blue-500 transition-colors duration-200">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
                Help {donation.name} Beat {donation.disease}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{donation.daysLeft} days left</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    <span>
                      {donation.name}, {donation.age} years old
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{donation.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Activity className="h-4 w-4 mr-1" />
                    <span>{donation.disease}</span>
                  </div>
                </div>

                <Tabs tabs={tabs} className="mb-6" />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="mb-4">
                  <ProgressBar progress={donation.progress} className="mb-3" />
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Raised:</span>
                    <span className="font-medium text-gray-900">{donation.raised}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Goal:</span>
                    <span className="font-medium text-gray-900">{donation.goal}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                  <User className="h-4 w-4 mr-1" />
                  <span>{donation.donors} donors</span>
                </div>

                <Button
                  variant="primary"
                  size="large"
                  className="w-full mb-3 bg-green-600 hover:bg-green-700"
                  onClick={() => setShowDonateModal(true)}
                >
                  Donate Now
                </Button>

                <Button variant="outline" size="large" className="w-full">
                  Share This Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonateModal && <DonationModal donation={donation} onClose={() => setShowDonateModal(false)} />}
    </DashboardLayout>
  )
}

const DonationModal = ({ donation, onClose }) => {
  const [amount, setAmount] = useState("50")
  const [customAmount, setCustomAmount] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleAmountClick = (value) => {
    setAmount(value)
    setCustomAmount(false)
  }

  const handleCustomAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Process donation
    console.log("Processing donation:", { amount, paymentMethod })
    // Close modal and show success message
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Donate to Help {donation.name}</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {["10", "25", "50", "100"].map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={`py-2 px-4 rounded-md text-center ${
                            amount === value && !customAmount
                              ? "bg-green-100 text-green-800 border-2 border-green-500"
                              : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                          }`}
                          onClick={() => handleAmountClick(value)}
                        >
                          ${value}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center mb-3">
                      <input
                        id="custom-amount"
                        type="checkbox"
                        checked={customAmount}
                        onChange={() => setCustomAmount(!customAmount)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="custom-amount" className="ml-2 block text-sm text-gray-700">
                        Custom amount
                      </label>
                    </div>

                    {customAmount && (
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          value={amount}
                          onChange={handleCustomAmountChange}
                          className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          aria-describedby="price-currency"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm" id="price-currency">
                            USD
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <div className="space-y-3">
                      <div
                        className={`p-4 border rounded-lg cursor-pointer ${
                          paymentMethod === "card"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              paymentMethod === "card" ? "border-green-500" : "border-gray-300"
                            } flex items-center justify-center mr-3`}
                          >
                            {paymentMethod === "card" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                          </div>
                          <div className="flex items-center">
                            <CreditCard
                              className={`h-5 w-5 ${paymentMethod === "card" ? "text-green-600" : "text-gray-400"}`}
                            />
                            <span
                              className={`ml-2 ${paymentMethod === "card" ? "text-green-600 font-medium" : "text-gray-700"}`}
                            >
                              Credit / Debit Card
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 border rounded-lg cursor-pointer ${
                          paymentMethod === "paypal"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              paymentMethod === "paypal" ? "border-green-500" : "border-gray-300"
                            } flex items-center justify-center mr-3`}
                          >
                            {paymentMethod === "paypal" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                          </div>
                          <div className="flex items-center">
                            <Wallet
                              className={`h-5 w-5 ${paymentMethod === "paypal" ? "text-green-600" : "text-gray-400"}`}
                            />
                            <span
                              className={`ml-2 ${paymentMethod === "paypal" ? "text-green-600 font-medium" : "text-gray-700"}`}
                            >
                              PayPal
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 border rounded-lg cursor-pointer ${
                          paymentMethod === "bank"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("bank")}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              paymentMethod === "bank" ? "border-green-500" : "border-gray-300"
                            } flex items-center justify-center mr-3`}
                          >
                            {paymentMethod === "bank" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                          </div>
                          <div className="flex items-center">
                            <DollarSign
                              className={`h-5 w-5 ${paymentMethod === "bank" ? "text-green-600" : "text-gray-400"}`}
                            />
                            <span
                              className={`ml-2 ${paymentMethod === "bank" ? "text-green-600 font-medium" : "text-gray-700"}`}
                            >
                              Bank Transfer
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 -mx-6 -mb-4 px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Complete Donation
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationDetailPage
