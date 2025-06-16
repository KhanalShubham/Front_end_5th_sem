"use client"

import { useState } from "react"
import { Save, Edit, Eye } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"

const TermsConditions = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("terms")

  const [termsContent, setTermsContent] = useState(`
# Terms and Conditions for HopeCare Platform

## 1. Acceptance of Terms
By accessing and using the HopeCare platform, you accept and agree to be bound by the terms and provision of this agreement.

## 2. Patient Eligibility
- Patients must provide authentic medical documentation
- All medical reports must be verified by licensed healthcare professionals
- Patients must be in genuine need of financial assistance for medical treatment
- False or misleading information will result in immediate rejection

## 3. Documentation Requirements
- Valid medical diagnosis from certified healthcare provider
- Detailed treatment plan and cost estimates
- Proof of financial hardship
- Government-issued identification
- Insurance documentation (if applicable)

## 4. Review Process
- All patient applications undergo thorough administrative review
- Medical documentation is verified with healthcare providers
- Financial need assessment is conducted
- Decision timeline: 5-7 business days

## 5. Approval Criteria
- Medical urgency and severity of condition
- Authenticity of provided documentation
- Financial need assessment
- Treatment feasibility and success probability
- Compliance with platform guidelines

## 6. Rejection Reasons
- Incomplete or fraudulent documentation
- Non-medical expenses
- Experimental treatments without proven efficacy
- Duplicate applications
- Violation of platform policies

## 7. Patient Responsibilities
- Provide accurate and complete information
- Update medical status as required
- Use funds solely for stated medical purposes
- Maintain communication with platform administrators
- Report any changes in financial circumstances

## 8. Privacy and Confidentiality
- Patient medical information is strictly confidential
- Data sharing only with authorized medical professionals
- Compliance with HIPAA and data protection regulations
- Secure storage and transmission of sensitive information

## 9. Platform Liability
- HopeCare acts as a facilitator between patients and donors
- No guarantee of funding approval or success
- Platform not responsible for medical outcomes
- Limited liability for technical issues or system downtime

## 10. Modification of Terms
- Terms may be updated to reflect policy changes
- Users will be notified of significant modifications
- Continued use constitutes acceptance of updated terms
  `)

  const [privacyContent, setPrivacyContent] = useState(`
# Privacy Policy for HopeCare Platform

## 1. Information Collection
We collect information you provide directly to us, such as when you create an account, submit a patient application, or contact us for support.

## 2. Medical Information
- Medical records and documentation
- Treatment plans and cost estimates
- Healthcare provider information
- Insurance and financial documentation

## 3. Personal Information
- Name, address, and contact information
- Government-issued identification
- Emergency contact details
- Financial information for need assessment

## 4. Use of Information
- Verify patient eligibility and medical need
- Process and review funding applications
- Communicate with healthcare providers
- Maintain platform security and prevent fraud

## 5. Information Sharing
- Medical professionals for verification purposes
- Legal authorities when required by law
- Service providers under strict confidentiality agreements
- Never shared for marketing or commercial purposes

## 6. Data Security
- Encryption of sensitive medical and personal data
- Secure servers with restricted access
- Regular security audits and updates
- Compliance with healthcare data protection standards

## 7. Data Retention
- Medical records retained for verification purposes
- Personal information stored only as long as necessary
- Secure deletion of data upon request (where legally permissible)
- Backup systems with same security standards

## 8. User Rights
- Access to your personal information
- Correction of inaccurate data
- Request for data deletion (subject to legal requirements)
- Opt-out of non-essential communications

## 9. Cookies and Tracking
- Essential cookies for platform functionality
- Analytics to improve user experience
- No third-party advertising cookies
- User control over cookie preferences

## 10. Contact Information
For privacy-related questions or concerns, contact our Data Protection Officer at privacy@hopecare.com
  `)

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
    console.log("Terms and conditions saved")
  }

  const tabs = [
    { id: "terms", label: "Terms & Conditions", content: termsContent, setter: setTermsContent },
    { id: "privacy", label: "Privacy Policy", content: privacyContent, setter: setPrivacyContent },
  ]

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Terms & Conditions Management</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-md flex items-center transition-colors ${
                isEditing ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-red-700 hover:bg-red-600 text-white"
              }`}
            >
              {isEditing ? <Eye className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditing ? "Preview" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="border-b border-gray-700">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-red-900 text-white border-b-2 border-red-500"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Editing: {activeTabData.label}</h3>
                  <div className="text-sm text-gray-400">Last updated: June 13, 2025</div>
                </div>
                <textarea
                  value={activeTabData.content}
                  onChange={(e) => activeTabData.setter(e.target.value)}
                  className="w-full h-96 px-4 py-3 bg-gray-900 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 font-mono text-sm"
                  placeholder="Enter terms and conditions content..."
                />
                <div className="flex items-center text-sm text-gray-400">
                  <span>Supports Markdown formatting</span>
                </div>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-600">
                  <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed">
                    {activeTabData.content}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Version History */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Version History</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
              <div>
                <div className="text-white font-medium">Version 2.1</div>
                <div className="text-sm text-gray-400">Updated privacy policy for GDPR compliance</div>
              </div>
              <div className="text-sm text-gray-400">June 13, 2025</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
              <div>
                <div className="text-white font-medium">Version 2.0</div>
                <div className="text-sm text-gray-400">Major update to patient eligibility criteria</div>
              </div>
              <div className="text-sm text-gray-400">May 28, 2025</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
              <div>
                <div className="text-white font-medium">Version 1.5</div>
                <div className="text-sm text-gray-400">Added documentation requirements section</div>
              </div>
              <div className="text-sm text-gray-400">April 15, 2025</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h4 className="text-white font-medium mb-3">Document Templates</h4>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700">
                Patient Agreement Template
              </button>
              <button className="w-full text-left text-sm text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700">
                Donor Terms Template
              </button>
              <button className="w-full text-left text-sm text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700">
                Medical Verification Form
              </button>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h4 className="text-white font-medium mb-3">Legal Compliance</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">HIPAA Compliance</span>
                <span className="text-green-400">✓ Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">GDPR Compliance</span>
                <span className="text-green-400">✓ Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">SOC 2 Type II</span>
                <span className="text-green-400">✓ Certified</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h4 className="text-white font-medium mb-3">Actions</h4>
            <div className="space-y-2">
              <button className="w-full bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm">
                Publish Changes
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm">
                Export PDF
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm">
                Legal Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default TermsConditions
