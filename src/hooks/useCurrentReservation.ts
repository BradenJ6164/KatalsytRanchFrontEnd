import { ref, onBeforeUnmount } from "vue";
import ICAL from "ical.js";
interface ReservationData {
  Name: string;
  "Reservation Code": string;
  Property: string;
  Phone: string;
  Email: string;
  Profile: string;
  Adults: number;
  Children: number;
  CheckIn: ICAL.Time;
  CheckOut: ICAL.Time;
}

export const useCurrentReservation = () => {
  const currentReservation = ref<ReservationData|undefined>(undefined);
  const updateCurrentReservation = async () => {



    const response = await fetch(import.meta.env.VITE_ICAL_LINK);
    const body = await response.text();
    // console.log(body);
    const calendar =new ICAL.Component(ICAL.parse(body));
    const events = calendar.getAllSubcomponents("vevent")

    function parseDataToObject(dataString) {
      // Split the data into lines and process each line
      const lines = dataString.trim().split("\n");
      const result = {};

      lines.forEach(line => {
        const [key, ...valueParts] = line.split(":");
        const keyTrimmed = key.trim();
        const value = valueParts.join(":").trim(); // Join in case of ":" in the value
        if (keyTrimmed && value) {
          result[keyTrimmed] = value;
        }
      });

      return result;
    }

    let reservation: undefined|ReservationData = undefined;
    events.forEach((event)=>{
      const dtstart = event.getFirstPropertyValue("dtstart")
      const dtend = event.getFirstPropertyValue("dtend")
      const now = Math.floor(Date.now() / 1000)
      if (now>= dtstart.toUnixTime() && now <= dtend.toUnixTime()) {

        reservation = parseDataToObject(event.getFirstPropertyValue("description"))
        reservation["CheckIn"] = dtstart;
        reservation["CheckOut"] = dtend;
      }
    })
    // console.log(currentReservation)
    currentReservation.value = reservation as ReservationData | undefined;
  };
  const updateReservationInterval = setInterval(updateCurrentReservation, 3000);
  onBeforeUnmount(() => {
    clearInterval(updateReservationInterval);
  });
  updateCurrentReservation()
  return {
    currentReservation,
  };
};

