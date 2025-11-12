// Mock parachain data
export const parachains = [
  {
    id: 'acala',
    name: 'Acala',
    icon: '△',
    color: '#E40C5B',
    connected: false
  },
  {
    id: 'moonbeam',
    name: 'Moonbeam',
    icon: '◐',
    color: '#53CBC9',
    connected: false
  },
  {
    id: 'astar',
    name: 'Astar',
    icon: '★',
    color: '#0AE2FF',
    connected: false
  },
  {
    id: 'parallel',
    name: 'Parallel',
    icon: '◊',
    color: '#FF4B8B',
    connected: false
  }
];

// Simulate parachain connection
export const connectParachain = (parachainId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        parachainId,
        message: `Connected to ${parachainId}`
      });
    }, 1500);
  });
};

// Simulate parachain disconnection
export const disconnectParachain = (parachainId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        parachainId,
        message: `Disconnected from ${parachainId}`
      });
    }, 500);
  });
};
