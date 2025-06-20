import React, { useState } from "react";
import apiService from '../services/apiService';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';

const FeedbackScreen = () => {
  const [form, setForm] = useState({ eventId: '', userId: '', rating: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      await apiService.post('/api/EventFeedback', form);
      setSubmitted(true);
      setToast({ message: 'Feedback submitted!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to submit feedback', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg">
        {submitted ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">Thank you!</h2>
            <p>Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">We value your feedback</h2>
            <p className="text-gray-600 mb-6">Let us know what you think about our dashboard or event.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="eventId"
                placeholder="Event ID"
                value={form.eventId}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="userId"
                placeholder="User ID"
                value={form.userId}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (1-5)"
                value={form.rating}
                onChange={handleChange}
                min="1"
                max="5"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                name="comment"
                placeholder="Your Feedback"
                rows="5"
                value={form.comment}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Submit Feedback'}
              </button>
            </form>
          </>
        )}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
};

export default FeedbackScreen;
