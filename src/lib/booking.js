// sends the request to our own server endpoint, so no API key ever sits in the browser
export async function submitBooking(values) {
  const endpoint = import.meta.env.VITE_BOOKING_ENDPOINT;

  if (!endpoint) {
    throw new Error("The booking endpoint is not set up yet");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("The booking request failed");
  }
}
