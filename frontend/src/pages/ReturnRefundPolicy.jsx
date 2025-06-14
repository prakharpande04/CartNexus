"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Package,
  RefreshCw,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Phone,
  Mail,
  MessageCircle,
  Truck,
  Shield,
  FileText,
  DollarSign,
} from "lucide-react"
import { Link } from "react-router-dom";


export default function ReturnRefundPolicy() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", title: "Overview", icon: Info },
    { id: "return-policy", title: "Return Policy", icon: Package },
    { id: "refund-policy", title: "Refund Policy", icon: CreditCard },
    { id: "eligibility", title: "Eligibility Criteria", icon: CheckCircle },
    { id: "process", title: "Return Process", icon: RefreshCw },
    { id: "timeframes", title: "Timeframes", icon: Clock },
    { id: "conditions", title: "Conditions", icon: Shield },
    { id: "exceptions", title: "Exceptions", icon: AlertCircle },
    { id: "shipping", title: "Return Shipping", icon: Truck },
    { id: "refund-methods", title: "Refund Methods", icon: DollarSign },
    { id: "exchanges", title: "Exchanges", icon: RefreshCw },
    { id: "damaged-items", title: "Damaged Items", icon: Package },
    { id: "contact", title: "Contact Support", icon: Phone },
  ]

  const returnCategories = [
    {
      category: "Electronics",
      returnWindow: "30 days",
      conditions: "Original packaging, all accessories included",
      restockingFee: "None",
      color: "from-blue-500 to-purple-600",
    },
    {
      category: "Clothing & Fashion",
      returnWindow: "60 days",
      conditions: "Unworn, tags attached, original condition",
      restockingFee: "None",
      color: "from-pink-500 to-rose-600",
    },
    {
      category: "Home & Garden",
      returnWindow: "45 days",
      conditions: "Unused, original packaging",
      restockingFee: "None",
      color: "from-green-500 to-emerald-600",
    },
    {
      category: "Books & Media",
      returnWindow: "30 days",
      conditions: "Unopened, original condition",
      restockingFee: "15% if opened",
      color: "from-orange-500 to-amber-600",
    },
  ]

  const refundTimelines = [
    { method: "Credit/Debit Card", timeline: "5-7 business days", icon: CreditCard },
    { method: "Digital Wallet", timeline: "1-3 business days", icon: Phone },
    { method: "Bank Transfer", timeline: "3-5 business days", icon: DollarSign },
    { method: "Store Credit", timeline: "Instant", icon: FileText },
  ]

  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Log into your account and select the item you want to return",
      icon: Package,
    },
    {
      step: 2,
      title: "Print Return Label",
      description: "Download and print the prepaid return shipping label",
      icon: FileText,
    },
    {
      step: 3,
      title: "Package Item",
      description: "Securely package the item with all original accessories",
      icon: Package,
    },
    {
      step: 4,
      title: "Ship Return",
      description: "Drop off at any authorized shipping location",
      icon: Truck,
    },
    {
      step: 5,
      title: "Processing",
      description: "We inspect the item and process your refund",
      icon: RefreshCw,
    },
    {
      step: 6,
      title: "Refund Issued",
      description: "Refund is issued to your original payment method",
      icon: CreditCard,
    },
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopNexus
              </h1>
              <p className="text-sm text-gray-500">Return & Refund Policy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                        activeSection === section.id
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-8">
            {/* Overview Section */}
            <section id="overview" className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Return & Refund Policy Overview</h2>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  At ShopNexus, we want you to be completely satisfied with your purchase. Our comprehensive return and
                  refund policy ensures a hassle-free experience when you need to return or exchange items.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
                    <p className="text-sm text-gray-600">Simple online return process with prepaid labels</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                    <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Fast Refunds</h3>
                    <p className="text-sm text-gray-600">Quick processing and refund to original payment method</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl">
                    <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                    <p className="text-sm text-gray-600">Customer support available anytime you need help</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Return Policy Section */}
            <section id="return-policy" className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Return Policy by Category</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {returnCategories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${category.color} mb-4`}
                    >
                      {category.category}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Return Window:</span>
                        <span className="font-semibold text-gray-900">{category.returnWindow}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Restocking Fee:</span>
                        <span className="font-semibold text-gray-900">{category.restockingFee}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Conditions:</span>
                        <p className="text-sm text-gray-700 mt-1">{category.conditions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Return Process Section */}
            <section id="process" className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How to Return an Item</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {returnSteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={index} className="relative">
                      <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg mb-4">
                          {step.step}
                        </div>
                        <Icon className="h-8 w-8 text-gray-600 mb-3" />
                        <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      {index < returnSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-y-1/2"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Refund Methods Section */}
            <section id="refund-methods" className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Refund Processing Times</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {refundTimelines.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{method.method}</h3>
                        <p className="text-sm text-gray-600">{method.timeline}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Eligibility Criteria Section */}
            <section id="eligibility" className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Eligibility Criteria</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Eligible for Return
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Items in original condition with tags/packaging</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Unused electronics with all accessories</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Clothing items unworn with tags attached</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Items returned within specified timeframe</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Items with valid proof of purchase</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Not Eligible for Return
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Personalized or customized items</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Perishable goods and food items</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Intimate apparel and swimwear</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Digital downloads and software</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Items damaged by misuse or normal wear</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Damaged Items Section */}
            <section id="damaged-items" className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Damaged or Defective Items</h2>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <AlertCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Priority Handling for Damaged Items</h3>
                    <p className="text-red-800 mb-4">
                      If you receive a damaged or defective item, we'll prioritize your case and provide immediate
                      assistance.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-red-700">• Report within 48 hours of delivery</p>
                      <p className="text-sm text-red-700">• Provide photos of the damaged item</p>
                      <p className="text-sm text-red-700">• We'll arrange immediate replacement or full refund</p>
                      <p className="text-sm text-red-700">• No return shipping required for damaged items</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Support Section */}
            <section id="contact" className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Need Help with Returns?</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                  <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                  <p className="text-sm text-gray-600 mb-3">24/7 Customer Service</p>
                  <p className="font-semibold text-blue-600">1-800-SHOPNEXUS</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
                  <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-sm text-gray-600 mb-3">Response within 2 hours</p>
                  <p className="font-semibold text-green-600">returns@shopnexus.com</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl">
                  <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-sm text-gray-600 mb-3">Instant assistance</p>
                  <button className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                    Start Chat Now
                  </button>
                </div>
              </div>
            </section>

            {/* Important Notes */}
            <section className="bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-xl p-8">
              <div className="flex items-start space-x-4">
                <Info className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Important Notes</h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li>• Return shipping is free for most items within the continental US</li>
                    <li>• International returns may be subject to additional shipping charges</li>
                    <li>• Refunds will be processed to the original payment method used for purchase</li>
                    <li>• Store credit refunds never expire and can be used for future purchases</li>
                    <li>• This policy is subject to change; please check for updates regularly</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
