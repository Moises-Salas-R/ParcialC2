export interface NotificationPayload {
    token: string;
    notification: {
      title: string;
      body: string;
    };
    android: {
      priority: string;
      data: {
        userId: string;
        meetingId: string;
        type: string;
        name: string;
        userFrom: string;
      };
    };
  }
  