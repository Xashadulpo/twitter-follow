// pages/api/checkFollow.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken, targetUserId, userId } = req.body;

  console.log('Request received:', { accessToken, targetUserId, userId });

  if (!accessToken || !userId || !targetUserId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const fetchFollowStatus = async (paginationToken?: string) => {
      const url = `https://api.twitter.com/2/users/${userId}/following?max_results=1000${paginationToken ? `&pagination_token=${paginationToken}` : ''}`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log('Twitter API response:', response.data);
      return response.data;
    };

    let isFollowing = false;
    let paginationToken: string | undefined = undefined;

    do {
      const data:any = await fetchFollowStatus(paginationToken);
      if (data.data.some((user: any) => user.id === targetUserId)) {
        isFollowing = true;
        break;
      }
      paginationToken = data.meta.next_token;
    } while (paginationToken);

    res.status(200).json({ isFollowing });
  } catch (error) {
    console.error('Error checking follow status:', error);
    res.status(500).json({ error: 'Failed to check follow status' });
  }
};

export default handler;
