import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookedEvents = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("adminToken");

  useEffect(() => {
    fetchBookedEvents();
  }, []);

  const fetchBookedEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8080/api/v1/admin/bookedevents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookedEvents(response.data.data || []); // Ensure it's an array even if data is null/undefined
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching booked events:", error);
      setError("Failed to fetch booked events. Please try again later.");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Booked Events</h2>
      {bookedEvents.length === 0 ? (
        <p>No booked events found.</p>
      ) : (
        bookedEvents.map((booking) => (
          <div key={booking._id}>
            <h3>{booking.event_id?.name || 'Unnamed Event'}</h3>
            <p>Date: {booking.event_id?.date ? new Date(booking.event_id.date).toLocaleDateString() : 'Date not available'}</p>
            <p>Booked by: {booking.user_id?.fullName || 'Unknown User'}</p>
            <p>User Email: {booking.user_id?.email || 'Email not available'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookedEvents;