import { useCallback, useEffect, useState } from 'react';

import io, { Socket } from 'socket.io-client';

export const useSocket = (
  serverPath: string
  // tokenStore?: string | undefined
) => {
  // const socket = useMemo(
  //   () =>
  //     io(serverPath, {
  //       transports: ['websocket'],
  //     }),
  //   [serverPath]
  // );

  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState<boolean | undefined>(false);

  const connectSocket = useCallback(() => {
    // const allTokens: string[] = [];

    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   if (key && key.includes('AUTH_TOKEN')) {
    //     const token = localStorage.getItem(key);
    //     if (token) {
    //       allTokens.push(token);
    //     }
    //   }
    // }

    // const foundToken = allTokens.find((item) => item === token);

    // const part = foundToken?.slice(-3);

    // const newToken = localStorage.getItem(`AUTH_TOKEN${part}`);

    const newToken = sessionStorage.getItem(`AUTH_TOKEN`);

    const socketTemp = io(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': newToken,
      },
    });

    setSocket(socketTemp);
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  };
};
