import React from 'react';

const NotificationPanel: React.FC = () => {
  // placeholder; socket handlers are set up in services/sockets.ts
  return (
    <div aria-live="polite" aria-atomic="true" className="fixed bottom-4 right-4">
      <div id="toast-root" />
    </div>
  );
};
export default NotificationPanel;
