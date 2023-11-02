export type Event = {
  title: string;
  backgroundColor: string;
  //start: string | Date;
  //end: string | Date;
  allDay: boolean;
  rrule: {
    freq: string;
    dtstart: string | Date;
    until: string | Date;
    // interval: number;
    // byweekday: [string];
  };
  //exdate: string[] | Date[];
  extendedProps: {
    department: string;
  };
};
