import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importuojame kalendoriaus stilių
import styles from "./BookingModal.module.scss";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedDate && selectedTime) {
      console.log("Selected Date:", selectedDate.toDateString());
      console.log("Selected Time Slot:", selectedTime);
      onClose();
    } else {
      alert("Please select a date and time slot.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Book a Service</h2>
        <p>Select Date and Time slot to book a service</p>
        <form onSubmit={handleSubmit}>
          {/* Kalendorius */}
          <div className={styles.field}>
            <label>Select Date</label>
            <Calendar
              onChange={(date) => setSelectedDate(date as Date)}
              value={selectedDate}
              minDate={new Date()} // Negalima pasirinkti praeities datų
              className={styles.calendar}
            />
          </div>
          {/* Laiko intervalai */}
          <div className={styles.field}>
            <label>Select Time Slot</label>
            <div className={styles.timeSlots}>
              {timeSlots.map((time, index) => (
                <button
                  type="button"
                  key={index}
                  className={`${styles.timeSlot} ${
                    selectedTime === time ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          {/* Pateikimo mygtukas */}
          <button type="submit" className={styles.submitButton}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
