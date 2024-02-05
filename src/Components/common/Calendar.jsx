import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Switch } from "@headlessui/react";

const Calendar = ({
  startDate,
  endDate,
  handleDateSelect,
  handleEventClick,
  currentEvents = [],
}) => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  // const [currentEvents, setCurrentEvents] = useState([]);

  const handleEvents = (events) => {
    // setCurrentEvents(events);
  };

  return (
    <>
      <ToggleButton weekendsVisible={weekendsVisible} setWeekendsVisible={setWeekendsVisible} />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev today next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={RenderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /*
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
              */
        key={startDate + endDate + currentEvents.length}
      />
    </>
  );
};

const RenderEventContent = (eventInfo) => {
  return (
    <div
      className={`${eventInfo.event.title ? "p-1" : ""} cursor-pointer ${
        eventInfo.event.extendedProps.holiday ? "is-holiday" : ""
      }`}
      title={eventInfo.event.title}
    >
      <div className="absolute top-0 left-0 w-full h-full"></div>
      <div>{eventInfo.event.title}</div>
      {/* <div>{eventInfo.event.extendedProps.description}</div> */}
    </div>
  );
};

const ToggleButton = ({ weekendsVisible, setWeekendsVisible }) => {
  return (
    <div className="flex items-center gap-2 justify-end pb-2">
      <span>Show weekends</span>
      <Switch
        checked={weekendsVisible}
        onChange={setWeekendsVisible}
        className={`${weekendsVisible ? "bg-blue-500" : "bg-gray-300"}
          relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Toggle weekends</span>
        <span
          aria-hidden="true"
          className={`${weekendsVisible ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default Calendar;
