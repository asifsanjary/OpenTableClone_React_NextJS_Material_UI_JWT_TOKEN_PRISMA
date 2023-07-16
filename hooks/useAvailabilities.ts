import { useState, useEffect } from "react";
import axios from "axios";

export default function useAvailabilities() {
  let baseUrl = "";
  useEffect(() => {
    baseUrl = window.location.origin;
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: number;
    day: string;
    time: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${baseUrl}/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, data, error, fetchAvailabilities };
}
