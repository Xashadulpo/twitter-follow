// components/FollowButton.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';

const FollowButton = ({ targetUserId }: { targetUserId: string }) => {
  const { data: session,status } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (session?.accessToken) {
        try {
          const response = await axios.post('/api/checkFollow', {
            accessToken: session.accessToken,
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

    checkFollowStatus();
  }, [session, targetUserId]);

  const handleFollowClick = () => {
    if (!session) {
      signIn('twitter');
    } else {
      window.open('https://x.com/Asif71867019', '_blank');
      console.log("go bro");
      
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
