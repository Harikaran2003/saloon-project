
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    const faqs = [
      {
        question: "What documents are required to register my salon on The Cut Point?",
        answer: `✅ Salon Owner’s PAN Card & Aadhar Card\n✅ Business License (if applicable)\n✅ GST Certificate (if applicable)\n✅ Bank Account Details for payments\n✅ Salon photos & service menu`,
      },
      {
        question: "How long does it take for a salon to go live after submitting documents?",
        answer: `1️⃣ Document submission\n2️⃣ Verification in 48 hours\n3️⃣ Profile setup\n4️⃣ Training & Onboarding\n5️⃣ Salon goes live!`,
      },
      {
        question: "Is there an onboarding fee for salons?",
        answer: `💰 One-time onboarding fee\n✅ Covers profile setup, marketing, and training\n✅ Fee varies based on location`,
      },
      {
        question: "How do I receive bookings and payments?",
        answer: `📅 Customers book online\n✅ Notifications sent for confirmation\n💵 Payments weekly via UPI or bank transfer`,
      },
      {
        question: "Can I update my salon services and pricing after registration?",
        answer: `✅ Yes, via the Salon Partner Dashboard\n1️⃣ Login to dashboard\n2️⃣ Go to 'Manage Services'\n3️⃣ Edit pricing & services\n4️⃣ Save changes`,
      },
      {
        question: "How do customers find my salon on the platform?",
        answer: `🌍 Customers search by location, services & ratings\n🚀 Higher ratings = More visibility!\n✅ Promote your profile for better reach`,
      },
      {
        question: "What happens if a customer cancels an appointment?",
        answer: `📌 Cancellation policy applies\n✅ Refund depends on timing of cancellation\n✅ No-show cases can be reported`,
      },
      {
        question: "Can I set my salon’s working hours?",
        answer: `✅ Yes, customize your available slots\n✅ Customers can only book within your set hours`,
      },
      {
        question: "What support does The Cut Point provide to salon owners?",
        answer: `📞 24/7 customer support\n📊 Marketing tools & analytics\n✅ Partner training for better sales`,
      },
      {
        question: "How do I get more customers to book my services?",
        answer: `✅ Maintain high ratings\n✅ Offer discounts & deals\n✅ Keep service menu updated`,
      },
    ];
  
    return (
      <div className="max-w-6xl mx-auto py-12 px-6 w-full">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-5 bg-white shadow-md transition hover:shadow-lg">
              <button
                className="flex justify-between items-center w-full text-left font-medium text-lg text-gray-800"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? <FiChevronUp size={22} className="text-blue-500" /> : <FiChevronDown size={22} className="text-blue-500" />}

              </button>
              {openIndex === index && <p className="mt-3 text-gray-600 whitespace-pre-line">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };
export default FAQ
