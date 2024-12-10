import { GetPlayerResponse, Player } from "../../../types";

export const useGetPlayers = () => {
  const data: Player[] = [
    {
      college: "North Carolina",
      id: "46263",
      position: "ILB",
      name: "hogehoge",
    },
    {
      college: "Wisconsin",
      id: "47934",
      position: "OLB",
      name: "fugafuga",
    },
  ];

  return {
    data,
  };
};

export const useGetPlayerInfo = (id: string) => {
  const palyers: GetPlayerResponse[] = [
    {
      birth_date: "1996-01-22",
      height: "6-0",
      sk: "46263",
      pk: "46263",
      name: "Russell Gage",
      position: "WR",
      college: "Louisiana State",
      weight: "184",
    },
    {
      birth_date: "1996-01-22",
      height: "6-0",
      sk: "47934",
      pk: "47934",
      name: "Russell Gage",
      position: "WR",
      college: "Louisiana State",
      weight: "184",
    },
  ];
  const player = palyers.find((player) => player.pk === id);

  return {
    isLoading: false,
    data: player,
  };
};
