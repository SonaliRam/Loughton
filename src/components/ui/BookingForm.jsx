import { useRef, useState } from "react";
import { appointmentTypes, timeSlots } from "../../data/booking";
import useReveal from "../../hooks/useReveal";
import { submitBooking } from "../../lib/booking";
import Button from "./Button";
import FormField, { SelectInput } from "./FormField";

// earliest date a patient can pick
const today = new Date().toISOString().slice(0, 10);

function BookingForm() {
  const wrapRef = useRef(null);
  const [status, setStatus] = useState("idle");
  useReveal(wrapRef, "[data-reveal]", { y: 30, stagger: 0.08 });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    // the hidden field is only filled in by bots, so quietly ignore those
    if (values.company) return;

    setStatus("sending");
    try {
      await submitBooking(values);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div ref={wrapRef}>
      <h3
        data-reveal
        className="font-body text-[1.75rem] font-semibold text-ink md:text-[2.25rem] xl:text-[2.5rem]"
      >
        Request an appointment
      </h3>
      <p data-reveal className="text-ui mt-3 text-muted xl:mt-4">
        Complete your details below and our team will confirm your appointment.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 xl:mt-[3.5rem]">
        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 xl:gap-x-[2.75rem] xl:gap-y-[2.25rem]">
          <FormField id="fullName" label="Full name">
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              maxLength={100}
              required
              placeholder="Enter your full name"
              className="form-control"
            />
          </FormField>

          <FormField id="phone" label="Phone number">
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={20}
              required
              placeholder="Enter your phone number"
              className="form-control"
            />
          </FormField>

          <FormField id="email" label="Email address">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={120}
              required
              placeholder="you@example.com"
              className="form-control"
            />
          </FormField>

          <FormField id="appointmentType" label="Appointment type">
            <SelectInput
              id="appointmentType"
              name="appointmentType"
              placeholder="Select a service"
              options={appointmentTypes}
            />
          </FormField>

          <FormField id="preferredDate" label="Preferred date">
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              min={today}
              required
              className="form-control"
            />
          </FormField>

          <FormField id="preferredTime" label="Preferred time">
            <SelectInput
              id="preferredTime"
              name="preferredTime"
              placeholder="Select a time"
              options={timeSlots}
            />
          </FormField>

          <FormField id="notes" label="Additional notes" className="sm:col-span-2">
            <textarea
              id="notes"
              name="notes"
              maxLength={1000}
              placeholder="Tell us anything that may help us prepare for your appointment."
              className="form-control"
            />
          </FormField>
        </div>

        {/* hidden trap for bots, real visitors never see or fill it */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div
          data-reveal
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 xl:mt-[3.25rem]"
        >
          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? "Sending..." : "Request Appointment"}
          </Button>
          <p className="text-small">Your information will be kept private and secure.</p>
        </div>

        <p role="status" aria-live="polite" className="text-ui mt-5 min-h-[1.5rem] text-ink">
          {status === "sent" && "Thank you. We have received your request and will confirm your appointment shortly."}
          {status === "error" && "Sorry, we could not send your request just now. Please call us instead."}
        </p>
      </form>
    </div>
  );
}

export default BookingForm;
