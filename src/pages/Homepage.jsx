import MainLayout from "../layouts/main-layout"
import HeroSection from "../components/hero"
import ServicesSection from "../components/services"
import HelpNeededSection from "../components/help-needed"
import StoriesSection from "../components/stories"
import StatsSection from "../components/stats"

const Homepage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      <HelpNeededSection />
      <StoriesSection />
      <StatsSection />
    </MainLayout>
  )
}

export default Homepage
