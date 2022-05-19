import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar, MainContainer } from './';
import { auth, firestore } from '../firebase';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Slack(props) {
  const { history } = props;
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState({});
  const query = useQuery();
  const channelId = query.get('id');

  useEffect(() => {
    console.log('HOLA', 'auth.currentUser.uid');

    fetch('http://127.0.0.1:8000/converse/channels')
      .then((response) => response.json())
      .then((snapshot) => {
        // const channels = snapshot.docs;
        console.log(snapshot);
        const channels = snapshot.map((doc) => {
          return { id: doc.id, name: doc.name, description: doc.descriptions };
        });
        setChannels(channels);

        if (!channelId) {
          history.push({
            pathname: '/',
            search: `?id=${channels[0].id}`,
          });

          setCurrentChannel(channels[0]);
        } else {
          const filteredChannel = channels.filter((ch) => ch.id === channelId);
          setCurrentChannel(filteredChannel[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [channelId]);

  return (
    <div id="slack">
      <Sidebar channels={channels} />
      <MainContainer channel={currentChannel} />
    </div>
  );
}

export default Slack;
