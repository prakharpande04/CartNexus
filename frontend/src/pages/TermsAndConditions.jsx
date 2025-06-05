import { useState } from "react"
import { useNavigate } from "react-router-dom"

function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("introduction")
  const navigate = useNavigate()

  const sections = [
    { id: "introduction", title: "Introduction", icon: "📋" },
    { id: "acceptance", title: "Acceptance of Terms", icon: "✅" },
    { id: "website-use", title: "Website Use", icon: "🌐" },
    { id: "accounts", title: "User Accounts", icon: "👤" },
    { id: "products", title: "Products & Pricing", icon: "🛍️" },
    { id: "orders", title: "Orders & Payments", icon: "💳" },
    { id: "shipping", title: "Shipping & Delivery", icon: "🚚" },
    { id: "returns", title: "Returns & Refunds", icon: "↩️" },
    { id: "conduct", title: "User Conduct", icon: "⚖️" },
    { id: "intellectual", title: "Intellectual Property", icon: "©️" },
    { id: "privacy", title: "Privacy & Data", icon: "🔒" },
    { id: "liability", title: "Limitation of Liability", icon: "⚠️" },
    { id: "disputes", title: "Dispute Resolution", icon: "🤝" },
    { id: "termination", title: "Termination", icon: "🚫" },
    { id: "changes", title: "Changes to Terms", icon: "📝" },
    { id: "contact", title: "Contact Information", icon: "📞" },
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-lg">ShopNexus - Your trusted online marketplace</p>
          <p className="text-gray-500 text-sm mt-2">Last updated: January 2025</p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Table of Contents
              </h2>
              <nav className="space-y-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-2 border-purple-400/50 text-white shadow-lg"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>

              {/* Back to Home Button */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 space-y-12">
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">📋</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Introduction</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Welcome to ShopNexus, your premier online shopping destination. These Terms and Conditions ("Terms")
                    govern your use of our website, mobile application, and services (collectively, the "Service")
                    operated by ShopNexus ("we," "us," or "our").
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any
                    part of these terms, then you may not access the Service.
                  </p>
                </div>
              </section>

              {/* Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">✅</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    By creating an account, making a purchase, or using any part of our Service, you acknowledge that
                    you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6">
                    <li>• You must be at least 18 years old to use our Service</li>
                    <li>• You represent that you have the legal capacity to enter into these Terms</li>
                    <li>• Your use of the Service is at your own risk and discretion</li>
                  </ul>
                </div>
              </section>

              {/* Website Use */}
              <section id="website-use" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🌐</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Website Use</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    You may use our website for lawful purposes only. You agree not to use the Service:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• In any way that violates applicable laws or regulations</li>
                    <li>• To transmit or procure sending of any advertising or promotional material</li>
                    <li>• To impersonate or attempt to impersonate the company or other users</li>
                    <li>• To engage in any other conduct that restricts or inhibits anyone's use of the website</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    We reserve the right to terminate or suspend your access immediately, without prior notice, for any
                    breach of these Terms.
                  </p>
                </div>
              </section>

              {/* User Accounts */}
              <section id="accounts" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">User Accounts</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    To access certain features of our Service, you may be required to create an account. You are
                    responsible for:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• Maintaining the confidentiality of your account credentials</li>
                    <li>• All activities that occur under your account</li>
                    <li>• Providing accurate and complete information</li>
                    <li>• Updating your information to keep it current</li>
                  </ul>
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-yellow-300 text-sm">
                      <strong>Important:</strong> You must immediately notify us of any unauthorized use of your account
                      or any other breach of security.
                    </p>
                  </div>
                </div>
              </section>

              {/* Products & Pricing */}
              <section id="products" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🛍️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Products & Pricing</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We strive to provide accurate product information and pricing. However:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• Product descriptions, images, and specifications are for informational purposes</li>
                    <li>• We do not warrant that product descriptions are accurate or complete</li>
                    <li>• Prices are subject to change without notice</li>
                    <li>• We reserve the right to correct pricing errors</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    All prices are displayed in Indian Rupees (INR) and include applicable taxes unless otherwise
                    stated.
                  </p>
                </div>
              </section>

              {/* Orders & Payments */}
              <section id="orders" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">💳</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Orders & Payments</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">When you place an order through our Service:</p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• You are making an offer to purchase the product(s)</li>
                    <li>• We reserve the right to accept or decline your order</li>
                    <li>• Payment must be received before order processing</li>
                    <li>• We accept major credit cards, debit cards, UPI, and net banking</li>
                  </ul>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-blue-300 text-sm">
                      <strong>Secure Payments:</strong> All payment information is encrypted and processed through
                      secure payment gateways.
                    </p>
                  </div>
                </div>
              </section>

              {/* Shipping & Delivery */}
              <section id="shipping" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🚚</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Shipping & Delivery</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We offer shipping across India with the following terms:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• Standard delivery: 5-7 business days</li>
                    <li>• Express delivery: 2-3 business days (additional charges apply)</li>
                    <li>• Free shipping on orders above ₹499</li>
                    <li>• Delivery times may vary based on location and product availability</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    Risk of loss and title for products pass to you upon delivery to the carrier. We are not responsible
                    for delays caused by shipping carriers.
                  </p>
                </div>
              </section>

              {/* Returns & Refunds */}
              <section id="returns" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">↩️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Returns & Refunds</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We want you to be completely satisfied with your purchase. Our return policy includes:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• 30-day return window from delivery date</li>
                    <li>• Items must be unused and in original packaging</li>
                    <li>• Return shipping costs may apply</li>
                    <li>• Refunds processed within 5-7 business days</li>
                  </ul>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-300 text-sm">
                      <strong>Easy Returns:</strong> Contact our customer service team to initiate a return request.
                    </p>
                  </div>
                </div>
              </section>

              {/* User Conduct */}
              <section id="conduct" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">⚖️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">User Conduct</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    You agree to use our Service responsibly and not to:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• Violate any applicable laws or regulations</li>
                    <li>• Infringe upon intellectual property rights</li>
                    <li>• Transmit harmful or malicious code</li>
                    <li>• Attempt to gain unauthorized access to our systems</li>
                    <li>• Use the Service for fraudulent purposes</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    Violation of these terms may result in immediate termination of your account and legal action.
                  </p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">©️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Service and its original content, features, and functionality are owned by ShopNexus and are
                    protected by:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• International copyright laws</li>
                    <li>• Trademark laws</li>
                    <li>• Other intellectual property rights</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    You may not reproduce, distribute, modify, or create derivative works of our content without express
                    written permission.
                  </p>
                </div>
              </section>

              {/* Privacy & Data */}
              <section id="privacy" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🔒</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Privacy & Data Protection</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
                    information:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• We collect information necessary to provide our services</li>
                    <li>• Your data is stored securely and encrypted</li>
                    <li>• We do not sell your personal information to third parties</li>
                    <li>• You have rights regarding your personal data</li>
                  </ul>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                    <p className="text-purple-300 text-sm">
                      <strong>Data Security:</strong> We implement industry-standard security measures to protect your
                      information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-red-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    To the fullest extent permitted by law, ShopNexus shall not be liable for:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• Indirect, incidental, or consequential damages</li>
                    <li>• Loss of profits, data, or business opportunities</li>
                    <li>• Damages arising from third-party actions</li>
                    <li>• Service interruptions or technical issues</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    Our total liability shall not exceed the amount paid by you for the specific product or service.
                  </p>
                </div>
              </section>

              {/* Dispute Resolution */}
              <section id="disputes" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🤝</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Dispute Resolution</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">We are committed to resolving disputes amicably:</p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• First, contact our customer service team</li>
                    <li>• We will attempt to resolve issues within 30 days</li>
                    <li>• Disputes will be governed by Indian law</li>
                    <li>• Courts in Mumbai, India shall have exclusive jurisdiction</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    By using our Service, you agree to attempt resolution through our customer service before pursuing
                    legal action.
                  </p>
                </div>
              </section>

              {/* Termination */}
              <section id="termination" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🚫</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Termination</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We may terminate or suspend your account and access to the Service:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• Immediately, without prior notice, for breach of Terms</li>
                    <li>• For prolonged inactivity</li>
                    <li>• For violation of applicable laws</li>
                    <li>• At our sole discretion for any reason</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    Upon termination, your right to use the Service will cease immediately, but these Terms will remain
                    in effect.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section id="changes" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">📝</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Changes to Terms</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We reserve the right to modify these Terms at any time:
                  </p>
                  <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                    <li>• Changes will be posted on this page</li>
                    <li>• We will update the "Last updated" date</li>
                    <li>• Continued use constitutes acceptance of changes</li>
                    <li>• Material changes will be communicated via email</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    We encourage you to review these Terms periodically for any changes.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">📞</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Email Support
                      </h3>
                      <p className="text-gray-300">legal@shopnexus.com</p>
                      <p className="text-gray-300">support@shopnexus.com</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Phone Support
                      </h3>
                      <p className="text-gray-300">+91 1800-123-4567</p>
                      <p className="text-gray-400 text-sm">Mon-Fri: 9 AM - 6 PM IST</p>
                    </div>
                  </div>

                  <div className="mt-6 bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Registered Office
                    </h3>
                    <p className="text-gray-300">
                      ShopNexus Private Limited
                      <br />
                      123 Business District
                      <br />
                      Mumbai, Maharashtra 400001
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #2563eb);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  )
}

export default TermsAndConditions
