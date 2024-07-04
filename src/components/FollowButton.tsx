// components/FollowButton.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';

const FollowButton = ({ targetUserId }: { targetUserId: string }) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingFollowStatus, setCheckingFollowStatus] = useState(false);

  const checkFollowStatus = async () => {
    if (session?.accessToken && session.user?.id) {
      try {
        console.log('Checking follow status...');
        const response = await axios.post('/api/checkFollow', {
          accessToken: session.accessToken,
          userId: session.user.id,
          targetUserId,
        });
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Error checking follow status:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkFollowStatus();
  }, [session, targetUserId]);

  const handleFollowClick = () => {
    if (!session) {
      signIn('twitter');
    } else {
      window.open('https://x.com/Asif71867019', '_blank');
      setCheckingFollowStatus(true);
      setTimeout(() => {
        pollFollowStatus();
      }, 5000); // Start polling after a delay to give user time to follow
    }
  };

  const pollFollowStatus = async () => {
    if (checkingFollowStatus) {
      await checkFollowStatus();
      if (!isFollowing) {
        console.log('Not following yet, polling again...');
        setTimeout(pollFollowStatus, 5000); // Poll every 5 seconds
      } else {
        console.log('Now following!');
        setCheckingFollowStatus(false);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <button
      onClick={handleFollowClick}
      disabled={isFollowing}
      style={{ backgroundColor: isFollowing ? 'grey' : 'blue' }}
    >
      {isFollowing ? 'Done' : session ? 'Follow on Twitter' : 'Login with Twitter'}
    </button>
  );
};

export default FollowButton;
