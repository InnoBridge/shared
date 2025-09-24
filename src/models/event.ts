type EventType = 'user.created' | 'user.updated' | 'user.deleted';
type Event = {
  data: Record<string, any>;
  object: 'event';
  type: EventType;
};

export { 
    Event, 
    EventType
};