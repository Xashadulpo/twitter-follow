// pages/api/checkFollow.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken, targetUserId } = req.body;

  if (!accessToken || !targetUserId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const response = await axios.get(`https://api.twitter.com/2/users/${targetUserId}/followers`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const isFollowing = response.data.data.some((user: any) => user.id === targetUserId);

    res.status(200).json({ isFollowing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to check follow status' });
  }
};

export default handler;
