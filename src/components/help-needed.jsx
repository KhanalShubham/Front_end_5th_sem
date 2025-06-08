"use client"

import { useEffect, useState } from "react"
import Card from "./card"
import Button from "./buttons"
import Badge from "./badge"
import ProgressBar from "./progress-bar"

const HelpNeededSection = () => {
  const [isVisible, setIsVisible] = useState(false)

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

    return () => observer.disconnect()
  }, [])

  const campaigns = [
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "Help Sai to continue his study",
      raised: "₹7,91,000",
      goal: "₹8,00,000",
      donors: "₹9,000",
      progress: 98,
    },
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "Save Ravi's life",
      raised: "₹3,91,000",
      goal: "₹5,00,000",
      donors: "₹1,09,000",
      progress: 78,
    },
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "Build School for poor students",
      raised: "₹2,91,000",
      goal: "₹5,00,000",
      donors: "₹2,09,000",
      progress: 58,
    },
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "Make them happy",
      raised: "₹1,91,000",
      goal: "₹3,00,000",
      donors: "₹1,09,000",
      progress: 64,
    },
  ]

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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {campaigns.map((campaign, index) => (
            <Card
              key={index}
              padding="none"
              className={`overflow-hidden group ${isVisible ? "animate-slideInUp opacity-100" : "opacity-0 translate-y-[100px]"}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {campaign.title}
                </h3>

                {/* Progress Bar */}
                <ProgressBar progress={isVisible ? campaign.progress : 0} className="mb-3" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Raised:</span>
                    <span className="font-medium text-green-600">{campaign.raised}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Goal:</span>
                    <span className="font-medium">{campaign.goal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Donors:</span>
                    <span className="font-medium">{campaign.donors}</span>
                  </div>
                </div>
                <Button variant="secondary" size="small" className="w-full mt-4">
                  Donate →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HelpNeededSection
