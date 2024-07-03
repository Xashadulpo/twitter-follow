// pages/index.tsx or any other page
import FollowButton from '../components/FollowButton';

const HomePage = () => {
  return (
    <div>
      <h1>Follow Status Check</h1>
      <FollowButton targetUserId="Asif71867019" />
    </div>
  );
};

export default HomePage;
